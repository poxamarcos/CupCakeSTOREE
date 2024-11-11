import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { CupcakeForm } from './CupcakeForm';

interface Cupcake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface CupcakeListProps {
  cupcakes: Cupcake[];
  onUpdate: (id: string, data: Partial<Cupcake>) => void;
  onDelete: (id: string) => void;
}

export function CupcakeList({ cupcakes, onUpdate, onDelete }: CupcakeListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {cupcakes.map((cupcake) => (
        <div key={cupcake.id} className="bg-white rounded-lg shadow p-6">
          {editingId === cupcake.id ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Edit Cupcake</h3>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
              <CupcakeForm
                initialData={cupcake}
                onSubmit={(data) => {
                  onUpdate(cupcake.id, data);
                  setEditingId(null);
                }}
              />
            </div>
          ) : (
            <div className="flex items-start gap-4">
              <img
                src={cupcake.image}
                alt={cupcake.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{cupcake.name}</h3>
                    <p className="text-sm text-gray-600">{cupcake.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingId(cupcake.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(cupcake.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900">
                    ${cupcake.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Category: {cupcake.category}
                  </span>
                  <span className={`text-sm ${
                    cupcake.stock > 10 ? 'text-green-600' :
                    cupcake.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    Stock: {cupcake.stock}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}