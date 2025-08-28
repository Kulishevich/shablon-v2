import { Ref, SVGProps, forwardRef, memo } from 'react';

const ArrowDownIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width="24"
    height="24"
    ref={ref}
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.26848 7.82053C2.87796 8.21113 2.87796 8.84423 3.26848 9.23483L9.91295 15.8793C11.0842 17.0505 12.983 17.0509 14.1547 15.8801L20.7301 9.30973C21.1207 8.91923 21.1207 8.28603 20.7301 7.89553C20.3396 7.50503 19.7064 7.50503 19.3159 7.89553L12.7439 14.4676C12.3533 14.8581 11.7202 14.8581 11.3297 14.4676L4.6827 7.82053C4.29217 7.43003 3.65901 7.43003 3.26848 7.82053Z"
      fill="#25338C"
    />
  </svg>
);
const ForwardRef = forwardRef(ArrowDownIcon);
const Memo = memo(ForwardRef);

export default Memo;
