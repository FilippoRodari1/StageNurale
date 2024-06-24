
interface Props {
    color?: string;
    width?: number;
    height?: number;
  }
  
  
  const Timesheet = ({color='#514689', width= 24, height = 24}: Props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    color = {color}
  >
    <circle cx={12} cy={12} r={9} stroke="#041E42" strokeWidth={2} />
    <path
      stroke="#041E42"
      strokeLinecap="round"
      strokeWidth={2}
      d="M16.5 12h-4.25a.25.25 0 0 1-.25-.25V8.5"
    />
  </svg>
  )
  export default Timesheet
