const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'product_image/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, fileExtension);
    const sanitizedBasename = basename.replace(/[^a-zA-Z0-9-_]/g, '_'); // Sanitize the basename
    cb(null, `${sanitizedBasename}-${uniqueSuffix}${fileExtension}`);
  },
  
  
});

const fileFilter = (req, file, cb) => {
    // Accept only specified image file formats
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Only JPEG, JPG, PNG, and GIF files are allowed`), false);
    }
  };

const upload = multer({ storage, fileFilter });

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), productController.createProduct);
router.put('/:id', authMiddleware, upload.single('image'), productController.updateProduct);
router.get('/:id',  productController.getProduct);
router.get('/',  productController.getAllProducts);

module.exports = router;