import { Ref, SVGProps, forwardRef, memo } from 'react';

const TimeIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M16 10.666V15.9993L20 19.9993"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
  </svg>
);
const ForwardRef = forwardRef(TimeIcon);
const Memo = memo(ForwardRef);

export default Memo;
