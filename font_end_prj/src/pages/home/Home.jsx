import {cn} from "@/lib/utils";
import bgImage from "@/assets/img-1.jpg";
import bgImage2 from "@/assets/img-2.jpg";
import bgImage3 from "@/assets/img-3.jpg";

function Home() {
    return (
        <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>
            <div className={cn("flex items-center bg-top bg-no-repeat bg-cover h-[550px] rounded-lg")}
                 style={{backgroundImage: `url(${bgImage})`}}>
                <div className={cn("flex items-end bg-[rgba(74,74,74,0.4)] h-[550px] pb-18 rounded-lg")}>
                    <div className={cn("flex flex-wrap gap-6 text-white px-14 w-1/2")}>
                        <h2 className={cn(" text-white text-[30px] font-bold")}>Biến việc nấu ăn hàng ngày trở nên thú
                            vị hơn!</h2>
                        <p className={cn(" text-white text-[20px] font-bold")}>Tìm và chia sẻ các công thức tuyệt vời
                            cho việc nấu ăn hàng ngày của bạn</p>
                    </div>
                </div>

            </div>

            <div className={cn("flex items-center mt-[20px] px-14")}>
                <div className={cn("flex flex-wrap gap-4 pr-10 text-gray-600")}>
                    <h2 className={cn("text-[30px] font-bold")}>Tìm và khám phá món ngon từ cộng đồng Cookpad</h2>
                    <p className={cn("text-[20px] font-normal")}>Thông qua tìm kiếm trên Cookpad, bạn có thể khám phá
                        công thức nấu ăn theo nguyên liệu hoặc tên món ăn, đảm bảo bạn luôn tìm được món ngon.</p>
                    <p className={cn("text-[20px] font-normal")}>Trải nghiệm tìm kiếm thậm chí còn tốt hơn với ứng dụng
                        di động Cookpad miễn phí!</p>
                </div>
                <img src={bgImage2} alt="" width={"230px"} height={"460px"}/>
            </div>

            <div className={cn("flex items-center my-[20px] px-14")}>
                <img src={bgImage2} alt="" width={"230px"} height={"460px"}/>
                <div className={cn("flex flex-wrap gap-4 pl-10 text-gray-600")}>
                    <h2 className={cn("text-[30px] font-bold")}>Lưu công thức</h2>
                    <p className={cn("text-[20px] font-normal")}>Sử dụng biểu tượng đánh dấu, bạn có thể lưu các công
                        thức nấu ăn trong trang bếp của mình để dùng sau này.</p>
                    <p className={cn("text-[20px] font-normal")}>Với ứng dụng di động Cookpad miễn phí, bạn có thể lưu
                        và quản lý công thức nấu ăn của mình hiệu quả hơn!</p>
                </div>
            </div>

            <div className={cn("flex items-center mt-[20px] px-14")}>
                <div className={cn("flex flex-wrap gap-4 pr-10 text-gray-600")}>
                    <h2 className={cn("text-[30px] font-bold")}>Chia sẻ cách làm món ngon của bạn</h2>
                    <p className={cn("text-[20px] font-normal")}>
                        TBạn có thể ghi lại và chia sẻ kinh nghiệm nấu ăn hoặc công thức món ngon của gia đình mình mãi mãi bằng cách đăng chúng lên Cookpad.</p>
                    <p className={cn("text-[20px] font-normal")}>Chia sẻ món ngon của bạn bằng ứng dụng di động Cookpad miễn phí!</p>
                </div>
                <img src={bgImage2} alt="" width={"230px"} height={"460px"}/>
            </div>

            <div className={cn("flex w-full px-14")}>
                <div className={cn("grid grid-cols-2 gap-4 auto-rows-auto max-w-lg")}>
                    <div>
                        <div className={cn("flex items-center space-x-2 mb-2")}>
                            <img src={bgImage2} alt="" className={cn("w-[16px] h-[16px] rounded-full")}/>
                            <span className={cn("text-gray-700 font-semibold")}>Yến Nhi</span>
                        </div>
                        <div className={cn("flex flex-col gap-2 p-3 w-[170px] bg-white shadow-md rounded-lg")}>
                            <img src={bgImage2} alt="" className={cn("w-[154px] h-[154px] object-cover rounded-lg")}/>
                            <p className={cn("mt-2 text-gray-700 font-medium leading-none")}>Cảm ơn công thức chuẩn vị Ý của bạn! Ngon cực! ❤️</p>
                            <p className={cn("text-gray-500 text-sm")}>🍝 <span className={cn("font-bold")}>Mì Ý sốt kem carbonara</span></p>
                            <p className={cn("text-gray-400 text-xs")}>👨‍🍳 George</p>
                        </div>
                    </div>

                    <div className={cn("row-span-2 mt-[30px]")} >
                        <div className={cn("flex items-center space-x-2 mb-2")}>
                            <img src={bgImage2} alt="" className={cn("w-[16px] h-[16px] rounded-full")}/>
                            <span className={cn("text-gray-700 font-semibold")}>Linh</span>
                        </div>
                        <div className={cn("flex flex-col gap-2 p-3 w-[170px] bg-white shadow-md rounded-lg")}>
                            <img src={bgImage2} alt="" className={cn("w-[154px] h-[154px] object-cover rounded-lg")}/>
                            <p className={cn("mt-2 text-gray-700 font-medium leading-none")}>Con tôi thích mê! Bánh rất mềm thơm. Cảm ơn bạn đã chia sẻ! 🍩🍫</p>
                            <p className={cn("text-gray-500 text-sm")}>🍩 <span className={cn("font-bold")}>Donut socola</span></p>
                            <p className={cn("text-gray-400 text-xs")}>👨‍🍳 Bảo Anh</p>
                        </div>
                    </div>
                </div>

                <div className={cn("w-1/2 flex flex-col justify-center pl-12")}>
                    <h2 className={cn("text-2xl font-bold text-gray-800")}>Kết quả nấu thế nào?</h2>
                    <p className={cn("text-gray-600 mt-2")}>
                        Thể hiện sự trân trọng của bạn đối với các chủ bếp đã chia sẻ công thức.
                        Thông qua Cooksnaps, bạn có thể cho họ biết công thức của họ hiệu quả với bạn.
                    </p>
                </div>
            </div>

            <p className={cn("flex text-[20px] font-bold")}>Về Cookpad</p>
            <span className={cn("flex text-[16px] font-semibold")}>Sứ mệnh của Cookpad là làm cho việc vào bếp vui hơn mỗi ngày, 
                vì chúng tôi tin rằng nấu nướng là chìa khoá cho một cuộc sống hạnh phúc hơn và khoẻ mạnh hơn cho con người, cộng đồng, và hành tinh này. 
                Chúng tôi muốn hỗ trợ các đầu bếp gia đình trên toàn thế giới để họ có thể giúp đỡ nhau qua việc chia sẻ các món ngon và kinh nghiệm nấu ăn của mình.</span>

            <div className={cn("flex bg-center bg-no-repeat bg-cover w-full h-[100px]")}
                 style={{backgroundImage: `url(${bgImage3})`}}/>
        </div>
    );
}

export default Home;
