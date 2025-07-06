import { useState } from "react";

export default function JMStorefront() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    { id: 1, name: "Vintage Denim Jacket", price: 45, image: "/jacket.jpg", description: "Classic oversized vintage denim jacket from the 90s." },
    { id: 2, name: "Retro Print Dress", price: 30, image: "/dress.jpg", description: "Floral print retro dress, perfect for spring and summer." },
    { id: 3, name: "Graphic Tee", price: 15, image: "/tee.jpg", description: "Soft cotton tee with bold 80s-style graphic." },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    alert("Stripe checkout would be triggered here.");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>JM Store Front</h1>
      <button onClick={() => setShowCart(!showCart)}>
        🛒 Cart ({cart.length})
      </button>
      {showCart && (
        <div style={{ background: "#f5f5f5", padding: "10px", margin: "10px 0" }}>
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item, idx) => (
                <li key={idx}>{item.name} - ${item.price}</li>
              ))}
              <li><strong>Total: ${total}</strong></li>
            </ul>
          )}
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", width: "200px" }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
