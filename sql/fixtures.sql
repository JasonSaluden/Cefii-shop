SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE order_line;
TRUNCATE TABLE orders;
TRUNCATE TABLE products;
TRUNCATE TABLE category;
TRUNCATE TABLE user;

-- Categories
INSERT INTO `category` (`id_category`, `nom`, `description`) VALUES
(1,'Équipement','Accessoires et équipements pour monter, protéger ou contrôler les dragons.'),
(2,'Hygiène et soin','Produits dédiés à l entretien, au nettoyage et au bien-être des dragons.'),
(3,'Habitat','Solutions d hébergement et d aménagement pour le confort des dragons.'),
(4,'Nourriture','Aliments, compléments et accessoires liés à l alimentation des dragons.'),
(5,'Accessoires et gadgets','Objets technologiques et accessoires pratiques pour dragons et cavaliers.'),
(6,'Bébé dragon','Produits spécialement conçus pour les œufs et les jeunes dragons.'),
(7,'Transport','Équipements permettant de transporter les dragons en toute sécurité.'),
(8,'Entraînement','Outils et accessoires pour entraîner les dragons.'),
(9,'Sécurité','Équipements de protection pour les dragons et leur environnement.'),
(10,'Décoration','Objets décoratifs sur le thème des dragons.'),
(11,'Vêtements','Vêtements et accessoires pour cavaliers de dragons.');

