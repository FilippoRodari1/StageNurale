
interface Props {
    color?: string;
    width?: number;
    height?: number;
  }
  
  
  const TickTrue = ({color='#fff', width= 28, height = 28}: Props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <path stroke={color} strokeWidth={3} d="m6.667 18.667 5.333 4L24 8" />
  </svg>
  )
  export default TickTrue
  
  