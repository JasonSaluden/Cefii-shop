// Import images from productImages
import productImages from './productImages'

// Map category IDs to product IDs for their display image
// This allows us to choose which product image represents each category
const categoryImageMapping = {
    // Example mappings - update these based on your actual category IDs
    // 1: productImages[1],      // Équipement -> Selle
    // 2: productImages[22],     // Habitat -> Grotte
    // 3: productImages[25],     // Alimentation -> Viande
    // Add your category mappings here
}

// Get image for a category by its ID
export const getCategoryImage = (idCategory) => {
    return categoryImageMapping[idCategory] || null
}

// Get all category images
export const getAllCategoryImages = () => categoryImageMapping

export default categoryImageMapping
