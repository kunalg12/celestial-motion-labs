import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

// Custom shaders for atmosphere
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
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 glowColor;
  uniform float intensity;
  uniform float power;
  
  void main() {
    vec3 viewDirection = normalize(-vPosition);
    float fresnel = pow(1.0 - dot(viewDirection, vNormal), power);
    vec3 atmosphere = glowColor * fresnel * intensity;
    gl_FragColor = vec4(atmosphere, fresnel * 0.8);
  }
`;

// Day/Night shader for realistic lighting
const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform sampler2D cloudsTexture;
  uniform vec3 sunDirection;
  uniform float cloudOpacity;
  uniform float time;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 sunDir = normalize(sunDirection);
    float intensity = dot(vNormal, sunDir);
    
    // Smooth transition between day and night
    float mixValue = smoothstep(-0.2, 0.4, intensity);
    
    vec4 dayColor = texture2D(dayTexture, vUv);
    vec4 nightColor = texture2D(nightTexture, vUv);
    
    // Cloud UV with animation
    vec2 cloudUv = vUv;
    cloudUv.x += time * 0.002;
    vec4 clouds = texture2D(cloudsTexture, cloudUv);
    
    // Mix day and night based on sun position
    vec4 baseColor = mix(nightColor * 0.8, dayColor, mixValue);
    
    // Add clouds on day side with soft blend
    float cloudMix = clouds.r * cloudOpacity * mixValue;
    baseColor = mix(baseColor, vec4(1.0), cloudMix * 0.7);
    
    // Add subtle rim lighting
    vec3 viewDir = normalize(-vPosition);
    float rimLight = pow(1.0 - max(0.0, dot(viewDir, vNormal)), 3.0);
    baseColor.rgb += vec3(0.2, 0.4, 0.8) * rimLight * 0.3;
    
    // Add specular highlight on water (approximation)
    float specular = pow(max(0.0, dot(reflect(-sunDir, vNormal), viewDir)), 20.0);
    baseColor.rgb += specular * 0.5 * mixValue;
    
    gl_FragColor = baseColor;
  }
`;

interface EarthMeshProps {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

const EarthMesh = ({ mouseX, mouseY }: EarthMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  // Create procedural textures
  const textures = useMemo(() => {
    // Day texture - Earth-like colors
    const dayCanvas = document.createElement('canvas');
    dayCanvas.width = 1024;
    dayCanvas.height = 512;
    const dayCtx = dayCanvas.getContext('2d')!;
    
    // Create gradient base
    const dayGradient = dayCtx.createLinearGradient(0, 0, 1024, 512);
    dayGradient.addColorStop(0, '#1a4a6e');
    dayGradient.addColorStop(0.3, '#2d5a7b');
    dayGradient.addColorStop(0.5, '#3d7a9e');
    dayGradient.addColorStop(0.7, '#2d6b8a');
    dayGradient.addColorStop(1, '#1a4a6e');
    dayCtx.fillStyle = dayGradient;
    dayCtx.fillRect(0, 0, 1024, 512);
    
    // Add landmass shapes
    dayCtx.fillStyle = '#2a5a3a';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const w = 30 + Math.random() * 100;
      const h = 20 + Math.random() * 60;
      dayCtx.beginPath();
      dayCtx.ellipse(x, y, w, h, Math.random() * Math.PI, 0, Math.PI * 2);
      dayCtx.fill();
    }
    
    // Add polar ice
    dayCtx.fillStyle = '#c8d8e8';
    dayCtx.fillRect(0, 0, 1024, 30);
    dayCtx.fillRect(0, 482, 1024, 30);
    
    const dayTexture = new THREE.CanvasTexture(dayCanvas);
    dayTexture.wrapS = THREE.RepeatWrapping;
    dayTexture.wrapT = THREE.ClampToEdgeWrapping;
    
    // Night texture - city lights
    const nightCanvas = document.createElement('canvas');
    nightCanvas.width = 1024;
    nightCanvas.height = 512;
    const nightCtx = nightCanvas.getContext('2d')!;
    
    nightCtx.fillStyle = '#020208';
    nightCtx.fillRect(0, 0, 1024, 512);
    
    // Add city lights
    nightCtx.fillStyle = '#ffaa44';
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * 1024;
      const y = 100 + Math.random() * 312;
      const size = Math.random() * 2;
      nightCtx.beginPath();
      nightCtx.arc(x, y, size, 0, Math.PI * 2);
      nightCtx.fill();
    }
    
    // Brighter clusters
    nightCtx.fillStyle = '#ffcc66';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 1024;
      const y = 150 + Math.random() * 212;
      const size = 1 + Math.random() * 3;
      nightCtx.beginPath();
      nightCtx.arc(x, y, size, 0, Math.PI * 2);
      nightCtx.fill();
    }
    
