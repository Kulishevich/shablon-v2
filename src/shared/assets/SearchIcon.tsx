import { Ref, SVGProps, forwardRef, memo } from 'react';

const SearchIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width="26"
    height="26"
    ref={ref}
    {...props}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.1118 17.1287L22.75 22.75M19.5 11.375C19.5 15.8623 15.8623 19.5 11.375 19.5C6.88768 19.5 3.25 15.8623 3.25 11.375C3.25 6.88768 6.88768 3.25 11.375 3.25C15.8623 3.25 19.5 6.88768 19.5 11.375Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(SearchIcon);
const Memo = memo(ForwardRef);

export default Memo;
