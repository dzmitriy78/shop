import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="12" y="16" rx="0" ry="0" width="1" height="0"/>
        <rect x="20" y="0" rx="14" ry="14" width="260" height="260"/>
        <rect x="20" y="275" rx="13" ry="13" width="260" height="47"/>
        <rect x="20" y="334" rx="14" ry="14" width="260" height="86"/>
        <rect x="125" y="436" rx="25" ry="25" width="156" height="44"/>
        <rect x="20" y="438" rx="13" ry="13" width="91" height="27"/>
    </ContentLoader>
)

export default Skeleton