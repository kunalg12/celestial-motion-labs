import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

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
  const dayTexture = useLoader(THREE.TextureLoader, '/textures/earth_day.jpg');
  const nightTexture = useLoader(THREE.TextureLoader, '/textures/earth_night.png');
  const cloudsTexture = useLoader(THREE.TextureLoader, '/textures/earth_clouds.png');
  const bumpTexture = useLoader(THREE.TextureLoader, '/textures/earth_normal.jpg');
  const specularTexture = useLoader(THREE.TextureLoader, '/textures/earth_specular.jpg');
  
  // Configure textures
  useMemo(() => {
    [dayTexture, nightTexture, cloudsTexture, bumpTexture, specularTexture].forEach(tex => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 16;
    });
  }, [dayTexture, nightTexture, cloudsTexture, bumpTexture, specularTexture]);
  
  // Atmosphere shader material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vec3 viewDirection = normalize(-vPosition);
          float intensity = pow(0.75 - dot(viewDirection, vNormal), 2.0);
          vec3 atmosphereColor = vec3(0.3, 0.6, 1.0);
          gl_FragColor = vec4(atmosphereColor, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  }, []);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Mouse parallax - subtle addition to auto-rotation
      const targetRotX = (mouseY?.get() ?? 0) * 0.05;
      const targetRotY = (mouseX?.get() ?? 0) * 0.05;
      
      // We'll let OrbitControls handle the heavy lifting, 
      // but keep a slight hint of mouse-follow if not dragging
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX + 0.2, 0.02);
    }
    
    if (earthRef.current) {
      // Slow continuous rotation
      earthRef.current.rotation.y += delta * 0.05;
    }
    
    if (cloudsRef.current) {
      // Clouds rotate slightly faster
      cloudsRef.current.rotation.y += delta * 0.065;
    }
    
    if (atmosphereRef.current && earthRef.current) {
      atmosphereRef.current.rotation.y = earthRef.current.rotation.y;
    }
  });
  
  return (
    <group ref={groupRef} scale={2} position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
      {/* Main Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={dayTexture}
          bumpMap={bumpTexture}
          bumpScale={0.05}
          roughnessMap={specularTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Night lights layer (emissive) */}
      <mesh rotation={earthRef.current?.rotation}>
        <sphereGeometry args={[1.001, 64, 64]} />
        <meshBasicMaterial
          map={nightTexture}
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={1.015}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent
          opacity={0.4}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.15} material={atmosphereMaterial}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
      
      {/* Inner atmospheric rim */}
      <mesh scale={1.02}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#6699ff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Loading fallback
const LoadingFallback = () => (
  <mesh scale={2}>
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
      className={`absolute ${className ?? ''}`}
      style={{
        right: '-18%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(700px, 55vw, 1100px)',
        height: 'clamp(700px, 55vw, 1100px)',
        cursor: 'grab',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
        {/* Ambient fill */}
        <ambientLight intensity={0.3} />
        
        {/* Main sun light */}
        <directionalLight
          position={[5, 3, 5]}
          intensity={2.5}
          color="#ffffff"
        />
        
        {/* Rim light for depth */}
        <pointLight
          position={[-5, 0, -3]}
          intensity={0.5}
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
          background: 'radial-gradient(circle at 50% 50%, hsla(210, 100%, 60%, 0.1) 0%, transparent 45%)',
          filter: 'blur(30px)',
          transform: 'scale(1.3)',
        }}
      />
    </div>
  );
};

export default Planet3D;
