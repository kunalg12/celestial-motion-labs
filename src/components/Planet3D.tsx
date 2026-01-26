import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

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
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 viewDirection = normalize(-vPosition);
    float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * fresnel * 1.5;
    gl_FragColor = vec4(atmosphere, fresnel * 0.7);
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
  
  // Create high-quality procedural textures
  const { earthTexture, nightTexture, cloudsTexture, bumpTexture } = useMemo(() => {
    // Earth day texture
    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 2048;
    earthCanvas.height = 1024;
    const earthCtx = earthCanvas.getContext('2d')!;
    
    // Ocean base - deep blue gradient
    const oceanGradient = earthCtx.createLinearGradient(0, 0, 2048, 1024);
    oceanGradient.addColorStop(0, '#0a3d62');
    oceanGradient.addColorStop(0.3, '#1e6091');
    oceanGradient.addColorStop(0.5, '#2980b9');
    oceanGradient.addColorStop(0.7, '#1e6091');
    oceanGradient.addColorStop(1, '#0a3d62');
    earthCtx.fillStyle = oceanGradient;
    earthCtx.fillRect(0, 0, 2048, 1024);
    
    // Add continents with varied greens and browns
    const continentColors = ['#2d5a3d', '#3d6b4a', '#4a7c5a', '#5a8c6a', '#3a5a3a'];
    const desertColors = ['#c4a35a', '#b89b52', '#9c8445'];
    
    // Draw landmasses
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 2048;
      const y = 200 + Math.random() * 624; // Avoid poles
      earthCtx.fillStyle = continentColors[Math.floor(Math.random() * continentColors.length)];
      earthCtx.beginPath();
      
      // Create organic shapes
      const points = 8 + Math.floor(Math.random() * 6);
      const baseRadius = 40 + Math.random() * 120;
      for (let j = 0; j < points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const radius = baseRadius * (0.6 + Math.random() * 0.8);
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius * 0.6;
        if (j === 0) earthCtx.moveTo(px, py);
        else earthCtx.lineTo(px, py);
      }
      earthCtx.closePath();
      earthCtx.fill();
    }
    
    // Add deserts
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 2048;
      const y = 350 + Math.random() * 324;
      earthCtx.fillStyle = desertColors[Math.floor(Math.random() * desertColors.length)];
      earthCtx.beginPath();
      earthCtx.ellipse(x, y, 30 + Math.random() * 60, 20 + Math.random() * 40, 0, 0, Math.PI * 2);
      earthCtx.fill();
    }
    
    // Polar ice caps
    const northPoleGradient = earthCtx.createLinearGradient(0, 0, 0, 150);
    northPoleGradient.addColorStop(0, '#ffffff');
    northPoleGradient.addColorStop(0.5, '#e8f4f8');
    northPoleGradient.addColorStop(1, 'transparent');
    earthCtx.fillStyle = northPoleGradient;
    earthCtx.fillRect(0, 0, 2048, 150);
    
    const southPoleGradient = earthCtx.createLinearGradient(0, 874, 0, 1024);
    southPoleGradient.addColorStop(0, 'transparent');
    southPoleGradient.addColorStop(0.5, '#e8f4f8');
    southPoleGradient.addColorStop(1, '#ffffff');
    earthCtx.fillStyle = southPoleGradient;
    earthCtx.fillRect(0, 874, 2048, 150);
    
    const earthTex = new THREE.CanvasTexture(earthCanvas);
    earthTex.wrapS = THREE.RepeatWrapping;
    earthTex.colorSpace = THREE.SRGBColorSpace;
    
    // Night texture with city lights
    const nightCanvas = document.createElement('canvas');
    nightCanvas.width = 2048;
    nightCanvas.height = 1024;
    const nightCtx = nightCanvas.getContext('2d')!;
    
    nightCtx.fillStyle = '#010208';
    nightCtx.fillRect(0, 0, 2048, 1024);
    
    // City light clusters
    const clusters = [
      { x: 400, y: 300, size: 150 },  // Europe
      { x: 600, y: 400, size: 100 },  // Africa
      { x: 1400, y: 350, size: 180 }, // East Asia
      { x: 1600, y: 500, size: 80 },  // Southeast Asia
      { x: 1800, y: 300, size: 120 }, // Japan
      { x: 200, y: 350, size: 140 },  // East US
      { x: 100, y: 400, size: 100 },  // West US
    ];
    
    clusters.forEach(cluster => {
      for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * cluster.size;
        const x = cluster.x + Math.cos(angle) * dist;
        const y = cluster.y + Math.sin(angle) * dist * 0.6;
        const brightness = 0.3 + Math.random() * 0.7;
        nightCtx.fillStyle = `rgba(255, ${180 + Math.random() * 75}, ${100 + Math.random() * 50}, ${brightness})`;
        nightCtx.beginPath();
        nightCtx.arc(x, y, 0.5 + Math.random() * 2, 0, Math.PI * 2);
        nightCtx.fill();
      }
    });
    
    const nightTex = new THREE.CanvasTexture(nightCanvas);
    nightTex.wrapS = THREE.RepeatWrapping;
    nightTex.colorSpace = THREE.SRGBColorSpace;
    
    // Clouds texture
    const cloudsCanvas = document.createElement('canvas');
    cloudsCanvas.width = 2048;
    cloudsCanvas.height = 1024;
    const cloudsCtx = cloudsCanvas.getContext('2d')!;
    
    cloudsCtx.clearRect(0, 0, 2048, 1024);
    
    // Create realistic cloud patterns
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 1024;
      const size = 30 + Math.random() * 150;
      const gradient = cloudsCtx.createRadialGradient(x, y, 0, x, y, size);
      const opacity = 0.1 + Math.random() * 0.4;
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(0.4, `rgba(255, 255, 255, ${opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      cloudsCtx.fillStyle = gradient;
      cloudsCtx.beginPath();
      cloudsCtx.ellipse(x, y, size, size * 0.4, Math.random() * Math.PI, 0, Math.PI * 2);
      cloudsCtx.fill();
    }
    
    const cloudsTex = new THREE.CanvasTexture(cloudsCanvas);
    cloudsTex.wrapS = THREE.RepeatWrapping;
    
    // Bump map for terrain
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 1024;
    bumpCanvas.height = 512;
    const bumpCtx = bumpCanvas.getContext('2d')!;
    
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, 1024, 512);
    
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const brightness = 100 + Math.floor(Math.random() * 100);
      bumpCtx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      bumpCtx.beginPath();
      bumpCtx.ellipse(x, y, 20 + Math.random() * 50, 10 + Math.random() * 30, 0, 0, Math.PI * 2);
      bumpCtx.fill();
    }
    
    const bumpTex = new THREE.CanvasTexture(bumpCanvas);
    bumpTex.wrapS = THREE.RepeatWrapping;
    
    return { 
      earthTexture: earthTex, 
      nightTexture: nightTex, 
      cloudsTexture: cloudsTex,
      bumpTexture: bumpTex 
    };
  }, []);
  
  // Atmosphere material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  }, []);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Mouse parallax on the whole group
      const targetRotX = (mouseY?.get() ?? 0) * 0.1;
      const targetRotY = (mouseX?.get() ?? 0) * 0.1;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.02);
    }
    
    if (earthRef.current) {
      // Slow continuous rotation
      earthRef.current.rotation.y += delta * 0.03;
    }
    
    if (cloudsRef.current) {
      // Clouds rotate slightly faster
      cloudsRef.current.rotation.y += delta * 0.04;
    }
  });
  
  return (
    <group ref={groupRef} scale={2.8} position={[0, 0, 0]}>
      {/* Main Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.02}
          roughness={0.8}
          metalness={0.1}
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
        />
      </mesh>
      
      {/* Atmosphere glow - outer */}
      <mesh scale={1.2} material={atmosphereMaterial}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      
      {/* Inner rim light */}
      <mesh scale={1.02}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Fallback component while loading
const PlanetFallback = () => (
  <mesh scale={2.8}>
    <sphereGeometry args={[1, 32, 32]} />
    <meshBasicMaterial color="#1a4a6e" />
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
        right: '-20%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(700px, 60vw, 1200px)',
        height: 'clamp(700px, 60vw, 1200px)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.15} />
        
        {/* Sun light */}
        <directionalLight
          position={[5, 2, 3]}
          intensity={2.5}
          color="#ffffff"
        />
        
        {/* Blue rim light from behind */}
        <directionalLight
          position={[-4, 0, -3]}
          intensity={0.6}
          color="#4488ff"
        />
        
        {/* Subtle fill from below */}
        <pointLight
          position={[0, -3, 2]}
          intensity={0.15}
          color="#8866cc"
        />
        
        <Suspense fallback={<PlanetFallback />}>
          <EarthMesh mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </Canvas>
      
      {/* Outer atmospheric glow overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsla(199, 89%, 48%, 0.12) 0%, transparent 45%)',
          filter: 'blur(30px)',
          transform: 'scale(1.3)',
        }}
      />
    </div>
  );
};

export default Planet3D;
