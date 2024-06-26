import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Label from '../../atoms/Label';
import { Jobs } from '../../../store/commesse/types';

interface Props {
    title: string;
    name: string;
    type: "text" | "password" | "email" | "number" | "date";
    placeholder: string;
    password?: boolean;
    className?: string;
    value?: any;
    onChange?: any;
    jobs: Jobs[];
}

const InputFormCommesse = ({ title, name, placeholder, password = false, className, jobs }: Props) => {
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
                {password ? (
                    <input
                        {...(register ? register(name) : {})}
                        type={showPassword ? "text" : "password"}
                        placeholder={placeholder}
                        className={`appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400 rounded-l-[10px] rounded-r-[10px] rounded-md pl-2 ${className}`}
                    />
                ) : (
                    <select
                        {...(register ? register(name) : {})}
                        className={`appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400 rounded-l-[10px] rounded-r-[10px] rounded-md pl-2 ${className}`}
                        defaultValue=""
                    >
                        <option value="" disabled>Seleziona una commessa</option>
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <option key={job.id} value={job.code}>{job.code}</option>
                            ))
                        ) : (
                            <option value="" disabled>Nessuna commessa disponibile</option>
                        )}
                    </select>
                )}
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

export default InputFormCommesse;
