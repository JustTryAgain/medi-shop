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

const products: Product[] = [
  {
    id: '1',
    name: 'Acetaminophen 500mg',
    description: 'Acetaminophen is used to treat mild to moderate pain and to reduce fever. It is commonly used to relieve symptoms of headaches, muscle aches, menstrual periods, colds and sore throats, toothaches, backaches, and reactions to vaccinations.',
    price: 9.99,
    category: 'Pain Relief',
    image: 'https://images.pexels.com/photos/139398/himalayas-mountains-nepal-himalaya-139398.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 250,
    rating: 4.8,
    reviews: 427,
    isRx: false,
    dosage: '500mg Tablets',
    manufacturer: 'PharmaLife',
    tags: ['pain relief', 'fever reducer', 'headache']
  },
  {
    id: '2',
    name: 'Ibuprofen 200mg',
    description: 'Ibuprofen works by reducing hormones that cause inflammation and pain in the body. It\'s commonly used for reducing fever and treating pain or inflammation caused by many conditions such as headache, toothache, back pain, arthritis, or minor injury.',
    price: 8.49,
    category: 'Pain Relief',
    image: 'https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 180,
    rating: 4.7,
    reviews: 352,
    isRx: false,
    dosage: '200mg Tablets',
    manufacturer: 'HealthOne',
    tags: ['anti-inflammatory', 'pain relief', 'fever reducer']
  },
  {
    id: '3',
    name: 'Amoxicillin 500mg',
    description: 'Amoxicillin is a penicillin antibiotic that fights bacteria in the body. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',
    price: 15.99,
    category: 'Antibiotics',
    image: 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 75,
    rating: 4.5,
    reviews: 128,
    isRx: true,
    dosage: '500mg Capsules',
    manufacturer: 'MediCare',
    tags: ['antibiotics', 'bacterial infection', 'prescription']
  },
  {
    id: '4',
    name: 'Loratadine 10mg',
    description: 'Loratadine is an antihistamine that reduces the effects of natural chemical histamine in the body. Histamine can produce symptoms of sneezing, itching, watery eyes, and runny nose. It is used to treat sneezing, runny nose, watery eyes, hives, skin rash, itching, and other cold or allergy symptoms.',
    price: 12.99,
    category: 'Allergy',
    image: 'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 120,
    rating: 4.6,
    reviews: 215,
    isRx: false,
    dosage: '10mg Tablets',
    manufacturer: 'AllerClear',
    tags: ['allergy', 'antihistamine', 'non-drowsy'],
    discount: 15
  },
  {
    id: '5',
    name: 'Multivitamin Daily',
    description: 'A complete multivitamin supplement formulated to support overall health and wellness. Contains essential vitamins and minerals to help fill nutritional gaps in your diet and promote immune function, energy production, and overall wellbeing.',
    price: 19.99,
    category: 'Vitamins & Supplements',
    image: 'https://images.pexels.com/photos/2387958/pexels-photo-2387958.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 200,
    rating: 4.9,
    reviews: 562,
    isRx: false,
    manufacturer: 'VitaWell',
    tags: ['vitamins', 'supplements', 'daily', 'wellness'],
    discount: 10
  },
  {
    id: '6',
    name: 'Omeprazole 20mg',
    description: 'Omeprazole decreases the amount of acid produced in the stomach. It is used to treat symptoms of gastroesophageal reflux disease (GERD) and other conditions caused by excess stomach acid. It is also used to promote healing of erosive esophagitis.',
    price: 14.49,
    category: 'Digestive Health',
    image: 'https://images.pexels.com/photos/7683093/pexels-photo-7683093.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 90,
    rating: 4.7,
    reviews: 178,
    isRx: true,
    dosage: '20mg Capsules',
    manufacturer: 'GastroHealth',
    tags: ['acid reducer', 'heartburn', 'GERD', 'prescription']
  },
  {
    id: '7',
    name: 'Digital Thermometer',
    description: 'Fast-reading digital thermometer for accurate temperature measurements. Features a large digital display, memory function, and fever alert. Suitable for oral, rectal, or underarm use.',
    price: 12.95,
    category: 'Medical Devices',
    image: 'https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 75,
    rating: 4.4,
    reviews: 94,
    isRx: false,
    manufacturer: 'MediTech',
    tags: ['medical device', 'thermometer', 'fever', 'health monitoring']
  },
  {
    id: '8',
    name: 'First Aid Kit - Complete',
    description: 'Comprehensive first aid kit containing bandages, antiseptic wipes, gauze pads, adhesive tape, scissors, tweezers, disposable gloves, and a first aid guide. Essential for home, office, or travel.',
    price: 29.99,
    category: 'First Aid',
    image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 50,
    rating: 4.8,
    reviews: 136,
    isRx: false,
    manufacturer: 'SafeGuard',
    tags: ['first aid', 'emergency', 'medical supplies', 'safety']
  },
  {
    id: '9',
    name: 'Hand Sanitizer - 8oz',
    description: 'Alcohol-based hand sanitizer that kills 99.9% of germs without water. Contains moisturizers to prevent skin dryness. Convenient 8oz size with pump dispenser.',
    price: 5.99,
    category: 'Personal Care',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 320,
    rating: 4.6,
    reviews: 275,
    isRx: false,
    manufacturer: 'CleanCare',
    tags: ['sanitizer', 'hygiene', 'germ protection', 'alcohol-based']
  },
  {
    id: '10',
    name: 'Vitamin C 1000mg',
    description: 'High-potency Vitamin C supplement that helps support the immune system, promotes collagen production for healthy skin, and provides antioxidant protection. Contains rose hips for enhanced absorption.',
    price: 16.99,
    category: 'Vitamins & Supplements',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 150,
    rating: 4.9,
    reviews: 412,
    isRx: false,
    dosage: '1000mg Tablets',
    manufacturer: 'NutraHealth',
    tags: ['vitamins', 'immune support', 'antioxidant', 'vitamin c'],
    discount: 20
  },
  {
    id: '11',
    name: 'Blood Pressure Monitor',
    description: 'Automatic digital blood pressure monitor for home use. Features one-touch operation, large display, and memory function for tracking measurements over time. Includes adjustable arm cuff and storage case.',
    price: 49.99,
    category: 'Medical Devices',
    image: 'https://images.pexels.com/photos/327540/pexels-photo-327540.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 35,
    rating: 4.7,
    reviews: 87,
    isRx: false,
    manufacturer: 'HeartWell',
    tags: ['blood pressure', 'heart health', 'monitoring device', 'cardiovascular']
  },
  {
    id: '12',
    name: 'Melatonin 5mg',
    description: 'Natural sleep aid that helps regulate sleep-wake cycles. Non-habit forming and promotes restful sleep. Fast-dissolving tablets with pleasant mint flavor.',
    price: 10.99,
    category: 'Sleep & Relaxation',
    image: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 100,
    rating: 4.5,
    reviews: 189,
    isRx: false,
    dosage: '5mg Tablets',
    manufacturer: 'DreamWell',
    tags: ['sleep aid', 'melatonin', 'insomnia', 'relaxation']
  }
];

export default products;