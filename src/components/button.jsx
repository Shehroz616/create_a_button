import { cn } from '@/lib/utils';
import React from 'react';

const Button = ({ imgSrc, className, dark = false, ...props }) => {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden',
        className
      )}
      {...props}
    >
      <img
        src={
          dark
            ? '/pin-vector.png'
            : '/pin-vector.png'
        }
        className='pointer-events-none z-50 select-none'
        alt='phone image'
      />

      <div className='absolute rounded-full overflow-hidden -z-10 inset-0'>
        <img
          className='object-cover object-center rounded-full min-w-full h-full'
          src={imgSrc}
          alt='overlaying phone image'
        />
      </div>
    </div>
  );
};

export default Button;