import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const Waveform: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Calculate a chaotic offset using simple sine/cosine for audio "bars"
    return (
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', paddingBottom: '60px', opacity: 0.6 }}>
            {new Array(30).fill(0).map((_, i) => {
                const innerOffset = i * 0.1;
                // Height pulses chaotically matching a "voice recording"
                const h = 20 + Math.abs(Math.sin((frame * 0.2) + innerOffset) * 100) + Math.abs(Math.cos((frame * 0.5) + innerOffset) * 80);
                
                // Color flows from edges to center (the 3D cube)
                const distanceToCenter = Math.abs(15 - i);
                const opacity = 1 - (distanceToCenter / 15);
                
                // Smooth fade in/out using spring
                const entryScale = spring({ fps, frame, config: { damping: 12 }, delay: i * 2 });
                const exitScale = frame > 120 ? spring({ fps, frame: frame - 120, config: { damping: 12, mass: 0.5 } }) : 0;
                const scale = entryScale - exitScale;

                return (
                    <div key={i} style={{
                        width: '12px',
                        height: `${Math.max(4, h)}px`,
                        backgroundColor: '#C6FF2E',
                        opacity: opacity,
                        transform: `scaleY(${Math.max(0, scale)})`,
                        boxShadow: '0 0 20px rgba(198, 255, 46, 0.4)'
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};
