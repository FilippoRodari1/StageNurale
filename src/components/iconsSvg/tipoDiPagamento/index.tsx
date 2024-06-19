
interface Props {
    color?: string;
    width?: number;
    height?: number;
  }
  
  
  const TipoDiPagamento = ({color='#041E42', width= 24, height = 24}: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
    >
        <rect
        width={18}
        height={13}
        x={3}
        y={6}
        stroke={color}
        strokeWidth={2}
        rx={2}
        />
        <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={2}
        d="M7 15h.01M4 11h17"
        />
    </svg>
  )
  export default TipoDiPagamento
  
  