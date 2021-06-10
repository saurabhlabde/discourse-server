import { AuthenticationError } from "apollo-server";
import * as jwt from "jsonwebtoken";

export const checkAuth = (context: any) => {
        const authHeader = context?.res?.req?.headers?.authorization;

        if (authHeader) {
                const token = authHeader.split("Bearer ")[1];

                if (token) {
                        try {
                                const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

                                return user;
                        } catch (error) {
                                throw new AuthenticationError("Invalid token");
                        }
                }
                throw new Error(`Authentication token failed`);
        }
        throw new Error(`Authorization header must be provide`);
};

