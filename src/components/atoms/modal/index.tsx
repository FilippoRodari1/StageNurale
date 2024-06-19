import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    show: boolean;
    className: string;
}

const Modal = ({ children, show, className }: Props) => {
    return (
        <div
            style={{
                zIndex: 100000,
                display: show ? "block" : "none",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: "100vh",
                width: "100vw",
                background: "white"
            }}
        >
            <div
                className={`h-full w-full flex flex-col mr-auto ml-auto relative transform overflow-auto bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all ${className}`}
                
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
