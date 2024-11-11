import React, { useState } from 'react';
import { useStore } from '../store';
import { Users, ShoppingBag, DollarSign, BarChart2, Cake } from 'lucide-react';
import { CupcakeForm } from '../components/CupcakeForm';
import { CupcakeList } from '../components/CupcakeList';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cupcakes' | 'orders'>('dashboard');
  const { orders, cupcakes, addCupcake, updateCupcake, deleteCupcake } = useStore();
  const users = useStore((state) => state.users);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'dashboard'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart2 className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('cupcakes')}
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'cupcakes'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Cake className="inline-block w-5 h-5 mr-2" />
            Cupcakes
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <ShoppingBag className="inline-block w-5 h-5 mr-2" />
            Orders
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-pink-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="w-10 h-10 text-pink-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900">${totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <ShoppingBag className="w-10 h-10 text-pink-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-10 h-10 text-pink-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalUsers}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cupcakes' && (
          <div className="space-y-8">
            <div className="bg-pink-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Cupcake</h3>
              <CupcakeForm onSubmit={addCupcake} />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Cupcakes</h3>
              <CupcakeList
                cupcakes={cupcakes}
                onUpdate={updateCupcake}
                onDelete={deleteCupcake}
              />
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {users.find(u => u.id === order.userId)?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => useStore.getState().updateOrderStatus(order.id, e.target.value as any)}
                          className="text-sm rounded-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => {
                            // View order details
                          }}
                          className="text-pink-600 hover:text-pink-700"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}