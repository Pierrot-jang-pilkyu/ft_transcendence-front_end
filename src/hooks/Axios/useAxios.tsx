import {useState, useEffect} from 'react'
import axios from 'axios'

function Tmp()
{
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/games/ranks')
        .then((Response)=>{
            setData(Response.data)
        })
        .catch((Error)=>{console.log(Error)})
    }, [])

    return (
        <div/>
    );
}

export default Tmp;