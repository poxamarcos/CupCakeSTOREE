import React, { useState } from 'react';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';
import { Search } from 'lucide-react';

export default function Shop() {
  const cupcakes = useStore((state) => state.cupcakes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(cupcakes.map((cupcake) => cupcake.category))];

  const filteredCupcakes = cupcakes.filter((cupcake) => {
    const matchesSearch = cupcake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cupcake.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || cupcake.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Cupcakes</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search cupcakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredCupcakes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No cupcakes found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCupcakes.map((cupcake) => (
            <ProductCard
              key={cupcake.id}
              id={cupcake.id}
              name={cupcake.name}
              description={cupcake.description}
              price={cupcake.price}
              image={cupcake.image}
              stock={cupcake.stock}
            />
          ))}
        </div>
      )}
    </div>
  );
}