import {cn} from "@/lib/utils";
import {BookmarkSquareIcon, CircleStackIcon, HomeModernIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import {ROUTES} from "@/routes/routes";
import logoCircle from "@/assets/Monkeylogo.png";
import logoText from "@/assets/Cookwiki.png";

function LeftToolbar() {
    return (
        //w-[var(--left-toolbar-width)] fixed top-0 left-0 h-full p-2
        <div id="leftToolbar" className={cn("bg-white rounded-lg flex flex-col min-w-[var(--left-toolbar-width)] w-[var(--left-toolbar-width)]")}>

            <Link to={ROUTES.HOME} className={cn("h-[var(--header-height)] flex items-center justify-center gap-2")}>
                <img src={logoCircle || ""} alt="Logo page" className={cn("h-full max-h-[45px]")}/>
                <img src={logoText || ""} alt="Logo page" className={cn("h-full max-h-[70px]")}/>
            </Link>

            <div className={cn("overflow-auto")}>
                <div className={cn("flex flex-col gap-6 text-gray-700 px-1 pt-5 font-semibold")}>
                    <Link className={cn("flex items-center text-gray-700 px-2 gap-2 w-full")} to={ROUTES.HOME}>
                        <HomeModernIcon className="size-6 fill-black group-data-[checked]:block"/>
                        <h2 className={cn("sidebar-inactive:hidden text-[19px]")}>Trang Chủ</h2>
                    </Link>

                    <Link className={cn("flex items-center text-gray-700 px-2 gap-2 w-full")} to={ROUTES.SEARCH}>
                        <MagnifyingGlassIcon className="size-6 fill-black group-data-[checked]:block"/>
                        <h2 className={cn("sidebar-inactive:hidden text-[19px]")}>Tìm kiếm</h2>
                    </Link>

                    {/* <Link className={cn("flex items-center text-gray-700 px-2 gap-2 w-full")} to="/">
                        <SparklesIcon className="size-6 fill-black group-data-[checked]:block "/>
                        <h2 className={cn("sidebar-inactive:hidden text-[19px]")}>Premium</h2>
                    </Link> */}

                    <Link className={cn("flex items-center text-gray-700 px-2 gap-2 w-full")} to={ROUTES.CHALLENGE}>
                        <BookmarkSquareIcon className="size-6 fill-black group-data-[checked]:block"/>
                        <h2 className={cn("sidebar-inactive:hidden text-[19px]")}>Thử Thách</h2>
                    </Link>

                    <Link className={cn("flex items-center text-gray-700 px-2 gap-2 w-full")} to={ROUTES.SAVE_FOOD}>
                        <CircleStackIcon className="size-6 fill-black group-data-[checked]:block"/>
                        <h2 className={cn("sidebar-inactive:hidden text-[19px]")}>Kho Món Ngon Của Bạn</h2>
                    </Link>
                    <Link className={cn("text-gray-700 px-2 gap-2 w-full")} to="/">
                        Hãy tạo món ngon theo cách riêng của bạn. <br/> Bí quyết của món ngon nằm ở tình yêu người nấu!
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LeftToolbar;