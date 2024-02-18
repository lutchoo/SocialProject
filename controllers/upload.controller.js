const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== "image/jpeg" &&
      req.file.detectedMimeType !== "image/png" &&
      req.file.detectedMimeType !== "image/jpg"
    )
      throw Error("invalid file");
    if (req.file.size > 500000) throw Error("max size");

    const fileName = req.body.name + ".jpg";

    // Enregistrement du fichier sur le serveur
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/profil/${fileName}`
      )
    );

    // Mise à jour de la base de données avec le nouveau chemin d'accès à l'image
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultOnInsert: true }
    );

    return res.send(updatedUser);
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(500).send({ errors });
  }
};
