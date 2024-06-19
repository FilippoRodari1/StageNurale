import { z } from "zod";

const validationsSchema = z.object({
    name: z.string().min(1,{message: "campo vuoto"}).min(5, { message: "troppo corto" }).max(15, { message: "troppo lungo" }),
    typeOfPaymentId: z.string().min(1,{message: "campo vuoto"}).min(5, { message: "troppo corto" }).max(15, { message: "troppo lungo" }),
    note: z.string().min(1,{message: "campo vuoto"}).min(5, { message: "troppo corto" }).max(15, { message: "troppo lungo" }),
});


export const validationsSchemaResource = z.object({
    firstName: z.string().min(1,{ message: "Nome is required" }),
    lastName: z.string().min(1,{ message: "Cognome is required" }),
    hourCost: z.number().min(0,{ message: "Costo Or. must be non-negative" }),
    hourRevenue: z.number().min(0,{ message: "Ricavo Or. must be non-negative" }),
    curriculumVitae: z.string().min(0,{ message: "CV is required" }),
    supplierId: z.number().min(1,{ message: "Supplier ID must be non-negative" }),
    note: z.string().optional(),
});


export default validationsSchema