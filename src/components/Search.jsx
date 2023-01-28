
import React from 'react'
import { useState } from 'react'

const Search = ({ buscarDatos }) => {
    const [valor, setValor] = useState('')

    const handleChange = ({target}) => {
        setValor(target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        buscarDatos(valor)
    }
  return (
    <section className='mb-10 text-white grid justify-center md:flex md:justify-around'>
      <form onSubmit={handleSubmit}>
        <input className='w-56 py-2 mt-10 sm:mt-0 rounded-l-lg outline-none text-dark text-lg font-semibold indent-3' type="text" value={valor} placeholder='Search' onChange={handleChange} />
        <button className='w-20 bg-nav py-2 text-lg font-semibold rounded-r-lg' type='submit'>buscar</button>
      </form>
    </section>
  )
}

export default Search
