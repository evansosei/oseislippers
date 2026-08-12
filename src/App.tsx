import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutSection } from './components/CheckoutSection';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { UserDashboard } from './components/UserDashboard';
import { FitAssistantModal } from './components/FitAssistantModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { InvoiceModal } from './components/InvoiceModal';
import { Footer } from './components/Footer';

const MainAppContent: React.FC = () => {
  const { activeTab } = useShop();

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1917] font-sans flex flex-col justify-between selection:bg-[#8C7A6B] selection:text-white">
      <div>
        <Header />

        <main id="main-content-view">
          {activeTab === 'shop' && (
            <>
              <HeroBanner />
              <ProductGrid />
            </>
          )}

          {activeTab === 'checkout' && <CheckoutSection />}

          {activeTab === 'dashboard' && <UserDashboard />}

          {activeTab === 'confirmation' && <OrderConfirmationModal />}
        </main>
      </div>

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <ProductDetailModal />
      <FitAssistantModal />
      <SizeGuideModal />
      <InvoiceModal />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
