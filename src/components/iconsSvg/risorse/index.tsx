
interface Props {
  color?: string;
  width?: number;
  height?: number;
}


const Risorse = ({color='#041E42F', width= 24, height = 24}: Props) => (
<svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <path
      stroke={color}
      strokeWidth={2}
      d="M9 6a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM4.438 13.902a3 3 0 1 0 3 5.195 3 3 0 0 0-3-5.196ZM19.562 13.902a2.999 2.999 0 1 1-2.998 5.194 2.999 2.999 0 0 1 2.998-5.194Z"
    />
    <path
      fill="#041E42"
      fillRule="evenodd"
      d="M9.07 6.643a3 3 0 0 1 .42-2.286 9 9 0 0 0-6.23 10.79 3 3 0 0 1 1.77-1.506 6.998 6.998 0 0 1 4.04-6.998Zm5.86 0a7 7 0 0 1 4.04 6.998 3 3 0 0 1 1.77 1.507 9.002 9.002 0 0 0-6.23-10.79 3.002 3.002 0 0 1 .42 2.285Zm3.3 12.852a3.005 3.005 0 0 1-2.19-.779 7 7 0 0 1-8.08 0 3.004 3.004 0 0 1-2.19.78 9 9 0 0 0 12.46 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Risorse

