# MediQuick - Medical Supplies Delivery App

A modern, fully-functional medical supplies delivery application built with React, Vite, Tailwind CSS, and shadcn/ui. This is a **static website with mock data** - no backend or database required.

## 🚀 Features

### ✅ Complete User Flow
- **Authentication System**
  - Splash Screen with animated logo
  - Login with email/password
  - Registration with user type selection
  - Forgot Password functionality

- **Home Dashboard**
  - Search bar for products
  - Category filters (Medicine, PPE, Equipment, Emergency Kits)
  - Featured products showcase
  - Nearby suppliers listing
  - Real-time cart count

- **Product Management**
  - Product listing with filters and sorting
  - Detailed product pages with:
    - Product images (emoji placeholders)
    - Descriptions and specifications
    - Stock availability indicators
    - Customer reviews
    - Quantity selector
    - Add to cart functionality

- **Shopping Cart**
  - View cart items
  - Adjust quantities
  - Remove items
  - Order summary with delivery fee
  - Proceed to checkout

- **Checkout Process**
  - Delivery address selection
  - Multiple payment methods (COD, GCash, Card)
  - Order summary review
  - Place order confirmation

- **Order Tracking**
  - Real-time order status (Processing, Out for Delivery, Delivered)
  - Progress tracker visualization
  - Delivery information (rider details, contact)
  - Estimated arrival time

- **User Profile**
  - Order statistics
  - Order history
  - Account settings menu
  - Saved addresses
  - Payment methods
  - Logout functionality

## 🎨 Design Features

### Healthcare-Themed UI
- **Color Palette**:
  - Primary: Medical Blue (#3B82F6)
  - Success: Medical Green (#059669)
  - Emergency: Red (#DC2626)
  - Clean white backgrounds with subtle grays

### UX Principles
- ✅ Mobile-first responsive design
- ✅ Minimal clicks to checkout
- ✅ Clear call-to-action buttons
- ✅ High contrast for readability
- ✅ Smooth animations and transitions
- ✅ Intuitive navigation with bottom nav bar

## 📦 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **UI Components**: shadcn/ui
- **State Management**: Zustand (with persistence)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone or navigate to the project**
   ```bash
   cd C:\Users\johnj\OneDrive\Desktop\MediCare
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

## 📱 How to Use

### Quick Start Guide

1. **Launch the App**
   - The splash screen will appear for 2.5 seconds
   - You'll be redirected to the login page

2. **Login/Register**
   - **Quick Login**: Enter any email and password to login (mock authentication)
   - **Or Register**: Create a new account with your details
   - Select user type: Individual, Healthcare Professional, Clinic/Hospital, Pharmacy, or Emergency Responder

3. **Browse Products**
   - Use the search bar to find specific items
   - Filter by categories (Medicine, PPE, Equipment, Emergency Kits)
   - Click on any product to view details

4. **Add to Cart**
   - On product details page, select quantity
   - Click "Add to Cart"
   - View cart from the top-right cart icon

5. **Checkout**
   - Review items in cart
   - Click "Proceed to Checkout"
   - Select delivery address
   - Choose payment method
   - Place order

6. **Track Order**
   - After placing order, you'll be redirected to order tracking
   - View real-time status updates
   - Access order history from Profile or Orders tab

## 📂 Project Structure

```
MediCare/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   └── button.jsx
│   │   └── BottomNav.jsx    # Bottom navigation bar
│   ├── data/
│   │   └── mockData.js      # All mock data (products, orders, etc.)
│   ├── pages/
│   │   ├── SplashScreen.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderTracking.jsx
│   │   ├── Orders.jsx
│   │   └── Profile.jsx
│   ├── store/
│   │   └── index.js         # Zustand stores (cart, auth, orders)
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── components.json          # shadcn/ui config
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── package.json
```

## 🎯 Key Features Explained

### Mock Data System
All data is stored in `src/data/mockData.js`:
- **8 Products** across 4 categories
- **4 Suppliers** with ratings and delivery times
- **Payment Methods**: Cash on Delivery, GCash, Credit/Debit Card
- **Saved Addresses**: Home and Clinic locations
- **Order Statuses**: Processing, Out for Delivery, Delivered

### State Management (Zustand)
- **Cart Store**: Manages shopping cart with persistence
- **Auth Store**: Handles user authentication
- **Order Store**: Tracks order history and current orders

### Responsive Design
- Optimized for mobile devices (max-width: 448px)
- Desktop view shows mobile app container centered
- All interactions work seamlessly on touch devices

## 🎨 Customization

### Adding New Products
Edit `src/data/mockData.js`:

```javascript
{
  id: 9,
  name: 'Your Product Name',
  category: 'Medicine', // or 'PPE', 'Equipment', 'Emergency Kits'
  price: 299.00,
  description: 'Product description',
  dosage: 'Usage instructions',
  stock: 100,
  supplier: 'Supplier Name',
  rating: 4.5,
  reviews: 50,
}
```

### Changing Colors
Edit `src/index.css` CSS variables:

```css
:root {
  --medical-blue: 221.2 83.2% 53.3%;
  --medical-green: 142.1 76.2% 36.3%;
  --emergency-red: 0 84.2% 60.2%;
}
```

## 🚀 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## 📝 Notes

- **No Backend Required**: All functionality uses mock data and local storage
- **No Database**: Cart and orders persist in browser localStorage
- **Mock Authentication**: Any email/password combination will work for login
- **Static Deployment**: Can be deployed to Netlify, Vercel, GitHub Pages, etc.

## 🎓 Learning Resources

This project demonstrates:
- React functional components and hooks
- React Router for navigation
- Zustand for state management
- Tailwind CSS for styling
- Component composition
- Form handling
- Protected routes
- Local storage persistence

## 📄 License

This is a demonstration project for educational purposes.

## 👨‍💻 Developer

Built with ❤️ using React, Vite, Tailwind CSS, and shadcn/ui

---

**Enjoy using MediQuick! 🏥💊**
