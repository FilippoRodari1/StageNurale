import React from 'react';

interface Props {
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className : string;
}

const Button = ({ type, children, onClick}: Props) => {
    return (
        <button className=" justify-center text-center w-80 h-12 gap-0 rounded-tl-10 border border-gray-400 rounded-l-[15px] rounded-r-[15px] rounded-md" type={type} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;