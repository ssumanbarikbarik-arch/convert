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
    <div style={{ padding: '20px 0' }}>
      {/* 
                ** IMPORTANT **
                Paste your ad unit code from AdSense here.
                It will look something like this:

                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                    data-ad-slot="YYYYYYYYYY"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            */}

      {/* Example ad unit (replace with your own) */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-9257577871235579"
        data-ad-slot="YOUR_AD_SLOT_ID_HERE"
      ></ins>
    </div>
  );
};

export default Adsense;
