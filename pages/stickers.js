import React from 'react';
import Product from "../models/product"
import mongoose from "mongoose";
import Link from 'next/link';
import Etext from '../common/Etext';


const Stickers = ({ products }) => {

  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && <p>Sorry all the Stickers are Currently out of stock. New stock coming soon. Stay Tuned!</p>}
            {Object.keys(products).map((item) => {
              return <Link key={products[item].id} href={`/product/${products[item].slug}`}>
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer">
                  <a className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className="m-auto" src={products[item].image} width={"250vh"} />
                  </a>
                  <div className="mt-4 text-center">
                    <Etext color="#808080" variant="h1">Stickers</Etext>
                    <Etext color="#000" variant="h1">{products[item].title}</Etext>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes('S') && <span className="border border-gray-300 px-1 mx-1"> S </span>}
                      {products[item].size.includes('M') && <span className="border border-gray-300 px-1 mx-1"> M </span>}
                      {products[item].size.includes('L') && <span className="border border-gray-300 px-1 mx-1"> L </span>}
                      {products[item].size.includes('XL') && <span className="border border-gray-300 px-1 mx-1"> XL </span>}
                      {products[item].size.includes('XXL') && <span className="border border-gray-300 px-1 mx-1"> XXL </span>}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>
    </div>
  );
}; 3
export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb://localhost:27017/E-Commerce")
  }
  let products = await Product.find({ categary: "stickers" })
  let stickers = {}
  for (let item of products) {
    if (item.title in stickers) {
      if (!stickers[item.title].color.includes(item.color) && item.availableQty > 0) {
        stickers[item.title].color.push(item.color)
      }
      if (!stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
        stickers[item.title].size.push(item.size)
      }
    }
    else {
      stickers[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        stickers[item.title].color = [item.color]
        stickers[item.title].size = [item.size]
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(stickers)) },
  }
}

export default Stickers;
