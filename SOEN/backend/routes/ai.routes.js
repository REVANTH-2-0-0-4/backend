import express from "express";
import * as aicontrollers from "../controllers/ai.controllers.js"
import { Router } from "express";
const router = Router();

router.get("/get-result", aicontrollers.getresult);
export default router;