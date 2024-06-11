const { getData } = require("../utils/getData");
const data = getData();
const crypto = require("crypto");

exports.getAllRecipes = (req, res) => {
  // Aranılan terime eriş
  const searchTerm = req.query?.title?.trim()?.toLowerCase();

  // Eğer aranılan terim varsa filtreleyip sonucu gönder
  if (searchTerm) {
    const filtred = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(searchTerm)
    );
    res.status(200).json({
      message: "Tarifler Başarıyla Filtrelendi",
      results: filtred.length,
      recipes: filtred,
    });
  } else {
    // Aranılan terim yoksa hepsini gönder
    res.status(200).json({
      message: "Tarifler Başarıyla Gönderildi",
      results: data.length,
      recipes: data,
    });
  }
};

exports.getRecipe = (req, res) => {
  //id'si bilinen tarifi bul
  const recipe = data.find((i) => i.id == req.params.id);
  //tarif dizide bulunamazsa
  if (!recipe) {
    return res
      .status(404)
      .json({ message: "Aradığını id'li Tarif Bulunamadı" });
  }
  //cevap gönderdik
  res.status(200).json({
    message: "Aradığınız Tarif Bulundu",
    recipe: recipe,
  });
};
