interface Translation {
  home: string;
  products: string;
  cart: string;
  favorites: string;
  profile: string;
  login: string;
  register: string;
  termsAndPolicy: string;
  privacyPolicy: string;
  searchPlaceholder: string;
  footerTagline: string;
  quickLinks: string;
  legal: string;
  contactUs: string;
  allRightsReserved: string;
  shippingPolicy: string;
  returnsPolicy: string;
  addToCart: string;
  addToFavorites: string;
  removeFromFavorites: string;
  price: string;
  checkout: string;
  continueShopping: string;
  emptyCart: string;
  emptyCartMessage: string;
  total: string;
  subtotal: string;
  tax: string;
  shipping: string;
  logOut: string;
  welcome: string;
  featured: string;
  popularProducts: string;
  shopNow: string;
  categories: string;
  reviews: string;
  description: string;
  relatedProducts: string;
  quantity: string;
  available: string;
  outOfStock: string;
  discountBanner: string;
  emailPlaceholder: string;
  subscribe: string;
  paymentSuccessful: string;
  paymentFailed: string;
  orderDetails: string;
  orderConfirmation: string;
  thankYou: string;
  orderNumber: string;
  orderDate: string;
  orderStatus: string;
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: string;
  continueToPay: string;
  paymentInformation: string;
  shippingInformation: string;
  placeOrder: string;
  orderSummary: string;
  emptyFavorites: string;
  emptyFavoritesMessage: string;
}

interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  en: {
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    favorites: 'Favorites',
    profile: 'Profile',
    login: 'Login',
    register: 'Register',
    termsAndPolicy: 'Terms & Policy',
    privacyPolicy: 'Privacy Policy',
    searchPlaceholder: 'Search medicines...',
    footerTagline: 'Your trusted online pharmacy for all your health needs.',
    quickLinks: 'Quick Links',
    legal: 'Legal',
    contactUs: 'Contact Us',
    allRightsReserved: 'All rights reserved.',
    shippingPolicy: 'Shipping Policy',
    returnsPolicy: 'Returns Policy',
    addToCart: 'Add to Cart',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    price: 'Price',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    emptyCart: 'Your cart is empty',
    emptyCartMessage: 'You have no items in your shopping cart. Let\'s go buy something!',
    total: 'Total',
    subtotal: 'Subtotal',
    tax: 'Tax',
    shipping: 'Shipping',
    logOut: 'Log Out',
    welcome: 'Welcome to MediShop',
    featured: 'Featured Products',
    popularProducts: 'Popular Products',
    shopNow: 'Shop Now',
    categories: 'Categories',
    reviews: 'Reviews',
    description: 'Description',
    relatedProducts: 'Related Products',
    quantity: 'Quantity',
    available: 'Available',
    outOfStock: 'Out of Stock',
    discountBanner: 'Special Offer: 10% off on your first order with code FIRST10',
    emailPlaceholder: 'Your email address',
    subscribe: 'Subscribe',
    paymentSuccessful: 'Payment Successful',
    paymentFailed: 'Payment Failed',
    orderDetails: 'Order Details',
    orderConfirmation: 'Order Confirmation',
    thankYou: 'Thank you for your order!',
    orderNumber: 'Order Number',
    orderDate: 'Order Date',
    orderStatus: 'Order Status',
    shippingAddress: 'Shipping Address',
    billingAddress: 'Billing Address',
    paymentMethod: 'Payment Method',
    continueToPay: 'Continue to Payment',
    paymentInformation: 'Payment Information',
    shippingInformation: 'Shipping Information',
    placeOrder: 'Place Order',
    orderSummary: 'Order Summary',
    emptyFavorites: 'Your favorites list is empty',
    emptyFavoritesMessage: 'You haven\'t added any products to your favorites yet. Discover our products!'
  },
  es: {
    home: 'Inicio',
    products: 'Productos',
    cart: 'Carrito',
    favorites: 'Favoritos',
    profile: 'Perfil',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    termsAndPolicy: 'Términos y Políticas',
    privacyPolicy: 'Política de Privacidad',
    searchPlaceholder: 'Buscar medicamentos...',
    footerTagline: 'Su farmacia en línea de confianza para todas sus necesidades de salud.',
    quickLinks: 'Enlaces Rápidos',
    legal: 'Legal',
    contactUs: 'Contáctenos',
    allRightsReserved: 'Todos los derechos reservados.',
    shippingPolicy: 'Política de Envíos',
    returnsPolicy: 'Política de Devoluciones',
    addToCart: 'Añadir al Carrito',
    addToFavorites: 'Añadir a Favoritos',
    removeFromFavorites: 'Quitar de Favoritos',
    price: 'Precio',
    checkout: 'Pagar',
    continueShopping: 'Seguir Comprando',
    emptyCart: 'Tu carrito está vacío',
    emptyCartMessage: 'No tienes artículos en tu carrito de compras. ¡Vamos a comprar algo!',
    total: 'Total',
    subtotal: 'Subtotal',
    tax: 'Impuestos',
    shipping: 'Envío',
    logOut: 'Cerrar Sesión',
    welcome: 'Bienvenido a MediShop',
    featured: 'Productos Destacados',
    popularProducts: 'Productos Populares',
    shopNow: 'Comprar Ahora',
    categories: 'Categorías',
    reviews: 'Reseñas',
    description: 'Descripción',
    relatedProducts: 'Productos Relacionados',
    quantity: 'Cantidad',
    available: 'Disponible',
    outOfStock: 'Agotado',
    discountBanner: 'Oferta Especial: 10% de descuento en tu primer pedido con el código FIRST10',
    emailPlaceholder: 'Tu dirección de correo electrónico',
    subscribe: 'Suscribirse',
    paymentSuccessful: 'Pago Exitoso',
    paymentFailed: 'Pago Fallido',
    orderDetails: 'Detalles del Pedido',
    orderConfirmation: 'Confirmación del Pedido',
    thankYou: '¡Gracias por tu pedido!',
    orderNumber: 'Número de Pedido',
    orderDate: 'Fecha del Pedido',
    orderStatus: 'Estado del Pedido',
    shippingAddress: 'Dirección de Envío',
    billingAddress: 'Dirección de Facturación',
    paymentMethod: 'Método de Pago',
    continueToPay: 'Continuar al Pago',
    paymentInformation: 'Información de Pago',
    shippingInformation: 'Información de Envío',
    placeOrder: 'Realizar Pedido',
    orderSummary: 'Resumen del Pedido',
    emptyFavorites: 'Tu lista de favoritos está vacía',
    emptyFavoritesMessage: 'Aún no has añadido ningún producto a tus favoritos. ¡Descubre nuestros productos!'
  }
};

export default translations;