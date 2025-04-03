import React, { createContext, ReactNode, useContext, useState } from "react";

interface Category{
    title : string;
    questionNumber : number;
}

interface CategoryContextType{
    category : Category[] | undefined;
    setCategory: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryPropsType {
    children : ReactNode;
}

export const CategoryProvider : React.FC<CategoryPropsType> = ({children}) =>{
    const [category , setCategory] = useState<Category[]>([]);

    return (<CategoryContext.Provider value={{category , setCategory}}>
        {children}
    </CategoryContext.Provider>)
}


export const useCategory = () : CategoryContextType =>{
    const context = useContext(CategoryContext);
    if(!context)
    {
        throw new Error("useCategory must be inside categoryProvider");
    }
    return context;
}