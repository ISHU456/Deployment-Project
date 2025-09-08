import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'

const faqs = [
  { q: 'How do I track my order?', a: 'Go to My Orders to see real-time status.' },
  { q: 'When will my order arrive?', a: 'Most orders are delivered within 2-5 business days depending on your location.' },
  { q: 'What payment methods are supported?', a: 'Cash on Delivery and an online demo payment flow are supported in this project.' },
  { q: 'Can I cancel my order?', a: 'Yes, you can cancel before the order is shipped. Visit My Orders and choose Cancel if available.' },
  { q: 'Can I return items?', a: 'Eligible items can be returned within 7 days of delivery if unused and in original packaging.' },
  { q: 'Do you charge for shipping?', a: 'Shipping is currently free for most orders. Any exceptions will be shown at checkout.' },
  { q: 'How are taxes calculated?', a: 'A demo 2% tax is added to the order total in this project.' },
  { q: 'How can I contact support?', a: 'Visit the Contacts page to reach us via form or the provided contact details.' },
]

const FAQ = () => {
  const { navigate } = useAppContext();
  const [openIdx, setOpenIdx] = useState(null);

  const accentColors = [
    'from-primary to-blue-500',
    'from-pink-500 to-purple-500',
    'from-amber-500 to-orange-500',
    'from-emerald-500 to-teal-500',
  ];

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((f, i) => (
          <button
            key={i}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className={`text-left p-5 rounded-xl border shadow-sm bg-white hover:shadow-md transition group relative overflow-hidden`}
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentColors[i % accentColors.length]}`}></div>
            <p className="font-semibold text-gray-900 mb-2 flex items-start justify-between gap-4">
              <span>{f.q}</span>
              <span className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-sm bg-primary transition-transform ${openIdx === i ? 'rotate-45' : ''}`}>+</span>
            </p>
            <p className={`text-gray-600 leading-relaxed text-sm ${openIdx === i ? 'block' : 'hidden'}`}>{f.a}</p>
          </button>
        ))}
      </div>
      <div className="mt-10 p-5 rounded-xl border bg-white shadow-sm">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate('/contacts')} className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-primary to-blue-600 hover:shadow">Contact Support</button>
          <button onClick={() => navigate('/products')} className="px-4 py-2 rounded-lg text-primary border border-primary/30 hover:bg-primary/10">Browse Products</button>
        </div>
      </div>
    </div>
  )
}

export default FAQ


