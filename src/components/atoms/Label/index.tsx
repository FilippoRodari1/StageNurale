
interface Props {
    title: string;
}

const Label = ({ title }: Props) => <div className='font-lato text-20 font-bold leading-24 text-left'>{title}</div>;

export default Label;
