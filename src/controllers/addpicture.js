import multerSchema from "../models/multerSchema.js";

export const addPicture = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const allowedTypes = /jpeg|jpg|png|webp|svg/;

    const extname = allowedTypes.test(
      req.file.originalname.toLowerCase()
    );

    if (!extname) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type",
      });
    }

    const imageUrl = `http://localhost:9002/upload/${req.file.filename}`;

    const data = await multerSchema.create({
      picture: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};