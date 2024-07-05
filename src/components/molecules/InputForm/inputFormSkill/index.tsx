import { useFormContext } from 'react-hook-form';
import Label from '../../../atoms/Label';
import { Skills } from '../../../../store/skill/types';

interface Props {
    title: string;
    name: string;
    type: "text" | "password" | "email" | "number" | "date";
    placeholder: string;
    password?: boolean;
    className?: string;
    value?: any;
    onChange?: any;
    skill: Skills[];
}

const InputFormSkill = ({ title, name, className, skill }: Props) => {
    const { register, formState } = useFormContext();
    const error = formState?.errors?.[name]?.message || '';


    return (
        <div>
            <Label title={title} />
            <div className='relative'>
                      <select
                        {...(register ? register(name) : {})}
                        className={`appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400 rounded-l-[10px] rounded-r-[10px] rounded-md pl-2 ${className}`}
                        defaultValue=""
                    >
                        <option value="" disabled>Skill</option>
                        {skill.length > 0 ? (
                            skill.map((skill) => (
                                <option key={skill.id} value={skill.name}>{skill.name}</option>
                            ))
                        ) : (
                            <option value="" disabled>Nessuna Skill disponibile</option>
                        )}
                    </select>

                
            </div>
            <div className='relative text-left h-5'>
                {error ? <p className="text-red-600 text-left">{error as string}</p> : <div />}
            </div>
        </div>
    );
};

export default InputFormSkill;
