// Import images from productImages
import productImages from './productImages'

// Map category IDs to product IDs for their display image
// This allows us to choose which product image represents each category
const categoryImageMapping = {
    1: productImages[1],      // Équipement -> Selle de dragon renforcée
    2: productImages[9],      // Hygiène et soin -> Huile brillante pour écailles
    3: productImages[22],     // Habitat -> Grotte volcanique artificielle
    4: productImages[25],     // Nourriture -> Viande séchée premium
    5: productImages[28],     // Accessoires et gadgets -> Balise GPS draconique
    6: productImages[72],     // Bébé dragon -> Bébé dragon
    7: productImages[71],     // Transport -> Service de transport draconique
    8: productImages[70],     // Entraînement -> Entraînement draconique
    9: productImages[69],     // Sécurité -> Système de sécurité draconique
    10: productImages[54],    // Décoration -> Balise lumineuse nocturne
    11: productImages[73],    // Vêtements -> Vêtements draconiques
}

// Get image for a category by its ID
export const getCategoryImage = (idCategory) => {
    return categoryImageMapping[idCategory] || null
}

// Get all category images
export const getAllCategoryImages = () => categoryImageMapping

export default categoryImageMapping
