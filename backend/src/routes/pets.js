const express = require('express');
const {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet
} = require('../controllers/petController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/', createPet);
router.get('/', getPets);
router.get('/:id', getPetById);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;