import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import { addOrder, getOrderById } from "../controllers/ordersController.js";


const ordersRouter = express.Router();
ordersRouter.post("/", isAuth ,expressAsyncHandler(addOrder));
ordersRouter.get("/:id", isAuth ,expressAsyncHandler(getOrderById));


export default ordersRouter;
