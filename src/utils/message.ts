import { nanoid } from "nanoid";

interface IThrowMessage {
        errors: Array<any>;
        message: string;
        type: string;
}

export const throwMessage = ({ errors, message, type }: IThrowMessage) => {
        return errors?.push({
                id: nanoid(),
                message,
                type,
        });
};
