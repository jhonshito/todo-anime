
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
    <header className='text-white sm:flex justify-around block items-center fixed w-full py-5 bg-nav mb-20 z-10'>
      <div className='flex justify-center uppercase sm:flex font-bold text-3xl sm:items-center'>
        <span>todo</span>
        <span className='text-azul'>anime</span>
      </div>
      <nav className='flex justify-center mt-2 gap-x-4 text-lg uppercase font-semibold'>
        <Link to="/">animes</Link>
        <Link to="/mangas">mangas</Link>
        <Link to="/personajes">personajes</Link>
      </nav>
    </header>
      <Outlet />
    </div>
  )
}

export default Navbar
