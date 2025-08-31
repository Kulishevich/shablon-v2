import { Ref, SVGProps, forwardRef, memo } from 'react';

const LocationArrowIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M4.91601 11.0484C3.67625 10.6073 3.05636 10.3867 2.87167 10.0522C2.71162 9.76223 2.70413 9.41216 2.85164 9.11569C3.02187 8.77354 3.63177 8.52668 4.85155 8.03296L16.349 3.37924C17.5503 2.89298 18.151 2.64985 18.5305 2.77451C18.8598 2.88271 19.1181 3.14104 19.2264 3.47042C19.3511 3.84989 19.1079 4.45056 18.6217 5.65191L13.9679 17.1493C13.4742 18.3691 13.2274 18.979 12.8852 19.1493C12.5887 19.2968 12.2386 19.2892 11.9487 19.1292C11.6142 18.9445 11.3936 18.3246 10.9525 17.0848L9.60185 13.2891C9.51605 13.0479 9.47315 12.9273 9.40302 12.8266C9.34097 12.7374 9.26351 12.6599 9.17422 12.5978C9.07354 12.5277 8.95293 12.4848 8.71174 12.399L4.91601 11.0484Z"
      stroke="currentColor"
      strokeWidth="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(LocationArrowIcon);
const Memo = memo(ForwardRef);

export default Memo;
