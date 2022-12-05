import React from 'react'
import Link from 'next/link'
import Etext from '../common/Etext';


const Footer = () => {
  return (
    <div>
      <footer className="text-black bg-gray-200 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <Link href={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="cursor-pointer w-10 h-10 text-white p-2 bg-pink-500 rounded-full" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </Link>
              <span className="ml-3 text-xl font-bold text-pink-500">E-Commerce</span>
            </a>
            <p className="mt-2 text-sm text-gray-600 px-4">Wear the &lt;E-Commerce/&gt;</p>
            <p className="text-sm text-gray-600 px-4">Premium Coading Tshirts, Hoodies And Apparals.</p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center font-bold">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <Etext color="#ec4899" variant="h1">SHOAP</Etext>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'/tshirts'}><a className="text-gray-500 hover:text-pink-500">Tshirts</a></Link>
                </li>
                <li>
                  <Link href={'/hoodies'}><a className="text-gray-500 hover:text-pink-500">Hoodies</a></Link>
                </li>
                <li>
                  <Link href={'/stickers'}><a className="text-gray-500 hover:text-pink-500">Stickers</a></Link>
                </li>
                <li>
                  <Link href={'/mugs'}><a className="text-gray-500 hover:text-pink-500">Mugs</a></Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <Etext color="#ec4899" variant="h1">ABOUT US</Etext>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'/tshirts'}><a className="text-gray-500 hover:text-pink-500">Tshirts</a></Link>
                </li>
                <li>
                  <Link href={'/hoodies'}><a className="text-gray-500 hover:text-pink-500">Hoodies</a></Link>
                </li>
                <li>
                  <Link href={'/stickers'}><a className="text-gray-500 hover:text-pink-500">Stickers</a></Link>
                </li>
                <li>
                  <Link href={'/mugs'}><a className="text-gray-500 hover:text-pink-500">Mugs</a></Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <Etext color="#ec4899" variant="h1">POLICY</Etext>
              <nav className="list-none mb-5">
                <li>
                  <Link href={'/tshirts'}><a className="text-gray-500 hover:text-pink-500">Tshirts</a></Link>
                </li>
                <li>
                  <Link href={'/hoodies'}><a className="text-gray-500 hover:text-pink-500">Hoodies</a></Link>
                </li>
                <li>
                  <Link href={'/stickers'}><a className="text-gray-500 hover:text-pink-500">Stickers</a></Link>
                </li>
                <li>
                  <Link href={'/mugs'}><a className="text-gray-500 hover:text-pink-500">Mugs</a></Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <Etext color="#ec4899" variant="h1">SOCIAL</Etext>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'/tshirts'}><a className="text-gray-500 hover:text-pink-500">Tshirts</a></Link>
                </li>
                <li>
                  <Link href={'/hoodies'}><a className="text-gray-500 hover:text-pink-500">Hoodies</a></Link>
                </li>
                <li>
                  <Link href={'/stickers'}><a className="text-gray-500 hover:text-pink-500">Stickers</a></Link>
                </li>
                <li>
                  <Link href={'/mugs'}><a className="text-gray-500 hover:text-pink-500">Mugs</a></Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <hr className="m-4 h-px bg-gray-300 border-0 dark:bg-gray-300"></hr>
        <div className="bg-gray-200">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-black text-sm font-bold text-center sm:text-left">© 2022 E—Commerce.com - All Rights Reserved</p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 font-bold cursor-pointer text-pink-500" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 ">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 font-bold cursor-pointer text-pink-500" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 ">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 font-bold cursor-pointer text-pink-500" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 ">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5 font-bold cursor-pointer text-pink-500" viewBox="0 0 24 24">
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;

