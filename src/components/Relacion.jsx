
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';

const Relacion = ({title}) => {
  const { id } = useParams() 
    const [datos, setDatos] = useState([]);
    let api = `https://api.jikan.moe/v4/manga/${id}/recommendations`;
    
    const fetchPersonajes = async() => {
        try {
            const res = await fetch(api);
            const data = await res.json();
            setDatos(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    console.log(datos)

    useEffect(() => {
      fetchPersonajes()
      setTimeout(() => {

        const myRef = document.getElementById('carrusel-items')
        let intervalo = null;
        let step = 1.5;
        const start = () => {
          intervalo = setInterval(function() {
            const maxScrollLeft = myRef.scrollWidth - myRef.clientWidth;
            myRef.scrollLeft = myRef.scrollLeft + step;
            if (myRef.scrollLeft === maxScrollLeft || myRef.scrollLeft === 0) {
              step = -step;
            }
          }, 10);
        };
      
        const stop = () => {
            clearInterval(intervalo)
        }
        myRef.addEventListener("mouseover", stop);
        
        myRef.addEventListener("mouseout", start);
        start();

        return () => {
            stop();
            myRef.removeEventListener("mouseover", stop);
            myRef.removeEventListener("mouseout", start);
          };
      },3000)

    },[])
    
  return (
    <div id='carrusel' className='mt-20 pb-20'>
        <h2 className='text-white text-center text-3xl font-bold'>Mangas recomendados</h2>
        <div id="carrusel-items">
            {
                datos == undefined || datos == 0 ? <div className="w-[80%] mx-auto text-sus-2 border-2 border-solid border-sus-3 bg-sus-1 rounded-md py-4"><h1 className="text-center uppercase font-bold">el manga con el nombre de : <span className="text-nav">{title}</span> no tiene mangas recomendados</h1></div>:
                datos.map(item => (
                    <div key={item.entry.mal_id} id='carrusel-item'>
                        <img src={item.entry.images.jpg.image_url} alt="" />
                        <p className='text-center text-white font-semibold'>{item.entry.title}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Relacion