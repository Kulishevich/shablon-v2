import { Ref, SVGProps, forwardRef, memo } from 'react';

const HeartIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M18 11.542C15 4.50031 4.5 5.25031 4.5 14.2504C4.5 23.2503 18 30.7506 18 30.7506C18 30.7506 31.5 23.2503 31.5 14.2504C31.5 5.25031 21 4.50031 18 11.542Z"
      stroke="#111434"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(HeartIcon);
const Memo = memo(ForwardRef);

export default Memo;
