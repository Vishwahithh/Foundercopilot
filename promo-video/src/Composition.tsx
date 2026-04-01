import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, spring, Sequence } from 'remotion';
import { Scene3D } from './Scene3D';
import { Waveform } from './Waveform';
import { CardList } from './CardList';

export const PromoVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Background grid pattern opacity
    const gridOpacity = interpolate(frame, [0, 30], [0, 0.08], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: '#0A0A0B', overflow: 'hidden' }}>

            {/* Subtle animated grid background */}
            <AbsoluteFill style={{ opacity: gridOpacity }}>
                <div style={{
                    width: '100%', height: '100%',
                    backgroundImage: 'linear-gradient(rgba(198,255,46,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,46,0.15) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    transform: `translateY(${interpolate(frame, [0, 450], [0, -60])}px)`,
                }} />
            </AbsoluteFill>

            {/* The persistent glowing 3D cube */}
            <AbsoluteFill style={{ zIndex: 10 }}>
                <Scene3D />
            </AbsoluteFill>

            {/* Scene 1: Audio waveform feeds the cube */}
            <Sequence from={0} durationInFrames={150}>
                <Waveform />
            </Sequence>

            {/* Scene 3: Deploy testing cards fly out */}
            <Sequence from={300} durationInFrames={150}>
                <CardList />
            </Sequence>

            {/* Phase labels — monospaced system text */}
            <AbsoluteFill style={{ zIndex: 20, pointerEvents: 'none' }}>
                {/* Phase 1 label */}
                <div style={{
                    position: 'absolute', top: 60, left: 80,
                    fontFamily: "'Space Mono', monospace", fontSize: 14, textTransform: 'uppercase',
                    color: '#A8A29A', letterSpacing: '0.1em',
                    opacity: interpolate(frame, [0, 15, 140, 150], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
                }}>
                    [01] INGEST // AUDIO_FEED
                </div>

                {/* Phase 2 label */}
                <div style={{
                    position: 'absolute', top: 60, left: 80,
                    fontFamily: "'Space Mono', monospace", fontSize: 14, textTransform: 'uppercase',
                    color: '#C6FF2E', letterSpacing: '0.1em',
                    opacity: interpolate(frame, [150, 165, 290, 300], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
                }}>
                    [02] EXTRACT // SIGNAL_PARSE
                </div>

                {/* Phase 3 label */}
                <div style={{
                    position: 'absolute', top: 60, left: 80,
                    fontFamily: "'Space Mono', monospace", fontSize: 14, textTransform: 'uppercase',
                    color: '#FF5A36', letterSpacing: '0.1em',
                    opacity: interpolate(frame, [300, 315, 440, 450], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
                }}>
                    [03] DEPLOY // HYPOTHESIS_READY
                </div>

                {/* Big editorial title phases */}
                <h1 style={{
                    position: 'absolute', bottom: 120, right: 80,
                    fontFamily: "'Instrument Serif', serif", fontSize: 96, fontWeight: 400,
                    color: '#F5F1E8', letterSpacing: '-0.03em', lineHeight: 1, textAlign: 'right',
                    opacity: interpolate(frame, [10, 40, 120, 150], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
                    transform: `translateY(${interpolate(frame, [10, 40], [30, 0], { extrapolateRight: 'clamp' })}px)`,
                }}>
                    Ingest<br/><span style={{ color: '#C6FF2E' }}>Audio</span>
                </h1>

                <h1 style={{
                    position: 'absolute', bottom: 120, right: 80,
                    fontFamily: "'Instrument Serif', serif", fontSize: 96, fontWeight: 400,
                    color: '#F5F1E8', letterSpacing: '-0.03em', lineHeight: 1, textAlign: 'right',
                    opacity: interpolate(frame, [160, 190, 270, 300], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
                    transform: `translateY(${interpolate(frame, [160, 190], [30, 0], { extrapolateRight: 'clamp' })}px)`,
                }}>
                    Extract<br/><span style={{ color: '#C6FF2E' }}>Signal</span>
                </h1>

                <h1 style={{
                    position: 'absolute', bottom: 120, right: 80,
                    fontFamily: "'Instrument Serif', serif", fontSize: 96, fontWeight: 400,
                    color: '#F5F1E8', letterSpacing: '-0.03em', lineHeight: 1, textAlign: 'right',
                    opacity: interpolate(frame, [310, 340, 420, 450], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
                    transform: `translateY(${interpolate(frame, [310, 340], [30, 0], { extrapolateRight: 'clamp' })}px)`,
                }}>
                    Deploy<br/><span style={{ color: '#FF5A36' }}>Tests</span>
                </h1>

                {/* Bottom status bar */}
                <div style={{
                    position: 'absolute', bottom: 40, left: 80,
                    fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: 'uppercase',
                    color: '#A8A29A', letterSpacing: '0.08em',
                    display: 'flex', gap: 40,
                }}>
                    <span>FOUNDER COPILOT</span>
                    <span style={{ color: frame < 150 ? '#C6FF2E' : frame < 300 ? '#C6FF2E' : '#FF5A36' }}>
                        {frame < 150 ? '● LISTENING…' : frame < 300 ? '● PARSING…' : '● DEPLOYING…'}
                    </span>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
