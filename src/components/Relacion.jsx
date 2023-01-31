
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Relacion = ({id}) => {
    const [datos, setDatos] = useState([]);
    let api = `https://api.jikan.moe/v4/anime/${id}/relations`;

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
    <div>Relacion</div>
  )
}

export default Relacion