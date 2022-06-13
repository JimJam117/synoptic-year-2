import Router from 'express';
import { updateUser, indexUsers, showUser, deleteUser } from '../controllers/userController.js';

const router = Router();

router.get('/', indexUsers);
router.put('/:id', updateUser);
router.get('/:id', showUser);
router.delete('/:id', deleteUser);


export default router;