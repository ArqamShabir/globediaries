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
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <div className="text-xs text-muted-foreground text-center mb-2">Advertisement</div>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block', textAlign: 'center', ...style }}
        data-ad-client="ca-pub-xxxxxxxxxx" // Replace with your AdSense client ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseSlot;