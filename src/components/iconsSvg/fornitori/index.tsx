
interface Props {
    color?: string;
    width?: number;
    height?: number;
}


const Fornitori = ({color='#041E42', width= 24, height = 24}: Props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <rect
      width={8}
      height={8}
      x={5}
      y={4}
      stroke={color}
      strokeWidth={2}
      rx={1.8}
    />
    <path
      stroke={color}
      strokeWidth={2}
      d="M4 13.8A1.8 1.8 0 0 1 5.8 12h4.4a1.8 1.8 0 0 1 1.8 1.8V20H5.8A1.8 1.8 0 0 1 4 18.2v-4.4ZM12 13.8a1.8 1.8 0 0 1 1.8-1.8h4.4a1.8 1.8 0 0 1 1.8 1.8v4.4a1.8 1.8 0 0 1-1.8 1.8H12v-6.2Z"
    />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2}
      d="M16 12v3M8 12v3M9 4v3"
    />
  </svg>
)
export default Fornitori