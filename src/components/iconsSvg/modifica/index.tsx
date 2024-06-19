
interface Props {
    color?: string;
    width?: number;
    height?: number;
  }
  
  
  const Modifica = ({color='#514689', width= 17, height = 17}: Props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <mask
      id="a"
      width={width}
      height={height}
      x={0}
      y={0}
      fill="#000"
      maskUnits="userSpaceOnUse"
    >
      <path fill="#fff" d="M0 0h17v17H0z" />
      <path d="m10.586 3.414-7.194 7.194c-.195.195-.292.292-.36.41-.066.119-.1.252-.166.52l-.664 2.653c-.09.362-.135.542-.035.642.1.1.28.055.641-.035l2.655-.664c.267-.066.4-.1.518-.167.119-.067.216-.164.41-.359l7.195-7.194c.666-.666 1-1 1-1.414 0-.414-.334-.748-1-1.414l-.172-.172c-.666-.666-1-1-1.414-1-.414 0-.748.334-1.414 1Z" />
    </mask>
    <path
      fill={color}
      fillOpacity={0.5}
      d="m3.392 10.608 1.414 1.415-1.414-1.415Zm7.194-7.194L9.172 2l1.414 1.414Zm2.828 0L12 4.828l1.414-1.414Zm.172.172L15 2.172l-1.414 1.414Zm0 2.828L15 7.828l-1.414-1.414Zm-7.194 7.194-1.415-1.414 1.415 1.414Zm-3.526-2.07 1.94.485-1.94-.486Zm-.664 2.653-1.94-.485 1.94.486Zm.606.607-.485-1.94-.087.021-.085.03.657 1.889Zm2.655-.664-.485-1.94.485 1.94Zm-3.296.7 1.414-1.415-1.414 1.414Zm.641-.036.486 1.94.087-.022.084-.03-.657-1.888Zm3.173-.83-.985-1.741.985 1.74Zm7.605-7.554L15 7.828l-1.414-1.414ZM3.033 11.02l-1.74-.986 1.74.986Zm1.773 1.004L12 4.828 9.172 2 1.977 9.194l2.829 2.829ZM12 4.828l.172.172L15 2.172 14.828 2 12 4.828Zm.172.172-7.195 7.194 2.829 2.829L15 7.828 12.172 5ZM.925 11.052l-.663 2.655 3.88.97.664-2.654-3.88-.97Zm2.369 5.686 2.654-.663-.97-3.88-2.655.663.97 3.88ZM.262 13.707c-.029.115-.111.423-.14.708-.03.311-.057 1.145.63 1.832l2.829-2.828c.266.266.418.582.485.874.06.255.044.45.038.512-.007.067-.016.099-.007.058.008-.038.02-.088.045-.186l-3.88-.97Zm1.89-.798 1.313 3.778-1.314-3.778Zm.171-.051a8.446 8.446 0 0 1-.186.045c-.041.01-.01 0 .058-.007.062-.006.257-.021.512.038.293.067.608.22.874.485L.753 16.247c.687.688 1.52.66 1.831.63.286-.028.594-.11.71-.139l-.97-3.88Zm2.655-.664-.066.065a7.228 7.228 0 0 1-.088.087l-.003.002.003-.002.009-.008a.91.91 0 0 1 .093-.068c.022-.015.045-.03.07-.043l1.97 3.48c.41-.231.72-.565.84-.684l-2.829-2.829Zm.97 3.88c.164-.04.61-.135 1.019-.366l-1.97-3.481a1.251 1.251 0 0 1 .178-.083l.011-.004a.682.682 0 0 1-.052.014l-.067.018-.09.022.97 3.88ZM12.172 5c.171.172.298.298.402.408.105.11.152.167.172.193.018.024-.023-.025-.069-.133A1.23 1.23 0 0 1 12.586 5h4c0-.82-.358-1.43-.66-1.826-.267-.35-.633-.71-.926-1.002L12.172 5ZM15 7.828 12.172 5 15 7.828Zm0 0c.293-.293.659-.652.926-1.002.302-.397.66-1.006.66-1.826h-4c0-.181.04-.343.091-.468.046-.108.087-.157.069-.133a2.62 2.62 0 0 1-.172.193c-.104.11-.23.236-.402.408L15 7.828Zm-3-3c.172-.171.298-.298.408-.402.11-.105.167-.152.193-.172.024-.018-.025.023-.133.069a1.231 1.231 0 0 1-.468.091v-4c-.82 0-1.43.358-1.826.66-.35.267-.71.633-1.002.926L12 4.828ZM14.828 2c-.293-.293-.652-.659-1.002-.926C13.429.772 12.82.414 12 .414v4c-.181 0-.343-.04-.468-.091-.108-.046-.157-.087-.133-.069.026.02.083.067.193.172.11.104.236.23.408.402L14.828 2ZM1.978 9.194c-.12.12-.454.43-.686.84l3.481 1.97a1.247 1.247 0 0 1-.111.163l-.008.01-.002.002.002-.003.008-.008a2.184 2.184 0 0 1 .079-.08l.065-.065-2.829-2.829Zm2.828 2.829a48.898 48.898 0 0 1 .05-.2l.004-.01a.26.26 0 0 1-.004.012.887.887 0 0 1-.045.106 1.213 1.213 0 0 1-.038.073l-3.48-1.97c-.232.408-.327.854-.368 1.018l3.88.97Z"
      mask="url(#a)"
    />
  </svg>
  )
  export default Modifica
  
  