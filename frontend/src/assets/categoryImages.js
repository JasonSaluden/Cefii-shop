import productImages from './productImages'

// Defini l'image représentant chaque catégorie de produits, en utilisant les images correspondantes de productImages. 
const categoryImageMapping = {
    1: productImages[1],      // Équipement -> Selle de dragon renforcée
    2: productImages[27],     // Complément minéral draconique
    3: productImages[22],     // Habitat -> Grotte volcanique artificielle
    4: productImages[51],     // Os enrichis en calcium
    5: productImages[28],     // Accessoires et gadgets -> Balise GPS draconique
    6: productImages[72],     // Bébé dragon -> Bébé dragon
    7: productImages[71],     // Transport -> Service de transport draconique
    8: productImages[70],     // Entraînement -> Entraînement draconique
    9: productImages[69],     // Sécurité -> Système de sécurité draconique
    10: productImages[68],    // Tapis peau de dragon synthétique
    11: productImages[73],    // Vêtements -> Vêtements draconiques
}

// Get image for a category by its ID
export const getCategoryImage = (idCategory) => {
    return categoryImageMapping[idCategory] || null
}

// Get all category images
export const getAllCategoryImages = () => categoryImageMapping

export default categoryImageMapping
