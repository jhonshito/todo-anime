import ReactPlayer  from "react-player"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loading from "./Loading";

const Manga = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [datos, setDatos] = useState([])
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

    useEffect(() => {
        fetchApi()
    },[api])
    console.log(datos)

    if(loading){
        return <Loading />
    }

  return (
    <>
    <section className="bg-nav pt-40">
        <div>
            {
                datos.images == undefined ? '':
                <img src={datos.images.jpg.large_image_url} className="" alt={`Esta es la imagen de ${datos.name}`} />
            }
        </div>
        <div>
            {
                datos.trailer == undefined ? '': 
                <ReactPlayer url={datos.trailer.embed_url} controls />
            }
        </div>
    </section>
    </> 
  )
}

export default Manga