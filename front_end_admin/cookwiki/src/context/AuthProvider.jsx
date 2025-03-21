import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/routes/routes";
import {LOCAL_STORAGE_KEY} from "@/utils/localStorage";
import {AuthContext} from "@/context/hooks/useAuth.js";
import {useConfig, useLogin} from "@/hooks/useAuth";

const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const loginMutation = useLogin();
    const configMutation = useConfig();

    const [user, setUser] = useState(null);
    console.log("------> Line: 16 | AuthProvider.jsx user: ", user);
    const [token, setToken] = useState(localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN) || undefined);

    const initializeToken = useCallback((token) => {
        setToken(token);
        localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
    }, []);

    const clearToken = useCallback(() => {
        setToken(undefined);
        localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
    }, []);

    const checkToken = () => {
        configMutation.mutate(null, {
            onSuccess: (response) => {
                console.log("------> Line: 56 | AuthProvider.jsx response: ", response);
                setUser(response)
            },
            onError: (error) => {
                console.log("------> Line: 60 | AuthProvider.jsx error: ", error);
                setUser({})
            }
        })
    }

    const login = useCallback((data) => {
        console.log(data);

        loginMutation.mutate(data, {
            onSuccess: (response) => {
                console.log("Login success: ", response);
                initializeToken(response.token);
                navigate(ROUTES.HOME);
                checkToken();
            },
            onError: (error) => {
                console.error("Login failed: ", error);
            }
        });
    }, [initializeToken, navigate]);

    const logout = useCallback(() => {
        clearToken();
        navigate(ROUTES.LOGIN);
    }, [clearToken, navigate]);

    useEffect(() => {
        if (!configMutation.isPending && !user) {
            checkToken()
        }
    }, [configMutation, user]);

    const value = {
        // variable
        token,

        // function
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthProvider};