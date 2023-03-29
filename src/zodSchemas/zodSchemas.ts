import * as z from 'zod';

export const listNameSchema = z.string().nonempty({ message: "Názov nesmie byť prázdny" });

export const toDoSchema = z.object({
    name: z.string().min(1, {message: "Názov nesmie byť prázdny"}),
    desc: z.string().min(1, {message: "Popis nesmie byť prázdny"}),
    datetime: z.string().datetime({message: "Dátum a čas musia mať správny formát"})
});