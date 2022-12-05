import Link from 'next/link'
import { useRef, useEffect } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useState } from 'react';
import { useRouter } from 'next/router';
import EButton from '../common/EButton';

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const router = useRouter()
  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true)
    let exempted = ['/checkout', '/order', '/orders', '/myaccount']
    if (exempted.includes(router.pathname)) {
      setSidebar(false)
    }
  }, [])
  const toggeleCart = () => {
    setSidebar(!sidebar)
  }
  const ref = useRef()

  return (
    <>
      {!sidebar && <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="fixed right-10 top-4 z-30 text-pink-500 cursor-pointer">
        {dropdown && <div className="absolute right-5 border top-5 py-4 bg-white shadow-lg rounded-md px-5 w-32 z-30">
          <ul>
            <Link href={'/myaccount'}><a><li className="py-1 text-black hover:text-pink-600 text-sm font-bold">My Account</li></a></Link>
            <Link href={'/myorders'}><a><li className="py-1 text-black hover:text-pink-600 text-sm font-bold">My Orders</li></a></Link>
            <li onClick={logout} className="py-1 text-black hover:text-pink-600 text-sm font-bold">Logout</li>
          </ul>
        </div>}
        {user.value && <MdAccountCircle className='text-xl md:text-2xl mx-2' />}
      </span>}
      <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-gray-200 z-10 ${!sidebar && 'overflow-hidden'}`}>
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-start text-black">
            <Link href={"/"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="cursor-pointer w-10 h-10 text-white p-2 bg-pink-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </Link>
            <span className="ml-3 text-xl text-pink-600 font-bold">E-Commerce</span>
          </a>
        </div>
        <div className='nav'>
          <ul className='flex items-center space-x-6 font-bold md:text-md'>
            <Link href={"/tshirts"}><a><li className="hover:text-pink-600">Tshirts</li></a></Link>
            <Link href={"/hoodies"}><a><li className="hover:text-pink-600">Hoodies</li></a></Link>
            <Link href={"/stickers"}><a><li className="hover:text-pink-600">Stickers</li></a></Link>
            <Link href={"/mugs"}><a><li className="hover:text-pink-600">Mugs</li></a></Link>
          </ul>
        </div>
        <div className='cart absolute items-center right-0 top-3 mx-5 cursor-pointer text-pink-500 flex'>
          {!user.value && <EButton><Link href={"/login"}><a>Login</a></Link></EButton>}
          <AiOutlineShoppingCart onClick={toggeleCart} className='text-xl md:text-2xl mt-1 mb-4 ml-2' />
        </div>
        <div ref={ref} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 bg-pink-100 px-8 py-10 transition-all ${sidebar ? 'right-0' : '-right-96'}`}>
          <div className="my-4 font-bold text-center">SHOAPPING CART</div>
          <span onClick={toggeleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 &&
              <div className="my-4 font-semibold">Your Cart is Empty!</div>
            }
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <span className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</span>
                    <span className="flex font-semibold items-center justify-center w-1/3 text-lg"><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer text-pink-500" /> <span className="mx-2 text-sm">{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer text-pink-500" /></span>
                  </div>
                </li>
              )
            })}
          </ol>
          <div className="font-bold my-2">subTotal: ₹{subTotal}</div>
          <div className="flex">
            <EButton disabled={Object.keys(cart).length === 0} styles={{ margin: 10 }}><Link href={"/checkout"}>Checkout</Link></EButton>
            <EButton disabled={Object.keys(cart).length === 0} event={clearCart} styles={{ margin: 10 }}>ClearCart</EButton>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
