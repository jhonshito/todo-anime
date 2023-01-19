
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loading from "./Loading";

const Manga = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [datos, setDatos] = useState([])
    let api = `https://api.jikan.moe/v4/manga/${id}/full`

    const fetchApi = async(req, res) => {

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
    <div>
        {id}
    </div>
  )
}

export default Manga