import * as jwt from "jsonwebtoken";

export const generateToken = (user: any) => {

        const token: string = jwt.sign(
                {
                        id: user.id,
                        username: user.username,
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "24h" }
        );

        return token
};

