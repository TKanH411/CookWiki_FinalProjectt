import {createContext, useContext} from "react";

export const MainLayoutContext = createContext(undefined);

export const useMainLayout = () => {
    const context = useContext(MainLayoutContext);
    if (context === undefined) {
        throw new Error('useMainLayoutContext must be used within a MainLayoutProvider');
    }
    return context;
};