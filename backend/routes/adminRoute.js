import express from 'express'

import {protect} from '../middlewares/protect.js'
import {admin} from '../middlewares/admin.js'
import { getAllBookings } from '../controllers/adminController.js'
import { deletePackage } from '../controllers/adminController.js'




const router = express.Router()

router.get('/all', protect, admin, getAllBookings)

// packageRoutes



router.delete('/delete/:id', protect, admin, deletePackage)

export default router;