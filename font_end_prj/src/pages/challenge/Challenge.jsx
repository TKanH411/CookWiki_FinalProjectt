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
                <h2 className={cn("text-[20px] font-bold w-full text-[rgba(96,96,96,0.9)]")}>Thử thách đang diễn ra</h2>

                <div className={cn("flex flex-wrap justify-items-start gap-8 w-full mt-4")}>
                    <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col w-[320px] shadow-md rounded-lg p-3",
                        "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                        <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                        <div className={cn("flex flex-col p-5 gap-1 text-[rgba(96,96,96,0.9)]")}>
                            <p className={cn("text-[20px] font-bold flex")}>Thực Phẩm Lên Men</p>
                            <p className={cn("text-[16px] font-normal flex items-center ")}>
                                <ClockIcon className={cn("size-5 mr-2 fill-black")}/>Còn 8 ngày 
                            </p>
                        </div>
                    </Link>

                    <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col w-[320px] shadow-md rounded-lg p-3",
                        "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                        <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                        <div className={cn("flex flex-col p-5 gap-1 text-[rgba(96,96,96,0.9)]")}>
                            <p className={cn("text-[20px] font-bold flex")}>Thực Phẩm Lên Men</p>
                            <p className={cn("text-[16px] font-normal flex items-center ")}>
                                <ClockIcon className={cn("size-5 mr-2 fill-black")}/>Còn 8 ngày 
                            </p>
                        </div>
                    </Link>

                    <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col w-[320px] shadow-md rounded-lg p-3",
                        "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                        <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                        <div className={cn("flex flex-col p-5 gap-1 text-[rgba(96,96,96,0.9)]")}>
                            <p className={cn("text-[20px] font-bold flex")}>Thực Phẩm Lên Men</p>
                            <p className={cn("text-[16px] font-normal flex items-center ")}>
                                <ClockIcon className={cn("size-5 mr-2 fill-black")}/>Còn 8 ngày 
                            </p>
                        </div>
                    </Link>

                    <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col w-[320px] shadow-md rounded-lg p-3",
                        "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                        <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                        <div className={cn("flex flex-col p-5 gap-1 text-[rgba(96,96,96,0.9)]")}>
                            <p className={cn("text-[20px] font-bold flex")}>Thực Phẩm Lên Men</p>
                            <p className={cn("text-[16px] font-normal flex items-center ")}>
                                <ClockIcon className={cn("size-5 mr-2 fill-black")}/>Còn 8 ngày 
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className={cn("flex flex-wrap gap-3 mt-[20px] px-14 w-full")} >
                <h2 className={cn("text-[20px] font-bold w-full text-[rgba(96,96,96,0.9)]")}>Thử thách sắp diễn ra</h2>

                <div className={cn("flex flex-wrap justify-items-start gap-8 w-full mt-4")}>
                    <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col w-[320px] shadow-md rounded-lg p-3",
                        "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                        <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                        <div className={cn("flex flex-col p-5 gap-1 text-[rgba(96,96,96,0.9)]")}>
                            <p className={cn("text-[20px] font-bold flex")}>Thực Phẩm Lên Men</p>
                            <p className={cn("text-[16px] font-normal flex items-center ")}>
                                <ClockIcon className={cn("size-5 mr-2 fill-black")}/>Còn 8 ngày 
                            </p>
                        </div>
                    </Link>

                    <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col w-[320px] shadow-md rounded-lg p-3",
                        "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                        <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                        <div className={cn("flex flex-col p-5 gap-1 text-[rgba(96,96,96,0.9)]")}>
                            <p className={cn("text-[20px] font-bold flex")}>Thực Phẩm Lên Men</p>
                            <p className={cn("text-[16px] font-normal flex items-center ")}>
                                <ClockIcon className={cn("size-5 mr-2 fill-black")}/>Còn 8 ngày 
                            </p>
                        </div>
                    </Link>

                    <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col w-[320px] shadow-md rounded-lg p-3",
                        "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                        <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                        <div className={cn("flex flex-col p-5 gap-1 text-[rgba(96,96,96,0.9)]")}>
                            <p className={cn("text-[20px] font-bold flex")}>Thực Phẩm Lên Men</p>
                            <p className={cn("text-[16px] font-normal flex items-center ")}>
                                <ClockIcon className={cn("size-5 mr-2 fill-black")}/>Còn 8 ngày 
                            </p>
                        </div>
                    </Link>

                    <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col w-[320px] shadow-md rounded-lg p-3",
                        "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                        <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                        <div className={cn("flex flex-col p-5 gap-1 text-[rgba(96,96,96,0.9)]")}>
                            <p className={cn("text-[20px] font-bold flex")}>Thực Phẩm Lên Men</p>
                            <p className={cn("text-[16px] font-normal flex items-center ")}>
                                <ClockIcon className={cn("size-5 mr-2 fill-black")}/>Còn 8 ngày 
                            </p>
                        </div>
                    </Link>
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

export default Challenge;
