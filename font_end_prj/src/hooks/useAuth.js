import { httpPost } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LOCAL_STORAGE_KEY } from "@/utils/localStorage";   // Import LOCAL_STORAGE_KEY

const queryKey = "/api/auth";

// Hàm đăng nhập
const login = async (params) => {
    const resp = await httpPost({
        uri: `${queryKey}/sign-in`,
        options: { body: JSON.stringify(params) }
    });
    return resp.json();
};

// Hook đăng nhập
const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
        onError: (error) => {
            console.error("Login Error:", error);
        }
    });
};

// Hàm đăng ký
const signUp = async (params) => {
    const resp = await httpPost({
        uri: `${queryKey}/sign-up`,
        options: { body: JSON.stringify(params) }
    });
    return resp.json();
};

// Hook đăng ký
const useSignUp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
        onError: (error) => {
            console.error("Sign-up Error:", error);
        }
    });
};

// Hàm lấy cấu hình người dùng
const config = async () => {
    const resp = await httpPost({
        uri: `${queryKey}/config`
    });
    return resp.json();
};

// Hook lấy cấu hình người dùng
const useConfig = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: config,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
        onError: (error) => {
            console.error("Config Fetch Error:", error);
        }
    });
};

// Hàm đổi mật khẩu
const changePassword = async (params) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);  // Lấy token từ localStorage
    if (!token) {
        throw new Error("No token found. Please log in again.");
    }
    const resp = await httpPost({
        
         uri: `${queryKey}/change-password`,
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

export {
    useLogin,
    useSignUp,
    useConfig,
    useChangePassword
};
