import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getAllListing, test } from '../controllers/listing.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router =express.Router();

router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.put('/update/:id', verifyUser, updateListing);
router.get('/get-all', getAllListing);
router.get('/:id',getListing);



export default router;