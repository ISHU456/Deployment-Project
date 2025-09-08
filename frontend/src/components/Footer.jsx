import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
    const footerLinks = [
        {
            title: "Explore",
            links: [
                { text: "Home", url: "/" },
                { text: "Products", url: "/products" },
                { text: "Categories", url: "/categories" },
                { text: "Offers", url: "/offers" },
            ]
        },
        {
            title: "Company",
            links: [
                { text: "About", url: "/about" },
                { text: "Contacts", url: "/contacts" },
                { text: "FAQ", url: "/faq" },
                { text: "My Orders", url: "/my-orders" },
            ]
        },
        {
            title: "Quick Links",
            links: [
                { text: "Cart", url: "/cart" },
                { text: "Profile", url: "/profile" },
                { text: "Seller Login", url: "/seller" },
                { text: "Add Address", url: "/add-address" },
            ]
        }
    ];

    return (
        <footer className="mt-16 bg-gradient-to-b from-white to-primary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Logo */}
                    <div className="md:col-span-2">
                        <Link to="/" className="block">
                            <img 
                                className="h-12 w-auto" 
                                src={assets.logo} 
                                alt="IMart Logo"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'fallback-logo.png';
                                }}
                            />
                        </Link>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <Link to="/products" className="px-4 py-2 rounded-full text-white bg-gradient-to-r from-primary to-blue-600 hover:shadow">Shop Now</Link>
                            <Link to="/offers" className="px-4 py-2 rounded-full text-primary border border-primary/30 hover:bg-primary/10">See Offers</Link>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="inline-block w-1 h-4 rounded bg-primary"></span>
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link 
                                                to={link.url}
                                                className="text-sm text-gray-700 hover:text-primary transition-colors hover:underline"
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-200 py-6">
                    <p className="text-center text-sm text-gray-600">
                        © {new Date().getFullYear()} ISHU ANAND MALVIYA. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;