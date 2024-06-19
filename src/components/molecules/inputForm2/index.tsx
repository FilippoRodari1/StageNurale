import { useState } from 'react';
import Label from '../../atoms/Label';
import { useFormContext } from 'react-hook-form';

interface Props {
    title: string;
    name: string;
    type: "text" | "password" | "email" | "number";
    placeholder: string;
    password?: boolean;
    onChange?: any
    className?: string;
}

const InputForm2 = ({ title, name, password = false, type, placeholder}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, formState } = useFormContext();
    const error = formState?.errors?.[name]?.message || '';

    const handleClickPasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Label title={title} />
            <div className='relative'>
                <input 
                    {...register(name)}
                    type={password && showPassword ? "text" : type} 
                    placeholder={placeholder} 
                    className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400 rounded-l-[10px] rounded-r-[10px] rounded-md pl-2"
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
