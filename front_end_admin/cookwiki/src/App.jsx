import "@/app.scss";
import "@/i18n";
import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTES} from "@/routes/routes";
import Login from "@/pages/login/Login";
import Logout from "@/pages/logout/Logout";
import ForgotPassword from "@/pages/forgot-password/ForgotPassword";
import ChangePassword from "@/pages/forgot-password/ChangePassword";
import SignUp from "@/pages/sign-up/SignUp";
import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from "@/layouts/main-layout/MainLayout";
import AccountSetting from "@/pages/account-setting/AccountSetting";
import NotFound from "@/pages/not-found/NotFound";
import ConfirmOtp from "@/pages/forgot-password/ConfirmOtp";
import {AuthProvider} from "@/context/AuthProvider";
import Recipes from "@/pages/recipes/Recipes";
import RecipesDetail from "@/pages/recipes/detail/RecipesDetail";
import RecipesComments from "@/pages/recipes/comment/RecipesComments";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/utils/api";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "sonner";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Routes>
                    {/* Define your public routes */}
                    <Route path={ROUTES.LOGIN} element={<Login/>}/>
                    <Route path={ROUTES.LOGOUT} element={<Logout/>}/>
                    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                    <Route path={ROUTES.CONFIRM_OTP} element={<ConfirmOtp/>}/>
                    <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword/>}/>

                    <Route path={ROUTES.SIGN_UP} element={<SignUp/>}/>

                    {/* Define your private r   outes */}
                    <Route element={<PrivateRoute/>}>
                        <Route element={<MainLayout/>}>
                            {/*<Route path={ROUTES.HOME} element={<Home/>}/>*/}
                            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.RECIPES}/>}/>

                            <Route path={ROUTES.ACCOUNT_SETTING} element={<AccountSetting/>}/>

                            <Route path={ROUTES.RECIPES} element={<Recipes/>}/>
                            <Route path={ROUTES.RECIPES_DETAIL} element={<RecipesDetail/>}/>
                            <Route path={ROUTES.RECIPES_COMMENTS} element={<RecipesComments/>}/>
                            {/*Code check error*/}
                        </Route>
                    </Route>

                    {/* Catch-all route for 404 */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </AuthProvider>

            <Toaster position="bottom-right" richColors closeButton={true}/>

            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default App
