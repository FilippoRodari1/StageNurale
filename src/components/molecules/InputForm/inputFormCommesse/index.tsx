import { useFormContext } from 'react-hook-form';

import { Jobs } from '../../../../store/commesse/types';
import Label from '../../../atoms/Label';

interface Props {
    title: string;
    name: string;
    jobs: Jobs[];
    className?: string;
}

const InputFormCommesse = ({ title, name, jobs, className }: Props) => {
    const { register, formState } = useFormContext() || {};
    const error = formState?.errors?.[name]?.message || '';

    return (
        <div>
            <Label title={title} />
            <div className='relative'>
                <select 
                    {...(register ? register(name) : {})}
                    className={`appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400 rounded-l-[10px] rounded-r-[10px] rounded-md pl-2 ${className}`}
                >
                    <option value="" disabled selected>Commessa</option>
                    {jobs.map((job) => (
                        <option key={job.id} value={job.code}>
                            {job.code}
                        </option>
                    ))}
                </select>
            </div>
            <div className='relative text-left h-5'>
                {error ? <p className="text-red-600 text-left">{error as string}</p> : <div />}
            </div>
        </div>
    );
};

export default InputFormCommesse;
