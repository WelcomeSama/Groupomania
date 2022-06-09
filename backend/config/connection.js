const db = require("../models");

exports.initConnDB = async () => {
  try {
    // Synchronisation des models + création des changement
    db.sequelize
      .sync({
        alter: true
      })
      .then(() =>
        console.log(`Connexion à DB MYSQL réussie !`)
      )
      .catch((err) => {
        console.log(err);
        console.log(`Connexion à DB MYSQL échouée !`);
      });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la connexion:", error);
  }
};
