import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import EButton from '../common/EButton';
import Etext from '../common/Etext';

const Forgot = () => {
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])
    return (
        <div>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-pink-500 rounded-full mx-auto" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <Etext styles={{ textAlign: "center" }} variant='h4'>Forgot Password</Etext>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <Link href={"/login"}><a className="font-medium text-pink-600 hover:text-pink-500">Login</a></Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label for="email-address" className="sr-only">Email address</label>
                                <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Email address" />
                            </div>
                        </div>
                        <div>
                            <EButton>Continue</EButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Forgot;
