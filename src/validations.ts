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
    code: z.string(),
    operationDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    supplierId: z.number().int(),
    typeOfPaymentId: z.number().int(),
    state: z.string(),
    note: z.string().optional(),
    netValue: z.number(),
    vatValue: z.number(),
    grossValue: z.number(),
});


export const validationsSchemaCommesse = z.object({
    code: z.string().min(1, { message: "Code must be longer than or equal to 1 character" }),
    description: z.string().min(1, { message: "Description must be longer than or equal to 1 character" }),
    customerId: z.number({ invalid_type_error: "Customer ID must be a number" }).positive("Customer ID must be a positive number"),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Start date must be a valid ISO 8601 date string" }),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "End date must be a valid ISO 8601 date string" }),
    estimatedCost: z.number({ invalid_type_error: "Estimated cost must be a number" }).positive("Estimated cost must be a positive number"),
    estimatedRevenue: z.number({ invalid_type_error: "Estimated revenue must be a number" }).positive("Estimated revenue must be a positive number"),
    note: z.string().optional(),
    jobType: z.string().min(1, { message: "Code must be longer than or equal to 1 character" }),
    state: z.string().min(1, { message: "Code must be longer than or equal to 1 character" }),
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