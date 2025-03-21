import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useMainLayout} from "@/layouts/main-layout/context/hooks/useMainLayout";
import {ROUTES} from "@/routes/routes";
import {dataRecipes} from "@/utils/mock";
import {parseColorStatus} from "@/utils/string";
import {cn} from "@/lib/utils";
import DetailHeader from "@/pages/recipes/components/DetailHeader";
import {Button} from "@headlessui/react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {XMarkIcon} from "@heroicons/react/20/solid";

export default function RecipesComments() {
    const {id} = useParams();

    const {setBreadcrumbs} = useMainLayout();

    const [detail, setDetail] = useState({});
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
        console.log("------> Line: 25 | RecipesDetail.jsx fetchDataDetail");
        setBreadcrumbs(
            [{
                title: "Home",
                link: ROUTES.HOME,
            }, {
                title: "Recipes",
                link: ROUTES.RECIPES,
            }, {
                title: detail.title,
                link: ROUTES.RECIPES_DETAIL.replace(":id", id),
            }, {
                title: "Comments",
                link: ROUTES.RECIPES_COMMENTS.replace(":id", id),
            }]
        );
    }, [detail.title, id, setBreadcrumbs]);

    useEffect(() => {
        console.log("------> Line: 44 | RecipesDetail.jsx fetchDataDetail");
        console.log("------> Line: 45 | RecipesDetail.jsx id: ", id);

        const res = dataRecipes.find((item) => {
            return item.id === Number(id);
        });

        const {statusColor, color} = parseColorStatus(res.status);

        setDetail({
            ...res,
            styleColor: {
                backgroundColor: statusColor,
                color: color,
            }
        });
    }, [id]);

    const Comment = ({comment}) => {
        return (
            <div className="flex space-x-4 py-4">
                {/* Avatar */}
                <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full"
                />

                {/* Comment Body */}
                <div className="flex-1">
                    <div className="text-sm font-semibold">{comment.user.name} <span
                        className="text-gray-500">{comment.user.username}</span></div>
                    <p className="text-gray-700">{comment.content}</p>

                    <div className={cn("flex gap-4")}>
                        <Button
                            className={cn(
                                "text-sm text-orange-f09030 flex items-center gap-1 mt-2",
                                "hover:cursor-pointer hover:text-orange-ff9933"
                            )}
                            onClick={() => toggleModalDeleteComment(comment.id)}
                        >
                            <TrashIcon className={cn("size-4")}/>
                            Delete
                        </Button>
                    </div>

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
                    <div className={cn("sticky top-0 bg-white pb-4")}>
                        <DetailHeader detail={detail}/>
                    </div>

                    <div>
                        {detail.comments?.map((comment, idx) => (
                            <Comment key={idx} comment={comment}/>
                        ))}
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen}/>
        </div>
    )
}