import ReactPlayer  from "react-player"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Loading from "./Loading";
import { useRef } from "react";

const Manga = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [datos, setDatos] = useState([])
    const parrafo = useRef(null);
    const [ocultar, setOcultar] = useState('')
    const [cortar, setCortar] = useState('hidden')
    let api = `https://api.jikan.moe/v4/anime/${id}/full`

    const fetchApi = async() => {

        try {
            setLoading(true)
            const res = await fetch(api)
            const data = await res.json()
            setDatos(data.data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }

    };


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
        fetchApi()
    },[api])

    useEffect(() => {
        leerData()
    },[datos])
    console.log(datos)

    if(loading){
        return <Loading />
    }


  return (
    <div className="h-[100%] bg-gradient-to-bl from-nav to-black">
    <section className="w-full h-[100%] pt-[76px]" style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), #00051de8), url(${datos.images?.jpg.large_image_url})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            width: '100%',
            height: '100%'
    }}>
        <section className="w-full bg-nav opacity-75 h-full">
        <div className="w-full h-full sm:flex">
            <div className="w-60 mx-auto sm:ml-16 pt-10 sm:mt-0 relative">
                {
                    datos.images == undefined ? '':
                    <img src={datos.images.jpg.image_url} className="" alt={`Esta es la imagen de ${datos.name}`} />
                }
                
                <div className="text-white absolute top-10">
                    <span className="bg-verde px-2 py-1 font-semibold">{datos.type}</span>
                </div>
            </div>
            <div className="md:w-[600px] h-[20%] animate__animated sm:w-[400px] lg:w-[1000px] sm:mt-10 sm:mx-8 ml-5 mr-5">
            <h2 className="text-white text-2xl font-bold text-center sm:text-start">{datos.title}</h2>
                <div className="mt-1 mb-4 flex flex-wrap justify-center sm:justify-start gap-y-2 xl:gap-y-0 gap-x-4">
                        {
                            datos.genres == undefined ? <p className="text-white">no hay datos</p>:
                            datos.genres.map(item => (
                                <span className="text-white bg-verde px-6 rounded-lg font-bold text-lg py-1" key={item.mal_id}>{item.name}</span>
                            ))
                        }
                </div>
                <p ref={parrafo} className="text-white text-lg">{datos.synopsis}</p>
                <button onClick={handleLeer} className={`text-white bg-verde h-10 w-10 rounded-full flex justify-center items-center text-lg mt-2 ${ocultar}`}><AiOutlineArrowDown /></button>
                <button onClick={handleCortar} className={`text-white bg-red-600 mt-2 h-10 w-10 rounded-full flex justify-center items-center ${cortar}`}><AiOutlineArrowUp /></button>
            </div>
        </div>
            <div className="grid justify-center">
                <p className="text-white mt-10 md:mt-0 font-bold text-lg">Ver Trailer</p>
                <a href="#trailer" className="bg-white w-10 h-10 rounded-full flex justify-center items-center ml-4 mt-4 animate-bounce drop-shadow-lg"><AiOutlineArrowDown /></a>
            </div>
            <div id="trailer" className="pb-40 mt-32 w-[90%] sm:w-[70%] flex justify-center mx-auto">
                {
                    datos.trailer == undefined || datos.trailer.embed_url == null ? <span className="py-2 font-bold text-lg text-center border-solid bg-sus-1 text-sus-2 border-sus-3 border-2 px-4 rounded-md">Trailer no disponible actualmente 😭😭</span>: 
                    <ReactPlayer  url={datos.trailer.embed_url} controls />
                }
            </div>
        </section>
    </section>
    </div> 
  )
}

export default Manga