import {useEffect, useRef, useState} from "react";
import {dataRecipes} from "@/utils/mock";
import {cn} from "@/lib/utils";
import {Button, Textarea} from "@headlessui/react";
import {PaperAirplaneIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useComment, useSendComment} from "@/hooks/useComment";
import avatar from "@/assets/avatar.webp";

const formSchema = z.object({
    message: z.string().nonempty("Comment is required"),
});

export default function RecipesComments({id}) {
    const comments = useComment(id)
    console.log("------> Line: 18 | RecipesComments.jsx comments: ", comments);
    const sendCommentMutation = useSendComment();

    const {
        control,
        handleSubmit,
        setValue
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        }
    })

    const [detail, setDetail] = useState({});
    console.log("------> Line: 33 | RecipesComments.jsx detail: ", detail);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const commentIdRef = useRef(null);

    const toggleModalDeleteComment = (id) => {
        console.log("------> Line: 7 | RecipesComments.jsx toggleModal");
        console.log("------> Line: 8 | RecipesComments.jsx id: ", id);

        setIsModalOpen(id);
        commentIdRef.current = id;
    }

    const deleteComment = (id) => {
        console.log("------> Line: 20 | RecipesComments.jsx deleteComment");
        console.log("------> Line: 21 | RecipesComments.jsx id: ", id);
        toggleModalDeleteComment();
    }

    useEffect(() => {
        console.log("------> Line: 44 | RecipesDetail.jsx fetchDataDetail");
        console.log("------> Line: 45 | RecipesDetail.jsx id: ", id);

        const res = dataRecipes.find((item) => {
            return item.id === Number(id);
        });

        setDetail({
            ...res,
            styleColor: {
                backgroundColor: "#fff",
                color: "#fdfdfd",
            }
        });
    }, [id]);

    const onSubmit = handleSubmit((data) => {
        console.log("------> Line: 68 | RecipesComments.jsx data: ", data);

        sendCommentMutation.mutate({
            message: data.message,
            productId: id
        }, {
            onSuccess: () => {
                console.log("------> Line: 73 | RecipesComments.jsx onSuccess");
                setValue("message", "");
            },
            onError: () => {
                console.log("------> Line: 76 | RecipesComments.jsx onError");
            }
        });
    });

    const Comment = ({comment}) => {
        return (
            <div className="flex space-x-4 py-4">
                {/* Avatar */}
                <img
                    src={comment.sender?.avatar || avatar}
                    alt={comment.sender?.name}
                    className="w-10 h-10 rounded-full"
                />

                {/* Comment Body */}
                <div className="flex-1">
                    <div className="text-sm font-semibold">{comment.sender?.name} <span
                        className="text-gray-500">{comment.sender?.email}</span></div>
                    <p className="text-gray-700">{comment.message}</p>

                    {/*<div className={cn("flex gap-4")}>*/}
                    {/*    <Button*/}
                    {/*        className={cn(*/}
                    {/*            "text-sm text-[#f09030] flex items-center gap-1 mt-2",*/}
                    {/*            "hover:cursor-pointer hover:text-[#ff9933]"*/}
                    {/*        )}*/}
                    {/*        onClick={() => toggleModalDeleteComment(comment.id)}*/}
                    {/*    >*/}
                    {/*        <TrashIcon className={cn("size-4")}/>*/}
                    {/*        Delete*/}
                    {/*    </Button>*/}
                    {/*</div>*/}

                    {/* Reply Section */}
                    {comment.reply && (
                        <div className="mt-3 pl-4 border-l border-gray-300">
                            {comment.reply.map((reply) => (
                                <Comment key={reply.id} comment={reply}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const Modal = ({isOpen}) => {
        if (!isOpen) return null; // Nếu modal không mở, không render gì cả

        return (
            <div
                className={cn(
                    "fixed inset-0 backdrop-brightness-50 backdrop-blur-sm flex justify-center items-center z-50"
                )}
                onClick={() => toggleModalDeleteComment()}
            >
                <div
                    className={cn(
                        "relative bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px]"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button
                        onClick={() => toggleModalDeleteComment()}
                        className={cn(
                            "absolute top-2 right-0 transform -translate-x-1/2",
                            "rounded-full text-gray-700 transition bg-white",
                            "hover:bg-gray-200 hover:cursor-pointer"
                        )}
                    >
                        <XMarkIcon className={cn("size-5")}/>
                    </Button>

                    <h2 className={cn("text-lg font-semibold mb-4")}>Delete comment</h2>
                    <p className={cn("text-gray-600 mb-4")}>
                        Comment will be deleted permanently. Are you sure?
                    </p>
                    <div className={cn("flex justify-end")}>
                        <Button
                            onClick={() => deleteComment(commentIdRef.current)}
                            className={cn(
                                "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                            )}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={cn("grid grid-cols-12 justify-center")}>
            <div className={cn("col-span-10 col-start-2")}>
                <div className={"flex flex-col relative"}>
                    <div>
                        {(comments.data || [])?.map((comment, idx) => (
                            <Comment key={idx} comment={comment}/>
                        ))}
                    </div>
                </div>

                <form className={cn("relative")} onSubmit={onSubmit}>
                    <Controller control={control}
                                name="message"
                                render={({field}) => (
                                    <Textarea
                                        {...field}
                                        placeholder={"Comment"}
                                        rows={4}
                                        type="text"
                                        className={cn("p-3 pr-10 rounded-lg mt-2 font-bold w-full bg-[#F8F6F2]",
                                            "data-[focus]:outline-1 data-[focus]:outline-white text-gray-500")}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault(); // Ngăn xuống dòng
                                                onSubmit().then(r => r); // Submit form
                                            }
                                        }}
                                    />
                                )}
                    />

                    <Button type="submit" className={cn("group absolute right-2 bottom-3 hover:cursor-pointer")}>
                        <PaperAirplaneIcon className={cn("size-6 text-[#f09030] group-hover:text-[#ff9933]")}/>
                    </Button>
                </form>
            </div>

            <Modal isOpen={isModalOpen}/>
        </div>
    )
}