import type { ReactNode } from "react";

interface ButtonProps {
    type: 'submit' | 'button' | 'reset';
    variant: 'primary' | 'secondary';
    handleClick?: () => void;
    children: ReactNode;
}

const Button = ({children, type='button', variant, handleClick}: ButtonProps) => {
    return (
        <button className={
            variant==='primary' ? 'w-full bg-emerald-600 py-4 text-lg font-bold text-white transition-colors hover:bg-emerald-700 active:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed' : 'w-full bg-emerald-600 py-4 text-lg font-bold text-white transition-colors hover:bg-emerald-700 active:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-60 disabled:cursor-not-allowed'
        } type={type} onClick={handleClick}>
            {children}
        </button>
    )
}

export default Button;
