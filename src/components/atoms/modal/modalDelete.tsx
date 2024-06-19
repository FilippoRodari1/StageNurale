import { ReactNode } from "react"

interface Props{
    children: ReactNode
    show: boolean
    onClick: () => void
    className: string;
}


const ModalDelete=({children, show}:Props)=>{

    return <div style={{
        zIndex: 100000,
        display: show ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100vh",
        width: "100vw",
        background: "rgba(0, 0, 0, 0.2)"
    }}>
       
       <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"> {children}</div>
       </div>
}

export default ModalDelete