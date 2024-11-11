import React from 'react';
import { ArrowRight, CircleDot } from 'lucide-react';

export default function ConceptualMaps() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-center mb-12">Mapas do Sistema</h1>
      
      {/* Mapa Conceitual */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Mapa Conceitual</h2>
        <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
          <div className="relative">
            {/* Central Concept */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="bg-pink-100 border-2 border-pink-500 rounded-lg p-4 text-center">
                <h3 className="font-bold text-pink-800">Cupcake Store</h3>
              </div>
            </div>

            {/* Main Branches */}
            <div className="grid grid-cols-2 gap-32 mb-8">
              {/* Left Side */}
              <div className="space-y-8">
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-800">Gestão de Produtos</h4>
                  <ul className="mt-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Cadastro de Cupcakes
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Controle de Estoque
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Categorização
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3">
                  <h4 className="font-semibold text-green-800">Gestão de Pedidos</h4>
                  <ul className="mt-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Processamento
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Acompanhamento
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Histórico
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-8">
                <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-3">
                  <h4 className="font-semibold text-purple-800">Experiência do Cliente</h4>
                  <ul className="mt-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Catálogo
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Carrinho
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Checkout
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-3">
                  <h4 className="font-semibold text-orange-800">Gestão de Usuários</h4>
                  <ul className="mt-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Autenticação
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Perfis
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3" />
                      Endereços
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa Navegacional */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Mapa Navegacional</h2>
        <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
          <div className="space-y-8">
            {/* Main Navigation */}
            <div className="flex justify-center items-center gap-4">
              <div className="bg-pink-100 border-2 border-pink-500 rounded-lg p-3 text-center">
                <span className="font-semibold">Homepage</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
              <div className="bg-pink-100 border-2 border-pink-500 rounded-lg p-3 text-center">
                <span className="font-semibold">Loja</span>
              </div>
            </div>

            {/* User Flow */}
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-4">
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 text-center">
                  <span className="font-semibold">Login</span>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 text-center">
                  <span className="font-semibold">Registro</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 text-center">
                  <span className="font-semibold">Carrinho</span>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 text-center">
                  <span className="font-semibold">Checkout</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-3 text-center">
                  <span className="font-semibold">Perfil</span>
                </div>
                <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-3 text-center">
                  <span className="font-semibold">Pedidos</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-3 text-center">
                  <span className="font-semibold">Admin</span>
                </div>
                <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-3 text-center">
                  <span className="font-semibold">Relatórios</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 border-t border-gray-200 pt-4">
              <h4 className="font-semibold mb-2">Legenda:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-100 border-2 border-pink-500 rounded"></div>
                  <span>Páginas Principais</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-50 border-2 border-blue-300 rounded"></div>
                  <span>Autenticação</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-50 border-2 border-green-300 rounded"></div>
                  <span>Processo de Compra</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-50 border-2 border-purple-300 rounded"></div>
                  <span>Área do Usuário</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-50 border-2 border-orange-300 rounded"></div>
                  <span>Área Administrativa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}