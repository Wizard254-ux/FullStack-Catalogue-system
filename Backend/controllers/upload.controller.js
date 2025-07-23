const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Return the file information
    res.status(200).json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: `/api/images/${req.file.filename}`
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error while uploading file' });
  }
};

module.exports = {
  uploadImage
};