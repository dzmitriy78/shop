import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {ItemType} from "../ItemBlock/ItemBlock";

const FullItem: React.FC = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [item, setItem] = React.useState<ItemType | null>(null)

    React.useEffect(() => {
        const fetchFullItem = async () => {
            try {
                const {data} = await axios.get<ItemType>(`https://63ea74ede0ac9368d6525c20.mockapi.io/shop-items/${params.id}`)
                setItem(data)
            } catch (e) {
                alert("К сожалению, товар не найден.")
                navigate("/")
            }
        }
        fetchFullItem()
    }, [navigate, params.id])

    if (!item) {
        return (
            <div>
                <h2>Загрузка...</h2>
            </div>
        )
    }
    return (
        <div className={"container"}>
            <h1>{item.title}</h1>
            <img src={item.imageUrl} alt={"fullItem"}/>
            {/* <h2>{item.types}</h2>
            <h2>{item.sizes}</h2>*/}
            <h1>{item.price} BYN</h1>
        </div>
    )
}

export default FullItem;