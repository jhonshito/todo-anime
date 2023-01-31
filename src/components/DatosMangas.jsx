
import React from 'react'
import { useEffect } from 'react'
import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const DatosMangas = () => {
    const { id } = useParams()
    const [datos, setDatos] = useState([]);
    const [ocultar, setOcultar] = useState('')
    const [cortar, setCortar] = useState('hidden')
    const parrafo = useRef(null);
    let api = `https://api.jikan.moe/v4/manga/${id}/full`;
    // poner el estado del manga si esta finalizado o esta en emision para mañana
    
    const fetchDataManga = async() => {
        try {
            const res = await fetch(api);
            const data = await res.json();
            setDatos(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const leerData = () => {
        if(datos.synopsis == undefined){
            ''
        }else{
            parrafo.current.textContent.length> 100 ? parrafo.current.textContent = parrafo.current.textContent.slice(0, 300) : console.log('poquitos')
        }
    }

    const handleLeer = () => {
        if(datos.synopsis == undefined){
            ''
        }else{
            parrafo.current.textContent = datos.synopsis
            setOcultar('hidden')
            setCortar('block')
        }
    }

    const handleCortar = () => {
        if(datos.synopsis == undefined){
            ''
        }else{
            parrafo.current.textContent.length> 100 ? parrafo.current.textContent = parrafo.current.textContent.slice(0, 300) : ''
            setCortar('hidden')
            setOcultar('block')
        }
    }

    useEffect(() => {
        fetchDataManga();
    },[])

    useEffect(() => {
        leerData()
    },[datos])
    
    console.log(datos)
  return (
    <main className='pt-28 bg-gradient-to-bl from-nav to-black w-full h-[100%] opacity-95'>
        <section className="w-full h-full sm:flex">
            <div className="w-60 mx-auto sm:ml-16 pt-1 sm:mt-0 relative">
                {
                    datos.images == undefined ? '':
                    <img src={datos.images.jpg.image_url} className="" alt={`Esta es la imagen de ${datos.name}`} />
                }
                <div className="text-white absolute top-1">
                    <span className="bg-verde px-2 py-1 font-semibold">{datos.type}</span>
                </div>
            </div>
            <div className="md:w-[600px] h-[20%] animate__animated sm:w-[400px] lg:w-[1000px] sm:mt-1 sm:mx-8 ml-5 mr-5">
            <h2 className="text-white text-2xl font-bold text-center sm:text-start">{datos.title}</h2>
            <div className="mt-1 mb-4 flex flex-wrap justify-center sm:justify-start gap-y-2 xl:gap-y-0 gap-x-4">
                {
                    datos.genres == undefined ? <p className="text-white">no hay datos</p>:
                    datos.genres.map(item => (
                        <span className="text-white bg-gradient-to-bl from-nav to-black px-6 rounded-lg font-bold text-lg py-1" key={item.mal_id}>{item.name}</span>
                    ))
                }
                <p ref={parrafo} className="text-white text-lg">{datos.synopsis}</p>
                <button onClick={handleLeer} className={`bg-white animate-bounce h-10 w-10 rounded-full flex justify-center items-center text-lg mt-4 ${ocultar}`}><AiOutlineArrowDown /></button>
                <button onClick={handleCortar} className={`text-white bg-red-600 mt-2 h-10 w-10 rounded-full flex justify-center items-center ${cortar}`}><AiOutlineArrowUp /></button>
            </div>
            </div>
        </section>
    </main>
  )
}

export default DatosMangas