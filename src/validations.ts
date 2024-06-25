import { z } from "zod";

export const validationsSchema = z.object({
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

export const validationsSchemaFatturaAcquisto = z.object({
    data: z.string().min(1,{ message: "Data is required" }),
    operationDate: z.string().min(1,{ message: "Date is required" }),
    supplierId: z.string().min(1,{ message: "supplier is required" }),
    typeOfPaymentId: z.string().min(1,{ message: "tipo di pagamento is required" }),
    state: z.string().min(1,{ message: "Stato is required" }),
    note: z.string().min(1,{ message: "Note is required" }),
    vatValue: z.string().min(1,{ message: "vatValue is required" }),
    netValue: z.string().min(1,{ message: "netValue is required" }),
    grossValue: z.string().min(1,{ message: "grossValue is required" }),

});

export const validationsSchemaCommesse = z.object({
    code: z.string().min(1,{ message: "Code is required" }),
    description: z.string().min(1,{ message: "Descrizione is required" }),
    customerId: z.string().min(1,{ message: "Customer is required" }),
    startDate: z.string().min(1,{ message: "startDate is required" }),
    endDate: z.string().min(1,{ message: "endDate is required" }),
    estimatedCost: z.string().min(1,{ message: "estimatedCost is required" }),
    estimatedRevenue: z.string().min(1,{ message: "estimatedRevenue is required" }),
    note: z.string().min(1,{ message: "note is required" }),
    jobType: z.string().min(1,{ message: "jobType is required" }),
    state: z.string().min(1,{ message: "State is required" }),

});

export const validationsSchemaActivities= z.object({
    jobId: z.string().min(1,{ message: "commessa is required" }),
    orderId: z.string().min(1,{ message: "order is required" }),
    resourceId: z.string().min(1,{ message: "risorsa is required" }),
    startDate: z.string().min(1,{ message: "startDate is required" }),
    endDate: z.string().min(1,{ message: "endDate is required" }),
    workerdHours: z.string().min(1,{ message: "workerdHours is required" }),
    state: z.string().min(1,{ message: "State is required" }),
    note: z.string().min(1,{ message: "Note is required" }),
});

export const validationsSchemaOrders= z.object({
    code: z.string().min(1,{ message: "Code is required" }),
    description: z.string().min(1,{ message: "Descrizione is required" }),
    orderType: z.string().min(1,{ message: "tipo di ordine is required" }),
    startDate: z.string().min(1,{ message: "startDate is required" }),
    endDate: z.string().min(1,{ message: "endDate is required" }),
    fixedCost: z.string().min(1,{ message: "costo fisso is required" }),
    resourceId: z.string().min(1,{ message: "resource is required" }),
    note: z.string().min(1,{ message: "note is required" }),
    hoursAllocatedPerDay: z.string().min(1,{ message: "hoursAllocatedPerDay is required" }),
    hourRevenue: z.string().min(1,{ message: "hourRevenue is required" }),
    hourCost: z.string().min(1,{ message: "hourCost is required" }),
    supplierId: z.string().min(1,{ message: "fornitore is required" }),
});

export const validationsSchemaSuppliers= z.object({
    name: z.string().min(1,{message: "campo vuoto"}).min(5, { message: "troppo corto" }).max(15, { message: "troppo lungo" }),
    typeOfPaymentId: z.string().min(1,{message: "campo vuoto"}).min(5, { message: "troppo corto" }).max(15, { message: "troppo lungo" }),
    note: z.string().min(1,{message: "campo vuoto"}).min(5, { message: "troppo corto" }).max(15, { message: "troppo lungo" }),
});