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
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={{display:'none'}}>
      <div className="text-xs text-muted-foreground text-center mb-2">Advertisement</div>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block', textAlign: 'center', ...style }}
        data-ad-client="ca-pub-2897420441745530"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseSlot;
