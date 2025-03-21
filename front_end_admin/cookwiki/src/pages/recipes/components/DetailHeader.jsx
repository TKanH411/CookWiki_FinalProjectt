import {cn} from "@/lib/utils";
import {HandThumbUpIcon, ShareIcon} from "@heroicons/react/24/outline";
import {NumericFormat} from "react-number-format";
import avatar from "@/assets/images/avatar.webp";
import {STATUS_LIST} from "@/utils/string";

export default function DetailHeader({detail}) {
    return (
        <div className={"grid grid-cols-12 gap-4"}>
            <div className={"col-span-12 md:col-span-4"}>
                <img
                    src={detail.imageThumb}
                    alt={detail.title}
                    className={"object-cover w-full rounded-lg max-h-[300px]"}
                />
            </div>

            <div className={"col-span-12 md:col-span-8 flex flex-col gap-2"}>
                <div className={cn("font-bold text-3xl text-[#4a4a4a] inline-flex items-start")}>
                    <p
                        className={cn(
                            "bottom-2 rounded-full px-2 py-1 w-[100px] text-center",
                            "text-sm font-semibold inline-block mr-2 mt-2"
                        )}
                        style={{
                            backgroundColor: detail.styleColor?.backgroundColor,
                            color: detail.styleColor?.color,
                        }}
                    >
                        {(detail.status || STATUS_LIST.DRAFT).toUpperCase()}
                    </p>
                    {detail.title}
                </div>

                <div className={cn("flex gap-2 items-center mt-3")}>
                    <img
                        src={detail.user?.avatar || avatar}
                        alt={detail.user?.email}
                        className={"size-12 rounded-full"}
                    />
                    <span className={cn("font-semibold text-xl leading-10")}>{detail.user?.email}</span>
                    {/*<span className={cn("leading-10")}>{detail.user?.email}</span>*/}
                </div>

                <div className={cn("flex gap-2 items-center mt-3")}>
                    <div className={cn("flex gap-2 items-center mt-3 text-gray-600")}>
                        <HandThumbUpIcon className={cn("size-5")}/>
                        <NumericFormat value={detail.like} thousandSeparator displayType="text"/>
                    </div>

                    <div className={cn("flex gap-2 items-center mt-3 text-gray-600")}>
                        <ShareIcon className={cn("size-5")}/>
                        <NumericFormat value={detail.share} thousandSeparator displayType="text"/>
                    </div>
                </div>

                <div>
                    <p className={cn("text-lg font-semibold")}>Mô tả</p>
                    <p>{detail.description}</p>
                </div>
            </div>
        </div>
    )
}