const express = require('express');
const { uploadFile, getFilesByUser, deleteFile,downloadFile } = require('../controllers/fileController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/get', getFilesByUser);
router.delete('/:code',deleteFile);
router.get('/:code',downloadFile );


module.exports = router;
