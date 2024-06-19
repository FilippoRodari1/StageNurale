import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    placeholders: string;
}

const Input = ({ placeholders, ...rest }: Props) => {
    return (
        <input
            className="w-80 h-12 border border-gray-400 rounded-l-[15px] rounded-r-[15px] rounded-md pl-2"
            placeholder={placeholders}
            {...rest}
        />
    );
};

export default Input;
