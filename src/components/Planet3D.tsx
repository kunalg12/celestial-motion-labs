import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

// Custom Earth shader with day/night blending
const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform sampler2D specularMap;
  uniform sampler2D normalMap;
  uniform vec3 sunDirection;
  uniform float time;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  
  void main() {
    // Sample textures
    vec4 dayColor = texture2D(dayTexture, vUv);
    vec4 nightColor = texture2D(nightTexture, vUv);
    float specularMask = texture2D(specularMap, vUv).r;
    
    // Calculate sun intensity on surface
    vec3 sunDir = normalize(sunDirection);
    float intensity = dot(vNormal, sunDir);
    
    // Smooth transition between day and night
    float dayMix = smoothstep(-0.1, 0.3, intensity);
    
    // Blend day and night
    vec3 baseColor = mix(nightColor.rgb * 1.5, dayColor.rgb, dayMix);
    
    // Add specular highlight on water (where specular map is bright)
    vec3 viewDir = normalize(-vPosition);
    vec3 halfDir = normalize(sunDir + viewDir);
    float specular = pow(max(dot(vNormal, halfDir), 0.0), 64.0);
    specular *= specularMask * dayMix;
    baseColor += specular * 0.6;
    
    // Fresnel rim lighting for atmosphere
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
    vec3 rimColor = vec3(0.4, 0.7, 1.0) * fresnel * 0.4;
    baseColor += rimColor;
    
    // Enhance night side city lights
    float nightIntensity = 1.0 - dayMix;
    baseColor += nightColor.rgb * nightIntensity * 0.5;
    
    gl_FragColor = vec4(baseColor, 1.0);
  }
`;

// Atmosphere shader
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  uniform vec3 sunDirection;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 viewDirection = normalize(-vPosition);
    float fresnel = pow(1.0 - dot(viewDirection, vNormal), 4.0);
    
    // Sun-facing side gets brighter atmosphere
    float sunIntensity = max(0.0, dot(vNormal, normalize(sunDirection)));
    
    vec3 dayAtmosphere = vec3(0.3, 0.6, 1.0);
    vec3 nightAtmosphere = vec3(0.1, 0.2, 0.4);
    vec3 atmosphereColor = mix(nightAtmosphere, dayAtmosphere, sunIntensity);
    
    gl_FragColor = vec4(atmosphereColor * fresnel * 1.8, fresnel * 0.6);
  }
`;

// Cloud shader
const cloudVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const cloudFragmentShader = `
  uniform sampler2D cloudTexture;
  uniform vec3 sunDirection;
  uniform float time;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  
  void main() {
    // Animate cloud UV
    vec2 uv = vUv;
    uv.x += time * 0.003;
    
    float cloudAlpha = texture2D(cloudTexture, uv).r;
    
    // Sun lighting on clouds
    float sunIntensity = max(0.2, dot(vNormal, normalize(sunDirection)));
    
    vec3 cloudColor = vec3(1.0) * sunIntensity;
    
    gl_FragColor = vec4(cloudColor, cloudAlpha * 0.7);
  }
`;

interface EarthMeshProps {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

const EarthMesh = ({ mouseX, mouseY }: EarthMeshProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  // Load textures
  const [dayTexture, nightTexture, cloudsTexture, specularTexture, normalTexture] = useLoader(
    THREE.TextureLoader,
    [
      '/textures/earth_day.jpg',
      '/textures/earth_night.png',
      '/textures/earth_clouds.png',
      '/textures/earth_specular.jpg',
      '/textures/earth_normal.jpg',
    ]
  );
  
  // Configure textures
  useMemo(() => {
    [dayTexture, nightTexture, cloudsTexture, specularTexture, normalTexture].forEach(tex => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.anisotropy = 16;
    });
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.colorSpace = THREE.SRGBColorSpace;
  }, [dayTexture, nightTexture, cloudsTexture, specularTexture, normalTexture]);
  
  // Earth material with custom shader
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        dayTexture: { value: dayTexture },
        nightTexture: { value: nightTexture },
        specularMap: { value: specularTexture },
        normalMap: { value: normalTexture },
        sunDirection: { value: new THREE.Vector3(5, 2, 3).normalize() },
        time: { value: 0 },
      },
    });
  }, [dayTexture, nightTexture, specularTexture, normalTexture]);
  
  // Cloud material
  const cloudMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: cloudVertexShader,
      fragmentShader: cloudFragmentShader,
      uniforms: {
        cloudTexture: { value: cloudsTexture },
        sunDirection: { value: new THREE.Vector3(5, 2, 3).normalize() },
        time: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [cloudsTexture]);
  
  // Atmosphere material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        sunDirection: { value: new THREE.Vector3(5, 2, 3).normalize() },
      },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  }, []);
  
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Mouse parallax
      const targetRotX = (mouseY?.get() ?? 0) * 0.12;
      const targetRotY = (mouseX?.get() ?? 0) * 0.08;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX + 0.2, 0.02);
    }
    
    if (earthRef.current) {
      // Slow continuous rotation
      earthRef.current.rotation.y += delta * 0.02;
      
      // Update shader uniforms
      earthMaterial.uniforms.time.value = time;
      
      // Slowly rotate sun position for day/night cycle
      const sunAngle = time * 0.03;
      const sunDir = new THREE.Vector3(
        Math.cos(sunAngle) * 5,
        2,
        Math.sin(sunAngle) * 3
      ).normalize();
      earthMaterial.uniforms.sunDirection.value.copy(sunDir);
      cloudMaterial.uniforms.sunDirection.value.copy(sunDir);
      atmosphereMaterial.uniforms.sunDirection.value.copy(sunDir);
    }
    
    if (cloudsRef.current) {
      // Clouds rotate slightly faster
      cloudsRef.current.rotation.y += delta * 0.025;
      cloudMaterial.uniforms.time.value = time;
    }
    
    if (atmosphereRef.current && earthRef.current) {
      atmosphereRef.current.rotation.y = earthRef.current.rotation.y;
    }
  });
  
  return (
    <group ref={groupRef} scale={2.6} position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
      {/* Main Earth */}
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={1.01} material={cloudMaterial}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.12} material={atmosphereMaterial}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
      
      {/* Inner atmospheric scattering */}
      <mesh scale={1.02}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#6699ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Loading fallback
const LoadingFallback = () => (
  <mesh scale={2.6}>
    <sphereGeometry args={[1, 32, 32]} />
    <meshBasicMaterial color="#1a4a6e" wireframe />
  </mesh>
);

interface Planet3DProps {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  className?: string;
}

const Planet3D = ({ mouseX, mouseY, className }: Planet3DProps) => {
  return (
    <div 
      className={`absolute pointer-events-none ${className ?? ''}`}
      style={{
        right: '-18%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(700px, 55vw, 1100px)',
        height: 'clamp(700px, 55vw, 1100px)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        dpr={[1, 2]}
      >
        {/* Ambient fill */}
        <ambientLight intensity={0.08} />
        
        {/* Main sun light */}
        <directionalLight
          position={[5, 2, 3]}
          intensity={2.0}
          color="#ffffff"
        />
        
        {/* Subtle blue rim */}
        <pointLight
          position={[-4, 0, -2]}
          intensity={0.3}
          color="#4488ff"
        />
        
        <Suspense fallback={<LoadingFallback />}>
          <EarthMesh mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </Canvas>
      
      {/* Outer glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsla(210, 100%, 60%, 0.08) 0%, transparent 40%)',
          filter: 'blur(25px)',
          transform: 'scale(1.4)',
        }}
      />
    </div>
  );
};

export default Planet3D;
