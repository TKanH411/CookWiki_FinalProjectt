import {MainLayoutContext} from "@/layouts/main-layout/context/hooks/useMainLayout.js";
import {useState} from "react";

const MainLayoutProvider = ({children}) => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const value = {
        // constant
        breadcrumbs,

        // function
        setBreadcrumbs
    };

    return (
        <MainLayoutContext.Provider value={value}>
            {children}
        </MainLayoutContext.Provider>
    );
};


export {MainLayoutProvider};
