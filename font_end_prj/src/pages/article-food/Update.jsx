import {cn} from "@/lib/utils";
import bgImage6 from "@/assets/img-6.jpg";
import {CameraIcon, MinusIcon, PencilSquareIcon, PlusIcon} from "@heroicons/react/20/solid";
import {Button, Field, Input} from "@headlessui/react";
import {z} from "zod";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ImageUpload from "@/components/commons/ImageUpload";
import {ROUTES} from "@/routes/routes";
import {Link, useParams} from "react-router-dom";
import {useDetailRecipe, useUpdateRecipe} from "@/hooks/useRecipe";
import {useCallback, useEffect, useState} from "react";
import {v4 as uuidV4} from "uuid";
import {DevTool} from "@hookform/devtools";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import CookStep from "@/pages/article-food/components/CookStep";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import {toast} from "sonner";
import {useAuth} from "@/context/hooks/useAuth";

const ingredientsDefault = {
    name: "",
    quantity: "",
}

const cookStepsDefault = {
    id: uuidV4(),
    description: "",
    imageUrls: [],
}

const FormSchema = z.object({
    imageThumb: z.string().nonempty("Image thumb is required"),
    portion: z.string().nonempty("Portion is required"),
    ingredients: z.array(
        z.object({
            name: z.string(),
            quantity: z.string(),
        })
    ),
    cookSteps: z.array(
        z.object({
            id: z.string(),
            description: z.string(),
            imageUrls: z.array(z.string().nonempty("Image URL cannot be empty"))
                .min(1, "At least one image is required"),
        })
    ),
    time: z.string().nonempty("Time is required"),
    description: z.string(),
    title: z.string().nonempty("Title is required"),
});

