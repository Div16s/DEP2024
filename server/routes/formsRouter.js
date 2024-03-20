import express from 'express';
import { submitFormSP101, pendingForms, pendingFormsAdmin, approvedForms, approvedFormsAdmin, approveForm } from '../controllers/formController.js'
const router = new express.Router();

router.post('/submitSP101', submitFormSP101);
router.post('/pending', pendingForms);
router.post('/pending/Admin', pendingFormsAdmin)
router.post('/approved', approvedForms);
router.post('/approved/Admin', approvedFormsAdmin);
router.post('/approve', approveForm);


export default router;