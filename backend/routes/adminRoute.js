import express from 'express'

import protect from '../middlewares/protect'
import admin from '../middlewares/admin'
import { getAllBookings } from '../controllers/adminController'
import { deletePackage } from '../controllers/adminController'


const router = express.Router()

router.get('/admin/all', protect, admin, getAllBookings)

router.delete('/delete/:id', protect, admin, deletePackage)

export default router;