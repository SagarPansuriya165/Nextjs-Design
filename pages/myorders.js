import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Etext from '../common/Etext'

const myorders = () => {

  const router = useRouter()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch('http://localhost:3000/api/myorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token })
      })
      let res = await a.json()
      setOrders(res.orders)
    }
    if (!localStorage.getItem('myuser')) {
      router.push('/')
    } else {
      fetchOrders()
    }
  }, [])

  return (
    <>
      <div className='min-h-screen'>
        <div className="container m-auto flex flex-col md:pb-56">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden text-center">
                <Etext color="#000" variant="h1">My Orders</Etext>
                <table className="min-w-full">
                  <thead className="border-b border-gray-500">
                    <tr>
                      <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                        #OrderId
                      </th>
                      <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                        Email
                      </th>
                      <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                        Amount
                      </th>
                      <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                        Handle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.map((item) => {
                        return <tr key={item._id} className="border-b border-gray-500">
                          <td className="px-6 py-4 blackspace-nowrap text-sm font-medium text-black">{item.orderId}</td>
                          <td className="text-sm text-black  px-6 py-4 blackspace-nowrap">
                            {item.email}
                          </td>
                          <td className="text-sm text-black  px-6 py-4 blackspace-nowrap">
                            {item.amount}
                          </td>
                          <td className="text-sm text-black  px-6 py-4 blackspace-nowrap">
                            <Link href={'/order?id=' + item._id}>
                              <a>
                                Details
                              </a>
                            </Link>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default myorders;