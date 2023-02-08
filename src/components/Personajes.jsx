import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchPersonaje from './SearchPersonaje';
import Loading from './Loading';

const Personajes = () => {
    const [datos, setDatos] = useState([]);
    const [buscar, setBuscar] = useState('')
    const [loading, setLoading] = useState(false)
    let api = `https://api.jikan.moe/v4/characters?q=${buscar}`;

    const fetchPersonajes = async() => {
        setLoading(true)
        try {
            const res = await fetch(api);
            const data = await res.json();
            setDatos(data.data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    console.log(datos)

    const buscarDatos = (valor) => {
        console.log(valor)
        setBuscar(valor)
      }

    useEffect(() => {
        fetchPersonajes()
    },[api])

    if(loading){
        return <Loading />
    }

  return (
    <div className="bg-morado pb-[100vh] h-full pt-28">
        <SearchPersonaje buscarDatos={buscarDatos} />
        <section className='container mx-auto'>
            <div className="flex flex-wrap justify-center gap-4">
                {
                    datos == 0 ? <div className="w-[80%] text-sus-2 border-2 border-solid border-sus-3 bg-sus-1 rounded-md py-4"><h1 className="text-center uppercase font-bold">el anime con el nombre de : <span className="text-nav">{buscar}</span> no existe</h1></div>:
                    datos.map(item => (
                        <Link to={`/fullPersonaje/${item.mal_id}`} key={item.mal_id} className="bg-moradito mt-2 div relative group border-1 border-solid border-nav">
                            <img className="w-[12rem] h-full border-1 border-solid border-nav ease-in duration-300" src={item.images.jpg.image_url} alt={`Esta es la imagen del manga ${item.name}`} />
                            <article className="group-hover:bg-nuevo animate__animated animate__zoomIn w-[12rem] absolute top-0 group-hover:h-full">
                                <div className="absolute hidden group-hover:block bottom-0 w-[12rem] mx-auto text-center mb-4">
                                    <p className="font-bold animate__animated animate__zoomIn">{item.name}</p>
                                </div>
                            </article>
                            {/* <div className="flex bg-moradito absolute top-0 px-2 py-1 text-white font-semibold">
                                <span>{item.published.prop.from.day}</span>
                                <span>/</span>
                                <span>{item.published.prop.from.month}</span>
                                <span>/</span>
                                <span>{item.published.prop.from.year}</span>
                            </div> */}
                        </Link>
                    ))
                }
            </div>
        </section>
    </div>
  )
}

export default Personajes
