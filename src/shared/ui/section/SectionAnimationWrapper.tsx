'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Props {
  children: ReactNode;
}

function SectionAnimationWrapper({ children }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

export default SectionAnimationWrapper;
