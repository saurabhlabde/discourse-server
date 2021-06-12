import { nanoid } from "nanoid";

interface IErrors {
        id: string;
        message: string;
        type: string;
}

interface IValidateAddMessage {
        text: string
        image: string
}

export const validateAddMessage = ({ text, image }: IValidateAddMessage) => {
        const errors: Array<IErrors> = [];

        if (text?.trim() === "") {
                errors.push({
                        id: nanoid(),
                        message: "Message can't be empty",
                        type: "error",
                });
        }

        if (text?.trim() !== '' && text?.trim() === '') {
                errors.push({
                        id: nanoid(),
                        message: "Message must be contain text or media",
                        type: "error",
                });
        }

        return {
                errors,
                valid: errors.length < 1,
        };
};
