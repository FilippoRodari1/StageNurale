import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Label from '../../atoms/Label';

interface Props {
    title: string;
    name: string;
    type: "text" | "password" | "email" | "number" | "date";
    placeholder: string;
    password?: boolean;
    className?: string;
    value?: any;
    onChange?: any
}

const InputForm2 = ({ title, name, password = false, type, placeholder, className }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, formState } = useFormContext() || {};
    const error = formState?.errors?.[name]?.message || '';

    const handleClickPasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Label title={title} />
            <div className='relative'>
                <input 
                    {...(register ? register(name) : {})}
                    type={password && showPassword ? "text" : type} 
                    placeholder={placeholder} 
                    className={`appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400 rounded-l-[10px] rounded-r-[10px] rounded-md pl-2 ${className}`}
                /> 
                {password && (
                    <div 
                        onClick={handleClickPasswordVisibility} 
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </div>
                )}
            </div>
            <div className='relative text-left h-5'>
                {error ? <p className="text-red-600 text-left">{error as string}</p> : <div />}
            </div>
        </div>
    );
};

export default InputForm2;
