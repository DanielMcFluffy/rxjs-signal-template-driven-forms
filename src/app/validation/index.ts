import z from 'zod';

export const loginFormValidation = z.object({
    username: z.string({message: 'Username cannot be blank'}).refine((val) => val.length > 3 , {message: 'Username must be between 3 and 20 characters'}),
    password: z.string({message: 'Password cannot be blank'})
        .min(6, {message: 'Password must be at least 6 characters long'})
        .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
        .regex(/[a-z]/, {message: 'Password must contain at least one lowercase letter'})
        .regex(/[0-9]/, {message: 'Password must contain at least one number'})
        .regex(/[^A-Za-z0-9]/, {message: 'Password must contain at least one special character'})
});

export const todoFormValidation = z.object({
    title: z.string({message: 'Title cannot be blank'}),
    description: z.string({message: 'Description cannot be blank'}).max(120, {message: 'Description must be less than 120 characters'}),
})

export type TLoginForm = z.infer<typeof loginFormValidation>;
export type TEditForm = z.infer<typeof todoFormValidation>;