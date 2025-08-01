import express from 'express'
import { generateTips} from '../controllers/aiController.js';


const aiRouter = express.Router();

aiRouter.post('/generate-tips',generateTips)


export default aiRouter
