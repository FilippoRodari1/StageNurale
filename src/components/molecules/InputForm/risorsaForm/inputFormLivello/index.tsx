import { useFormContext } from 'react-hook-form';
import { SkillResources } from '../../../../../store/skillResource/types';
import Label from '../../../../atoms/Label';


interface Props {
    title: string;
    name: string;
    type: "text" | "password" | "email" | "number" | "date";
    placeholder: string;
    password?: boolean;
    className?: string;
    value?: any;
    onChange?: any;
    skillsRisorse: SkillResources[];
}

const InputFormLivello = ({ title, name, className, skillsRisorse }: Props) => {
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
                        <option value="" disabled>Livello</option>
                        {skillsRisorse.length > 0 ? (
                            skillsRisorse.map((skillsRisorse) => (
                                <option key={skillsRisorse.id} value={skillsRisorse.level}>{skillsRisorse.level}</option>
                            ))
                        ) : (
                            <option value="" disabled>Nessun Livello disponibile</option>
                        )}
                    </select>

                
            </div>
            <div className='relative text-left h-5'>
                {error ? <p className="text-red-600 text-left">{error as string}</p> : <div />}
            </div>
        </div>
    );
};

export default InputFormLivello;
