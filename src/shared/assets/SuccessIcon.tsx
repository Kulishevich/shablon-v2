import { Ref, SVGProps, forwardRef, memo } from 'react';

const SuccessIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width="32"
    height="32"
    ref={ref}
    {...props}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.9993 29.3334C23.3631 29.3334 29.3327 23.3639 29.3327 16.0001C29.3327 8.63628 23.3631 2.66675 15.9993 2.66675C8.63555 2.66675 2.66602 8.63628 2.66602 16.0001C2.66602 23.3639 8.63555 29.3334 15.9993 29.3334Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M11.334 16.6667L14.0007 19.3334L20.6673 12.6667"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(SuccessIcon);
const Memo = memo(ForwardRef);

export default Memo;
