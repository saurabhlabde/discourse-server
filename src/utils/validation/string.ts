export const handleString = (value: any) => {
        if (!/[^a-zA-Z]/.test(value)) {
                return true;
        } else {
                return false;
        }
};
