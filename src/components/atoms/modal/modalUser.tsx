import { ReactNode } from "react"

interface Props {
    children?: ReactNode;
    show: boolean;
    onClick?: () => void;
    className?: string;
}

const ModalUser = ({ children, show }: Props) => {
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
            background: "rgba(0, 0, 0, 0.0)"
        }}>
            <div className="rounded-lg p-20 max-w-md h-16 mt-2 ml-auto text-black dark:text-white ">{children}</div>
        </div>
    );
}

export default ModalUser;



