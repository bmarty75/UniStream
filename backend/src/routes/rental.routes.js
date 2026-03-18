import express from 'express';
import { 
  createRental, 
  getAllRentals, 
  getMyRentals 
} from '../controllers/rental.controller.js';

const router = express.Router();

router.get('/', getAllRentals);
router.get('/my-rentals', getMyRentals); 
router.post('/', createRental);

export default router;