import React, { useState } from "react";
import bgImage from "@/assets/Image_chef_1.jpg";
import bgImage2 from "@/assets/Image-serc.png";
import bgImage3 from "@/assets/Image-sarecip.png";
import bgImage4 from "@/assets/Image-shee.png";
import bgImage5 from "@/assets/Image_chef_1.jpg";
import bgImage6 from "@/assets/Image_chef_2.jpg";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    accepted: false,
  });
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
    setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
  };

  return (
    <div className="flex flex-col gap-10 text-black pt-5 w-full px-6 lg:px-32">
      {/* Hero Section */}
      <div
        className="flex items-center bg-top bg-no-repeat bg-cover h-96 rounded-lg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex items-end bg-[rgba(74,74,74,0.4)] h-full w-full p-8 rounded-lg">
          <div className="text-white space-y-4 w-2/3">
            <h2 className="text-2xl lg:text-4xl font-bold">Make daily cooking more fun!</h2>
            <p className="text-lg lg:text-xl font-medium">
              Find and share amazing recipes for your daily cooking.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-wrap items-center gap-10">
        <div className="flex-1 space-y-4 text-gray-600">
          <h2 className="text-2xl lg:text-3xl font-bold">
            Discover delicious dishes from the CookWiki community
          </h2>
          <p className="text-lg">
            With CookWiki search, you can explore recipes by ingredients or dish names, ensuring you
            always find something delicious.
          </p>
          <p className="text-lg">
            Enjoy an even better search experience with the free CookWiki Website.
          </p>
        </div>
        <img src={bgImage2} alt="CookWiki Search" className="w-56 h-96 object-cover rounded-lg" />
      </div>

      <div className="flex flex-wrap items-center gap-10">
        <img src={bgImage3} alt="Save Recipes" className="w-56 h-96 object-cover rounded-lg" />
        <div className="flex-1 space-y-4 text-gray-600">
          <h2 className="text-2xl lg:text-3xl font-bold">Save Recipes</h2>
          <p className="text-lg">
            Using the bookmark icon, you can save recipes in your kitchen for later.
          </p>
          <p className="text-lg">
            With the free CookWiki Website, you can save and manage your recipes more efficiently!
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-10">
        <div className="flex-1 space-y-4 text-gray-600">
          <h2 className="text-2xl lg:text-3xl font-bold">Share your delicious creations</h2>
          <p className="text-lg">
            You can document and share your cooking experiences or family recipes forever by
            uploading them to CookWiki.
          </p>
          <p className="text-lg">Share your tasty dishes with the free CookWiki Website!</p>
        </div>
        <img src={bgImage4} alt="Share Recipes" className="w-56 h-96 object-cover rounded-lg" />
      </div>

      {/* Testimonials Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <img src={bgImage4} alt="User Avatar" className="w-8 h-8 rounded-full" />
            <span className="text-gray-700 font-semibold">Yen Nhi</span>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <img
              src={bgImage5}
              alt="Carbonara Pasta"
              className="w-full h-40 object-cover rounded-lg"
            />
            <p className="mt-2 text-gray-700 font-medium leading-none">
              Cảm ơn công thức nấu ăn Ý đích thực của bạn! Thật ngon! ❤️
            </p>
            <p className="text-gray-500 text-sm">🍝 <span className="font-bold">Creamy Carbonara Pasta</span></p>
            <p className="text-gray-400 text-xs">👨‍🍳 George</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <img src={bgImage4} alt="User Avatar" className="w-8 h-8 rounded-full" />
            <span className="text-gray-700 font-semibold">Duy Thanh</span>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <img
              src={bgImage6}
              alt="Honey Roasted Chicken"
              className="w-full h-40 object-cover rounded-lg"
            />
            <p className="mt-2 text-gray-700 font-medium leading-none">
              Cảm ơn công thức nấu ăn Việt Nam đích thực của bạn! Thật ngon! ❤️
            </p>
            <p className="text-gray-500 text-sm">🍝 <span className="font-bold">Gà Quay Mật Ong</span></p>
            <p className="text-gray-400 text-xs">👨‍🍳 Drthanh</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-gray-100 p-10 rounded-lg shadow-md">
        <h2 className="text-green-600 text-3xl font-bold text-center">Liên hệ với chúng tôi</h2>
        <p className="text-gray-600 text-lg text-center mt-2">
          Không tìm thấy sản phẩm? Hãy hỏi chúng tôi!
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-gray-700 text-lg">
          <span>📞 02902004</span>
          <span>📱 02902004</span>
          <span>✉ drthanh@gmail.com</span>
        </div>
        <div className="flex flex-wrap mt-6 gap-6">
          <iframe
            className="w-full lg:w-1/2 h-64 rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.862921075693!2d105.74389507596989!3d21.038170187453918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134550dfe77114b%3A0x799dca0203fc6c74!2sBTEC%20FPT!5e0!3m2!1svi!2s!4v1743609755833!5m2!1svi!2s"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Tên"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-md"
            />
            <textarea
              name="message"
              placeholder="Bạn có thắc mắc nào không?"
              value={formData.message}
              onChange={handleChange}
              className="border p-3 rounded-md h-32"
            />
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                name="accepted"
                checked={formData.accepted}
                onChange={handleChange}
                className="mr-2"
              />
              Tôi đã đọc Thông báo pháp lý và chấp nhận{" "}
              <span className="font-bold ml-1">Chính sách bảo mật</span>
            </label>
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white py-2 rounded-md text-lg"
            >
              Gửi
            </button>
            {success && <p className="text-green-600 mt-2 text-center">✅ Gửi thành công!</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;