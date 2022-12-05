import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Error from 'next/error'
import Product from '../../models/product'
import mongoose from 'mongoose'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EButton from '../../common/EButton';
import Etext from '../../common/Etext'


const Slug = ({ buyNow, addToCart, product, variants, error }) => {
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()

  const [color, setColor] = useState()
  const [size, setSize] = useState()
  useEffect(() => {
    if (!error) {
      setColor(product.color)
      setSize(product.size)
    }
  }, [router.query])


  const checkServiceability = async () => {
    let pins = await fetch('http://localhost:3000/api/pincode')
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setService(true)
      toast.success('Your Pincode is serviceable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setService(false)
      toast.error('Sorry, Pincode not serviceable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const onChangePin = (e) => {
    setPin(e.target.value)
  }


  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['slug']}`
    router.push(url)
  }

  if (error == 404) {
    return <Error statusCode={404} />
  }

  return <>
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-top rounded" src={product.image} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <Etext color="#000" variant="h1">E-Commerce</Etext>
            <Etext color="#000" variant="h1">{product.title} ({product.size}/{product.color})</Etext>
            <div className="flex mb-4">
            </div>
            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={() => { refreshVariant(size, 'white') }} className={`border-2 rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}`}></button>}

                {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={() => { refreshVariant(size, 'red') }} className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button>}

                {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={() => { refreshVariant(size, 'green') }} className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button>}

                {Object.keys(variants).includes('pink') && Object.keys(variants['pink']).includes(size) && <button onClick={() => { refreshVariant(size, 'pink') }} className={`border-2 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none ${color === 'pink' ? 'border-black' : 'border-gray-300'}`}></button>}

                {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => { refreshVariant(size, 'blue') }} className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}></button>}

                {Object.keys(variants).includes('purple') && Object.keys(variants['purple']).includes(size) && <button onClick={() => { refreshVariant(size, 'purple') }} className={`border-2 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${color === 'purple' ? 'border-black' : 'border-gray-300'}`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                    {color && Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                    {color && Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                    {color && Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                    {color && Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                    {color && Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              {product.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
              {product.availableQty <= 0 && <span className="title-font font-medium text-2xl text-gray-900">Out Of Stock!</span>}
              <EButton disabled={product.availableQty <= 0} event={() => { buyNow(slug, 1, product.price, product.title, size, color) }} styles={{ margin: 10 }}>Buy Now</EButton>
              <EButton disabled={product.availableQty <= 0} event={() => { addToCart(slug, 1, product.price, product.title, size, color) }} styles={{ margin: 10 }}>Add to Cart</EButton>
            </div>
            <div className="pin mt-6 flex space-x-2 text-sm">
              <input onChange={onChangePin} className="px-2 border-2 border-gray-400 rounded-md" type="text" placeholder='Enter Your Pincode.' />
              <EButton event={checkServiceability}>Check</EButton>
            </div>
            {!service && service != null && <div className="text-red-600 text-sm mt-3">
              Sorry! We do not deliver to this pincode yet.
            </div>}
            {service && service != null && <div className="text-green-600 text-sm mt-3">
              Yes! This pincode is serviceable.
            </div>}
          </div>
        </div>
      </div>
    </section>
  </>
}

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb://localhost:27017/E-Commerce")
  }
  let product = await Product.findOne({ slug: context.query.slug })
  if (product == null) {
    return {
      props: { error: 404 },
    }
  }
  let variants = await Product.find({ title: product.title, categary: product.categary })
  let colorSizeSlug = {}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return {
    props: { error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) },
  }
}

export default Slug;

