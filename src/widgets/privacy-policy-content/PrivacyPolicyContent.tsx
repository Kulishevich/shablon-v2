import React from 'react';
import s from './PrivacyPolicyContent.module.scss';

export const PrivacyPolicyContent = ({ content }: { content: string | null | undefined }) => {
  return (
    <div className={s.container}>
      <h1 className="h1" lang="ru">
        Политика конфиденциальности
      </h1>
      <div className={s.content}>
        <p className="body_2">{content}</p>
      </div>
    </div>
  );
};
