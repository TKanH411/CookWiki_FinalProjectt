import { cn } from "@/lib/utils";
import bgImage4 from "@/assets/img-4.jpg";
import bgImage3 from "@/assets/img-3.jpg";
import { ClockIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

function Challenge() {
    return (
        <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>
            <div className={cn("flex flex-col items-center justify-center mt-10 py-8 px-10 bg-gray-100 rounded-lg")}>
                <LockClosedIcon className={cn("w-12 h-12 mb-4 text-gray-500")} />
                <h3 className={cn("text-2xl font-bold text-gray-700")}>Coming Soon</h3>
                <p className={cn("text-lg font-normal text-gray-600 mt-2")}>Chúng tôi đang chuẩn bị một thử thách mới. Hãy theo dõi để biết thêm thông tin!</p>
                <div className={cn("mt-6")}>
                    
                </div>
            </div>

            <div className={cn("bg-center bg-no-repeat bg-cover w-full h-[100px]")} 
                style={{ backgroundImage: `url(${bgImage3})` }} />

            <p className={cn("text-[20px] font-bold")}>Về CookWiki</p>
            <span className={cn("text-[16px] font-semibold")}>Sứ mệnh của CookWiki là làm cho việc nấu ăn trở nên thú vị hơn mỗi ngày vì chúng tôi tin rằng nấu ăn là chìa khóa cho cuộc sống hạnh phúc và khỏe mạnh hơn cho mọi người, cộng đồng và hành tinh. Chúng tôi mong muốn hỗ trợ các đầu bếp tại nhà trên toàn thế giới để họ có thể giúp đỡ lẫn nhau bằng cách chia sẻ các công thức nấu ăn ngon và kinh nghiệm nấu ăn của họ.</span>

            {/* Coming Soon Section */}
           
        </div>
    );
}

export default Challenge;
