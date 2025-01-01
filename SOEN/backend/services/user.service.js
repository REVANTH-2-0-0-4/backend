import usermodel from "../db/models/user.model.js"
export async function createuser({ email, password }) {
    if (!email || !password) {
        throw new Error('email and password must be present');
    }
    const user = await usermodel.create({
        email,
        password: await usermodel.hashpassword(password)
    })
    return user;
}
export async function loginuser({ email, password }) {
    try {
        const user = await usermodel.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await user.isvalidpassword(password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        return user; 
    } catch (err) {
        return { status: "error", message: err.message };
    }
}
