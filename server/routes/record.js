import Router from 'express';
import { archiveRecord, countHowManyActive, countHowManyHstorical, createRecord, deleteRecord, indexActiveRecords, indexAllRecords, indexHistoricalRecords, showRecord, updateRecord } from '../controllers/recordController.js';

const router = Router();

router.get('/', indexAllRecords);
router.get('/activeCount', countHowManyActive);
router.get('/historicalCount', countHowManyHstorical);
router.get('/active', indexActiveRecords);
router.get('/historical', indexHistoricalRecords);
router.get('/:id', showRecord);


router.post('/', createRecord);

router.put('/:id', updateRecord);

router.put('/:id/archive', archiveRecord);
router.delete('/:id', deleteRecord);


export default router;