import React from 'react';
import { Link } from 'react-router-dom';
import { Cake, Star, Truck, Tag } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-6">
        <div className="container mx-auto px-4 flex items-center justify-center gap-4">
          <Tag className="h-6 w-6 animate-bounce" />
          <div className="text-center">
            <p className="text-lg font-semibold">Special Offer! Use code <span className="font-mono bg-white text-pink-600 px-2 py-1 rounded">SWEET10</span></p>
            <p className="text-sm">Get 10% off on all cupcakes!</p>
          </div>
        </div>
      </div>

      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-800">
          Delicious Cupcakes Made with Love
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our handcrafted cupcakes made with premium ingredients and topped with love.
          Perfect for any occasion!
        </p>
        <Link
          to="/shop"
          className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
        >
          Shop Now
        </Link>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <Cake className="h-8 w-8 text-pink-500" />
          </div>
          <h3 className="text-xl font-semibold">Fresh Daily</h3>
          <p className="text-gray-600">Baked fresh every morning for the best taste</p>
        </div>
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <Star className="h-8 w-8 text-pink-500" />
          </div>
          <h3 className="text-xl font-semibold">Premium Quality</h3>
          <p className="text-gray-600">Only the finest ingredients make it into our cupcakes</p>
        </div>
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <Truck className="h-8 w-8 text-pink-500" />
          </div>
          <h3 className="text-xl font-semibold">Fast Delivery</h3>
          <p className="text-gray-600">Same-day delivery available in select areas</p>
        </div>
      </div>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80"
          alt="Cupcake selection"
          className="rounded-lg shadow-lg"
        />
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Our Signature Collection
          </h2>
          <p className="text-gray-600">
            From classic vanilla to exotic flavors, our signature collection features
            something for everyone. Each cupcake is carefully crafted and decorated
            to perfection.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition"
          >
            View Collection
          </Link>
        </div>
      </section>
    </div>
  );
}