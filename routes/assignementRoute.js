
const express = require('express')
const router = express.Router()
const assignment = require('../controllers/assignmentController');

// les routes

router.get('/hello',assignment.hello);

router.get('/all',assignment.getAssignments)
router.post('/new',assignment.postAssignment)
router.put('/update',assignment.updateAssignment);


router.get('/:id',assignment.getAssignment)
router.delete('/delete/:id',assignment.deleteAssignment);



module.exports = router;

