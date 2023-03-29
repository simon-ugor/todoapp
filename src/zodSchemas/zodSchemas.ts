import * as z from 'zod';
import { number } from 'zod';

export const listNameSchema = z.string().trim().nonempty({ message: "Názov nesmie byť prázdny" });

export const toDoSchema = z.object({
    name: z.string().min(1, {message: "Názov nesmie byť prázdny"}),
    desc: z.string().min(1, {message: "Popis nesmie byť prázdny"}),
    datetime: z.string().trim().nonempty({message: "Dátum a čas nesmie byť prázdny"})
});