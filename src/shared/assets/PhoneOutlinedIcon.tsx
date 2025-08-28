import { Ref, SVGProps, forwardRef, memo } from 'react';

const PhoneOutlinedIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width="22"
    height="22"
    ref={ref}
    {...props}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.51744 14.4827C1.19428 8.15886 2.09342 5.26305 2.76 4.32989C2.84562 4.17906 4.95626 1.01955 7.2187 2.87322C12.8344 7.49815 5.95866 7.33366 10.4406 11.5607C14.9226 15.7877 14.5033 9.16695 19.1274 14.7815C20.9812 17.0448 17.8215 19.1554 17.6716 19.2401C16.7385 19.9076 13.8415 20.8066 7.51744 14.4827Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(PhoneOutlinedIcon);
const Memo = memo(ForwardRef);

export default Memo;
