import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Personajes = ({ id }) => {

    const [datos, setDatos] = useState([]);
    let api = `https://api.jikan.moe/v4/anime/${id}/characters`;

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
    },[api])

  return (
    <div className='flex flex-wrap'>
        {
            datos.map(item => (
                item.character == undefined ? '':
                    <img key={item.character.mal_id} className='w-40 h-20' src={item.character.images.jpg.image_url} alt='' />
            ))
        }
    </div>
  )
}

export default Personajes
