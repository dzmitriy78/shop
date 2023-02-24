import React from 'react';
import {InputText} from "primereact/inputtext";
import cl from "./Search.module.scss"
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import {changeSearch} from "../../redux/slices/filterSlice";
import {useAppDispatch} from "../../hooks/hooks";


const Search: React.FC = () => {

    const dispatch = useAppDispatch()
    const [value, setValue] = React.useState<string>("")

    const onSearchHandler = (e: { currentTarget: { value: string; }; }) => {
        setValue(e.currentTarget.value)
            dispatch(changeSearch(e.currentTarget.value))
    }

    return (
        <div className={cl.root}>
            <div className="card flex flex-wrap justify-content-center gap-3">
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type={"search"}
                           value={value}
                           placeholder={"Найти..."}
                           onChange={onSearchHandler}/>
            </span>
            </div>
        </div>
    )
}

export default Search