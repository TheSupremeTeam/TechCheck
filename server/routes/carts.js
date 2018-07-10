import express from "express";
import Carts from '../controllers/cartsControllers'
const router = express.Router();

router.post('/delete/cart',Carts.deleteFromCart);


export default router;