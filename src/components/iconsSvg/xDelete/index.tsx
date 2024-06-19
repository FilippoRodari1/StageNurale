
interface Props {
    color?: string;
    width?: number;
    height?: number;
  }
  
  
  const XDelete = ({color='#514689', width= 28, height = 28}: Props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <path
      stroke={color}
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M21 7 7 21M7 7l14 14"
    />
  </svg>
  )
  export default XDelete
  
  