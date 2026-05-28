import express from 'express'

import  { deletePackage, getAll, getOne, newPackage, updatePackage } from "../controllers/packageController.js"


const router = express.Router()

router.post('/new',newPackage);

router.get('/get/all',getAll);

router.get('/get/one/:id',getOne);

router.put('/update/:id',updatePackage)

router.delete('/delete/:id',deletePackage)


export default router