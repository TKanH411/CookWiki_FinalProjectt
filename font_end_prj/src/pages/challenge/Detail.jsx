import {cn} from "@/lib/utils";
import bgImage4 from "@/assets/img-4.jpg";
import bgImage3 from "@/assets/img-3.jpg";
import bgImage5 from "@/assets/img-5.jpg";
import { ClockIcon, RectangleStackIcon, SparklesIcon, UserIcon, UsersIcon } from "@heroicons/react/20/solid";
import {Button} from "@headlessui/react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

function Detail() {
    return (
       <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>
            <div className={cn("flex flex-wrap gap-3 mt-[20px] px-[200px] w-full justify-center")} >
                <img src={bgImage5} alt="" className={cn("flex w-[690px] h-[380px] object-cover rounded-lg")} />
                <div className={cn("flex flex-col shadow-md min-w-4/5 bg-[rgba(255,255,255,0.8)] rounded-2xl border border-solid border-gray-300 p-4 gap-4 relative top-[-60px]")}>
                    <p className={cn("text-[16px] font-bold flex items-center")}>
                            <UsersIcon className={cn("size-5 mr-2 fill-black")}/>
                            7 chủ bếp đã tham gia
                    </p>
                    <div className={cn("flex flex-wrap justify-between  gap-1 text-[rgba(96,96,96,0.9)]")}>
                        <p className={cn("text-[16px] font-bold flex items-center")}>
                            <RectangleStackIcon className={cn("size-5 mr-2 fill-black")}/>
                            4 Món
                        </p>
                        <p className={cn("text-[16px] font-normal flex items-center")}>
                            <ClockIcon className={cn("size-5 mr-2 fill-black")}/>
                            Còn 8 ngày 
                        </p>
                    </div>
                </div>
                <div className={cn("flex flex-wrap gap-3 mt-[20px] w-full")}>
                    <p className={cn("text-[18px] font-bold flex items-center")}>
                        <SparklesIcon className={cn("size-5 mr-2 fill-black")}/>
                        Thực phẩm lên men là gì?
                    </p>
                    <span className={cn("text-[16px] font-normal flex items-center text-[rgba(96,96,96,0.9)]")}>
                        Thực phẩm lên men là những thực phẩm được tạo ra bằng cách sử dụng vi khuẩn hoặc nấm men để chuyển hóa đường và tinh bột thành các hợp chất hữu cơ có lợi như axit lactic, axit acetic, và các enzyme tiêu hóa. 
                        Quá trình này không chỉ giúp bảo quản thực phẩm lâu hơn mà còn tạo ra các lợi khuẩn (probiotics), giúp cải thiện hệ tiêu hóa và tăng cường sức đề kháng.
                    </span>
                    <p className={cn("text-[18px] font-bold flex items-center")}>
                        <SparklesIcon className={cn("size-5 mr-2 fill-black")}/>
                        Các loại thực phẩm và món ăn sử dụng phương pháp lên men phổ biến:
                    </p>
                    <span className={cn("text-[16px] font-normal flex items-center text-[rgba(96,96,96,0.9)]")}>
                        <p className={cn("text-[16px] font-bold mr-2.5")}> 1. Thực phẩm lên men từ rau củ: </p>
                        Dưa cải chua, cà muối, kim chi, dưa chuột muối, dưa kiệu, bắp cải muối...
                    </span>
                    <span className={cn("text-[16px] font-normal flex items-center text-[rgba(96,96,96,0.9)]")}>
                        <p className={cn("text-[16px] font-bold mr-2.5")}> 2. Thực phẩm lên men từ sữa: </p>
                        Sữa chua, phô mai (Blue Cheese, Cheddar, Brie đều qua quá trình lên men)
                    </span>
                    <span className={cn("text-[16px] font-normal flex items-center text-[rgba(96,96,96,0.9)]")}>
                        <p className={cn("text-[16px] font-bold mr-2.5")}> 3. Thực phẩm lên men từ đậu nành:  </p>
                        Tương miso, natto (Nhật), tempeh (Indonesia), tương hột, chao
                    </span>
                    <span className={cn("text-[16px] font-normal flex items-center text-[rgba(96,96,96,0.9)]")}>
                        <p className={cn("text-[16px] font-bold mr-2.5")}> 4. Đồ uống lên men: </p>
                        Kombucha (Trà lên men chứa probiotics)
                    </span>
                    <span className={cn("text-[16px] font-normal flex items-center text-[rgba(96,96,96,0.9)]")}>
                        <p className={cn("text-[16px] font-bold mr-2.5")}> 5. Thực phẩm lên men từ tinh bột và ngũ cốc: </p>
                        Bánh mì men tự nhiên (Sourdough), cơm rượu
                    </span>
                    <p className={cn("text-[18px] font-normal flex items-center")}>
                        Thực phẩm lên men không chỉ mang lại hương vị đặc trưng mà còn giúp hỗ trợ tiêu hóa, tăng sức đề kháng và cải thiện hệ vi sinh đường ruột. Bạn có hay dùng thực phẩm lên men nào trong bữa ăn hàng ngày không? Hãy tham gia thử thách này của Cookpad để chế biến các thực phẩm sử dụng phương pháp lên men kể trên, hay sáng tạo món ăn với các nguyên liệu đã được lên men để làm phong phú thêm bữa ăn của gia đình bạn và góp phần tăng sức đề kháng trong mùa dịch này nhé.
                    </p>
                </div>
                <Button
                    type="submit"
                    className={cn(
                        "inline-flex items-center justify-center gap-2 bg-white py-1.5 px-3 text-sm/6 rounded-full",
                        "font-semibold text-gray-800 shadow-inner shadow-white/10 focus:outline-none transition-all",
                        "data-[focus]:outline-1 data-[focus]:outline-white mt-[20px]",
                        "data-[hover]:bg-yellow-600 data-[open]:bg-yellow-600 border border-solid border-yellow-300",
                        "data-[hover]:text-neutral-200 data-[open]:text-neutral-200 text-[18px] w-[270px] "
                    )}
                >
                    Gửi Món Tham Gia
                </Button>
                <div className={cn("flex flex-wrap gap-3 my-[20px] w-full")} >
                    <h2 className={cn("text-[20px] font-bold w-full text-[rgba(96,96,96,0.9)]")}>4 món đã lên sóng</h2>
    
                    <div className={cn("flex flex-wrap justify-items-start gap-8 w-full mt-4")}>
                        <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col gap-4 w-[210px] shadow-md rounded-lg p-3",
                            "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                            <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                            <div className={cn("flex flex-col gap-1 text-[rgba(96,96,96,0.9)]")}>
                                <p className={cn("text-[20px] font-bold flex leading-none")}>Thực Phẩm Lên Men</p>
                                <p className={cn("text-[16px] font-normal flex items-center ")}>
                                    <UserIcon className={cn("size-5 mr-2 fill-black")}/>Hoang Tu Lien
                                </p>
                            </div>
                        </Link>
                        <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col gap-4 w-[210px] shadow-md rounded-lg p-3",
                            "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                            <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                            <div className={cn("flex flex-col gap-1 text-[rgba(96,96,96,0.9)]")}>
                                <p className={cn("text-[20px] font-bold flex leading-none")}>Thực Phẩm Lên Men</p>
                                <p className={cn("text-[16px] font-normal flex items-center ")}>
                                    <UserIcon className={cn("size-5 mr-2 fill-black")}/>Hoang Tu Lien
                                </p>
                            </div>
                        </Link>
                        <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col gap-4 w-[210px] shadow-md rounded-lg p-3",
                            "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                            <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                            <div className={cn("flex flex-col gap-1 text-[rgba(96,96,96,0.9)]")}>
                                <p className={cn("text-[20px] font-bold flex leading-none")}>Thực Phẩm Lên Men</p>
                                <p className={cn("text-[16px] font-normal flex items-center ")}>
                                    <UserIcon className={cn("size-5 mr-2 fill-black")}/>Hoang Tu Lien
                                </p>
                            </div>
                        </Link>
                        <Link to={ROUTES.CHALLENGE_DETAIL} className={cn("flex flex-col gap-4 w-[210px] shadow-md rounded-lg p-3",
                            "justify-center bg-[rgba(255,255,255,0.8)] ")}>
                            <img className={cn("flex w-[324px] h-[130px] object-cover rounded-lg")} src={bgImage4} alt="" />
                            <div className={cn("flex flex-col gap-1 text-[rgba(96,96,96,0.9)]")}>
                                <p className={cn("text-[20px] font-bold flex leading-none")}>Thực Phẩm Lên Men</p>
                                <p className={cn("text-[16px] font-normal flex items-center ")}>
                                    <UserIcon className={cn("size-5 mr-2 fill-black")}/>Hoang Tu Lien
                                </p>
                            </div>
                        </Link>

                    </div>
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

export default Detail;
