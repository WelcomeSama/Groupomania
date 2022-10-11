const User = require("../models/user");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    ) {
      throw Error("invalid file");
    }

    if (req.file.size > 50000000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.name + ".jpg";
  return fs.writeFile(
    `${__dirname}/../images/${fileName}`,
    req.file.buffer,
    () => {
      res.status(200).end();
    }
  );
};
