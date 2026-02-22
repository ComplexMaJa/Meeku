import product1Img from '../assets/product1.png';
import product2Img from '../assets/product2.png';
import product3Img from '../assets/product3.png';
import product4Img from '../assets/product4.png';

export interface Product {
    id: number;
    name: string;
    price: string;
    priceNum: number;
    image: string;
    description: string;
    category: string;
    featured: boolean;
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Rosé Oversized Hoodie',
        price: '$89',
        priceNum: 89,
        image: product1Img,
        description: 'An ultra-soft oversized hoodie in our signature dusty rose. Crafted from 100% brushed cotton fleece with a relaxed drop-shoulder fit. Perfect for layering or wearing on its own.',
        category: 'Tops',
        featured: true,
    },
    {
        id: 2,
        name: 'Sage Cargo Pants',
        price: '$74',
        priceNum: 74,
        image: product2Img,
        description: 'Relaxed-fit cargo pants in a muted sage tone. Features an elastic waistband, adjustable drawcord, and functional side pockets. Made from lightweight washed cotton twill.',
        category: 'Bottoms',
        featured: true,
    },
    {
        id: 3,
        name: 'Cream Essential Tee',
        price: '$45',
        priceNum: 45,
        image: product3Img,
        description: 'A wardrobe staple in warm cream. Cut from premium heavyweight cotton with a boxy silhouette and ribbed crew neck. Garment-dyed for a soft, lived-in feel.',
        category: 'Tops',
        featured: true,
    },
    {
        id: 4,
        name: 'Mist Bucket Hat',
        price: '$38',
        priceNum: 38,
        image: product4Img,
        description: 'A structured bucket hat in our calming mist blue. Made from durable cotton canvas with a soft inner lining. Features a subtle embroidered MEEKU logo at the back.',
        category: 'Accessories',
        featured: true,
    },
    {
        id: 5,
        name: 'Dusk Crewneck Sweater',
        price: '$82',
        priceNum: 82,
        image: product1Img,
        description: 'A cozy crewneck knit in muted dusk pink. Made from a soft cotton-blend yarn with ribbed cuffs and hem. Relaxed unisex fit for everyday comfort.',
        category: 'Tops',
        featured: false,
    },
    {
        id: 6,
        name: 'Stone Relaxed Trousers',
        price: '$68',
        priceNum: 68,
        image: product2Img,
        description: 'Wide-leg trousers in a warm stone tone. Crafted from organic cotton twill with a natural drape. Features a pleated front and elastic back waistband.',
        category: 'Bottoms',
        featured: false,
    },
    {
        id: 7,
        name: 'Cloud Pocket Tee',
        price: '$42',
        priceNum: 42,
        image: product3Img,
        description: 'An oversized pocket tee in soft cloud white. Features a dropped shoulder, chest pocket detail, and curved hem. Made from breathable organic jersey.',
        category: 'Tops',
        featured: false,
    },
    {
        id: 8,
        name: 'Petal Canvas Tote',
        price: '$34',
        priceNum: 34,
        image: product4Img,
        description: 'A minimal canvas tote in soft petal pink. Sturdy cotton canvas construction with interior pocket. Screen-printed MEEKU monogram detail.',
        category: 'Accessories',
        featured: false,
    },
    {
        id: 9,
        name: 'Blush Zip Hoodie',
        price: '$96',
        priceNum: 96,
        image: product1Img,
        description: 'A full-zip hoodie in our signature blush colorway. Heavy-gauge cotton fleece with a matte tonal zipper. Kangaroo pockets and lined hood.',
        category: 'Tops',
        featured: false,
    },
    {
        id: 10,
        name: 'Fog Drawstring Shorts',
        price: '$52',
        priceNum: 52,
        image: product2Img,
        description: 'Lightweight shorts in a soft fog gray. Elastic waist with woven drawcord, side pockets, and a 7" inseam. Made from garment-dyed French terry.',
        category: 'Bottoms',
        featured: false,
    },
    {
        id: 11,
        name: 'Oat Henley Tee',
        price: '$48',
        priceNum: 48,
        image: product3Img,
        description: 'A three-button henley neckline tee in warm oat. Crafted from slub cotton jersey with a subtle texture. Relaxed through the body, tapered at the hem.',
        category: 'Tops',
        featured: false,
    },
    {
        id: 12,
        name: 'Seafoam Beanie',
        price: '$28',
        priceNum: 28,
        image: product4Img,
        description: 'A ribbed-knit beanie in calming seafoam blue. Made from a soft merino wool blend with a fold-up brim. Embroidered MEEKU mark at the back.',
        category: 'Accessories',
        featured: false,
    },
];

export const categories = ['All', 'Tops', 'Bottoms', 'Accessories'];

export const getFeaturedProducts = () => products.filter((p) => p.featured);
