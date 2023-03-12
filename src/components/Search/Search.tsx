import React from 'react';
import {InputText} from "primereact/inputtext";
import cl from "./Search.module.scss"
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import {changeSearch} from "../../redux/slices/filterSlice";
import {useAppDispatch} from "../../hooks/reduxHooks";
import useDebounce from "../../hooks/useDebounce";
import {useUpdateEffect} from "primereact/hooks";


const Search: React.FC = () => {

    const dispatch = useAppDispatch()
    const [value, setValue] = React.useState<string>("")
    const debouncedValue = useDebounce<string>(value, 500)

    useUpdateEffect(() => {
        dispatch(changeSearch(value))
    }, [dispatch, debouncedValue])

    return (
        <div className={cl.root}>
            <div className="card flex flex-wrap justify-content-center gap-3">
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type={"search"}
                           value={value}
                           placeholder={"Найти..."}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}/>
            </span>
            </div>
        </div>
    )
}

export default Search