import { useState, useEffect } from "react"
import "animate.css"
import Loading from "./components/Loading"
import { Link } from "react-router-dom"

function App() {

  const [valor, setValor] = useState([])
  const [loading, setLoading] = useState(false)

  const api = `https://api.jikan.moe/v4/manga?q=`

  const fetchData = async() => {
    
    try {
      setLoading(true)
      let res = await fetch(api)
      let data = await res.json()
      // valor == undefined ? setValor([...data.data]) : setValor([...data.data])
      setValor(data.data)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  console.log(valor)

  if(loading){
    return <Loading />;
  }

  return (
    <div className="bg-morado pb-40">
      <section className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {
            valor.map(item => (
              <Link to={`/manga/${item.mal_id}`} className="bg-moradito mt-2 div relative group" key={item.mal_id}>
                <img className="w-[12rem] h-full ease-in duration-300" src={item.images.jpg.image_url} alt="" />
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

export default App
