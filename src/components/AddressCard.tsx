import React from 'react';
import { MapPin, Trash2 } from 'lucide-react';
import { Address } from '../types';

interface AddressCardProps {
  address: Address;
  isDefault: boolean;
  onSetDefault: () => void;
  onDelete: () => void;
}

export function AddressCard({ address, isDefault, onSetDefault, onDelete }: AddressCardProps) {
  return (
    <div className={`p-4 rounded-lg border ${isDefault ? 'border-pink-500' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 text-gray-500 mt-1" />
          <div>
            <p className="font-medium text-gray-900">{address.street}</p>
            <p className="text-sm text-gray-600">
              {address.city}, {address.state} {address.zipCode}
            </p>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      {!isDefault && (
        <button
          onClick={onSetDefault}
          className="mt-2 text-sm text-pink-600 hover:text-pink-700"
        >
          Set as default
        </button>
      )}
    </div>
  );
}