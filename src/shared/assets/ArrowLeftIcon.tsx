import { Ref, SVGProps, forwardRef, memo } from "react";

const ArrowLeftIcon = (
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
      d="M20.2245 4.08584C19.7362 3.59769 18.9449 3.59769 18.4566 4.08584L10.1511 12.3914C8.68701 13.8555 8.68656 16.229 10.1501 17.6936L18.363 25.9129C18.8511 26.4011 19.6426 26.4011 20.1307 25.9129C20.6189 25.4248 20.6189 24.6333 20.1307 24.1451L11.9157 15.9301C11.4275 15.4419 11.4275 14.6505 11.9157 14.1624L20.2245 5.85361C20.7126 5.36545 20.7126 4.574 20.2245 4.08584Z"
      fill="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(ArrowLeftIcon);
const Memo = memo(ForwardRef);

export default Memo;
