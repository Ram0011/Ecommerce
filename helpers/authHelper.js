import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    try {
        const saltRounds = 11;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(`Error in hashing password ${error}`.bgRed.white);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
        console.log(`Error in comparing password ${error}`.bgRed.white);
    }
};
