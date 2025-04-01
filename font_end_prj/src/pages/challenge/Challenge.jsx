import {cn} from "@/lib/utils";
import bgImage4 from "@/assets/img-4.jpg";
import bgImage3 from "@/assets/img-3.jpg";
import { ClockIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {ROUTES} from "@/routes/routes";

function Challenge() {
    return (
       <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>
            <div className={cn("flex flex-wrap gap-3 mt-[20px] px-14 w-full")} >
                <h2 className={cn("text-[20px] font-bold w-full text-[rgba(96,96,96,0.9)]")}>Những thử thách nấu ăn đang diễn ra</h2>

                <div className={cn("flex flex-wrap justify-items-start gap-8 w-full mt-4")}>
                    <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col w-[320px] shadow-md rounded-lg p-3",
                        "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                        <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                        <div className={cn("flex flex-col p-5 gap-1 text-[rgba(96,96,96,0.9)]")}>
                            <p className={cn("text-[20px] font-bold flex")}>Món Chiên Xào</p>
                            <p className={cn("text-[16px] font-normal flex items-center ")}>
                                <ClockIcon className={cn("size-5 mr-2 fill-black")}/>Còn 8 ngày nữa
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className={cn("flex flex-wrap gap-3 mt-[20px] px-14 w-full")} >
                <h2 className={cn("text-[20px] font-bold w-full text-[rgba(96,96,96,0.9)]")}>Những thách thức sắp tới</h2>

                <div className={cn("flex flex-wrap justify-items-start gap-8 w-full mt-4")}>
                    <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col w-[320px] shadow-md rounded-lg p-3",
                        "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                        <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                        <div className={cn("flex flex-col p-5 gap-1 text-[rgba(96,96,96,0.9)]")}>
                            <p className={cn("text-[20px] font-bold flex")}>Món Kho </p>
                            <p className={cn("text-[16px] font-normal flex items-center ")}>
                                <ClockIcon className={cn("size-5 mr-2 fill-black")}/>Còn 30 ngày nữa
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            <p className={cn("text-[20px] font-bold")}>Về CookWiki</p>
            <span className={cn("text-[16px] font-semibold")}>Sứ mệnh của CookWiki là làm cho việc nấu ăn trở nên thú vị hơn mỗi ngày vì chúng tôi tin rằng nấu ăn là chìa khóa cho cuộc sống hạnh phúc và khỏe mạnh hơn cho mọi người, cộng đồng và hành tinh. Chúng tôi mong muốn hỗ trợ các đầu bếp tại nhà trên toàn thế giới để họ có thể giúp đỡ lẫn nhau bằng cách chia sẻ các công thức nấu ăn ngon và kinh nghiệm nấu ăn của họ.</span>
            <div className={cn("bg-center bg-no-repeat bg-cover w-full h-[100px]")} 
                style={{backgroundImage: `url(${bgImage3})`}}/>
        </div>
    );
}

export default Challenge;