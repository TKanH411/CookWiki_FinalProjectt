import "@/app.scss";
import "@/i18n";
import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTES} from "@/routes/routes";

import ChatPage from "@/pages/chat/ChatPage"; // Thêm import ChatPage

import Login from "@/pages/login/Login";
import Logout from "@/pages/logout/Logout";
import ForgotPassword from "@/pages/forgot-password/ForgotPassword";
import ChangePassword from "@/pages/forgot-password/ChangePassword";
import SignUp from "@/pages/sign-up/SignUp";
import PrivateRoute from "@/components/PrivateRoute";
import Home from "@/pages/home/Home";
import MainLayout from "@/layouts/main-layout/MainLayout";
import AccountSetting from "@/pages/account-setting/AccountSetting";
import NotFound from "@/pages/not-found/NotFound";
import ConfirmOtp from "@/pages/forgot-password/ConfirmOtp";
import {AuthProvider} from "@/context/AuthProvider";
import Challenge from "@/pages/challenge/Challenge";
import ChallengeDetail from "@/pages/challenge/detail";
import Recipe from "./pages/recipe/Recipe";
import SaveFood from "./pages/save-food/SaveFood";
import Search from "./pages/search/Search";
import Post from "./pages/article-food/Post";
import Update from "./pages/article-food/Update";
import {queryClient} from "@/utils/api";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "sonner";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Routes>
                    {/* Define your public routes */}
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.LOGOUT} element={<Logout />} />
                    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                    <Route path={ROUTES.CONFIRM_OTP} element={<ConfirmOtp />} />
                    <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
                    <Route path={ROUTES.SIGN_UP} element={<SignUp />} />

                    {/* Define your private routes */}
                    <Route element={<PrivateRoute />}>
                        <Route element={<MainLayout />}>
                            <Route path={ROUTES.ACCOUNT_SETTING} element={<AccountSetting />} />
                            <Route path={ROUTES.HOME} element={<Home />} />
                            <Route path="/home" element={<Navigate to={ROUTES.HOME} />} />
                            <Route path={ROUTES.CHALLENGE} element={<Challenge />} />
                            <Route path={ROUTES.CHALLENGE_DETAIL} element={<ChallengeDetail />} />
                            <Route path={ROUTES.RECIPE} element={<Recipe />} />
                            <Route path={ROUTES.SAVE_FOOD} element={<SaveFood />} />
                            <Route path={ROUTES.SEARCH} element={<Search />} />
                            <Route path={ROUTES.ARTICLE_POST} element={<Post />} />
                            <Route path={ROUTES.ARTICLE_UPDATE} element={<Update />} />

                            {/* Thêm Route cho trang Chat */}
                            <Route path="/chat" element={<ChatPage />} />
                        </Route>
                    </Route>

                    {/* Catch-all route for 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>

            <Toaster position="bottom-right" richColors closeButton={true} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