function Update() {
    const params = useParams();
    const {id} = params;

    const updateRecipeMutation = useUpdateRecipe();

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: {defaultValues},
    } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            imageThumb: "",
            portion: "",
            ingredients: [ingredientsDefault],
            cookSteps: [cookStepsDefault],
            time: "",
            description: "",
            title: "",
        },
    });

    // Khởi tạo useFieldArray cho cookSteps
    const {fields, replace} = useFieldArray({
        control,
        name: "cookSteps",
    });
    console.log("------> Line: 116 | Update.jsx fields: ", fields);

    const detailRecipeMutation = useDetailRecipe(id);
    console.log("------> Line: 109 | Update.jsx detailRecipeMutation: ", detailRecipeMutation.data);

    const addIngredient = () => {
        setValue("ingredients", [...(getValues("ingredients") || []), {
            name: "",
            quantity: ""
        }]);
    }

    const removeIngredient = (indexToRemove) => {
        setValue("ingredients", getValues("ingredients").filter((_, index) => index !== indexToRemove));
    };

    const addIngredient_c = () => {
        setValue("cookSteps", [...(getValues("cookSteps") || []), {
            name: "",
            quantity: ""
        }]);
    }

    const removeIngredient_c = (indexToRemove) => {
        setValue("cookSteps", getValues("cookSteps").filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
        if (!detailRecipeMutation.isLoading) {
            setValue("imageThumb", detailRecipeMutation.data?.imageThumb);
            setValue("portion", detailRecipeMutation.data?.portion);
            setValue("ingredients", detailRecipeMutation.data?.ingredients);

            // Sử dụng replace từ useFieldArray để cập nhật cookSteps
            replace(detailRecipeMutation.data?.cookSteps);
            // setValue("cookSteps",
            //     [
            //         {
            //             id: "612bd645-6ecc-4c51-9497-4ff3e80eb90f",
            //             description: "asdasdasd 1 ",
            //             imageUrls: [
            //                 "asdasda", "asdasd"
            //             ]
            //         }
            //     ]);

            console.log("------> Line: 142 | Update.jsx detailRecipeMutation.data?.cookSteps: ", detailRecipeMutation.data?.cookSteps);
            setValue("time", detailRecipeMutation.data?.time);
            setValue("description", detailRecipeMutation.data?.description);
            setValue("title", detailRecipeMutation.data?.title);
        }
    }, [detailRecipeMutation.isLoading, detailRecipeMutation.data, setValue, replace]);

    // State để theo dõi phần tử đang được kéo
    const [activeId, setActiveId] = useState(null);

    // Xử lý sự kiện bắt đầu kéo
    const handleDragStart = useCallback((event) => {
        const {active} = event;
        setActiveId(active.id);
    }, []);

    // Xử lý sự kiện kết thúc kéo
    const handleDragEnd = useCallback(
        (event) => {
            const {active, over} = event;
            // Nếu không có phần tử thả hoặc phần tử không thay đổi vị trí
            if (!over || active.id === over.id) {
                setActiveId(null);
                return;
            }
            const items = getValues("cookSteps");
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            if (oldIndex === -1 || newIndex === -1) {
                setActiveId(null);
                return;
            }
            const newArrayMoved = arrayMove(items, oldIndex, newIndex);
            setValue("cookSteps", newArrayMoved);
            setActiveId(null);
        },
        [getValues, setValue]
    );

    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    const removeCookStep = (indexToRemove) => {
        setValue(
            "cookSteps",
            getValues("cookSteps").filter((_, index) => index !== indexToRemove)
        );
    };

    const onSubmit = handleSubmit((data) => {
        console.log("------> Line: 186 | Update.jsx data: ", data);
        updateRecipeMutation.mutate({
            id: id,
            ...data
        }, {
            onSuccess: () => {
                console.log("Update successfully!");
                toast.success("Update successfully!");
            },
            onError: () => {
                console.log("Update failed!");
                toast.error("Update failed!");
            }
        });
    })

    return (
        <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>
            <form className="w-full mt-5" onSubmit={onSubmit}>
                <div className={cn("flex flex-wrap w-full bg-white p-6 rounded-lg shadow-md")}>
                    <div className={cn("w-1/3 px-[20px]")}>
                        <Controller
                            control={control}
                            name="imageThumb"
                            render={({field}) => {
                                console.log("------> Line: 154 | Update.jsx field.value: ", field.value);
                                return (
                                    <Field>
                                        <ImageUpload
                                            defaultValue={defaultValues.image ? [{imgSrc: defaultValues.image}] : []}
                                            image={{
                                                className: "w-full h-auto"
                                            }}
                                            value={field.value ? [{
                                                imgSrc: field.value
                                            }] : []}
                                        >
                                            <Button
                                                {...field}
                                                type="submit"
                                                className={cn(
                                                    "max-w-full h-[400px]",
                                                    "p-6 rounded-lg text-center bg-[#F8F6F2] flex flex-col justify-center items-center gap-4"
                                                )}
                                            >
                                                <CameraIcon className={cn("size-10 fill-gray-400 text-gray-500")}/>
                                                <p className={cn("text-gray-600 font-semibold")}>
                                                    Bạn đã đăng hình món mình nấu ở đây chưa?
                                                </p>
                                                <p className={cn("text-gray-400 text-sm")}>
                                                    Chia sẻ với mọi người thành phẩm nấu nướng của bạn nào!
                                                </p>
                                            </Button>
                                        </ImageUpload>
                                    </Field>
                                )
                            }}
                        />

                        <div className={cn("flex flex-col gap-2 mt-[40px] ")}>
                            <h2 className={cn("text-lg font-semibold text-gray-700 text-[20px]")}>Nguyên Liệu</h2>
                            <div className={cn("flex gap-8 items-center")}>
                                <p className={cn("text-semibold text-gray-500 text-[18px]")}>Khẩu phần:</p>
                                <Controller
                                    control={control}
                                    name="portion"
                                    render={({field}) => (
                                        <Field>
                                            <Input
                                                {...field}
                                                type="text" placeholder="2 người"
                                                className={cn("p-2 rounded-lg mt-2 font-bold bg-[#F8F6F2]",
                                                    "data-[focus]:outline-1 data-[focus]:outline-white text-gray-500")}/>
                                        </Field>
                                    )}
                                />
                            </div>
                            <div className={cn("mt-4")}>
                                <div className={cn("flex flex-col gap-4")}>
                                    <Controller
                                        control={control}
                                        name={`ingredients`}
                                        render={({field}) => {
                                            console.log("field Cahnge", field);
                                            return field.value?.map((item, index) => {
                                                return (
                                                    <div key={index} className={cn("flex items-center gap-2 w-full")}>
                                                        <Input
                                                            type="text"
                                                            placeholder="250g bột"
                                                            value={item.quantity ? `${item.quantity} ${item.name}` : item.name}
                                                            onBlur={(e) => {
                                                                const tokens = (e.target.value || "").trim().split(" ");
                                                                let quantity, name;
                                                                // Nếu token đầu tiên chứa số, thì đó là quantity, phần còn lại là name
                                                                if (tokens.length > 0 && /\d/.test(tokens[0])) {
                                                                    quantity = tokens[0];
                                                                    name = tokens.slice(1).join(" ");
                                                                } else {
                                                                    // Nếu token đầu tiên không chứa số, gán quantity rỗng và toàn bộ giá trị là name
                                                                    quantity = "";
                                                                    name = tokens.join(" ");
                                                                }
                                                                const arrayField = [...field.value];
                                                                arrayField[index] = {
                                                                    ...arrayField[index],
                                                                    name,
                                                                    quantity,
                                                                };
                                                                field.onChange(arrayField);
                                                            }}
                                                            onChange={(e) => {
                                                                console.log("------> Line: 333 | Update.jsx e.target.value: ", e.target.value);
                                                                const arrayField = [...field.value];
                                                                arrayField[index] = {
                                                                    ...arrayField[index],
                                                                    name: e.target.value,
                                                                    quantity: ""
                                                                };
                                                                field.onChange(arrayField);
                                                            }}
                                                            className={cn("p-2 rounded-lg font-bold bg-[#F8F6F2] data-[focus]:outline-1",
                                                                " data-[focus]:outline-white text-gray-500 flex-grow")}
                                                        />
                                                        <Button
                                                            className={cn(
                                                                "flex items-center font-semibold bg-white text-gray-500",
                                                                "hover:cursor-pointer hover:bg-gray-100 transition"
                                                            )}
                                                            onClick={() => removeIngredient(index)}
                                                        >
                                                            <MinusIcon className={cn("size-10 fill-gray-400")}/>
                                                        </Button>
                                                    </div>
                                                )
                                            })
                                        }}
                                    />
                                </div>

                                <Button
                                    className={cn("py-1 px-3 transition flex items-center font-semibold bg-white text-gray-500 mt-[20px] hover:cursor-pointer hover:bg-gray-100")}
                                    onClick={addIngredient}
                                >
                                    <PlusIcon className={cn("size-7 fill-gray-400 mr-1")}/>
                                    Phần nguyên liệu
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={cn("flex flex-col w-2/3 px-[20px] gap-4")}>
                        <Controller
                            control={control}
                            name="title"
                            render={({field}) => (
                                <Field>
                                    <Input
                                        {...field}
                                        className={cn("text-2xl w-full p-2 font-bold bg-[#F8F6F2] data-[focus]:outline-1",
                                            "data-[focus]:outline-white text-gray-500 rounded-lg")}
                                        placeholder="Tên món: Món canh bí ngon nhất nhà mình"/>
                                </Field>
                            )}
                        />
                        <div className={cn("flex items-center mt-4 space-x-3")}>
                            <img src={bgImage6 || ""} alt="" className={cn("rounded-full w-[40px] h-[40px]")}/>
                            <div>
                                <Controller
                                    control={control}
                                    name="user"
                                    render={({field}) => (
                                        <Field>
                                            <p className={cn("text-sm font-semibold text-gray-700")}>{detailRecipeMutation.data?.user?.email}</p>
                                        </Field>
                                    )}
                                />
                                <p className={cn("text-xs text-gray-400")}>Hãy chia sẻ với mọi người về món này...</p>
                            </div>
                        </div>
                        <Controller
                            control={control}
                            name="description"
                            render={({field}) => (
                                <Field>
                                    <Input
                                        {...field}
                                        className={cn("text-2xl w-full p-2 font-bold bg-[#F8F6F2] data-[focus]:outline-1 rounded-lg",
                                            "data-[focus]:outline-white text-gray-500 text-sm h-[60px] placeholder:whitespace-pre-line w-auto min-w-full")}
                                        placeholder="Hãy chia sẻ với mọi người về món này của bạn nhé - ai đã truyền cảm hứng cho bạn, tại sao nó đặc biệt, bạn thích thưởng thức nó thế nào?"/>
                                </Field>
                            )}
                        />
                        <div className={cn("mt-[20px]")}>
                            <h2 className={cn("text-lg font-semibold text-gray-700 text-[20px]")}>Các bước</h2>
                            <div className={cn("flex flex-wrap gap-8 items-center")}>
                                <p className={cn("text-semibold text-gray-500 text-[18px]")}>Thời gian nấu</p>
                                <Controller
                                    control={control}
                                    name="time"
                                    render={({field}) => (
                                        <Field>
                                            <Input
                                                {...field}
                                                type="text"
                                                className={cn("text-2xl p-2 font-bold bg-[#F8F6F2] data-[focus]:outline-1 rounded-lg",
                                                    "data-[focus]:outline-white text-gray-500 text-sm placeholder:whitespace-pre-line whitespace-pre-line flex-grow-1")}
                                                placeholder="1 tiếng 30 phút"/>
                                        </Field>
                                    )}
                                />
                            </div>


                            <div className={cn("flex flex-col mt-4 gap-4")}>
                                <Controller
                                    control={control}
                                    name="cookSteps"
                                    render={({field}) => (
                                        <DndContext
                                            onDragStart={handleDragStart}
                                            onDragEnd={handleDragEnd}
                                            onDragCancel={handleDragCancel}
                                        >
                                            <SortableContext items={fields}>
                                                {fields.map((item, index) => (
                                                    <CookStep
                                                        form={{getValues, control}}
                                                        key={item.id}
                                                        item={item}
                                                        index={index}
                                                        field={field}
                                                        removeIngredient_c={removeCookStep}
                                                    />
                                                ))}
                                            </SortableContext>
                                            <DragOverlay>
                                                {activeId ? (
                                                    // Hiển thị phần tử đang kéo (có thể tùy chỉnh giao diện)
                                                    <div className={cn("p-4 bg-white shadow-md rounded-lg")}>
                                                        {fields.find((i) => i.id === activeId)?.description ||
                                                            ""}
                                                    </div>
                                                ) : null}
                                            </DragOverlay>
                                        </DndContext>
                                    )}
                                />
                                <Button
                                    className={cn("py-1 px-3 transition flex items-center justify-center font-semibold bg-white text-gray-500 mt-[20px] hover:cursor-pointer hover:bg-gray-100")}
                                    onClick={addIngredient_c}
                                >
                                    <PlusIcon className={cn("size-7 fill-gray-400 mr-1")}/>
                                    Thêm công thức
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={cn("mt-5 flex items-center justify-end gap-2")}>
                    <Link
                        to={ROUTES.HOME}
                        className={cn(
                            "flex items-center gap-2 bg-white rounded-lg px-2.5 py-1.5 text-center justify-center",
                            "font-semibold text-gray-800 shadow-inner shadow-white/10 focus:outline-none transition-all",
                            "data-[focus]:outline-1 data-[focus]:outline-white",
                            "bg-red-400 data-[open]:bg-[rgb(255,145,0)] border border-solid border-[rgb(255,145,0)]-300",
                            "data-[hover]:text-neutral-200 data-[open]:text-neutral-200 text-[18px] w-[200px] text-white"
                        )}>
                        Thoát
                    </Link>
                    <Button
                        type="submit"
                        className={cn(
                            "flex items-center gap-2 bg-white rounded-lg px-2.5 py-1.5 justify-center",
                            "font-semibold text-gray-800 shadow-inner shadow-white/10 focus:outline-none transition-all",
                            "data-[focus]:outline-1 data-[focus]:outline-white",
                            "bg-gray-500 data-[open]:bg-[rgb(255,145,0)] border border-solid border-[rgb(255,145,0)]-300",
                            "data-[hover]:text-neutral-200 data-[open]:text-neutral-200 text-[18px] w-[200px] text-white"
                        )}
                    >
                        <PencilSquareIcon className={cn("size-5 fill-white text-[rgb(255,145,0)]")}/>
                        Chỉnh Sửa
                    </Button>
                </div>
            </form>

            <DevTool control={control}/>
        </div>
    )
}

export default Update;
