import { z } from "zod";

const genericString = z.string().min(1, { message: "Campo vuoto" }).max(255, { message: "Troppo lungo" });

export const validationsSchema = z.object({
    name: genericString.min(5, { message: "Troppo corto" }),
    typeOfPaymentId: genericString,
    note: genericString,
});

export const validationsSchemaResource = z.object({
    firstName: z.string().min(1, { message: "Nome is required" }),
    lastName: z.string().min(1, { message: "Cognome is required" }),
    hourCost: z.number().min(0, { message: "Costo Or. must be non-negative" }),
    hourRevenue: z.number().min(0, { message: "Ricavo Or. must be non-negative" }),
    curriculumVitae: z.string().min(0, { message: "CV is required" }).optional(),
    supplierId: z.number().min(1, { message: "Supplier ID must be non-negative" }),
    note: genericString,
});

export const validationSchemaSkillResource = z.object({
    id: z.number().min(1, { message: "Nome is required" }),
    level: z.number().min(1, { message: "Cognome is required" }),
    resourceId: z.string().min(0, { message: "Costo Or. must be non-negative" }).optional(),
    skillId: z.number().min(0, { message: "Ricavo Or. must be non-negative" }),
    note: genericString,
});

export const validationsSchemaFatturaAcquisto = z.object({
    code: genericString,
    operationDate: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
    supplierId: z.number().int(),
    typeOfPaymentId: z.number().int(),
    state: genericString,
    note: genericString,
    netValue: z.number(),
    vatValue: z.number(),
    grossValue: z.number(),
});

export const validationSchemaFatturaAcquistoAttivita = z.object({
    id: z.number(),
    activity: genericString,
    purchasesInvoiceId: z.number(),
    orderId: z.number(),
    jobId: z.number(),
    resourceId: z.number(),
    quantity: z.number(),
    value: z.number(),
});

export const validationsSchemaFattureVendita = z.object({
    code: genericString,
    date: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
    customerId: z.number().int(),
    typeOfPaymentId: z.number().int(),
    state: genericString,
    note: genericString,
    netValue: z.number(),
    vatValue: z.number(),
    grossValue: z.number(),
});

export const validationsSchemaCommesse = z.object({
    code: genericString.min(1, { message: "Code must be longer than or equal to 1 character" }),
    description: genericString.min(1, { message: "Description must be longer than or equal to 1 character" }),
    customerId: z.number({ invalid_type_error: "Customer ID must be a number" }).positive("Customer ID must be a positive number"),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Start date must be a valid ISO 8601 date string" }),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "End date must be a valid ISO 8601 date string" }),
    estimatedCost: z.number({ invalid_type_error: "Estimated cost must be a number" }).positive("Estimated cost must be a positive number"),
    estimatedRevenue: z.number({ invalid_type_error: "Estimated revenue must be a number" }).positive("Estimated revenue must be a positive number"),
    note: genericString,
    jobType: genericString.min(1, { message: "Job type must be longer than or equal to 1 character" }),
    state: genericString.min(1, { message: "State must be longer than or equal to 1 character" }),
});

export const validationsSchemaActivities = z.object({
    jobId: genericString.min(1, { message: "Commessa is required" }),
    orderId: genericString.min(1, { message: "Order is required" }),
    resourceId: genericString.min(1, { message: "Risorsa is required" }),
    startDate: genericString.min(1, { message: "Start date is required" }),
    endDate: genericString.min(1, { message: "End date is required" }),
    workerdHours: genericString.min(1, { message: "Workerd hours is required" }),
    state: genericString.min(1, { message: "State is required" }),
    note: genericString.min(1, { message: "Note is required" }),
});

export const validationsSchemaOrders = z.object({
    code: genericString.min(1, { message: "Code is required" }),
    description: genericString.min(1, { message: "Descrizione is required" }),
    orderType: genericString.min(1, { message: "Tipo di ordine is required" }),
    startDate: genericString.min(1, { message: "Start date is required" }),
    endDate: genericString.min(1, { message: "End date is required" }),
    fixedCost: genericString.min(1, { message: "Costo fisso is required" }),
    resourceId: genericString.min(1, { message: "Resource is required" }),
    note: genericString.min(1, { message: "Note is required" }),
    hoursAllocatedPerDay: genericString.min(1, { message: "Hours allocated per day is required" }),
    hourRevenue: genericString.min(1, { message: "Hour revenue is required" }),
    hourCost: genericString.min(1, { message: "Hour cost is required" }),
    supplierId: genericString.min(1, { message: "Fornitore is required" }),
});

export const validationsSchemaSuppliers = z.object({
    name: genericString.min(5, { message: "Troppo corto" }).max(15, { message: "Troppo lungo" }),
    typeOfPaymentId: genericString.min(5, { message: "Troppo corto" }).max(15, { message: "Troppo lungo" }),
    note: genericString.min(5, { message: "Troppo corto" }).max(15, { message: "Troppo lungo" }),
});


export const validationSchemaUser = z.object({
    id: z.number().int().positive({ message: "ID deve essere un numero positivo" }),
    email: z.string().email({ message: "Email non valida" }),
    password: z.string().min(8, { message: "Password troppo corta, deve essere almeno 8 caratteri" }),
    passwordConfirm: z.string().min(8, { message: "Password di conferma troppo corta, deve essere almeno 8 caratteri" }),
    firstName: genericString.min(2, { message: "Nome troppo corto, deve essere almeno 2 caratteri" }),
    lastName: genericString.min(2, { message: "Cognome troppo corto, deve essere almeno 2 caratteri" }),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Numero di telefono non valido" }),
    requiredActions: z.array(z.string().nonempty({ message: "Azione richiesta non può essere vuota" })),
    realmRoles: z.array(z.string().nonempty({ message: "Ruolo non può essere vuoto" })),
    resourceId: z.number().positive(),
    hasDarkTheme: z.boolean()
}).refine(data => data.password === data.passwordConfirm, {
    message: "Le password non corrispondono",
    path: ["passwordConfirm"]
});

