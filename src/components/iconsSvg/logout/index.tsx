interface Props {
    color?: string;
    width?: number;
    height?: number;
}


const Logout = ({color='#041E42', width= 20, height = 20}: Props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <path
      fill={color}
      d="m1.5 9-.78-.625L.22 9l.5.625L1.5 9Zm6.75 1a1 1 0 0 0 0-2v2ZM3.72 4.625l-3 3.75 1.56 1.25 3-3.75-1.56-1.25Zm-3 5 3 3.75 1.56-1.25-3-3.75-1.56 1.25ZM1.5 10h6.75V8H1.5v2Z"
    />
    <path
      stroke="#041E42"
      strokeWidth={2}
      d="M7.5 6.099v-.146c0-1.195 0-1.793.266-2.256a2 2 0 0 1 .465-.549c.413-.339 1.003-.437 2.181-.633 2.389-.398 3.583-.598 4.472-.135a3 3 0 0 1 1.014.859c.602.8.602 2.011.602 4.433v2.656c0 2.422 0 3.633-.602 4.433a3 3 0 0 1-1.014.86c-.889.461-2.084.262-4.473-.136-1.177-.196-1.766-.294-2.178-.632a2.002 2.002 0 0 1-.468-.551c-.265-.463-.265-1.06-.265-2.252"
    />
  </svg>
)
export default Logout