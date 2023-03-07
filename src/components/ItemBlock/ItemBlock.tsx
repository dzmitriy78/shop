import React, {useState} from 'react';
import {useAppDispatch} from "../../hooks/reduxHooks";
import {addItem} from "../../redux/slices/cartSlice";

const ItemBlock: React.FC<ItemType> = ({id, title, price, types, sizes, imageUrl}) => {
    const [itemCount] = useState<number>(0)
    const [activeSize, setActiveSize] = useState<number>(0)
    const [activeType, setActiveType] = useState<number>(0)
    const dispatch = useAppDispatch()
    const typeNames: string[] = ["пластик", "металл"]

    const addItemHandler = () => {
        //setItemCount((prev) => prev + 1)
        const item = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: activeSize,
            count: 1
        }
        dispatch(addItem(item))
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="KETTLE"
                />
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>Материал <br/>ручки:
                        {types.map((t, i) => <li key={i}
                                                 onClick={() => setActiveType(i)}
                                                 className={i === activeType ? "active" : ""}>{typeNames[t]}</li>)}
                    </ul>
                    <ul> Объем:
                        {sizes.map((s, i) => <li key={i}
                                                 onClick={() => setActiveSize(i)}
                                                 className={i === activeSize ? "active" : ""}> {s} л.</li>)
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">{price} BYN</div>
                    <button className="button button--outline button--add" onClick={addItemHandler}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        <i>{itemCount}</i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemBlock

export type ItemType = {
    title: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
    category: number
    id: number
}