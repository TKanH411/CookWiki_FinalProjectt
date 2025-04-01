import { httpPost } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { LOCAL_STORAGE_KEY } from "@/utils/localStorage";  // Đảm bảo rằng bạn đã khai báo LOCAL_STORAGE_KEY

// Hàm đổi mật khẩu
const changePassword = async (params) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);  // Lấy token từ localStorage

    const resp = await httpPost({
        uri: "/api/auth/change-password",
        options: {
            body: JSON.stringify(params),  // Dữ liệu cần truyền: mật khẩu cũ, mới, xác nhận
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,  // Thêm header Authorization
            },
        }
    });

    return resp.json();
};

// Hook đổi mật khẩu
const useChangePassword = () => {
    return useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            // Thực hiện hành động khi đổi mật khẩu thành công
            console.log("Password changed successfully:", data);
        },
        onError: (error) => {
            // Xử lý lỗi khi đổi mật khẩu
            console.error("Change Password Error:", error);
        }
    });
};

export { useChangePassword };
