import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";


import { useEffect, useState } from "react";

const Products = () => {

  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
    const productsPerPage = 4;
   const navigate = useNavigate();

    


  useEffect(() => {
    fetch(`http://localhost:3000/products?_page=${page}&_limit=${productsPerPage}`)
    .then(res => {
      const total = res.headers.get("X-Total-Count");
      setTotalProducts(Number(total));
      return res.json();

    })
    .then(data => setProduct(data))
    .catch((err) => console.log("Error",err));
  
  }, [page]);



const totalPages = Math.ceil(totalProducts/ productsPerPage);

const handleDelete = (id) =>{
    fetch(`http://localhost:3000/products/${id}`,{
      method : "DELETE"
    })
    .then(()=>{
      setProduct(product.filter(item => item.id !== id));
    });
}




 

  return (
    <div>
        <Navbar/> 
       
       <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-10 text-center">
           
         
               

      <h1 className="text-4xl font-bold text-white mb-10">
        ✨ Premium Product Store
      </h1>

      <div className="flex justify-center gap-8 flex-wrap">
        {product.map((el) => (
          <div
            key={el.id}
            className="w-56 bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-white shadow-2xl  cursor-pointer"
          >
            <img
              src={el.image}
              alt=""
              className="w-full h-36 object-contain mb-3"
            />

            <h4 className="font-semibold">
              {el.title.slice(0, 20)}...
            </h4>

            <p className="mt-2 font-bold">₹ {el.price}</p>

            <p className="text-sm mt-1">
              ⭐ {el.rating?.rate} ({el.rating?.count})
            </p>
             <div className='flex gap-8 mt-4'>
               <button
  onClick={() => navigate(`/editproducts/${el.id}`)}
  className="px-3 py-1 bg-blue-500 text-white rounded"
>
  Update
</button>
           

              <button
                onClick={() => handleDelete(el.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center items-center gap-6">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-6 py-2 rounded-full bg-white font-bold hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-white text-lg font-bold">
          {page}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= 5}
          className="px-6 py-2 rounded-full bg-white font-bold hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  )
}

export default Products;