
interface Props {
    color?: string;
    width?: number;
    height?: number;
  }
  
  
  const User = ({color='#514689', width= 40, height = 40}: Props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 40 40"
    >
      <ellipse
        cx="20"
        cy="16.667"
        stroke={color}
        strokeLinecap="round"
        strokeOpacity="0.7"
        strokeWidth="3"
        rx="5"
        ry="5"
      ></ellipse>
      <circle
        cx="20"
        cy="20"
        r="15"
        stroke="#514689"
        strokeOpacity="0.7"
        strokeWidth="3"
      ></circle>
      <path
        fill="#514689"
        fillOpacity="0.7"
        d="M29.634 31.377a.477.477 0 00.223-.592c-.643-1.61-1.881-3.03-3.555-4.063C24.494 25.605 22.28 25 20 25s-4.494.605-6.302 1.722c-1.674 1.034-2.912 2.452-3.555 4.063-.09.224.01.476.223.592a20.019 20.019 0 0019.268 0z"
      ></path>
    </svg>
  )
  export default User
