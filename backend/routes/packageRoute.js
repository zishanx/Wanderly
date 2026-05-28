import express from 'express'

import { deletePackage, getAll, getOne, newPackage, updatePackage } from "../controllers/packageController.js"
import { protect } from '../middlewares/protect.js';
import { admin } from '../middlewares/admin.js';


const router = express.Router()

router.post('/new', protect, admin, newPackage);

router.get('/get/all', getAll);

router.get('/get/one/:id', getOne);

router.put('/update/:id', protect, admin, updatePackage)

router.delete('/delete/:id', protect, admin, deletePackage)


export default router