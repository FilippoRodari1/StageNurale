
import { useSelector } from "react-redux";
import { setCounter, RootState, useAppDispatch } from "../../store";
import { setChange } from "../../store/light/action";

import lampadinaAccesa from "../../img/lampadinaAccesa.png";
import lampadinaSpenta from "../../img/lampadinaSpenta.png";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const counter = useSelector((state: RootState) => state.counter);
  const change = useSelector((state: RootState) => state.light.change);

  const handleClick = () => {
    dispatch(setCounter(counter + 1));
  };

  const handleChange = () => {
    dispatch(setChange(!change));
  };


  return (
    <div className="justify-center text-center text-2xl">
      <div className="justify-center text-center text-2xl">
        <div className=" flex flex-col items-center top-4">
          {change ? (
            <img src={lampadinaAccesa} alt="Lampadina Accesa" className=" w-28 h-28" />
          ) : (
          <img src={lampadinaSpenta} alt="Lampadina Spenta" className=" w-28 h-28 " />
          )}   
          <button className={`px-4 py-2 rounded-full mb-6 ${ change ? "bg-yellow-300" : "bg-black"} text-white`} onClick={handleChange}>
            Interruttore {change}
          </button>
        </div>
      </div>
      <button onClick={handleClick}>Counter {counter}</button>
    </div>
  );
};

export default HomePage;