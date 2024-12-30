import mongoose from "mongoose";
// console.log(process.env.MONGODB_URI);

export function connect() {
    mongoose.connect("mongodb://0.0.0.0/soen")
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}