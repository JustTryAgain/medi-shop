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
    price: 90,
    category: translation.productsT[0].category,
    image: '/asset/ibuprofen-darnitsa.jpg',
    stock: 120,
    rating: 4.6,
    reviews: 234,
    isRx: false,
    dosage: translation.productsT[0].dosage,
    manufacturer: translation.productsT[0].manufacturer,
    tags: translation.productsT[0].tags,
    discount: 10
  },
  {
    id: '2',
    name: translation.productsT[1].name,
    description: translation.productsT[1].description,
    price: 127.49,
    category: translation.productsT[1].category,
    image: `/asset/paracetamol.jpg`,
    stock: 200,
    rating: 4.4,
    reviews: 180,
    isRx: false,
    dosage: translation.productsT[1].dosage,
    manufacturer: translation.productsT[1].manufacturer,
    tags: translation.productsT[1].tags
  },
  {
    id: '3',
    name: translation.productsT[2].name,
    description: translation.productsT[2].description,
    price: 270.25,
    category: translation.productsT[2].category,
    image: `/asset/aspirin.jpg`,
    stock: 85,
    rating: 4.2,
    reviews: 98,
    isRx: true,
    dosage: translation.productsT[2].dosage,
    manufacturer: translation.productsT[2].manufacturer,
    tags: translation.productsT[2].tags
  },
  {
    id: '4',
    name: translation.productsT[3].name,
    description: translation.productsT[3].description,
    price: 68.99,
    category: translation.productsT[3].category,
    image: `/asset/С.png`,
    stock: 150,
    rating: 4.8,
    reviews: 310,
    isRx: false,
    dosage: translation.productsT[3].dosage,
    manufacturer: translation.productsT[3].manufacturer,
    tags: translation.productsT[3].tags,
    discount: 5
  },
  {
    id: '5',
    name: translation.productsT[4].name,
    description: translation.productsT[4].description,
    price: 312.90,
    category: translation.productsT[4].category,
    image: '/asset/calcium-citrate.jpg',
    stock: 150,
    rating: 4.8,
    reviews: 310,
    isRx: false,
    dosage: translation.productsT[4].dosage,
    manufacturer: translation.productsT[4].manufacturer,
    tags: translation.productsT[4].tags,
    discount: 5
  },

  {
    id: '6',
    name: translation.productsT[5].name,
    description: translation.productsT[5].description,
    price: 55.40,
    category: translation.productsT[5].category,
    image: '/asset/korvalol.jpg',
    stock: 100,
    rating: 4.7,
    reviews: 150,
    isRx: false,
    dosage: translation.productsT[5].dosage,
    manufacturer: translation.productsT[5].manufacturer,
    tags: translation.productsT[5].tags
  },
  {
    id: '7',
    name: translation.productsT[6].name,
    description: translation.productsT[6].description,
    price: 131.00,
    category: translation.productsT[6].category,
    image: '/asset/dimedrol.png',
    stock: 200,
    rating: 4.5,
    reviews: 120,
    isRx: false,
    dosage: translation.productsT[6].dosage,
    manufacturer: translation.productsT[6].manufacturer,
    tags: translation.productsT[6].tags
  },
  {
    id: '8',
    name: translation.productsT[7].name,
    description: translation.productsT[7].description,
    price: 153.14,
    category: translation.productsT[7].category,
    image: '/asset/solpadein.png',
    stock: 150,
    rating: 4.6,
    reviews: 130,
    isRx: false,
    dosage: translation.productsT[7].dosage,
    manufacturer: translation.productsT[7].manufacturer,
    tags: translation.productsT[7].tags
  },
  {
    id: '9',
    name: translation.productsT[8].name,
    description: translation.productsT[8].description,
    price: 550.00,
    category: translation.productsT[8].category,
    image: '/asset/benylin.png',
    stock: 80,
    rating: 4.8,
    reviews: 200,
    isRx: false,
    dosage: translation.productsT[8].dosage,
    manufacturer: translation.productsT[8].manufacturer,
    tags: translation.productsT[8].tags
  },
  {
    id: '10',
    name: translation.productsT[9].name,
    description: translation.productsT[9].description,
    price: 104.30,
    category: translation.productsT[9].category,
    image: '/asset/mukoltin.png',
    stock: 90,
    rating: 4.4,
    reviews: 110,
    isRx: false,
    dosage: translation.productsT[9].dosage,
    manufacturer: translation.productsT[9].manufacturer,
    tags: translation.productsT[9].tags
  },
  {
    id: '11',
    name: translation.productsT[10].name,
    description: translation.productsT[10].description,
    price: 74.00,
    category: translation.productsT[10].category,
    image: '/asset/valeriana.png',
    stock: 300,
    rating: 4.9,
    reviews: 250,
    isRx: false,
    dosage: translation.productsT[10].dosage,
    manufacturer: translation.productsT[10].manufacturer,
    tags: translation.productsT[10].tags
  },
  {
    id: '12',
    name: translation.productsT[11].name,
    description: translation.productsT[11].description,
    price: 309.40,
    category: translation.productsT[11].category,
    image: '/asset/magniy.png',
    stock: 120,
    rating: 4.7,
    reviews: 140,
    isRx: false,
    dosage: translation.productsT[11].dosage,
    manufacturer: translation.productsT[11].manufacturer,
    tags: translation.productsT[11].tags
  },
  {
    id: '13',
    name: translation.productsT[12].name,
    description: translation.productsT[12].description,
    price: 410.00,
    category: translation.productsT[12].category,
    image: '/asset/omega3.png',
    stock: 250,
    rating: 4.6,
    reviews: 180,
    isRx: false,
    dosage: translation.productsT[12].dosage,
    manufacturer: translation.productsT[12].manufacturer,
    tags: translation.productsT[12].tags
  },
  {
    id: '14',
    name: translation.productsT[13].name,
    description: translation.productsT[13].description,
    price: 165.00,
    category: translation.productsT[13].category,
    image: '/asset/melatonin.png',
    stock: 220,
    rating: 4.5,
    reviews: 160,
    isRx: false,
    dosage: translation.productsT[13].dosage,
    manufacturer: translation.productsT[13].manufacturer,
    tags: translation.productsT[13].tags
  },
  {
    id: '15',
    name: translation.productsT[14].name,
    description: translation.productsT[14].description,
    price: 197.40,
    category: translation.productsT[14].category,
    image: '/asset/smekta.png',
    stock: 180,
    rating: 4.8,
    reviews: 190,
    isRx: false,
    dosage: translation.productsT[14].dosage,
    manufacturer: translation.productsT[14].manufacturer,
    tags: translation.productsT[14].tags
  },
  {
    id: '16',
    name: translation.productsT[15].name,
    description: translation.productsT[15].description,
    price: 83.90,
    category: translation.productsT[15].category,
    image: '/asset/enterosgel.png',
    stock: 100,
    rating: 4.7,
    reviews: 170,
    isRx: false,
    dosage: translation.productsT[15].dosage,
    manufacturer: translation.productsT[15].manufacturer,
    tags: translation.productsT[15].tags

  },
  {
    id: '17',
    name: translation.productsT[16].name,
    description: translation.productsT[16].description,
    price: 252.00,
    category: translation.productsT[16].category,
    image: '/asset/linex.png',
    stock: 90,
    rating: 4.6,
    reviews: 150,
    isRx: false,
    dosage: translation.productsT[16].dosage,
    manufacturer: translation.productsT[16].manufacturer,
    tags: translation.productsT[16].tags

  },
  {
    id: '18',
    name: translation.productsT[17].name,
    description: translation.productsT[17].description,
    price: 5.90,
    category: translation.productsT[17].category,
    image: '/asset/vugilla.png',
    stock: 300,
    rating: 4.9,
    reviews: 260,
    isRx: false,
    dosage: translation.productsT[17].dosage,
    manufacturer: translation.productsT[17].manufacturer,
    tags: translation.productsT[17].tags

  },
  {
    id: '19',
    name: translation.productsT[18].name,
    description: translation.productsT[18].description,
    price: 297.70,
    category: translation.productsT[18].category,
    image: '/asset/fervex.png',
    stock: 80,
    rating: 4.8,
    reviews: 200,
    isRx: false,
    dosage: translation.productsT[18].dosage,
    manufacturer: translation.productsT[18].manufacturer,
    tags: translation.productsT[18].tags

  },
  {
    id: '20',
    name: translation.productsT[19].name,
    description: translation.productsT[19].description,
    price: 105.60,
    category: translation.productsT[19].category,
    image: 'asset/nazivin.png',
    stock: 90,
    rating: 4.4,
    reviews: 110,
    isRx: false,
    dosage: translation.productsT[19].dosage,
    manufacturer: translation.productsT[19].manufacturer,
    tags: translation.productsT[19].tags

  },
  {
    id: '21',
    name: translation.productsT[20].name,
    description: translation.productsT[20].description,
    price: 182.00,
    category: translation.productsT[20].category,
    image: '/asset/aquamaris.png',
    stock: 90,
    rating: 4.4,
    reviews: 110,
    isRx: false,
    dosage: translation.productsT[20].dosage,
    manufacturer: translation.productsT[20].manufacturer,
    tags: translation.productsT[20].tags

  },
  {
    id: '22',
    name: translation.productsT[21].name,
    description: translation.productsT[21].description,
    price: 361.00,
    category: translation.productsT[21].category,
    image: '/asset/teraflu.png',
    stock: 90,
    rating: 4.4,
    reviews: 110,
    isRx: false,
    dosage: translation.productsT[21].dosage,
    manufacturer: translation.productsT[21].manufacturer,
    tags: translation.productsT[21].tags

  },
  {
    id: '23',
    name: translation.productsT[22].name,
    description: translation.productsT[22].description,
    price: 282.00,
    category: translation.productsT[22].category,
    image: '/asset/iumidon.png',
    stock: 90,
    rating: 4.4,
    reviews: 110,
    isRx: false,
    dosage: translation.productsT[22].dosage,
    manufacturer: translation.productsT[22].manufacturer,
    tags: translation.productsT[22].tags

  },
  {
    id: '24',
    name: translation.productsT[23].name,
    description: translation.productsT[23].description,
    price: 174.00,
    category: translation.productsT[23].category,
    image: '/asset/anaferon.png',
    stock: 90,
    rating: 4.4,
    reviews: 110,
    isRx: false,
    dosage: translation.productsT[23].dosage,
    manufacturer: translation.productsT[23].manufacturer,
    tags: translation.productsT[23].tags

  },
  {
    id: '25',
    name: translation.productsT[24].name,
    description: translation.productsT[24].description,
    price: 282.,
    category: translation.productsT[24].category,
    image: '/asset/ibufen.png',
    stock: 90,
    rating: 4.4,
    reviews: 110,
    isRx: false,
    dosage: translation.productsT[24].dosage,
    manufacturer: translation.productsT[24].manufacturer,
    tags: translation.productsT[24].tags

  }
];


export default products;