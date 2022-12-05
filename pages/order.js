import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Order from '../models/order'
import mongoose from 'mongoose';

const MyOrder = ({ order, clearCart }) => {
  const router = useRouter()
  const products = order.products;
  const [date, setDate] = useState()
  useEffect(() => {
    const d = new Date(order.createdAt)
    setDate(d)
    if (router.query.clearCart == 1) {
      clearCart()
    }
  }, [])
  return (
    <div>
      <section className="text-black body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-black-500 tracking-widest">E-Commerce</h2>
              <h1 className="text-black text-xl md:text-3xl title-font font-medium mb-4">Order id: #{order.orderId}</h1>
              <p className="leading-relaxed mb-4">Yay! Your order has been succesfully placed!</p>
              <p className="leading-relaxed mb-4">Order placed on: {date && date.toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p>
                Your Payment Status is:<span className='font-semibold text-slate-700'>{order.status}</span>
              </p>
              <div className="flex mb-4">
                <a className="flex-grow text-center border-black-300 py-2 text-lg px-1">Quantity</a>
                <a className="flex-grow text-center text-black-500 py-2 text-lg px-1">Item Description</a>
                <a className="flex-grow text-center border-black-300 py-2 text-lg px-1">Item Total</a>
              </div>

              {Object.keys(products).map((key) => {
                return <div key={key} className="flex border-t border-black-200 py-2" >
                  <span className="text-black-500">{products[key].name}({products[key].size}/{products[key].variant})</span>
                  <span className="m-auto text-black-900">{products[key].qty}</span>
                  <span className="m-auto text-black-900">₹{products[key].price} X {products[key].qty} = ₹{products[key].price * products[key].qty}</span>
                </div>
              })}

              <div className="flex flex-col my-8">
                <span className="title-font font-medium text-2xl text-black-900">subTotal: ₹{order.amount}</span>
                <div className="my-6">
                  <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                </div>
              </div>
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={"/order.jpg"} />
          </div>
        </div>
      </section >
    </div >
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb://localhost:27017/E-Commerce")
  }
  let order = await Order.findById(context.query.id)


  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  }
}


export default MyOrder;