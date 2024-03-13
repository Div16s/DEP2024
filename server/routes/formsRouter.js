import express from 'express';
import { pendingForms, submitFormSP101, pendingFormsAdmin } from '../controllers/formController.js'
const router = new express.Router();

router.post('/submitSP101', submitFormSP101);
router.post('/pending',pendingForms);
router.post('/pendingForms_Admin',pendingFormsAdmin)


export default router;