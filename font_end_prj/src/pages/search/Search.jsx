import {cn} from "@/lib/utils";
import bgImage3 from "@/assets/img-3.jpg";
import {MagnifyingGlassIcon, UserIcon} from "@heroicons/react/20/solid";
import {Link, useParams} from "react-router-dom";
import {ROUTES} from "@/routes/routes";
import {Input} from "@headlessui/react";
import {useRecipeSearch} from "@/hooks/useRecipe";
import {useCallback, useEffect, useState} from "react";
import {z} from "zod";
import {Controller, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {debounce} from "lodash";
import {STATUS_LIST} from "@/utils/string";
import Pagination from "@/components/commons/Pagination";

const FormSchema = z.object({
    title: z.string()
});

function Search() {
    const {
        control,
        getValues,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
        },
    });
    console.log("------> Line: 73 | Post.jsx errors: ", errors);
    const title = useWatch({control: control, name: "title"})

    const [debouncedTitle, setDebouncedTitle] = useState(getValues("title"));
    const [currentPage, setCurrentPage] = useState(1);

    const searchRecipeMutation = useRecipeSearch({
        page: currentPage,
        size: 12,
        title: debouncedTitle,
        status: STATUS_LIST.PUBLISHED
    });
    console.log("------> Line: 21 | Search.jsx searchRecipeMutation: ", searchRecipeMutation.data);

    // Tạo hàm debounce sử dụng lodash.debounce
    const debouncedSetTitle = useCallback(
        debounce((value) => {
            setDebouncedTitle(value);
        }, 500),
        [] // Chỉ tạo 1 lần
    );

    useEffect(() => {
        debouncedSetTitle(title);
    }, [title, debouncedSetTitle]);

    const onPageChange = (page) => {
        console.log("------> Line: 64 | Recipes.jsx page: ", page);
        setCurrentPage(page);
    }

    return (
        <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>
            <div className={cn("relative w-full max-w-md")}>
                <MagnifyingGlassIcon
                    className={cn("size-5 absolute top-1/2 -translate-y-1/2 left-0 ml-4 fill-orange-500")}/>
                <Controller
                    control={control}
                    name="title"
                    render={({field}) => (
                        <Input
                            {...field}
                            type="text"
                            placeholder="Tìm kiếm món ăn, công thức..."
                            className={cn("text-gray-800 w-full pl-10 pr-4 py-2 border border-gray-300",
                                "rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ")}
                        />
                    )}
                />
            </div>
            <div className={cn("flex flex-col w-full justify-start border-b border-dashed border-gray-300 pb-5 gap-3")}>
                <p className={cn("flex text-[26px] font-semibold text-[rgba(96,96,96,0.9)]")}>
                    Kết Quả CookPad Dành Cho Bạn
                </p>

                <div>
                    <Pagination
                        currentPage={currentPage}
                        totalPage={searchRecipeMutation.data?.totalPages}
                        onPageChange={onPageChange}
                    />
                </div>

                <div className={cn("grid grid-cols-5 gap-4")}>
                    {searchRecipeMutation.data?.recipes?.map((item, idx) => {
                        return (
                            <Link key={idx} className={cn("group shadow-md rounded-lg")}
                                  to={ROUTES.RECIPE.replace(":id", item.id)}>
                                <div className={cn("relative")}>
                                    <img src={item.imageThumb || ""} alt=""
                                         className={cn("rounded-t-[10px] w-full h-[300px] object-cover")}/>
                                    <div className={cn(
                                        "absolute bottom-0 w-full py-4 px-2 text-[20px] leading-none font-semibold text-white bg-[rgba(74,74,74,0.4)]",
                                        "group-hover:bg-[rgba(74,74,74,0.8)] group-hover:opacity-100 group-hover:pb-10 transition-all",
                                    )}>
                                        <p className={cn("line-clamp-2")}>{item.title}</p>
                                    </div>
                                </div>
                                <div
                                    className={cn("p-2 bg-[rgba(255,255,255,0.8)] text-[rgba(96,96,96,0.9)] rounded-b-lg")}>
                                    <p className={cn("text-[16px] font-semibold line-clamp-3")}>
                                        {item.description}
                                    </p>
                                    <p className={cn("text-[16px] font-semibold flex items-center pt-2")}>
                                        <UserIcon className={cn("size-5 mr-2 fill-black")}/> {item.user?.email}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
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

export default Search;
