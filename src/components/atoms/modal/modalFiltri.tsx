import { ReactNode } from "react"

interface Props {
    children?: ReactNode;
    show: boolean;
    onClick?: () => void;
    className?: string;
}

const ModalFiltri = ({ children, show }: Props) => {
    return (
        <div style={{
            zIndex: 100000,
            display: show ? "block" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100vh",
            width: "100vw",
            background: "rgba(0, 0, 0, 0.1)"
        }}>
            <div className="rounded-lg p-20 max-w-md h-56 mt-[-60px] ml-auto text-black dark:text-white ">{children}</div>
        </div>
    );
}

export default ModalFiltri;



