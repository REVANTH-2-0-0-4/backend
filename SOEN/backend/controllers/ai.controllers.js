import { generate_result } from "../services/ai.services.js"
export const getresult = async (req, res) => {
    const { prompt } = req.query;
    const result =  await generate_result(prompt);
    res.send(result);
}