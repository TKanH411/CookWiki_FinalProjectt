import {cn} from "@/lib/utils";
import bgImage3 from "@/assets/img-3.jpg";
import bgImage6 from "@/assets/img-6.jpg";
import {
    BookmarkIcon,
    ClockIcon,
    MapPinIcon,
    PencilSquareIcon,
    UserGroupIcon,
    UserIcon
} from "@heroicons/react/20/solid";
import {Button} from "@headlessui/react";
import {ROUTES} from "@/routes/routes";
import {Link, useParams} from "react-router-dom";
import RecipesComments from "@/pages/recipe/components/RecipesComments";
import {useDetailRecipe} from "@/hooks/useRecipe";
import {useAuth} from "@/context/hooks/useAuth";
import {
    useAddRecipeFavourite,
    useRecipeFavouriteByRecipeId,
    useRecipeFavouriteByUser
} from "@/hooks/useRecipeFavourite";
import {toast} from "sonner";
import {formatDate} from "@/utils/utils";
import {useState} from "react";
import Pagination from "@/components/commons/Pagination";

function Recipe() {
    const {user} = useAuth();
    const params = useParams();
    const {id} = params;

    const recipeFavouriteByRecipeIdMutation = useRecipeFavouriteByRecipeId({
        recipeId: id
    });
    const addRecipeFavouriteMutation = useAddRecipeFavourite();

    const detailRecipeMutation = useDetailRecipe(id);
    console.log("------> Line: 24 | Recipe.jsx detailRecipeMutation.data: ", detailRecipeMutation.data);

    const {
        title,
        description,
        portion,
        ingredients,
        time,
        cookSteps,
        imageThumb,
        ...detailRecipe
    } = detailRecipeMutation.data || {};
    const {id: recipeFavouriteId} = recipeFavouriteByRecipeIdMutation.data || {};

    const [currentPageFavourite, setCurrentPageFavourite] = useState(1);

    const recipeFavouriteByUserMutation = useRecipeFavouriteByUser({
        page: currentPageFavourite,
        size: 8
    });

    const onPageChangeFavourite = (page) => {
        console.log("------> Line: 34 | Recipes.jsx page: ", page);
        setCurrentPageFavourite(page);
    }

    return (
        <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>
            <div className={cn("flex gap-3 mt-[20px] w-full justify-start")}>
                <img src={imageThumb || bgImage6} alt="" className={cn("rounded-2xl w-[300px] h-[425px]")}/>
                <div className={cn("flex flex-col bg-[rgba(255,255,255,0.8)] px-4 gap-4")}>
                    <h2 className={cn("text-[30px] font-bold flex items-center text-[rgba(96,96,96,0.9)]")}>
                        {title}
                    </h2>
                    <div className={cn("flex items-center gap-4 text-[rgba(96,96,96,0.9)]")}>
                        <img src={bgImage6} alt="" className={cn("rounded-full w-[40px] h-[40px]")}/>
                        <div className={cn("flex flex-col")}>
                            <p className={cn("text-[16px] font-bold flex items-center")}>
                                {detailRecipe?.user?.email}
                            </p>
                            <p className={cn("text-[16px] font-normal flex items-center")}>
                                <MapPinIcon className={cn("size-5 mr-2 fill-black")}/>
                                ...
                            </p>
                        </div>
                    </div>
                    <p className={cn("flex text-[16px] font-semibold text-[rgba(96,96,96,0.9)] line-clamp-2 whitespace-pre-line")}>
                        {description}
                    </p>
                    <p className={cn("flex text-[16px] font-semibold text-[rgb(255,145,0)]")}>
                        #thucpham
                    </p>
                    <Button
                        type="submit"
                        className={cn(
                            "group inline-flex items-center justify-center gap-2 bg-white py-1.5 px-3 text-sm/6 rounded-lg",
                            "font-semibold text-gray-800 shadow-inner shadow-white/10 focus:outline-none transition-all",
                            "data-[focus]:outline-1 data-[focus]:outline-white mt-[20px]",
                            "data-[hover]:bg-[rgb(255,145,0)] data-[open]:bg-[rgb(255,145,0)] border border-solid border-[rgb(255,145,0)]-300",
                            "data-[hover]:text-white data-[open]:text-neutral-200 text-[18px] w-[150px] text-[rgb(255,145,0)] hover:cursor-pointer",
                            {"bg-[rgb(255,145,0)] text-white": !!recipeFavouriteId}
                        )}
                        onClick={() => {
                            addRecipeFavouriteMutation.mutate({
                                recipeId: detailRecipe?.id
                            }, {
                                onSuccess: () => {
                                    console.log("------> Line: 72 | Recipe.jsx addRecipeFavouriteMutation.mutate: ", "Success");
                                    toast.success("Add recipe favourite success");
                                },
                                onError: () => {
                                    console.log("------> Line: 76 | Recipe.jsx addRecipeFavouriteMutation.mutate: ", "Error");
                                    toast.error("Add recipe favourite error");
                                }
                            })
                        }}
                    >
                        <BookmarkIcon
                            className={cn(
                                "group-hover:fill-white size-5 fill-[rgb(255,145,0)] text-[rgb(255,145,0)]",
                                {"fill-white": !!recipeFavouriteId}
                            )}/>
                        Lưu Món
                    </Button>
                    {user?.id === detailRecipe?.user?.id && (
                        <Link
                            type="submit"
                            to={ROUTES.ARTICLE_UPDATE.replace(":id", id)}
                            className={cn(
                                "flex items-center gap-2 bg-white rounded-lg px-2.5 py-1.5 justify-center",
                                "font-semibold text-gray-800 shadow-inner shadow-white/10 focus:outline-none transition-all",
                                "data-[focus]:outline-1 data-[focus]:outline-white",
                                "bg-gray-500 data-[open]:bg-[rgb(255,145,0)] border border-solid border-[rgb(255,145,0)]-300",
                                "data-[hover]:text-neutral-200 data-[open]:text-neutral-200 text-[18px] w-[150px] text-white"
                            )}
                        >
                            <PencilSquareIcon className={cn("size-5 fill-white text-[rgb(255,145,0)]")}/>
                            Chỉnh Sửa
                        </Link>
                    )}
                </div>
            </div>
            <div className={cn("flex w-full justify-start border-b border-dashed border-gray-300")}>
                <div className={cn("flex flex-col gap-3 w-1/3 pr-[100px]")}>
                    <h2 className={cn("text-[26px] font-bold text-[rgb(255,145,0)]")}>
                        Nguyên Liệu
                    </h2>
                    <p className={cn("flex items-center text-[16px] font-semibold text-[rgba(96,96,96,0.9)] py-[10px]")}>
                        <UserGroupIcon className={cn("size-5 mr-2 fill-black")}/> {portion}
                    </p>
                    {ingredients?.map((ingredient, idx) => (
                        <p key={idx}
                           className={cn("flex text-[16px] font-semibold text-[rgba(96,96,96,0.9)] border-b border-dashed border-gray-300 pb-3.5")}>
                            {ingredient.quantity &&
                                <strong className={cn("mr-[6px]")}>{ingredient.quantity}</strong>} {ingredient.name}
                        </p>
                    ))}
                </div>
                <div className={cn("flex flex-col gap-3")}>
                    <h2 className={cn("text-[26px] font-bold text-[rgb(255,145,0)]")}>
                        Hướng dẫn cách làm
                    </h2>
                    <p className={cn("flex items-center text-[16px] font-semibold text-[rgba(96,96,96,0.9)] py-[10px]")}>
                        <ClockIcon className={cn("size-5 mr-2 fill-black")}/>{time}
                    </p>
                    {cookSteps?.map((step, idx) => (
                        <div key={idx} className={cn("flex flex-col gap-2 text-[rgba(96,96,96,0.9)] mb-[15px]")}>
                            <div className={cn("flex items-start")}>
                                <p className={cn("w-6 h-6 flex items-center justify-center bg-gray-700 text-white text-sm font-semibold rounded-full mr-2.5 ")}>
                                    {idx + 1}
                                </p>
                                <span className={cn("text-[16px] font-medium")}>
                                <div className={cn("whitespace-pre-line")}>
                                    {step?.description}
                                </div>
                            </span>
                            </div>
                            <div className={cn("flex flex-wrap gap-2 pl-[30px]")}>
                                {step?.imageUrls?.map((image, idx) => (
                                    <img src={image} alt="" key={idx}
                                         className={cn("rounded-2xl w-[160px] h-[135px] bg-center bg-no-repeat bg-cover")}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cn("flex flex-col w-full justify-start border-b border-dashed border-gray-300 pb-5 gap-3")}>
                <p className={cn("flex text-[26px] font-semibold text-[rgba(96,96,96,0.9)]")}>
                    Viết bởi
                </p>
                <div className={cn("flex items-center gap-4 text-[rgba(96,96,96,0.9)]")}>
                    <img src={bgImage6} alt="" className={cn("rounded-full w-[96px] h-[96px]")}/>
                    <div className={cn("flex flex-col")}>
                        <p className={cn("text-[16px] font-bold ")}>
                            {detailRecipe?.user?.email}
                        </p>
                        <p className={cn("text-[16px] font-normal")}>
                            vào {detailRecipe?.createdAt && formatDate(detailRecipe?.createdAt)}
                        </p>
                        <p className={cn("text-[16px] font-normal flex items-center")}>
                            <MapPinIcon className={cn("size-5 mr-2 fill-black")}/>
                            Huế
                        </p>
                        <Button
                            type="submit"
                            className={cn(
                                "inline-flex items-center justify-center gap-2 bg-[rgba(96,96,96,0.9)] text-sm/6 rounded-lg",
                                "font-semibold text-gray-800 shadow-inner shadow-white/10 focus:outline-none transition-all",
                                "data-[focus]:outline-1 data-[focus]:outline-white text-[12px] w-[100px] py-[5px] text-white"
                            )}
                        >
                            Kết Bạn Bếp
                        </Button>
                    </div>
                </div>

                <p className={cn("flex text-[16px] font-semibold")}>
                    Được tự tay chế biến những món ăn ngon & cùng những người thân yêu trong gia đình thưởng thức chính
                    tác phẩm ấy. Đó là niềm vui, là hạnh phúc của tôi
                </p>
            </div>

            <div className={cn("w-full")}>
                <RecipesComments id={1}/>
            </div>

            <div className={cn("flex flex-col w-full justify-start border-b border-dashed border-gray-300 pb-5 gap-3")}>
                <p className={cn("flex text-[26px] font-semibold text-[rgba(96,96,96,0.9)]")}>
                    Các Món Tương Tự
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
                                    <UserIcon className={cn("size-5 mr-2 fill-black")}/>
                                    <p className={cn("line-clamp-1")}>{item?.recipe?.user?.email}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <p className={cn("text-[20px] font-bold")}>Về Cookpad</p>
            <span className={cn("text-[16px] font-semibold")}>Sứ mệnh của Cookpad là làm cho việc vào bếp vui hơn mỗi ngày, 
                vì chúng tôi tin rằng nấu nướng là chìa khoá cho một cuộc sống hạnh phúc hơn và khoẻ mạnh hơn cho con người, cộng đồng, và hành tinh này. 
                Chúng tôi muốn hỗ trợ các đầu bếp gia đình trên toàn thế giới để họ có thể giúp đỡ nhau qua việc chia sẻ các món ngon và kinh nghiệm nấu ăn của mình.</span>

            <div className={cn("bg-center bg-no-repeat bg-cover w-full h-[100px]")}
                 style={{backgroundImage: `url(${bgImage3})`}}/>
        </div>
    );
}

export default Recipe;
