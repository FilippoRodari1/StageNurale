import { useFormContext } from 'react-hook-form';
import Label from '../../../atoms/Label';
import { Orders } from '../../../../store/orders/types';

interface Props {
    orders: Orders[];
    title: string;
    name: string;
    type: "text" | "password" | "email" | "number" | "date";
    placeholder: string;
    password?: boolean;
    className?: string;
    value?: any;
    onChange?: any;

}

const InputFormOrdine = ({ title, name, orders, className }: Props) => {
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
                    <option value="" disabled selected>Cliente</option>
                    {orders.map((orders) => (
                        <option key={orders.id} value={orders.code}>
                            {orders.code}
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

export default InputFormOrdine;
