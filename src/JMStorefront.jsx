import React from 'react';

export default function JMStorefront() {
  const products = [
    {
      id: 1,
      name: 'Vintage Denim Jacket',
      price: 45,
      description: 'Classic oversized vintage denim jacket from the 90s.',
      emoji: '🧥',
    },
    {
      id: 2,
      name: 'Retro Print Dress',
      price: 30,
      description: 'Floral print retro dress, perfect for spring and summer.',
      emoji: '🌸',
    },
    {
      id: 3,
      name: 'Graphic Tee',
      price: 15,
      description: 'Soft cotton tee with bold 80s-style graphic.',
      emoji: '🎨',
    },
  ];

  const handleCheckout = async (product) => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: [product] }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Stripe checkout would be triggered here.');
      }
    } catch (err) {
      alert('Error starting checkout: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🚀 Live from JM Store!</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '16px',
              width: '200px',
              borderRadius: '8px',
            }}
          >
            <h3>
              {product.emoji} {product.name}
            </h3>
            <p><strong>${product.price}</strong></p>
            <p>{product.description}</p>
            <button onClick={() => handleCheckout(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
