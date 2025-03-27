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
                        <h2 className={cn(" text-white text-[30px] font-bold")}>Make daily cooking more fun!</h2>
                        <p className={cn(" text-white text-[20px] font-bold")}>Find and share amazing recipes for your daily cooking.</p>
                    </div>
                </div>
            </div>

            <div className={cn("flex items-center mt-[20px] px-14")}>
                <div className={cn("flex flex-wrap gap-4 pr-10 text-gray-600")}>
                    <h2 className={cn("text-[30px] font-bold")}>Discover delicious dishes from the CookWiki community</h2>
                    <p className={cn("text-[20px] font-normal")}>With CookWiki search, you can explore recipes by ingredients or dish names, ensuring you always find something delicious.</p>
                    <p className={cn("text-[20px] font-normal")}>Enjoy an even better search experience with the free CookWiki mobile app!</p>
                </div>
                <img src={bgImage2} alt="" width={"230px"} height={"460px"}/>
            </div>

            <div className={cn("flex items-center my-[20px] px-14")}>
                <img src={bgImage2} alt="" width={"230px"} height={"460px"}/>
                <div className={cn("flex flex-wrap gap-4 pl-10 text-gray-600")}>
                    <h2 className={cn("text-[30px] font-bold")}>Save Recipes</h2>
                    <p className={cn("text-[20px] font-normal")}>Using the bookmark icon, you can save recipes in your kitchen for later.</p>
                    <p className={cn("text-[20px] font-normal")}>With the free CookWiki mobile app, you can save and manage your recipes more efficiently!</p>
                </div>
            </div>

            <div className={cn("flex items-center mt-[20px] px-14")}>
                <div className={cn("flex flex-wrap gap-4 pr-10 text-gray-600")}>
                    <h2 className={cn("text-[30px] font-bold")}>Share your delicious creations</h2>
                    <p className={cn("text-[20px] font-normal")}>You can document and share your cooking experiences or family recipes forever by uploading them to CookWiki.</p>
                    <p className={cn("text-[20px] font-normal")}>Share your tasty dishes with the free CookWiki mobile app!</p>
                </div>
                <img src={bgImage2} alt="" width={"230px"} height={"460px"}/>
            </div>

            <div className={cn("flex w-full px-14")}>
                <div className={cn("grid grid-cols-2 gap-4 auto-rows-auto max-w-lg")}>
                    <div>
                        <div className={cn("flex items-center space-x-2 mb-2")}>
                            <img src={bgImage2} alt="" className={cn("w-[16px] h-[16px] rounded-full")}/>
                            <span className={cn("text-gray-700 font-semibold")}>Yen Nhi</span>
                        </div>
                        <div className={cn("flex flex-col gap-2 p-3 w-[170px] bg-white shadow-md rounded-lg")}>
                            <img src={bgImage2} alt="" className={cn("w-[154px] h-[154px] object-cover rounded-lg")}/>
                            <p className={cn("mt-2 text-gray-700 font-medium leading-none")}>Thanks for your authentic Italian recipe! So delicious! ❤️</p>
                            <p className={cn("text-gray-500 text-sm")}>🍝 <span className={cn("font-bold")}>Creamy Carbonara Pasta</span></p>
                            <p className={cn("text-gray-400 text-xs")}>👨‍🍳 George</p>
                        </div>
                    </div>

                    <div className={cn("row-span-2 mt-[30px]")}>
                        <div className={cn("flex items-center space-x-2 mb-2")}>
                            <img src={bgImage2} alt="" className={cn("w-[16px] h-[16px] rounded-full")}/>
                            <span className={cn("text-gray-700 font-semibold")}>Linh</span>
                        </div>
                        <div className={cn("flex flex-col gap-2 p-3 w-[170px] bg-white shadow-md rounded-lg")}>
                            <img src={bgImage2} alt="" className={cn("w-[154px] h-[154px] object-cover rounded-lg")}/>
                            <p className={cn("mt-2 text-gray-700 font-medium leading-none")}>My kid loves it! The donuts are so soft and fragrant. Thanks for sharing! 🍩🍫</p>
                            <p className={cn("text-gray-500 text-sm")}>🍩 <span className={cn("font-bold")}>Chocolate Donut</span></p>
                            <p className={cn("text-gray-400 text-xs")}>👨‍🍳 Bao Anh</p>
                        </div>
                    </div>
                </div>

                <div className={cn("w-1/2 flex flex-col justify-center pl-12")}>
                    <h2 className={cn("text-2xl font-bold text-gray-800")}>How did your dish turn out?</h2>
                    <p className={cn("text-gray-600 mt-2")}>Show appreciation to recipe creators who shared their dishes. With Cooksnaps, you can let them know how their recipe worked for you.</p>
                </div>
            </div>

            <p className={cn("flex text-[20px] font-bold")}>About CookWiki</p>
            <span className={cn("flex text-[16px] font-semibold")}>CookWiki's mission is to make home cooking more enjoyable every day because we believe that cooking is the key to a happier and healthier life for individuals, communities, and the planet. We aim to support home chefs worldwide so they can help each other by sharing delicious dishes and cooking experiences.</span>

            <div className={cn("flex bg-center bg-no-repeat bg-cover w-full h-[100px]")}
                 style={{backgroundImage: `url(${bgImage3})`}}/>
        </div>
    );
}

export default Home;
