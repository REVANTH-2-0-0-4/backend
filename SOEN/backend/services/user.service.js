import usermodel from "../db/models/user.model.js"
export async function createuser(email, password) {
    if (!email || !password) {
        throw new Error('email and password must be present');
    }
    const user = await usermodel.create({
        email,
        password: await usermodel.hashpassword(password)
    })
    return user

}