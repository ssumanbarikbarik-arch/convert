'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const Adsense = () => {
  useEffect(() => {
    try {
      const adSlot = document.querySelector('.adsbygoogle');
      if (adSlot && adSlot.innerHTML.trim() === '') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div style={{ padding: '0' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-gk+h-16-4w+d9"
        data-ad-client="ca-pub-925757787123557"
        data-ad-slot="5987878098"
      ></ins>
    </div>
  );
};

export default Adsense;
