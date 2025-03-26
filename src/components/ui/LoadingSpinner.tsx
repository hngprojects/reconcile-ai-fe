import React from 'react';
import { cn } from '@/src/lib/utils'; // Ensure this utility is available in your project

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('animate-spin', className)}
  >
    <rect opacity="0.9" x="17.1719" y="13.4004" width="5.33333" height="13.3333" rx="2.66667" transform="rotate(135 17.1719 13.4004)" fill="#2E604A"/>
    <rect opacity="0.8" x="13.332" y="17.333" width="5.33333" height="13.3333" rx="2.66667" transform="rotate(90 13.332 17.333)" fill="#2E604A"/>
    <rect opacity="0.7" x="13.4023" y="22.8281" width="5.33333" height="13.3333" rx="2.66667" transform="rotate(45 13.4023 22.8281)" fill="#2E604A"/>
    <rect opacity="0.6" x="17.332" y="26.667" width="5.33333" height="13.3333" rx="2.66667" fill="#2E604A"/>
    <rect opacity="0.5" x="36.0312" y="32.2568" width="5.33333" height="13.3333" rx="2.66667" transform="rotate(135 36.0312 32.2568)" fill="#2E604A"/>
    <rect opacity="0.4" x="40" y="17.333" width="5.33333" height="13.3333" rx="2.66667" transform="rotate(90 40 17.333)" fill="#2E604A"/>
    <rect opacity="0.3" x="32.7617" y="3.33301" width="5.33333" height="13.3333" rx="2.66667" transform="rotate(45 32.7617 3.33301)" fill="#2E604A"/>
    <rect x="17.332" width="5.33333" height="13.3333" rx="2.66667" fill="#2E604A"/>
  </svg>
);

export default LoadingSpinner;
