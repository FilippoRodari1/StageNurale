
interface Props {
    color?: string;
    width?: number;
    height?: number;
  }
  
  
  const Occhio = ({color='#514689', width= 18, height = 12}: Props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <path
      fill={color}
      fillOpacity={0.5}
      fillRule="evenodd"
      d="M17.77 6c0-.359-.194-.594-.582-1.066C15.768 3.21 12.636 0 9 0 5.364 0 2.232 3.21.812 4.934.424 5.406.23 5.641.23 6c0 .359.194.594.582 1.066C2.232 8.79 5.364 12 9 12c3.636 0 6.768-3.21 8.188-4.934.388-.472.582-.707.582-1.066ZM9 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      clipRule="evenodd"
    />
  </svg>
  )
  export default Occhio
  
  