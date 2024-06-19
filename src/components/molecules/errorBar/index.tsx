import { useState } from 'react';

interface Props {
  errorMessage: string;
  errorDetails: string;
  onClose: () => void;
}

const ErrorBar = ({ errorMessage, errorDetails, onClose }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-yellow-500 text-white p-3 font-bold fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-center items-center w-full">
        <div className="flex-1 text-center">
          <span>{errorMessage}</span>
          <button onClick={toggleDetails} className="bg-none border-none text-white underline ml-2 cursor-pointer text-center">
            {showDetails ? 'Nascondi' : 'Visualizza'}
          </button>
          <button onClick={onClose} className="bg-none border-none text-white underline ml-2 cursor-pointer text-center">Nascondi</button>
        </div>
        <div className="flex items-center">
          <button onClick={onClose} className="bg-none border-none text-white cursor-pointer">X</button>
        </div>
      </div>
      {showDetails && (
        <div className="flex justify-center items-center w-full bg-yellow-200 p-3 mt-2 border-t border-yellow-600 text-black">
          {errorDetails}
        </div>
      )}
    </div>
  );
};

export default ErrorBar;
