import Head from 'next/head'
import Map from './map'
import React from 'react';
import Product from "../models/product"
import mongoose from "mongoose";
import Link from 'next/link';
import Chart from './chart';
import Etext from '../common/Etext';

export default function Home({ products }) {
  return (
    <>
      <div>
        <Head>
          <title>E-Commerce</title>
          <meta name="description" content="E-Commerce" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <img src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=1380&t=st=1666257667~exp=1666258267~hmac=30baa855f455547d7e661a90b6cd1b58360b7ac41eec66e7deda51caebeea7d7" alt="" width={10000} />
        </div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-wrap w-full flex-col items-center text-center">
              <Etext color="#000" variant="h1">Welcome To E-Commerce Store.</Etext>
              <p className="text-gray-500">Welcome To E-Commerce Store And New Collection.</p>
            </div>
            <div className="flex flex-wrap cursor-pointer">
              {/* {Object.keys(products).length === 0 && <p>Sorry all the Tshirts are Currently out of stock. New stock coming soon. Stay Tuned!</p>} */}
              {Object.keys(products).map((item) => {
                return <Link key={products[item].id} href={`/product/${products[item].slug}`} >
                  <div className="xl:w-1/4 md:w-1/2 p-4 mx-auto">
                    <div className="border border-gray-200 p-6 rounded-lg">
                      <a className="block relative rounded overflow-hidden">
                        <img alt="ecommerce" className="m-auto " src={products[item].image} width={"150vh"} />
                      </a>
                    </div>
                  </div>
                </Link>
              })}
            </div>
          </div>
        </section>
      </div >
      <Map />
      <Chart />
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb://localhost:27017/E-Commerce")
  }
  let products = await Product.find()
  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
      else {
        tshirts[item.title].color = []
        tshirts[item.title].size = []
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  }
}

