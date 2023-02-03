'use strict';

const axios = require("axios");

const {
  nanoid
} = require(`nanoid`);

const {
  PRE_AUTH_REQUEST_URL
} = require(`../constants`);

let fileNewName = ``;

const uploadToOracle = async (req, res, next) => {
  try {
    const {
      file
    } = req;

    // Get the Pre-Authenticated Request URL for uploading the file to Oracle Cloud Infrastructure Object Storage
    const presignedUrl = await getPresignedUrl(file.originalname);

    // Upload the file to Oracle Cloud Infrastructure Object Storage using the Pre-Authenticated Request URL
    await axios.put(presignedUrl, file.buffer, {
      headers: {
        "Content-Type": file.mimetype,
      },
    });

    // Store the file information in the request object
    req.fileInfo = {
      // filename: file.originalname,
      filename: `/img/${fileNewName}`,
      url: presignedUrl,
    };

    // Move on to the next middleware or endpoint
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to upload the file.",
      error,
    });
  }
};

const getPresignedUrl = async (filename) => {
  const uniqueName = nanoid(10);
  const extension = filename.split(`.`).pop();
  fileNewName = `${uniqueName}.${extension}`;
  return `${PRE_AUTH_REQUEST_URL}img/${fileNewName}`;

  // Replace this with code to generate a Pre-Authenticated Request URL for uploading the file to Oracle Cloud Infrastructure Object Storage
};

module.exports = uploadToOracle;