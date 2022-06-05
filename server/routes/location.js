import Router from 'express';
import { indexLocations, updateLocation, showLocation, archiveLocation, deleteLocation } from '../controllers/locationController.js';

const router = Router();

router.get('/', indexLocations);
router.put('/:id', updateLocation);
router.put('/:id/archive', archiveLocation);
router.get('/:id', showLocation);
router.delete('/:id', deleteLocation);


export default router;