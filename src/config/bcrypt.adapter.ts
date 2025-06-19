import { genSalt, hash, compare } from 'bcryptjs';

export const encriptAdapter = {
    hash: async (password: string) => {
        const salt = await genSalt(12);
        return await hash(password, salt);
    },

    compare: async (unHashedPassword: string, hashedPassword: string) => {
        return await compare(unHashedPassword, hashedPassword);
    },
};