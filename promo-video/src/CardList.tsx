import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring } from 'remotion';

export const CardList: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const cards = [
        { label: 'LINKEDIN_STORY', color: '#37F0FF', text: 'Original: "Fastest toolkit"\nTest: "Deploy without touching AWS"' },
        { label: 'REDDIT_PAIN', color: '#C6FF2E', text: 'Notes are a mess? Found a workflow that doesn\'t involve hoarding text.' },
        { label: 'EMAIL_OBJECTION', color: '#FF5A36', text: 'Notice how your sales calls never end up driving marketing? Not anymore.' }
    ];

    return (
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '32px', opacity: 0.15 }}>
            {cards.map((c, i) => {
                // Spring physics for popping out of the center cube
                const delayedFrame = Math.max(0, frame - (i * 15));
                const s = spring({ fps, frame: delayedFrame, config: { damping: 14 } });
                const slideUp = spring({ fps, frame: delayedFrame, config: { damping: 16 } }) * 100;

                return (
                    <div key={i} style={{
                        width: '320px',
                        height: '240px',
                        backgroundColor: '#151518',
                        border: `1px solid ${c.color}`,
                        padding: '24px',
                        opacity: s,
                        transform: `scale(${s}) translateY(${100 - slideUp}px)`,
                        boxShadow: `0 20px 40px rgba(0,0,0,0.5)`,
                        fontFamily: 'monospace'
                    }}>
                        <div style={{
                            display: 'inline-block', padding: '4px 8px', 
                            backgroundColor: `${c.color}22`, color: c.color, 
                            fontSize: '12px', marginBottom: '24px', fontWeight: 'bold'
                        }}>
                            {c.label}
                        </div>
                        <p style={{
                            color: '#F5F1E8', fontSize: '18px', lineHeight: 1.5, 
                            fontFamily: 'sans-serif', margin: 0, fontStyle: 'italic',
                            borderLeft: `2px solid ${c.color}`, paddingLeft: '16px'
                        }}>
                            {c.text}
                        </p>
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
