const fs = require("fs");

module.exports.saveFile = async (file, fileName) => {
  try {
    if (
      file.mimetype != "image/jpg" &&
      file.mimetype != "image/png" &&
      file.mimetype != "image/jpeg"
    ) {
      throw Error("invalid file");
    }

    if (file.size > 50000000) throw Error("max size");
  } catch (err) {
    console.error("Error while saving file", err);
    throw Error(err);
  }

  return fs.writeFile(`${__dirname}/../images/${fileName}`, file.buffer, () => {
    console.log("Successfully saved :", fileName);
  });
};

module.exports.deleteFile = (fileName) => {
  const path = `${__dirname}/../images/${fileName}`;
  if (fs.existsSync(path)) {
    //delete file
    try {
      fs.unlinkSync(path);
    } catch (e) {
      console.error(`Error while deleting file : ${fileName}`, e);
      throw e;
    }
  }
};
