import { handleString } from "./string";
import { nanoid } from "nanoid";




const stringNotEmpty = (name: string) => {
        const message = {
                id: nanoid(),
                message: `${name} must not be empty`,
                type: "error",
        }
        return message
}

const stringNotNumber = (name: string) => {
        const message = {
                id: nanoid(),
                message: `${name} must be string`,
                type: "error",
        }
        return message
}

interface IValidateRegisterInput {
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        status: string;
        password: string;
}

interface IError {
        id: string
        message: string
        type: string
}


export const validateRegisterInput = ({
        firstname,
        lastname,
        username,
        email,
        status,
        password,
}: IValidateRegisterInput) => {
        let errors: Array<IError> = [];

        //   firstname

        if (firstname?.trim() === "") {
                errors.push(stringNotEmpty("firstname"));

        } else if (!handleString(firstname)) {
                errors.push(stringNotNumber("firstname"));
        }

        //   lastname

        if (lastname?.trim() === "") {
                errors.push(stringNotEmpty("lastname"));

        } else if (!handleString(lastname)) {
                errors.push(stringNotNumber("lastname"));
        }

        //   username

        if (username?.trim() === "") {
                errors.push(stringNotEmpty("username"));
        }

        // status

        if (status?.trim() === "") {
                errors.push(stringNotEmpty("status"));
        }

        //   email

        if (email?.trim() === "") {
                errors.push(stringNotEmpty("email id"));
        } else {
                const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])^@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
                if (email.match(regEx)) {
                        errors.push({
                                id: nanoid(),
                                message: "Email id must be a valid email address",
                                type: "error",
                        });
                }
        }

        //   password

        const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,125}$/;

        if (password === "") {
                errors.push(stringNotEmpty("password"));
        } else if (password?.length < 6) {
                errors.push({
                        id: nanoid(),
                        message: "Password must be 6 or more charter",
                        type: "error",
                });
        } else if (!password?.match(passRegex)) {
                errors.push({
                        id: nanoid(),
                        message: "Password must contain one spacial charter ex: abc@1234",
                        type: "error",
                });
        }

        return {
                errors,
                valid: errors.length < 1,
        };
};

interface IValidateLoginInput {
        username: string;
        password: string;
}

export const validateLoginInput = ({ username, password }: IValidateLoginInput) => {
        const errors: any = [];

        // username
        if (username?.trim() === "") {
                errors.push(stringNotEmpty("username"));
        }

        // password

        if (password?.trim() === "") {
                errors.push(stringNotEmpty("password"));

        }

        return {
                errors,
                valid: errors.length < 1,
        };
};
