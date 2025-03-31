import {useAuth} from "@/context/hooks/useAuth";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ROUTES} from "@/routes/routes";
import {useEffect} from "react";


const PRIVATE_ROUTES = [ROUTES.ACCOUNT_SETTING, ROUTES.SAVE_FOOD, ROUTES.CHALLENGE,ROUTES.ARTICLE_POST,ROUTES.ARTICLE_UPDATE,ROUTES.CHALLENGE_DETAIL,ROUTES.CHANGE_PASSWORD,ROUTES.CHAT,ROUTES.RECIPE]; // Các route cần login


const PrivateRoute = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {token} = useAuth();

    useEffect(() => {
        if (!token && PRIVATE_ROUTES.includes(location.pathname)) {
            navigate(ROUTES.LOGIN, {replace: true});
        }
    }, [token, location.pathname, navigate]);

    return <Outlet />;
};
const isPrivateRoute = (path) => {
    return PRIVATE_ROUTES.includes(path) || path.startsWith("/recipe/");
  };
  

export default PrivateRoute;

