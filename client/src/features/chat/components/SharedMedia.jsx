import {useEffect,useState} from "react";

import {getImages} from "../../../services/mediaService";

export default function SharedMedia({roomId}){
    const [images,setImages]=useState([]);

    useEffect(()=>{
        load();
    },[]);

    async function load(){
        const res=await getImages(roomId);
        setImages(res.data);
    }

    return(
        <div
            className="
            grid
            grid-cols-3
            gap-3
            "
        >

        {
            images.map(image=>(
                <img
                    key={image.id}
                    src={image.fileUrl}
                    className="
                    rounded-lg
                    h-32
                    w-full
                    object-cover
                    cursor-pointer
                    "
                />
            ))
        }
        </div>
    );
}