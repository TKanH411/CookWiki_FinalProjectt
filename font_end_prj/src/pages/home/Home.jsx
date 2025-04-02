import {cn} from "@/lib/utils";
import { useState } from "react";

import bgImage from "@/assets/Image_chef_1.jpg";
import bgImage2 from "@/assets/Image-serc.png";
import bgImage3 from "@/assets/Image-sarecip.png";
import bgImage4 from "@/assets/Image-shee.png";
import bgImage5 from "@/assets/Image_chef_1.jpg";
import bgImage6 from "@/assets/Image_chef_2.jpg";
// const images = [
//     "@/assets/Image_chef_1.jpg",
//     "@/assets/Image_chef_2.jpg",
//     "@/assets/Image_chef_3.jpg",
//   ];
function Home() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "", accepted: false });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message || !formData.accepted) {
            alert("Vui lòng điền đầy đủ thông tin và chấp nhận chính sách bảo mật!");
            return;
        }
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // Ẩn thông báo sau 3s
    };
    return (
        <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>
            <div className={cn("flex items-center bg-top bg-no-repeat bg-cover h-[550px] rounded-lg")}
                 style={{backgroundImage: `url(${bgImage})`}}>
                <div className={cn("flex items-end bg-[rgba(74,74,74,0.4)] h-[550px] pb-18 rounded-lg")}>
                    <div className={cn("flex flex-wrap gap-6 text-white px-14 w-1/2")}>
                        <h2 className={cn(" text-white text-[30px] font-bold")}>Make daily cooking more fun!</h2>
                        <p className={cn(" text-white text-[20px] font-bold")}>Find and share amazing recipes for your daily cooking.</p>
                    </div>
                </div>
            </div>

            <div className={cn("flex items-center mt-[20px] px-14")}>
                <div className={cn("flex flex-wrap gap-4 pr-10 text-gray-600")}>
                    <h2 className={cn("text-[30px] font-bold")}>Discover delicious dishes from the CookWiki community</h2>
                    <p className={cn("text-[20px] font-normal")}>
                        With CookWiki search, you can explore recipes by ingredients or dish names, ensuring you always find something delicious.
                    </p>
                    <p className={cn("text-[20px] font-normal")}>
                        Enjoy an even better search experience with the free CookWiki Website
                    </p>
                </div>
                <img src={bgImage2} alt="" width={"230px"} height={"460px"}/>
            </div>

            <div className={cn("flex items-center my-[20px] px-14")}>
                <img src={bgImage3} alt="" width={"230px"} height={"460px"}/>
                <div className={cn("flex flex-wrap gap-4 pl-10 text-gray-600")}>
                    <h2 className={cn("text-[30px] font-bold")}>Save Recipes</h2>
                    <p className={cn("text-[20px] font-normal")}>
                        Using the bookmark icon, you can save recipes in your kitchen for later.
                    </p>
                    <p className={cn("text-[20px] font-normal")}>
                        With the free CookWiki Website, you can save and manage your recipes more efficiently!
                    </p>
                </div>
            </div>

            <div className={cn("flex items-center mt-[20px] px-14")}>
                <div className={cn("flex flex-wrap gap-4 pr-10 text-gray-600")}>
                    <h2 className={cn("text-[30px] font-bold")}>Share your delicious creations</h2>
                    <p className={cn("text-[20px] font-normal")}>
                        You can document and share your cooking experiences or family recipes forever by uploading them to CookWiki.
                    </p>
                    <p className={cn("text-[20px] font-normal")}>
                        Share your tasty dishes with the free CookWiki Website!
                    </p>
                </div>
                <img src={bgImage4} alt="" width={"230px"} height={"460px"}/>
            </div>

            <div className={cn("flex w-full px-14")}>
                <div className={cn("grid grid-cols-2 gap-4 auto-rows-auto max-w-lg")}>
                    <div>
                        <div className={cn("flex items-center space-x-2 mb-2")}>
                            <img src={bgImage4} alt="" className={cn("w-[16px] h-[16px] rounded-full")}/>
                            <span className={cn("text-gray-700 font-semibold")}>
                                Yen Nhi
                            </span>
                        </div>
                        <div className={cn("flex flex-col gap-2 p-3 w-[170px] bg-white shadow-md rounded-lg")}>
                            <img src={bgImage5} alt="" className={cn("w-[154px] h-[154px] object-cover rounded-lg")}/>
                            <p className={cn("mt-2 text-gray-700 font-medium leading-none")}>
                            Cảm ơn công thức nấu ăn Ý đích thực của bạn! Thật ngon! ❤️
                            </p>
                            <p className={cn("text-gray-500 text-sm")}>🍝 <span className={cn("font-bold")}>
                                Creamy Carbonara Pasta
                            </span></p>
                            <p className={cn("text-gray-400 text-xs")}>👨‍🍳 George</p>
                        </div>
                        
                    </div>
                    <div>
                        <div className={cn("flex items-center space-x-2 mb-2")}>
                            <img src={bgImage4} alt="" className={cn("w-[16px] h-[16px] rounded-full")}/>
                            <span className={cn("text-gray-700 font-semibold")}>
                                duy thanh
                            </span>
                        </div>
                        <div className={cn("flex flex-col gap-2 p-3 w-[170px] bg-white shadow-md rounded-lg")}>
                            <img src={bgImage6} alt="" className={cn("w-[154px] h-[154px] object-cover rounded-lg")}/>
                            <p className={cn("mt-2 text-gray-700 font-medium leading-none")}>
                            Cảm ơn công thức nấu ăn Việt Nam đích thực của bạn! Thật ngon! ❤️
                            </p>
                            <p className={cn("text-gray-500 text-sm")}>🍝 <span className={cn("font-bold")}>
                                Gà Quay Mật OngOng
                            </span></p>
                            <p className={cn("text-gray-400 text-xs")}>👨‍🍳 drthanh</p>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <div className={cn("flex flex-wrap gap-6 text-black pt-5 w-full px-[200px]")}>            
            {/* Form Liên hệ */}
            <div className={cn("w-full flex flex-col items-center bg-gray-100 p-10 rounded-lg shadow-md")}>
                <h2 className={cn("text-green-600 text-[30px] font-bold")}>
                    Liên hệ với chúng tôi
                </h2>
                <p className={cn("text-gray-600 text-lg text-center")}>
                    Không tìm thấy sản phẩm? Hãy hỏi chúng tôi!
                </p>
                
                <div className={cn("flex gap-4 mt-4 text-gray-700 text-lg")}>
                    <span className={cn("flex items-center")}>
                        📞 02902004
                    </span>
                    <span className={cn("flex items-center")}>
                        📱 02902004
                    </span>
                    <span className={cn("flex items-center")}>
                        ✉ drthanh@gmail.com
                    </span>
                </div>
                
                <div className={cn("flex w-full mt-6")}>
                    {/* Google Map */}
                    <iframe 
                        className={cn("w-1/2 h-[300px] rounded-lg shadow-md")}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.862921075693!2d105.74389507596989!3d21.038170187453918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134550dfe77114b%3A0x799dca0203fc6c74!2sBTEC%20FPT!5e0!3m2!1svi!2s!4v1743609755833!5m2!1svi!2s" 
                        style={{ border: "0" }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                    
                    {/* Form nhập thông tin */}
                    <div className={cn("w-1/2 flex flex-col pl-6")}>                        
                        <input type="text" placeholder="Tên" className={cn("border p-3 rounded-md mb-3 w-full")} />
                        <input type="email" placeholder="E-mail" className={cn("border p-3 rounded-md mb-3 w-full")} />
                        <textarea placeholder="Bạn có thắc mắc nào không?" className={cn("border p-3 rounded-md mb-3 w-full h-32")} />
                        <label className={cn("flex items-center text-sm text-gray-600")}>
                            <input type="checkbox" className={cn("mr-2")} />
                            Tôi đã đọc Thông báo pháp lý và chấp nhận <span className={cn("font-bold ml-1")}>
                                Chính sách bảo mật
                            </span>
                        </label>
                        <button className={cn("mt-4 bg-green-500 text-white py-2 rounded-md text-lg")}>Gửi</button>
                        {success && <p className={cn("text-green-600 mt-2 text-center")}>
                            ✅ Gửi thành công!
                        </p>}
                    </div>
                </div>
            </div>
        </div>
            {/* <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
            <df-messenger
                intent="WELCOME"
                chat-title="AI_COOKWIKI"
                agent-id="f7e6cbda-cc5b-4b18-90ed-6e3458158af4"
                language-code="en"
            ></df-messenger> */}
            
        </div>
        
    );
}

export default Home;
