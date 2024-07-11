import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import InputFormCommesse from "../../components/molecules/InputForm/inputFormCommesse";
import InputFormOrdine from "../../components/molecules/InputForm/inputFormOrdine";
import Navbar from "../../components/molecules/navBar";
import { fetchCommesse, fetchOrders, getCommessaData, getOrdersData, useAppDispatch } from "../../store";

const InserimentoVeloce = () => {
    const dispatch = useAppDispatch();

    const orders = useSelector(getOrdersData);
    const jobs = useSelector(getCommessaData);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCommesse());
    }, [dispatch]);

    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <div className="">
                <Navbar name="Inserimento Rapido" />
                <div className="h-full w-full">
                    <div className="h-full flex flex-col">
                        <div className="flex flex-col md:flex-row mt-[50px]">
                            <div className="ml-4 md:w-full">
                                <InputFormCommesse
                                    title="Commesse"
                                    name="jobs"
                                    type="text"
                                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black  border-gray-600"
                                    jobs={jobs}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-[5px]">
                            <div className="ml-4 md:w-full">
                                <InputFormOrdine
                                    title="Ordini"
                                    name="orders"
                                    type="number"
                                    placeholder="Ordini"
                                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  text-black border-gray-600"
                                    orders={orders}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default InserimentoVeloce;
