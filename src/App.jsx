import { useCallback, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Features from "./components/sections/Features";
import Newsletter from "./components/sections/Newsletter";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import ShoppingList from "./components/ShoppingList";
import Modal from "./components/ui/Modal";

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [panel, setPanel] = useState(null);

  const closeDetails = useCallback(() => setSelectedId(null), []);
  const closePanel = useCallback(() => setPanel(null), []);
  const openAdd = () => setPanel("add");

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header onAddProduct={openAdd} onOpenList={() => setPanel("list")} />
        <main className="flex-1">
          <Hero onSelect={setSelectedId} onAddProduct={openAdd} />
          <Marquee />
          <ProductList onSelect={setSelectedId} />
          <Features />
          <Newsletter />
        </main>
        <Footer />
      </div>

      <Modal open={selectedId != null} onClose={closeDetails} label="Product details">
        <ProductDetails id={selectedId} onClose={closeDetails} />
      </Modal>

      <Modal variant="drawer" open={panel === "add"} onClose={closePanel} label="List a product">
        <AddProduct
          onClose={closePanel}
          onCreated={(id) => {
            setPanel(null);
            setSelectedId(id);
          }}
        />
      </Modal>

      <Modal variant="drawer" open={panel === "list"} onClose={closePanel} label="Your shopping list">
        <ShoppingList onClose={closePanel} />
      </Modal>
    </>
  );
}

export default App;
