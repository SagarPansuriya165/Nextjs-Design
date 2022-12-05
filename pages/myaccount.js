import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import EButton from '../common/EButton';
import Etext from '../common/Etext';


const myaccount = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [pincode, setPincode] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [npassword, setNpassword] = useState('')
    const [user, setUser] = useState({ value: null })

    const handleChange = async (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        } else if (e.target.name == 'phone') {
            setPhone(e.target.value)
        } else if (e.target.name == 'pincode') {
            setPincode(e.target.value)
        } else if (e.target.name == 'address') {
            setAddress(e.target.value)
        } else if (e.target.name == 'password') {
            setPassword(e.target.value)
        } else if (e.target.name == 'cpassword') {
            setCpassword(e.target.value)
        } else if (e.target.name == 'npassword') {
            setNpassword(e.target.value)
        }
    }

    const router = useRouter()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('myuser'))
        if (!user) {
            router.push('/')
        }
        if (user) {
            setUser(user)
            setEmail(user.email)
            fetchData(user.token)
        }
    }, [])

    const fetchData = async (token) => {
        let data = { token: token }
        let a = await fetch(`http://localhost:3000/api/getuser`, {
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
    }

    const handleUserSubmit = async () => {
        let data = { token: user.token, address, pincode, phone, name }
        let a = await fetch(`http://localhost:3000/api/updateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let res = await a.json()
        toast.success('successfully Updated', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const handlePassword = async () => {
        let res;
        if (npassword == cpassword) {
            let data = { token: user.token, password, cpassword, npassword }
            let a = await fetch(`http://localhost:3000/api/updatepassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            res = await a.json()
        } else {
            res = { success: false }
        }
        if (res.success) {
            toast.success('successfully Updated Password', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Error Updating Password', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        setPassword('')
        setCpassword('')
        setNpassword('')
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
            <div className='min-h-screen'>
                <div className='container m-auto my-4'>
                    <Etext color="#000" variant="h1">1. Update Account</Etext>
                    <div className='mx-auto flex my-3'>
                        <div className='px-2 w-1/2'>
                            <div className="mb-4">
                                <label htmlFor="name" className="leading-7 text-sm text-black">Name</label>
                                <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className='px-2 w-1/2'>
                            <div className="mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-black">Email (cannot be updated)</label>
                                {user && user.token ? <input readOnly={true} value={user.email} type="email" id="email" name="email" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
                            </div>
                        </div>
                    </div>
                    <div className='px-2 w-full'>
                        <div className="mb-4">
                            <label htmlFor="address" className="leading-7 text-sm text-black">Address</label>
                            <textarea onChange={handleChange} value={address} name='address' id='address' className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                    </div>
                    <div className='mx-auto flex my-3'>
                        <div className='px-2 w-1/2'>
                            <div className="mb-4">
                                <label htmlFor="phone" className="leading-7 text-sm text-black">Phone</label>
                                <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className='px-2 w-1/2'>
                            <div className="mb-4">
                                <label htmlFor="pincode" className="leading-7 text-sm text-black">PinCode</label>
                                <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                    </div>
                    <EButton event={handleUserSubmit} >Submit</EButton>
                    <Etext color="#000" variant="h1">1. Update Password</Etext>
                    <div className='mx-auto flex my-3'>
                        <div className='px-2 w-1/2'>
                            <div className="mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-black">Password</label>
                                <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className='px-2 w-1/2'>
                            <div className="mb-4">
                                <label htmlFor="npassword" className="leading-7 text-sm text-black">New Password</label>
                                <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className='px-2 w-1/2'>
                            <div className="mb-4">
                                <label htmlFor="cpassword" className="leading-7 text-sm text-black">Confirm New Password</label>
                                <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                    </div>
                    <EButton event={handlePassword}>Submit</EButton>
                </div>
            </div>
        </>
    )
}

export default myaccount;