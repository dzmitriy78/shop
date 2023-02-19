import React from 'react';

const Categories: React.FC<CategoriesPropsType> = ({id, onClickCategory}) => {

    const categories: string[] = ["Все", "Металл", "Эмалированная сталь", "Нержавеющая сталь", "Эмаль", "Алюминий"]

    return (
        <div className="categories">
            <ul>
                {categories.map((c, i) => {
                    return <li key={i} onClick={() => onClickCategory(i)}
                               className={i === id ? "active" : ""}>{c}</li>
                })}
            </ul>
        </div>
    )
}

export default Categories

type CategoriesPropsType = {
    id: number
    onClickCategory: (i: number) => void
}