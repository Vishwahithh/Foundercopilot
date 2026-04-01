import { ThreeCanvas } from '@remotion/three';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/* Wireframe cube that rotates continuously. 
   Phase 2 (frames 150-300) spins faster and pulses. */
const SignalCube: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (!meshRef.current) return;
        const t = frame / fps;
        const isProcessing = frame > 150 && frame < 300;
        const speed = isProcessing ? 4 : 0.8;
        meshRef.current.rotation.x = t * 0.4 * speed;
        meshRef.current.rotation.y = t * 0.6 * speed;
    });

    const isProcessing = frame > 150 && frame < 300;
    const isDeploy = frame >= 300;
    const color = isDeploy ? '#FF5A36' : '#C6FF2E';
    const scale = isProcessing ? 1 + Math.sin(frame * 0.3) * 0.12 : 1;
    const opacity = isProcessing ? 0.25 : 0.15;

    return (
        <mesh ref={meshRef} scale={[scale, scale, scale]}>
            <boxGeometry args={[3.5, 3.5, 3.5]} />
            <meshStandardMaterial
                color={color}
                wireframe
                transparent
                opacity={opacity}
                emissive={new THREE.Color(color)}
                emissiveIntensity={isProcessing ? 1.0 : 0.5}
            />
        </mesh>
    );
};

/* Small orbiting particles around the cube */
const Particles: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = (frame / fps) * 0.5;
        groupRef.current.rotation.x = (frame / fps) * 0.2;
    });

    const count = 12;
    return (
        <group ref={groupRef}>
            {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * Math.PI * 2;
                const radius = 5 + Math.sin(i * 1.5) * 1.5;
                const y = Math.cos(i * 2.1) * 2;
                const isHot = i % 3 === 0;
                return (
                    <mesh key={i} position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}>
                        <sphereGeometry args={[0.08, 8, 8]} />
                        <meshStandardMaterial
                            color={isHot ? '#FF5A36' : '#C6FF2E'}
                            emissive={new THREE.Color(isHot ? '#FF5A36' : '#C6FF2E')}
                            emissiveIntensity={4}
                        />
                    </mesh>
                );
            })}
        </group>
    );
};

export const Scene3D: React.FC = () => {
    const { width, height } = useVideoConfig();

    return (
        <ThreeCanvas width={width} height={height} camera={{ position: [0, 0, 10], fov: 55 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[8, 8, 8]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-8, -4, 4]} intensity={0.6} color="#C6FF2E" />
            <SignalCube />
            <Particles />
        </ThreeCanvas>
    );
};
