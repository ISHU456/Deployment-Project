import React from 'react'

const About = () => {
  const pillars = [
    { title: 'Fast Delivery', desc: 'Swift shipping with real-time order status.' },
    { title: 'Quality Products', desc: 'Curated catalog across multiple categories.' },
    { title: 'Secure Checkout', desc: 'Demo online payment flow to simulate checkout.' },
  ];

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">About IMART</h1>
        <p className="text-gray-600 leading-relaxed">
          IMART is a MERN-based demo e-commerce project built to showcase a modern shopping experience—
          refined UI, category browsing, product details with ratings, a flexible cart, and a simple online demo payment.
          Extend it with your own content, business logic, and integrations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {pillars.map((p, i) => (
          <div key={i} className="p-5 rounded-xl bg-white border shadow-sm">
            <p className="text-xl font-semibold mb-2">{p.title}</p>
            <p className="text-gray-600 text-sm">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-xl bg-white border shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-600">Deliver convenience and value with an accessible, delightful shopping experience.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="#" className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-primary to-blue-600 hover:shadow">Join our newsletter</a>
          <a href="#" className="px-4 py-2 rounded-lg text-primary border border-primary/30 hover:bg-primary/10">Partner with us</a>
        </div>
      </div>
    </div>
  )
}

export default About


