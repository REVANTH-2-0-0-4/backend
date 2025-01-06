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
        const user = await usermodel.findOne({ email: email }).select("+password");
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
export const allusersexceptid = async(userid) =>{
    try {
      if(!userid){
         throw new Error(" project services didnot recieve the userid, may be you are not logged in ");
      }
      const allusers = await usermodel.find({
        _id : { $ne : userid}
      })
    //   console.log(" all users : " , allusers);
      
      return {
        "status" : "success",
        "allusers" : allusers
      };
    } catch (error) {
      return {
       "status" : "error",
       "message" : error.message
      }
    }
   
   }
   