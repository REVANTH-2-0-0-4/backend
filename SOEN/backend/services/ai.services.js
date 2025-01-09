import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const generate_result = async (prompt) => {
    const result = await model.generateContext(prompt);
     return result.response.text();
}