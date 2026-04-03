import algues from './products/Algues.webp'
import bassin from './products/BassinArtificiel.webp'
import complement from './products/ComplementAlimentaire.png'
import coupeGriffes from './products/CoupeGriffes.jpg'
import armure from './products/Dragon_en_Armure.webp'
import grotte from './products/GrotteArtificielle.jpg'
import harnais from './products/HarnaisDragon.png'
import huile from './products/HuileEcailles.jpg'
import lunettes from './products/LunettesDragon.jpg'
import nid from './products/NidDragon.jpg'
import os from './products/Os.jpg'
import poisson from './products/PoissonDragon.jpg'
import rations from './products/RationsDragon.jpg'
import selle from './products/SelleDragon.png'
import spot from './products/SpotLumiere.jpg'
import tapisDragon from './products/TapisDragon.webp'
import tapisThermique from './products/TapisThermique.jpg'
import traducteur from './products/Traducteur.jpg'
import viande from './products/Viande.webp'
import volcan from './products/VolcanArtificiel.jpg'
import gps from './products/gpsDragon.png'
import securite from './products/securite.png'
import entrainement from './products/entrainement.png'
import transport from './products/transport.png'
import bebeDragon from './products/bebe-dragon.png'
import vetements from './products/vetements.png'

// Liste des images associées à chaque produit, indexée par l'ID du produit. Si un produit n'a pas d'image définie, la fonction getProductImage retournera null.
const productImages = {
    1: selle,          // Selle de dragon renforcée
    2: harnais,        // Harnais de contrôle draconique
    3: armure,         // Armure d'écailles titanisées
    7: coupeGriffes,   // Coupe-griffes géant
    9: huile,          // Huile brillante pour écailles
    22: grotte,         // Grotte volcanique artificielle
    23: nid,            // Nid de repos en pierre
    24: tapisThermique, // Tapis thermique draconique
    25: viande,         // Viande séchée premium
    26: poisson,        // Poisson géant congelé
    27: complement,     // Complément minéral draconique
    28: gps,            // Balise GPS draconique
    29: lunettes,       // Lunettes anti-flammes
    30: traducteur,     // Traducteur de rugissements
    45: volcan,         // Volcan miniature actif
    46: bassin,         // Bassin aquatique profond
    49: algues,         // Algues marines géantes
    50: rations,        // Rations énergétiques
    51: os,             // Os enrichis en calcium
    54: spot,           // Balise lumineuse nocturne
    68: tapisDragon,    // Tapis peau de dragon synthétique
    69: securite,       // Système de sécurité draconique
    70: entrainement,   // Entraînement draconique
    71: transport,      // Service de transport draconique
    72: bebeDragon,     // Bébé dragon
    73: vetements,      // Vêtements draconiques
}

export const getProductImage = (product) =>
    productImages[product.idProduct] || null

export default productImages
