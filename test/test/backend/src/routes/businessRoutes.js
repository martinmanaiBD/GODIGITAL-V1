const express = require('express');
const businessController = require('../controllers/businessController');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
    // Accept only image or document files
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/pdf')) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Only image or document files are allowed`), false);
    }
  };

const upload = multer({ storage, fileFilter });

const router = express.Router();

router.post('/', authMiddleware, upload.single('document'), businessController.createBusiness);
router.put('/:id', authMiddleware, upload.single('document'), businessController.updateBusiness);
router.get('/:userId', authMiddleware, businessController.getBusiness);

module.exports = router;
