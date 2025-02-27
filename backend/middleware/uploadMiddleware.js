import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (file) => {
  // vérification de type de ficher
  const allowedType = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  if (!allowedType.includes(file.mimetype)) {
    throw new Error("Le fichier doit être une image (JPEG, PNG..)");
  }

  // vérificatiion de la taime de l'image (limit a 5 mo par exemple )

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`L'image doit  etre inferieur a 5 mo `);
  }

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    return result.secure_url;
  } catch (error) {
    throw new Error(
      `Erreur lors de l'upload de l'image sur cloudinary ${error.message}`
    );
  }
};

export const uploadAudio = async (file) => {
  const allowedType = [
    "audio/mp3",
    "audio/wav",
    "audio/wma",
    "audio/m4a",
    " audio/mpeg",
  ];

  if (!allowedType.includes(file.mimetype)) {
    throw new Error("Le fichier doit être un fichier audio (mp3, wma...");
  }

  const maxSize = 8 * 1024 * 1024;
  if (maxSize < file.size) {
    throw new Error("La piste audio doit être inférieure à 8 Mo");
  }
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    return result.secure_url
  } catch (error) {
    throw new Error("Erreur dans l'upload du fichier audio");
  }
};
