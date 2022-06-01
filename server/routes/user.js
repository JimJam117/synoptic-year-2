import Router from 'express';
import { editUser, getUsers, getUser, deleteUser } from '../controllers/userController.js';

const router = Router();

router.get('/', getUsers);
router.put('/:id', editUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);


export default router;