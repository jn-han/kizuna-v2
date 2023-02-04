import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div>
        <nav className='p-5 bg-header text-white shadow flex w-full justify-between items-center'>
            <div>
                <span className=' cursor-pointer ml-9 mr-5 text-accent font-semi-bold md:text-xl lg:text-2xl'>
                    <Link href='/' >
                     絆 <span className='text-white hover:text-accent duration-700'>kizuna</span>
                    </Link>
                </span>
                <input type='text' className='mx-3 inline p-1 rounded-lg h-8 sm:w-48 md:w-52 lg:w-56 text-black'></input>
                <Link href='' className='p-5 lg:text-xl hover:text-accent duration-700'>
                    Friends
                </Link>
                <Link href='/viewProfiles' className='hover:text-accent duration-700 lg:text-xl'>
                    Following
                </Link>
            </div>
            <div className='flex items-center'>
                <div>
                    <Link href='/connectWallet' className='p-3 bg-grey h-2 hover:bg-accent rounded-lg duration-700'>
                        Connect Wallet
                    </Link>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default NavBar