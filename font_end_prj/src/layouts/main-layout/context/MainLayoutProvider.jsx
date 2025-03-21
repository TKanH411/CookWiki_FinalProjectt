import {MainLayoutContext} from "@/layouts/main-layout/hooks/useMainLayout.js";

const MainLayoutProvider = ({children}) => {
    const value = {
        example: 'example'
    };

    return (
        <MainLayoutContext.Provider value={value}>
            {children}
        </MainLayoutContext.Provider>
    );
};


export {MainLayoutProvider};
