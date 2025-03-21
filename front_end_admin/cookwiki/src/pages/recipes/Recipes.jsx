import {Link} from "react-router-dom";
import {ROUTES} from "@/routes/routes";
import {cn} from "@/lib/utils";
import {Input} from "@headlessui/react";
import {z} from "zod";
import {Controller, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";
import Pagination from "@/components/commons/Pagination";
import {useMainLayout} from "@/layouts/main-layout/context/hooks/useMainLayout";
import {formatDate, parseColorStatus, STATUS_LIST} from "@/utils/string";
import {useRecipe} from "@/hooks/useRecipe";
import avatar from "@/assets/images/avatar.webp";
import {useTranslation} from "react-i18next";
import {DevTool} from "@hookform/devtools";

const FormSchema = z.object({
    title: z.string(),
})

export default function Recipes() {
    const {t} = useTranslation();
    const {setBreadcrumbs} = useMainLayout();

    useEffect(() => {
        setBreadcrumbs(
            [{
                title: "Home",
                link: ROUTES.HOME,
            }, {
                title: "Recipes",
                link: ROUTES.RECIPES,
            }]
        );
    }, [setBreadcrumbs]);

    const {control, handleSubmit, formState, getValues} = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
        }
    })
    const {errors} = formState;
    console.log("------> Line: 42 | Recipes.jsx errors: ", errors);
    const title = useWatch({control: control, name: "title"})

    const [debouncedTitle, setDebouncedTitle] = useState(getValues("title"));
    const [currentPage, setCurrentPage] = useState(1);

    const receiptMutation = useRecipe({
        page: currentPage,
        size: 10,
        title: debouncedTitle,
    })
    console.log("------> Line: 51 | Recipes.jsx receiptMutation: ", receiptMutation.data);

    const onSearch = handleSubmit((data) => {
        console.log("------> Line: 52 | Recipes.jsx data: ", data);
    })

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

    const debouncedOnChange = debounce(() => {
        console.log("------> Line: 56 | Recipes.jsx debouncedOnChange");
        onSearch().then(r => r);
    }, 300);

    const onPageChange = (page) => {
        console.log("------> Line: 64 | Recipes.jsx page: ", page);
        setCurrentPage(page);
    }

    return (
        <div className={cn("relative")}>
            <div className={cn("sticky top-0 z-10 bg-white flex flex-col gap-2 pb-2")}>
                <form className={cn("filter")} onSubmit={onSearch}>
                    <Controller
                        name="title"
                        control={control}
                        render={({field}) => (
                            <div className={cn("relative flex items-center gap-1 max-w-[400px]")}>
                                <Input
                                    {...field}
                                    placeholder={t("recipes.search_recipes")}
                                    style={{paddingRight: "2.5rem"}}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value);
                                        debouncedOnChange();
                                    }}
                                />

                                <MagnifyingGlassIcon className={cn("size-5 absolute right-3")}/>
                            </div>
                        )}
                    />
                </form>
            </div>

            <div className={cn("my-2 grid grid-cols-2 gap-4")}>
                {receiptMutation.data?.recipes?.map((item, idx) => {
                    const {statusColor, color} = parseColorStatus(item.status || STATUS_LIST.DRAFT);
                    return (
                        <Link
                            key={idx}
                            to={ROUTES.RECIPES_DETAIL.replace(":id", item.id)}
                            className={cn(
                                "group flex gap-2 shadow-md hover:cursor-pointer hover:bg-[#f8f6f2]",
                                "transition rounded-lg overflow-hidden",
                                "border-gray-300 border-t-0 border-l-0 border-r-0 border-b "
                            )}
                        >
                            <div className={cn("relative overflow-hidden w-[120px] min-w-[120px]")}>
                                <img
                                    src={item.imageThumb || ""}
                                    alt="blankImage"
                                    className={cn("w-full h-[170px] group-hover:scale-110 transition")}
                                />
                                <p
                                    className={cn(
                                        "absolute left-1/2 transform -translate-x-1/2",
                                        "bottom-2 rounded-full  px-2 py-1 w-[100px] text-center",
                                        "text-sm font-semibold "
                                    )}
                                    style={{backgroundColor: statusColor, color: color}}
                                >
                                    {(item.status || STATUS_LIST.DRAFT).toUpperCase()}
                                </p>
                            </div>
                            <div className={cn("flex flex-col gap-2 p-3 justify-between")}>
                                <div>
                                    <p className={cn("text-2xl font-semibold line-clamp-1")}>
                                        {item.title}
                                    </p>
                                    <div className={cn("flex gap-2 items-center")}>
                                        <img
                                            src={item?.user?.avatar || avatar}
                                            alt="Avatar"
                                            className={cn("size-8 rounded-full")}
                                        />
                                        <p>{item?.user?.email}</p>
                                    </div>
                                </div>
                                <div>
                                    Create at: {item.createdAt && formatDate(item.createdAt)}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className={cn("sticky bottom-0 bg-white p-2")}>
                <Pagination
                    currentPage={currentPage}
                    totalPage={receiptMutation.data?.totalPages}
                    onPageChange={onPageChange}
                />
            </div>

            <DevTool control={control} />
        </div>
    )
}