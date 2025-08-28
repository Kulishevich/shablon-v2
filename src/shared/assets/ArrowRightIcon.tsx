import { Ref, SVGProps, forwardRef, memo } from "react";

const ArrowRightIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width="30"
    height="30"
    ref={ref}
    {...props}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.77551 4.08584C10.2638 3.59769 11.0551 3.59769 11.5434 4.08584L19.8489 12.3914C21.313 13.8555 21.3134 16.229 19.8499 17.6936L11.637 25.9129C11.1489 26.4011 10.3574 26.4011 9.86926 25.9129C9.38114 25.4248 9.38114 24.6333 9.86926 24.1451L18.0843 15.9301C18.5725 15.4419 18.5725 14.6505 18.0843 14.1624L9.77551 5.85361C9.28739 5.36545 9.28739 4.574 9.77551 4.08584Z"
      fill="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(ArrowRightIcon);
const Memo = memo(ForwardRef);

export default Memo;
