import { useFormContext } from 'react-hook-form';
import { Customers } from '../../../../../store/customers/types';
import Label from '../../../../atoms/Label';


interface Props {
    customers: Customers[];
    title: string;
    name: string;
    type: "text" | "password" | "email" | "number" | "date";
    placeholder: string;
    password?: boolean;
    className?: string;
    value?: any;
    onChange?: any;

}

const InputFormTipoDiPagamento = ({ title, name, customers, className }: Props) => {
    const { register, formState } = useFormContext();
    const error = formState.errors?.[name]?.message || '';

    return (
        <div>
            <Label title={title} />
            <div className='relative'>
                <select
                    {...register(name)}
                    className={`appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400 rounded-md pl-2 ${className}`}
                >
                    <option value="" disabled selected>Tipo di pagamento</option>
                    {customers.map((customers) => (
                        <option key={customers.id} value={customers.typeOfPayment.name}>
                            {customers.typeOfPayment.name}
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

export default InputFormTipoDiPagamento;
