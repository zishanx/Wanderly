import express from "express";
import { createBooking, verifyPayment } from "../controllers/bookingController.js";
import { protect } from '../middlewares/protect.js';
import { getMyBooking } from "../controllers/gmbcontroller.js";

const router = express.Router()

router.post('/booking/create', protect, createBooking)

router.post('/booking/verify', protect, verifyPayment)

router.get('/all', protect, getMyBooking)

export default router; 