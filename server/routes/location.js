import Router from 'express';
import { indexLocations, updateLocation, showLocation, archiveLocation, deleteLocation, createLocation } from '../controllers/locationController.js';

const router = Router();

router.get('/', indexLocations);
router.post('/', createLocation);
router.put('/:id', updateLocation);
router.put('/:id/archive', archiveLocation);
router.get('/:id', showLocation);
router.delete('/:id', deleteLocation);


export default router;