import Headers from "@/layouts/main-layout/components/Headers";
import LeftToolbar from "@/layouts/main-layout/components/LeftToolbar";
import Footer from "@/layouts/main-layout/components/Footer";
import {cn} from "@/lib/utils";
import {MainLayoutProvider} from "@/layouts/main-layout/context/MainLayoutProvider";
import {Outlet} from "react-router-dom";

function MainLayout({className}) {
    return (
        <MainLayoutProvider>
            <div className={cn("bg-gray-200 h-dvh w-full flex gap-2 p-2")}>
                <LeftToolbar/>

                <div className={cn("bg-white rounded-lg grow flex flex-col")}>
                    <Headers/>

                    <div className="min-h-2 bg-gray-200"/>

                    <div id="main-content" className={cn("grow overflow-auto m-2 mr-0 pr-2")}>
                        <Outlet/>
                    </div>

                    <div className="min-h-2 bg-gray-200"/>

                    <Footer/>
                </div>
            </div>
        </MainLayoutProvider>
    );
}

export default MainLayout;