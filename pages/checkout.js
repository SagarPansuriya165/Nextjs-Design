import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import EButton from '../common/EButton';
import Etext from '../common/Etext';


const checkout = ({ cart, subTotal, addToCart, removeFromCart, toggleCart }) => {


  useEffect(() => {
    if (Object.keys(cart).length == 0) {
      router.push('/')
    }
  })

  const router = useRouter()

  const ref = useRef()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [user, setUser] = useState({ value: null })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('myuser'))
    if (user) {
      setUser(user)
      setEmail(user.email)
      fetchData(user.token)
    }
  }, [])
  const fetchData = async (token) => {
    let data = { token: token }
    let a = await fetch('http://localhost:3000/api/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let res = await a.json()
    setName(res.name)
    setAddress(res.address)
    setPhone(res.phone)
    setPincode(res.pincode)
    getPincode(res.pincode)
  }

  const getPincode = async (pin) => {
    let pins = await fetch('http://localhost:3000/api/pincode')
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setState(pinJson[pin][1])
      setCity(pinJson[pin][0])
    } else {
      setState('')
      setCity('')
    }
  }


  const handleChange = async (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    } else if (e.target.name == 'email') {
      setEmail(e.target.value)
    } else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    } else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length == 6) {
        getPincode(e.target.value)
      } else {
        setState('')
        setCity('')
      }
    } else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
  }

  const initiatePayment = async () => {


    if (phone.length !== 10 || pincode.length !== 6) {
      toast.error('Please enter valid details', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      let oid = Math.floor(Math.random() * Date.now());
      const data = { cart, subTotal, oid, email: email, name, address, pincode, phone }
      let a = await fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      let aRes = await a.json()
      toast.success('Your order successfully placed', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        router.push('/order?id=' + aRes.data._id + '&clearCart=1')
      }, 2000);

    }

  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='container-fluid py-16 min-h-screen'>
        <Head>
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        </Head>
        <div className='container m-auto'>
          <Etext color="#000" variant="h1">1. Delivery Details</Etext>
          <div className='mx-auto flex my-3'>
            <div className='px-2 w-1/2'>
              <div className="mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-00">Name</label>
                <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className='px-2 w-1/2'>
              <div className="mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-00">Email</label>
                {user && user.token ? <input readOnly={true} value={user.email} type="email" id="email" name="email" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
              </div>
            </div>
          </div>
          <div className='px-2 w-full'>
            <div className="mb-4">
              <label htmlFor="address" className="leading-7 text-sm text-00">Address</label>
              <textarea onChange={handleChange} value={address} name='address' id='address' className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
            </div>
          </div>
          <div className='mx-auto flex my-3'>
            <div className='px-2 w-1/2'>
              <div className="mb-4">
                <label htmlFor="phone" className="leading-7 text-sm text-00">Phone</label>
                <input placeholder='10-Digit Phone No' onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className='px-2 w-1/2'>
              <div className="mb-4">
                <label htmlFor="pincode" className="leading-7 text-sm text-00">PinCode</label>
                <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
          <div className='mx-auto flex my-3'>
            <div className='px-2 w-1/2'>
              <div className="mb-4">
                <label htmlFor="state" className="leading-7 text-sm text-00">State</label>
                <input onChange={handleChange} readOnly={true} value={state} type="text" id="state" name="state" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className='px-2 w-1/2'>
              <div className="mb-4">
                <label htmlFor="city" className="leading-7 text-sm text-00">District</label>
                <input onChange={handleChange} readOnly={true} value={city} type="text" id="city" name="city" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
          <Etext color="#000" variant="h1">1. Review Cart Items & Pay</Etext>
          <div ref={ref} className='py-4 z-10 bg-pink-100 w-96 h-auto sideCart px-8 my-4 rounded'>
            <ol className='text-black list-decimal font-semibold'>
              {Object.keys(cart).length == 0 && <div className='my-4 text-white'>Your cart is Empty!</div>}
              {Object.keys(cart).map((k) => {
                return (
                  <li key={k}>
                    <div className='item flex my-5 text-black'>
                      <div className='w-2/3 font-semibold text-black'>{cart[k].name} ({cart[k].size} / {cart[k].variant}) </div>
                      <div className='flex items-baseline font-semibold justify-center w-1/3 m-2'>
                        <EButton event={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} styles={{ margin: 5 }}>Minus</EButton>
                        {cart[k].qty}
                        <EButton event={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} styles={{ margin: 5 }}>Plus</EButton>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
            {!Object.keys(cart).length == 0 && <div className='font-bold text-black'>Subtotal: ₹{subTotal}</div>}
          </div>
          <EButton event={initiatePayment}>Pay ₹{subTotal}</EButton>
        </div>
      </div>
    </>
  )
}

export default checkout;
