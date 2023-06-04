const fs = require('fs');
const path = require('path');
const File = require('../models/File');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname } = req.file;
    const code = Math.random().toString(36).substr(2, 6);
    const fileName = `${code}-${originalname}`;

    const file = new File({ code, fileName });
    await file.save();

    const fileData = req.file.buffer;
    const filePath = path.join(__dirname, '../uploads', fileName);
    fs.writeFileSync(filePath, fileData);

    res.json({ code });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'An error occurred during file upload' });
  }
};

const getFilesByUser = async (req, res) => {
  try {
    const files = await File.find();
    res.json({ files });
  } catch (error) {
    console.error('File retrieval error:', error);
    res.status(500).json({ error: 'An error occurred during file retrieval' });
  }
};

const deleteFile = async (req, res) => {
  const { code } = req.params;

  try {
    const file = await File.findOne({ code });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = path.join(__dirname, '../uploads', file.fileName);
    fs.unlinkSync(filePath);

    await file.deleteOne({code});

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).json({ error: 'An error occurred during file deletion' });
  }
};

const downloadFile =async (req, res) => {
  try {
    const { code } = req.params;

    // Find the file by code
    const file = await File.findOne({ code });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = path.join(__dirname, '../uploads', file.fileName);

    res.download(filePath, file.fileName);
  } catch (error) {
    console.error('Failed to download file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { uploadFile, getFilesByUser, deleteFile,downloadFile};
