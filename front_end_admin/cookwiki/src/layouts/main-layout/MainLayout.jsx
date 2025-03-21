import LeftToolbar from "@/layouts/main-layout/components/LeftToolbar";
import {cn} from "@/lib/utils";
import {MainLayoutProvider} from "@/layouts/main-layout/context/MainLayoutProvider";
import {Outlet} from "react-router-dom";
import Headers from "@/layouts/main-layout/components/Headers";
import Breadcrumb from "@/components/commons/Breadcrumb";
import Footer from "@/layouts/main-layout/components/Footer";

function MainLayout() {
    return (
        <MainLayoutProvider>
            <div className={cn("bg-gray-200 h-dvh w-full flex gap-2 p-2")}>
                <LeftToolbar/>

                <div className={cn("bg-white rounded-lg grow flex flex-col")}>
                    <Headers/>

                    <div className="min-h-2 bg-gray-200"/>

                    <div className={cn("p-2 pb-0")}>
                        <Breadcrumb/>
                    </div>

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