import {useAuth} from "@/context/hooks/useAuth";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ROUTES} from "@/routes/routes";
import {useEffect} from "react";

const PrivateRoute = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {token} = useAuth();
    console.log("------> Line: 10 | PrivateRoute.jsx token: ", token);

    useEffect(() => {
        if (!token) {
            if (location.pathname !== ROUTES.LOGIN) {
                navigate(ROUTES.LOGIN, {replace: true});
            }
        } else if (location.pathname === ROUTES.LOGIN) {
            navigate(ROUTES.HOME, {replace: true});
        }
    }, [token, location.pathname, navigate]);

    return <Outlet/>;
};

export default PrivateRoute;
