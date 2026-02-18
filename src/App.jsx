import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store';

// Pages
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import SavedAddresses from './pages/SavedAddresses';
import PaymentMethods from './pages/PaymentMethods';
import AccountSettings from './pages/AccountSettings';
import HelpSupport from './pages/HelpSupport';
import ChatBot from './components/ChatBot';

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function ChatBotWrapper() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <ChatBot /> : null;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-tracking/:orderId"
          element={
            <ProtectedRoute>
              <OrderTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-addresses"
          element={
            <ProtectedRoute>
              <SavedAddresses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-methods"
          element={
            <ProtectedRoute>
              <PaymentMethods />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account-settings"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help-support"
          element={
            <ProtectedRoute>
              <HelpSupport />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ChatBotWrapper />
    </Router>
  );
}

export default App;