    const nightTexture = new THREE.CanvasTexture(nightCanvas);
    nightTexture.wrapS = THREE.RepeatWrapping;
    nightTexture.wrapT = THREE.ClampToEdgeWrapping;
    
    // Clouds texture
    const cloudsCanvas = document.createElement('canvas');
    cloudsCanvas.width = 1024;
    cloudsCanvas.height = 512;
    const cloudsCtx = cloudsCanvas.getContext('2d')!;
    
    cloudsCtx.fillStyle = 'transparent';
    cloudsCtx.fillRect(0, 0, 1024, 512);
    
    // Create wispy clouds
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const radius = 20 + Math.random() * 80;
      const gradient = cloudsCtx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      cloudsCtx.fillStyle = gradient;
      cloudsCtx.beginPath();
      cloudsCtx.arc(x, y, radius, 0, Math.PI * 2);
      cloudsCtx.fill();
    }
    
    const cloudsTexture = new THREE.CanvasTexture(cloudsCanvas);
    cloudsTexture.wrapS = THREE.RepeatWrapping;
    cloudsTexture.wrapT = THREE.ClampToEdgeWrapping;
    
    return { dayTexture, nightTexture, cloudsTexture };
  }, []);
  
  // Custom shader material
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        dayTexture: { value: textures.dayTexture },
        nightTexture: { value: textures.nightTexture },
        cloudsTexture: { value: textures.cloudsTexture },
        sunDirection: { value: new THREE.Vector3(1, 0.3, 0.5).normalize() },
        cloudOpacity: { value: 0.6 },
        time: { value: 0 },
      },
    });
  }, [textures]);
  
  // Atmosphere material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        glowColor: { value: new THREE.Color(0.3, 0.6, 1.0) },
        intensity: { value: 1.2 },
        power: { value: 4.0 },
      },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  }, []);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slow continuous rotation
      meshRef.current.rotation.y += delta * 0.02;
      
      // Mouse parallax
      const targetX = (mouseY?.get() ?? 0) * 0.15;
      const targetY = (mouseX?.get() ?? 0) * 0.15;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.02);
      
      // Update time uniform for cloud animation
      earthMaterial.uniforms.time.value = state.clock.elapsedTime;
      
      // Animate sun direction for day/night cycle
      const sunAngle = state.clock.elapsedTime * 0.05;
      earthMaterial.uniforms.sunDirection.value.set(
        Math.cos(sunAngle),
        0.3,
        Math.sin(sunAngle)
      ).normalize();
    }
    
    if (cloudsRef.current) {
      // Clouds rotate slightly faster
      cloudsRef.current.rotation.y += delta * 0.025;
    }
    
    if (atmosphereRef.current && meshRef.current) {
      atmosphereRef.current.rotation.copy(meshRef.current.rotation);
    }
  });
  
  return (
    <Float
      speed={0.5}
      rotationIntensity={0.1}
      floatIntensity={0.3}
    >
      <group scale={3.5}>
        {/* Main Earth mesh */}
        <mesh ref={meshRef} material={earthMaterial}>
          <sphereGeometry args={[1, 64, 64]} />
        </mesh>
        
        {/* Cloud layer */}
        <mesh ref={cloudsRef} scale={1.01}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={textures.cloudsTexture}
            transparent
            opacity={0.35}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </mesh>
        
        {/* Atmosphere glow */}
        <mesh ref={atmosphereRef} scale={1.15} material={atmosphereMaterial}>
          <sphereGeometry args={[1, 64, 64]} />
        </mesh>
        
        {/* Inner atmosphere glow */}
        <mesh scale={1.05}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial
            color="#4488ff"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </Float>
  );
};

interface Planet3DProps {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  className?: string;
}

const Planet3D = ({ mouseX, mouseY, className }: Planet3DProps) => {
  return (
    <div className={`absolute pointer-events-none ${className ?? ''}`}
      style={{
        right: '-25%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(800px, 70vw, 1400px)',
        height: 'clamp(800px, 70vw, 1400px)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Ambient light for base visibility */}
        <ambientLight intensity={0.1} />
        
        {/* Main directional light (sun) */}
        <directionalLight
          position={[5, 2, 3]}
          intensity={2}
          color="#ffffff"
        />
        
        {/* Rim light */}
        <directionalLight
          position={[-3, 0, -2]}
          intensity={0.3}
          color="#4488ff"
        />
        
        {/* Fill light */}
        <pointLight
          position={[-5, -3, 2]}
          intensity={0.2}
          color="#6644aa"
        />
        
        <EarthMesh mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
      
      {/* Outer glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsla(199, 89%, 48%, 0.15) 0%, transparent 50%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
};

export default Planet3D;
