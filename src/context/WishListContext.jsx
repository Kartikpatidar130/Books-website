import { createContext , useState , useContext } from "react";

const WishListContext = createContext()

export const WishListProvider = ({children}) => {
    const [wishList , setWishList] = useState([])

    const addToWishList = (book) => {
        setWishList((prev)=> prev.find((b) => b.id === book.id) ? prev : [...prev , book])
    }
 
    const removeFromWishList = (id) => {
        setWishList((prev)=> prev.filter((b)=> b.id !== id))
    }

    return (
        <WishListContext.Provider value = {{wishList , addToWishList , removeFromWishList}}>
            {children}
        </WishListContext.Provider>
    )
}

export const useWishList = () => useContext(WishListContext);