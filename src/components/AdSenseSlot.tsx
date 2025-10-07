import { useEffect, useRef } from 'react';

interface AdSenseSlotProps {
  adSlot: string;
  adFormat?: string;
  className?: string;
  style?: React.CSSProperties;
}

const AdSenseSlot = ({
  adSlot,
  adFormat = "auto",
  className = "",
  style = {}
}: AdSenseSlotProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ins = wrapperRef.current?.querySelector<HTMLDivElement>('ins.adsbygoogle');
    const alreadyLoaded = ins?.getAttribute('data-adsbygoogle-status') === 'done';

    if (alreadyLoaded) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adSlot, adFormat]);

  const adStyle: React.CSSProperties = {
    display: 'block',
    textAlign: 'center',
    ...style,
  };

  return (
    <div ref={wrapperRef} className={`adsense-container w-full ${className}`}>
      <div className="text-xs uppercase tracking-wide text-muted-foreground text-center mb-2">
        Advertisement
      </div>
      <ins
        className="adsbygoogle block mx-auto"
        style={adStyle}
        data-ad-client="ca-pub-2897420441745530"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        aria-label="Advertisement"
      />
    </div>
  );
};

export default AdSenseSlot;
