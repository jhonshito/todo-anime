
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import '../components/person.css'
import Loading from './Loading'

const FullPrsonaje = () => {
    const {id} = useParams();
    const [datos, setDatos] = useState([]);
    const [ocultar, setOcultar] = useState('')
    const [loading, setLoading] = useState(false)
    const [cortar, setCortar] = useState('hidden')
    let api = `https://api.jikan.moe/v4/characters/${id}/full`;
    const parrafo = useRef(null);

    const fetchFullPersoneje = async() => {
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

    const leerData = () => {
        if(datos.about == undefined){
            ''
        }else{
            parrafo.current.textContent.length> 100 ? parrafo.current.textContent = parrafo.current.textContent.slice(0, 300) : console.log('poquitos')
        }
    }

    const handleLeer = () => {
        if(datos.about == undefined){
            ''
        }else{
            parrafo.current.textContent = datos.about
            setOcultar('hidden')
            setCortar('block')
        }
    }

    const handleCortar = () => {
        if(datos.about == undefined){
            ''
        }else{
            parrafo.current.textContent.length> 100 ? parrafo.current.textContent = parrafo.current.textContent.slice(0, 300) : ''
            setCortar('hidden')
            setOcultar('block')
        }
    }

    useEffect(() => {
        fetchFullPersoneje()
    },[])
    console.log(datos)

    useEffect(() => {
        leerData()
    },[datos])

    if(loading){
        return <Loading />
    }

  return (
    <main className='bg-nav w-full h-[100%] bg-gradient-to-bl from-nav to-black opacity-95'>
        <section className="w-full h-full sm:flex pt-32 md:pt-28">
            <div className="w-60 mx-auto sm:ml-16 pt-1 sm:mt-0 relative">
                {
                    datos == undefined || datos.images == undefined ? <p>no hay imagen</p>:
                    <img src={datos.images.jpg.image_url} className="" alt={`Esta es la imagen de ${datos.name}`} />
                }
            </div>
            <div className="md:w-[600px] h-[20%] animate__animated sm:w-[400px] lg:w-[1000px] sm:mt-1 sm:mx-8 ml-5 mr-5">
            <h2 className="text-white text-2xl font-bold text-center sm:text-start">{datos.name}</h2>
            <div className="mt-1 mb-4 flex flex-wrap justify-center sm:justify-start gap-y-2 xl:gap-y-1 gap-x-4">
                <p ref={parrafo} className="text-white text-lg">{datos.about}</p>
                <button onClick={handleLeer} className={`bg-white animate-bounce h-10 w-10 rounded-full flex justify-center items-center text-lg mt-4 ${ocultar}`}><AiOutlineArrowDown /></button>
                <button onClick={handleCortar} className={`text-white bg-red-600 mt-2 h-10 w-10 rounded-full flex justify-center items-center ${cortar}`}><AiOutlineArrowUp /></button>
            </div>
            </div>
        </section>
        <h2 className='text-center text-white text-2xl font-bold'>Voces del Personaje</h2>
        <div id='img' className='mt-10 pb-10 relative'>
            {
                datos.voices == undefined ? <Loading />:
                datos.voices.map(item => (
                    <div className='contenedor pb-10 group'>
                        <img className='image' src={item.person.images.jpg.image_url} alt={`Esta es la imagen de ${datos.name}`} />
                        <span className='absolute hidden bottom-12 group-hover:block ml-6 text-white font-bold text-3xl'>{item.person.name}</span>
                        <span className='absolute hidden group-hover:block top-0 bg-nav text-white break-words w-40 pl-10 text-xl font-bold py-1'>{item.language}</span>
                    </div>
                ))
            }
        </div>
        <h2 className='text-center text-white text-3xl font-bold mt-10'>Animes del Personajes</h2>
        <p className='text-center text-white text-lg font-bold mt-4 mb-2'>En esta sección estan los animes al que pertenece el personaje si le das click a un anime podras ir a ver su trailer</p>
        <div className='flex flex-wrap justify-center gap-x-4 gap-y-4'>
            {
                datos.anime == undefined ? '' :
                datos.anime.map(item => (
                    <Link to={`/manga/${item.anime.mal_id}`} key={item.anime.mal_id} className="bg-moradito mt-2 div relative group border-1 border-solid border-nav">
                        <img className="w-[12rem] h-full border-1 border-solid border-nav ease-in duration-300" src={item.anime.images.jpg.image_url} alt={`Esta es la imagen del manga ${item.anime.title}`} />
                        <article className="group-hover:bg-nuevo animate__animated animate__zoomIn w-[12rem] absolute top-0 group-hover:h-full">
                            <div className="absolute hidden group-hover:block bottom-0 w-[12rem] mx-auto text-center mb-4">
                                <p className="font-bold  animate__animated animate__zoomIn">{item.anime.title}</p>
                            </div>
                        </article>
                    </Link>
                ))
            }
        </div>

        <h2 className='text-center text-white text-3xl font-bold mt-20'>Mangas del Personajes</h2>
        <p className='text-center text-white text-lg font-bold mt-4 mb-2'>En esta sección estan los mangas al que pertenece el personaje si le das click a un manga podras ir a ver su datos</p>
        <div className='flex flex-wrap justify-center gap-x-4 gap-y-4'>
            {
                datos.manga == undefined ? '' :
                datos.manga.map(item => (
                    <Link to={`/dataManga/${item.manga.mal_id}`} key={item.manga.mal_id} className="bg-moradito mt-2 div relative group border-1 border-solid border-nav mb-20">
                        <img className="w-[12rem] h-full border-1 border-solid border-nav ease-in duration-300" src={item.manga.images.jpg.image_url} alt={`Esta es la imagen del manga ${item.manga.title}`} />
                        <article className="group-hover:bg-nuevo animate__animated animate__zoomIn w-[12rem] absolute top-0 group-hover:h-full">
                            <div className="absolute hidden group-hover:block bottom-0 w-[12rem] mx-auto text-center mb-4">
                                <p className="font-bold  animate__animated animate__zoomIn">{item.manga.title}</p>
                            </div>
                        </article>
                    </Link>
                ))
            }
        </div>
    </main>
  )
}

export default FullPrsonaje