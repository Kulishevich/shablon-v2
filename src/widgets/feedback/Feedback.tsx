import React from 'react';
import s from './Feedback.module.scss';
import { FeedbackForm } from '../../entities/feedback-form';
import { getSetting } from '@/shared/api/design/getSetting';
import { FeedbackImage } from '@/entities/feedback-image';

export const Feedback = async ({ variant }: { variant?: string }) => {
  const setting = await getSetting({ variant });

  return (
    <div className={s.container}>
      <FeedbackImage image={setting?.feedback_image || ''} variant={variant} />
      <FeedbackForm variant={variant} />
    </div>
  );
};
