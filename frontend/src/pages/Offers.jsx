import React from 'react'
import { useAppContext } from '../context/AppContext'

const Offers = () => {
  const categories = [
    {
      title: 'Fashion Deals',
      items: [
        { title: 'Mega Sale', desc: 'Up to 50% off on select styles' },
        { title: 'Buy 2 Get 1', desc: 'On tees and casual wear' },
      ]
    },
    {
      title: 'Grocery Savings',
      items: [
        { title: 'Staples Combo', desc: 'Save on rice, atta & more' },
        { title: 'Fresh Fruits', desc: 'Extra 10% off on seasonal picks' },
      ]
    },
    {
      title: 'Electronics',
      items: [
        { title: 'Gadget Bonanza', desc: 'Headphones & accessories under ₹999' },
        { title: 'Smart Picks', desc: 'Top-rated devices on discount' },
      ]
    }
  ]

  const { navigate } = useAppContext();

  const accents = [
    'from-fuchsia-500 to-rose-500',
    'from-blue-500 to-cyan-500',
    'from-amber-500 to-orange-500',
  ];

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Offers</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, ci) => (
          <div key={ci} className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accents[ci % accents.length]}`}></div>
            <p className="text-xl font-semibold mb-3">{cat.title}</p>
            <div className="space-y-3">
              {cat.items.map((o, i) => (
                <button
                  key={i}
                  onClick={() => navigate('/products')}
                  className="w-full text-left p-3 rounded-lg border hover:shadow-md hover:bg-primary/5 transition group"
                >
                  <p className="font-medium flex items-center justify-between">
                    <span>{o.title}</span>
                    <span className="text-xs text-white bg-primary rounded-full px-2 py-0.5 group-hover:scale-105 transition">View</span>
                  </p>
                  <p className="text-gray-600 text-sm">{o.desc}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 p-5 rounded-xl bg-white border shadow-sm flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-700">Tip: Check this page often—offers rotate frequently.</span>
        <button onClick={() => navigate('/products')} className="ml-auto px-4 py-2 rounded-lg text-white bg-gradient-to-r from-primary to-blue-600 hover:shadow">Shop Now</button>
      </div>
    </div>
  )
}

export default Offers


