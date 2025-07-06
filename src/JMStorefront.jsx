import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function JMStorefront() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      price: 45,
      image: "/jacket.jpg",
      description: "Classic oversized vintage denim jacket from the 90s.",
    },
    {
      id: 2,
      name: "Retro Print Dress",
      price: 30,
      image: "/dress.jpg",
      description: "Floral print retro dress, perfect for spring and summer.",
    },
    {
      id: 3,
      name: "Graphic Tee",
      price: 15,
      image: "/tee.jpg",
      description: "Soft cotton tee with bold 80s-style graphic.",
    },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert("Failed to create Stripe checkout session.");
        }
      })
      .catch((err) => {
        console.error("Checkout error:", err);
        alert("Error connecting to Stripe.");
      });
  };

  return (
    <div className="bg-purple-100 min-h-screen p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-purple-900">JM Store Front</h1>
        <Button onClick={() => setShowCart(!showCart)}>
          Cart ({cart.length})
        </Button>
      </header>

      {showCart && (
        <div classNa
