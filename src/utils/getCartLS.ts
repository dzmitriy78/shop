import {calcTotalPrice} from "./calcTotalPrice";
import {CartItemType} from "../redux/slices/cartSlice";

export const getCartLs = () => {
    const dataCartLS = localStorage.getItem("cartLs")
    const items: CartItemType[] = dataCartLS ? JSON.parse(dataCartLS) : []
    const totalPrice = calcTotalPrice(items)

    return {
        items,
        totalPrice
    }
}