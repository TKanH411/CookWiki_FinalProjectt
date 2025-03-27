import { cn } from "@/lib/utils";
import bgImage3 from "@/assets/img-3.jpg";
import bgImage6 from "@/assets/img-6.jpg";
import { UserIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import Pagination from "@/components/commons/Pagination";
import { useState } from "react";
import { useRecipe } from "@/hooks/useRecipe";
import { parseColorStatus, STATUS_LIST } from "@/utils/string";
import { useRecipeFavouriteByUser } from "@/hooks/useRecipeFavourite";

function SaveFood() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageFavourite, setCurrentPageFavourite] = useState(1);

    const recipeFavouriteByUserMutation = useRecipeFavouriteByUser({
        page: currentPageFavourite,
        size: 8
    });

    const recipeMutation = useRecipe({
        page: currentPage,
        size: 12,
    });
    console.log("------> Line: 26 | SaveFood.jsx recipeMutation: ", recipeMutation.data);

    const onPageChange = (page) => {
        console.log("------> Line: 29 | Recipes.jsx page: ", page);
        setCurrentPage(page);
    };

    const onPageChangeFavourite = (page) => {
        console.log("------> Line: 34 | Recipes.jsx page: ", page);
        setCurrentPageFavourite(page);
    };

    return (
        <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>
            <div className={cn("flex flex-col w-full justify-start border-b border-dashed border-gray-300 pb-5 gap-3")}>
                <p className={cn("flex text-[26px] font-semibold text-[rgba(96,96,96,0.9)]")}>
                    Your Recipe Collection
                </p>
                <div>
                    <Pagination
                        currentPage={currentPage}
                        totalPage={recipeMutation.data?.totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
                <div className={cn("grid grid-cols-4 xxl:grid-cols-6 gap-4")}>
                    {recipeMutation.data?.recipes?.map((item, idx) => {
                        const { statusColor, color } = parseColorStatus(item.status || STATUS_LIST.DRAFT);

                        return (
                            <Link key={idx} className={cn("group shadow-md rounded-lg flex flex-col")}
                                  to={ROUTES.RECIPE.replace(":id", item.id)}>
                                <div className={cn("relative")}>
                                    <img src={item.imageThumb} alt=""
                                         className={cn("rounded-t-[10px] w-full h-[316px] object-cover")}/>
                                    <span
                                        className={cn(
                                            "p-3 absolute bottom-0 w-full py-4 px-2 text-[20px]",
                                            "leading-none font-semibold text-white bg-[rgba(74,74,74,0.4)]",
                                            "group-hover:bg-[rgba(74,74,74,0.8)] group-hover:opacity-100 group-hover:pb-10 transition-all",
                                        )}>
                                        <p className={cn("line-clamp-2")}>{item.title}</p>
                                    </span>
                                </div>
                                <div
                                    className={cn("p-3 grow flex flex-col justify-between bg-[rgba(255,255,255,0.8)] text-[rgba(96,96,96,0.9)]")}>
                                    <p
                                        className={cn(
                                            "bottom-2 rounded-full px-2 py-1 w-[100px] text-center",
                                            "text-sm font-semibold"
                                        )}
                                        style={{ backgroundColor: statusColor, color: color }}
                                    >
                                        {(item.status || STATUS_LIST.DRAFT).toUpperCase()}
                                    </p>
                                    <p className={cn("text-[16px] font-semibold line-clamp-3")}>
                                        {item.description}
                                    </p>
                                    <p className={cn("text-[16px] font-semibold flex items-center pt-2")}>
                                        <UserIcon className={cn("size-5 mr-2 fill-black")} />
                                        <span className={cn("line-clamp-1")}>
                                            {item.user?.email}
                                        </span>
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className={cn("flex flex-col w-full justify-start border-b border-dashed border-gray-300 pb-5 gap-3")}>
                <p className={cn("flex text-[26px] font-semibold text-[rgba(96,96,96,0.9)]")}>
                    Your Saved Recipes
                </p>

                <div>
                    <Pagination
                        currentPage={currentPageFavourite}
                        totalPage={recipeFavouriteByUserMutation.data?.totalPages}
                        onPageChange={onPageChangeFavourite}
                    />
                </div>

                <div className={cn("grid grid-cols-4 gap-4")}>
                    {recipeFavouriteByUserMutation.data?.recipes?.map((item, idx) => (
                        <Link key={idx} className={cn("shadow-md rounded-lg flex flex-col justify-between")}
                              to={ROUTES.RECIPE.replace(":id", item?.recipe?.id)}>
                            <div className={cn("relative")}>
                                <img src={item?.recipe?.imageThumb || bgImage6} alt=""
                                     className={cn("rounded-t-[10px] w-full h-[230px]")}/>
                                <div
                                    className={cn("absolute bottom-0 w-full py-4 px-2 text-[20px] leading-none font-semibold text-white bg-[rgba(74,74,74,0.4)]")}>
                                    <p className={cn("line-clamp-2")}>{item?.recipe?.title}</p>
                                </div>
                            </div>
                            <div
                                className={cn("p-2 grow flex flex-col justify-between bg-[rgba(255,255,255,0.8)] text-[rgba(96,96,96,0.9)]")}>
                                <p className={cn("text-[16px] font-semibold line-clamp-3")}>
                                    {item?.recipe?.description}
                                </p>
                                <div className={cn("text-[16px] font-semibold flex items-center pt-2")}>
                                    <UserIcon className={cn("size-5 mr-2 fill-black")} />
                                    <p className={cn("line-clamp-1")}>{item?.recipe?.user?.email}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <p className={cn("text-[20px] font-bold")}>About Cookpad</p>
            <span className={cn("text-[16px] font-semibold")}>
                Cookwiki's mission is to make cooking more enjoyable every day because we believe 
                that cooking is the key to a happier and healthier life for people, communities, and the planet. 
                We aim to support home cooks around the world by helping them share delicious recipes and cooking experiences.
            </span>

            <div className={cn("bg-center bg-no-repeat bg-cover w-full h-[100px]")}
                 style={{ backgroundImage: `url(${bgImage3})` }} />
        </div>
    );
}

export default SaveFood;
