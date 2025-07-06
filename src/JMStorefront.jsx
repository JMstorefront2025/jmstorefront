import React from 'react';

const products = [
  {
    name: 'Vintage Denim Jacket',
    description: 'Classic oversized vintage denim jacket from the 90s.',
    price: 45,
  },
  {
    name: 'Retro Print Dress',
    description: 'Floral print retro dress, perfect for spring and summer.',
    price: 30,
  },
  {
    name: 'Graphic Tee',
    description: 'Soft cotton tee with bold 80s-style graphic.',
    price: 15,
  },
];

export default function JMStorefront() {
  const handleCheckout = async (product) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [product] }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout failed.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      <h1>🛍️ JM Store Front</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {products.map((product) => (
          <div key={product.name} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h2>{product.name}</h2>
            <p><strong>${product.price}</strong></p>
            <p>{product.description}</p>
            <button onClick={() => handleCheckout(product)}>Checkout</button>
          </div>
        ))}
      </div>
    </div>
  );
}
