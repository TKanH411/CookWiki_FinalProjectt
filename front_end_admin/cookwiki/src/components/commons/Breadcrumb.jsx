import {cn} from "@/lib/utils";
import {Link} from "react-router-dom";
import {useMainLayout} from "@/layouts/main-layout/context/hooks/useMainLayout";

export default function Breadcrumb() {
    const {breadcrumbs} = useMainLayout();

    return (
        <div className={cn("flex gap-1 text-sm")}>
            {breadcrumbs.map((breadcrumb, index) => {
                console.log("------> Line: 11 | Breadcrumb.jsx breadcrumb: ", breadcrumb);
                return index < breadcrumbs.length - 1
                    ? (
                        <div key={index} className={cn("flex gap-1")}>
                            <Link
                                to={breadcrumb.link}
                                className={cn("text-blue-500 hover:text-blue-700")}
                            >
                                {breadcrumb.title}
                            </Link>
                            {index < breadcrumbs.length - 1 && <span>/</span>}
                        </div>
                    ) : (
                        <p key={index} className={cn("text-gray-500")}>
                            {breadcrumb.title}
                        </p>
                    )
            })}
        </div>
    )
}