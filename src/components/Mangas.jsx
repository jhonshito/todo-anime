import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import SearchMangas from './SearchMangas';

const Mangas = () => {
    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(false)
    const [buscar, setBuscar] = useState('')
    let api = `https://api.jikan.moe/v4/manga?q=${buscar}`;

    const fetchMangas = async() => {
        setLoading(true)
        try {
            let res = await fetch(api);
            let data = await res.json()
            setDatos(data.data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const buscarDatos = (valor) => {
        console.log(valor)
        setBuscar(valor)
      }

    useEffect(() => {
        fetchMangas()
    },[api])

    if(loading){
        return <Loading />
    }
  return (
    <div className="bg-morado pb-[100vh] h-full pt-28">
        <SearchMangas buscarDatos={buscarDatos} />
        <section className='container mx-auto'>
            <div className="flex flex-wrap justify-center gap-4">
                {
                    datos == 0 ? <div className="w-[80%] text-sus-2 border-2 border-solid border-sus-3 bg-sus-1 rounded-md py-4"><h1 className="text-center uppercase font-bold">el anime con el nombre de : <span className="text-nav">{buscar}</span> no existe</h1></div>:
                    datos.map(item => (
                        <Link to={`/dataManga/${item.mal_id}`} key={item.mal_id} className="bg-moradito mt-2 div relative group">
                            <img className="w-[12rem] h-full ease-in duration-300" src={item.images.jpg.image_url} alt={`Esta es la imagen del manga ${item.title}`} />
                            <article className="group-hover:bg-nuevo animate__animated animate__zoomIn w-[12rem] absolute top-0 group-hover:h-full">
                                <div className="absolute hidden group-hover:block bottom-0 w-[12rem] mx-auto text-center mb-4">
                                    <p className="font-bold animate__animated animate__zoomIn">{item.title}</p>
                                </div>
                            </article>
                            <div className="flex bg-moradito absolute top-0 px-2 py-1 text-white font-semibold">
                                <span>{item.published.prop.from.day}</span>
                                <span>/</span>
                                <span>{item.published.prop.from.month}</span>
                                <span>/</span>
                                <span>{item.published.prop.from.year}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    </div>
  )
}

export default Mangas
