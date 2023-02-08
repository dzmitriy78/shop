import React, {useState} from 'react';

const Categories: React.FC = () => {

    const [activeIndex, setActiveIndex] = useState(0)
    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

    return (
        <div className="categories">
            <ul>
                {categories.map((c, i) => {
                   return <li key={i} onClick={() => setActiveIndex(i)}
                        className={i === activeIndex ? "active" : ""}>{c}</li>
                })}
            </ul>
        </div>
    )
}

export default Categories