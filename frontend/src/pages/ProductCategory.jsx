import React from 'react'
import { useAppContext } from '../context/AppContext'
import { categories } from '../assets/assets';
import {useParams} from 'react-router-dom'
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const {products} = useAppContext();
    const {category} = useParams(); 
    const searchCategory = categories.find((item)=>item.path.toLowerCase()===category);
    const filteredProducts = products.filter((product)=>product.category.toLowerCase()===category);

    
    return (
      <div className='mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
          {searchCategory && (
              <div className="flex flex-col items-start sm:items-end w-max mb-6">
                  <p className="text-xl sm:text-2xl font-medium text-gray-800">{searchCategory.text.toUpperCase()}</p>
                  <div className='w-16 h-0.5 bg-primary rounded-full mt-2'></div>
              </div>
          )}
          {filteredProducts.length>0?(
            <div className='grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] gap-3 md:gap-6 mt-6'>
                {filteredProducts.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
          ):(
            <div className='flex items-center justify-center h-[60vh]'>
                <p className='text-gray-500 text-lg'>No products to display in this category</p>
            </div>
          )}
      </div>
    )
}

export default ProductCategory