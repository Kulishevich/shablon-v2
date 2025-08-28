'use client';

import dynamic from 'next/dynamic';

const PhoneAnimation = dynamic(() => import('./PhoneAnimationClient'), {
  ssr: false,
});

export default PhoneAnimation;