-- Products
INSERT INTO `products` (`id_product`, `nom`, `description`, `prix`, `stock`, `img_url`, `id_category`) VALUES
(1,'Selle de dragon renforcée','Selle en cuir ignifugé adaptée aux dragons adultes pour le vol longue distance.',299.99,12,'img/selle_dragon.jpg',1),
(2,'Harnais de contrôle draconique','Harnais robuste avec points d\'attache pour un meilleur contrôle en vol.',149.50,20,'img/harnais_dragon.jpg',1),
(3,'Armure d\'écailles titanisées','Armure protectrice pour dragon, résistante aux attaques physiques et au feu.',499.00,5,'img/armure_dragon.jpg',1),
(7,'Coupe-griffes geant','Outil renforce pour couper les griffes epaisse des dragons.',39.90,50,'img/coupe_griffe.jpg',2),
(8,'Brosse a ecailles premium','Brosse speciale pour nettoyer et faire briller les ecailles.',24.99,80,'img/brosse_ecailles.jpg',2),
(9,'Huile brillante pour ecailles','Huile naturelle ameliorant la resistance et la brillance des ecailles.',19.99,60,'img/huile_ecailles.jpg',2),
(10,'Incubateur d\'oeufs de dragon','Maintient temperature et humidite optimales pour l\'eclosion.',249.99,8,'img/incubateur.jpg',6),
(11,'Biberon ignifuge','Biberon resistente a la chaleur pour nourrir les jeunes dragons.',18.50,70,'img/biberon_dragon.jpg',6),
(12,'Couverture thermique bebe dragon','Garde la chaleur corporelle des jeunes dragons.',27.99,45,'img/couverture_dragon.jpg',6),
(22,'Grotte volcanique artificielle','Habitat reproduisant un environnement volcanique naturel.',899.99,3,'img/grotte.jpg',3),
(23,'Nid de repos en pierre','Structure confortable pour le repos des dragons.',199.99,10,'img/nid_pierre.jpg',3),
(24,'Tapis thermique draconique','Diffuse une chaleur constante pour le confort du dragon.',89.99,25,'img/tapis.jpg',3),
(25,'Viande sechee premium','Alimentation riche en proteines pour dragons adultes.',49.99,100,'img/viande.jpg',4),
(26,'Poisson geant congele','Repas complet pour dragons marins.',79.99,40,'img/poisson.jpg',4),
(27,'Complement mineral draconique','Renforce les ecailles et les griffes.',29.99,60,'img/complement.jpg',4),
(28,'Balise GPS draconique','Permet de localiser votre dragon en temps reel.',129.99,30,'img/gps.jpg',5),
(29,'Lunettes anti-flammes','Protegent les yeux du cavalier.',59.99,45,'img/lunettes.jpg',5),
(30,'Traducteur de rugissements','Analyse et traduit les sons du dragon.',199.99,15,'img/traducteur.jpg',5),
(31,'Cage de transport renforcee','Transport securise pour dragons de taille moyenne.',349.99,8,'img/cage.jpg',7),
(32,'Remorque draconique','Remorque adaptee pour le transport longue distance.',1299.99,2,'img/remorque.jpg',7),
(33,'Cible d entrainement ignifuge','Permet d entrainer le souffle de feu.',79.99,35,'img/cible.jpg',8),
(34,'Sifflet ultrason draconique','Donne des ordres a distance.',39.99,60,'img/sifflet.jpg',8),
(35,'Parcours d obstacle aerien','Structure pour ameliorer l agilite en vol.',499.99,6,'img/parcours.jpg',8),
(36,'Extincteur anti-feu draconique','Eteint rapidement les flammes puissantes.',69.99,50,'img/extincteur.jpg',9),
(37,'Barriere ignifuge','Protege les zones sensibles.',149.99,20,'img/barriere.jpg',9),
(38,'Casque de protection cavalier','Protection complete pour les vols.',89.99,40,'img/casque.jpg',9),
(39,'Statue de dragon antique','Objet decoratif en pierre.',199.99,12,'img/statue.jpg',10),
(40,'Lampe oeuf de dragon','Lampe design en forme d oeuf.',49.99,30,'img/lampe.jpg',10),
(41,'Table basse draconique','Mobilier style medieval.',299.99,5,'img/table.jpg',10),
(42,'Cape de cavalier ignifuge','Cape resistante a la chaleur.',119.99,25,'img/cape.jpg',11),
(43,'Gants anti-chaleur','Protegent des brulures.',39.99,70,'img/gants.jpg',11),
(44,'Bottes de vol renforcees','Ameliorent la stabilite en vol.',149.99,20,'img/bottes.jpg',11),
(45,'Volcan miniature actif','Reproduit un environnement chaud pour dragons de feu.',599.99,4,'img/volcan.jpg',3),
(46,'Bassin aquatique profond','Habitat pour dragons aquatiques.',449.99,6,'img/bassin.jpg',3),
(47,'Plateforme de repos aerienne','Zone de repos en hauteur.',299.99,8,'img/plateforme.jpg',3),
(48,'Pack gibier sauvage','Assortiment de viandes pour dragons carnivores.',89.99,50,'img/gibier.jpg',4),
(49,'Algues marines geantes','Nourriture pour dragons marins.',39.99,70,'img/algues.jpg',4),
(50,'Rations energétiques','Boost d energie rapide.',19.99,120,'img/rations.jpg',4),
(51,'Os enrichis en calcium','Renforce la structure osseuse.',24.99,90,'img/os.jpg',4),
(52,'Harnais de vol premium','Controle optimal du dragon.',249.99,15,'img/harnais.jpg',5),
(53,'Selle de combat draconique','Selle renforcee pour situations extremes.',399.99,7,'img/selle_combat.jpg',5),
(54,'Balise lumineuse nocturne','Visibilite accrue la nuit.',34.99,60,'img/lumiere.jpg',5),
(55,'Bracelet de lien draconique','Renforce la connexion avec le dragon.',79.99,25,'img/bracelet.jpg',5),
(56,'Caméra embarquée','Filme les vols en haute altitude.',149.99,20,'img/camera.jpg',5),
(57,'Sac de transport pour bebe dragon','Transport securise pour petits dragons.',129.99,30,'img/sac.jpg',7),
(58,'Plateforme mobile roulante','Permet de deplacer les dragons blesses.',279.99,10,'img/plateforme_mobile.jpg',7),
(59,'Filet de capture resistant','Capture sans blesser.',59.99,40,'img/filet.jpg',7),
(60,'Manuel de dressage draconique','Guide complet pour l entrainement.',29.99,80,'img/manuel.jpg',8),
(61,'Simulateur de vol VR','Entrainement sans risque.',499.99,5,'img/vr.jpg',8),
(62,'Distributeur de recompenses','Automatise les recompenses.',89.99,30,'img/distributeur.jpg',8),
(63,'Chronometre de vol','Mesure les performances.',19.99,100,'img/chrono.jpg',8),
(64,'Bouclier thermique portatif','Protection contre les flammes.',119.99,25,'img/bouclier.jpg',9),
(65,'Combinaison ignifuge complete','Protection totale du corps.',199.99,15,'img/combinaison.jpg',9),
(66,'Alarme de proximite draconique','Detecte les mouvements proches.',69.99,35,'img/alarme.jpg',9),
(67,'Kit de premiers secours draconique','Soins d urgence.',49.99,50,'img/kit.jpg',9),
(68,'Tapis peau de dragon synthetique','Decoration realiste.',149.99,20,'img/tapis_dragon.jpg',10),
(69,'Horloge draconique murale','Design medieval.',59.99,30,'img/horloge.jpg',10),
(70,'Fontaine dragon','Fontaine decoratif.',249.99,10,'img/fontaine.jpg',10),
(71,'Bougies flammes eternelles','Effet flamme magique.',39.99,40,'img/bougies.jpg',10),
(72,'Armure legere de cavalier','Protection sans perdre mobilite.',299.99,10,'img/armure.jpg',11),
(73,'Echarpe thermique','Protection contre le froid en altitude.',29.99,60,'img/echarpe.jpg',11),
(74,'Masque anti-fumee','Filtre les particules.',49.99,45,'img/masque.jpg',11),
(75,'Ceinture utilitaire draconique','Stockage d outils.',69.99,35,'img/ceinture.jpg',11);

SET FOREIGN_KEY_CHECKS = 1;
