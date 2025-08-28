'use client';
import React from 'react';
import Lottie from 'lottie-react';

import animationData from '@/shared/assets/animations/phone-animation.json';
import s from './PhoneAnimationClient.module.scss';
import { FeedbackPopup } from '../../../widgets/feedback-popup/FeedbackPopup';

const PhoneAnimationClient = ({ image }: { image: string }) => {
  return (
    <FeedbackPopup image={image}>
      <div
        className={s.container}
        role="button"
        tabIndex={0}
        aria-label="Связаться с нами"
        aria-haspopup="dialog"
        aria-expanded={false}
      >
        <Lottie animationData={animationData} loop={true} className={s.phone} />
      </div>
    </FeedbackPopup>
  );
};

export default PhoneAnimationClient;
