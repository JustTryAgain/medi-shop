export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  isRx: boolean; // prescription required
  dosage?: string;
  manufacturer: string;
  tags: string[];
  discount?: number;
}

const products = (translation: any): Product[] => [
  {
    id: '1',
    name: translation.productsT[0].name,
    description: translation.productsT[0].description,
    price: 4.99,
    category: translation.productsT[0].category,
    image: '/asset/ibuprofen-darnitsa.jpg',
    stock: 120,
    rating: 4.6,
    reviews: 234,
    isRx: false,
    dosage: translation.productsT[0].dosage,
    manufacturer: translation.productsT[0].manufacturer,
    tags: translation.productsT[0].tags,
    discount: 10,
  },
  {
    id: '2',
    name: translation.productsT[1].name,
    description: translation.productsT[1].description,
    price: 3.49,
    category: translation.productsT[1].category,
    image: translation.productsT[1].image,
    stock: 200,
    rating: 4.4,
    reviews: 180,
    isRx: false,
    dosage: translation.productsT[1].dosage,
    manufacturer: translation.productsT[1].manufacturer,
    tags: translation.productsT[1].tags,
  },
  {
    id: '3',
    name: translation.productsT[2].name,
    description: translation.productsT[2].description,
    price: 5.25,
    category: translation.productsT[2].category,
    image: translation.productsT[2].image,
    stock: 85,
    rating: 4.2,
    reviews: 98,
    isRx: true,
    dosage: translation.productsT[2].dosage,
    manufacturer: translation.productsT[2].manufacturer,
    tags: translation.productsT[2].tags,
  },
  {
    id: '4',
    name: translation.productsT[3].name,
    description: translation.productsT[3].description,
    price: 6.99,
    category: translation.productsT[3].category,
    image: translation.productsT[3].image,
    stock: 150,
    rating: 4.8,
    reviews: 310,
    isRx: false,
    dosage: translation.productsT[3].dosage,
    manufacturer: translation.productsT[3].manufacturer,
    tags: translation.productsT[3].tags,
    discount: 5,
  },
];


export default products;