import {httpPost} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const queryKey = "/api/auth";

const login = async (params) => {
    const resp = await httpPost(
        {
            uri: queryKey + "/sign-in",
            options: {body: JSON.stringify(params)}
        },
    )
    return await resp.json()
}

const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]}).then(r => console.log("Re-fetching data: ", r));
        },
        onError: () => {
        }
    });
};

const signUp = async (params) => {
    const resp = await httpPost(
        {
            uri: queryKey + "/sign-up",
            options: {body: JSON.stringify(params)}
        },
    )
    return await resp.json()
}

const useSignUp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]}).then(r => console.log("Re-fetching data: ", r));
        },
        onError: () => {
        }
    });
};

const config = async () => {
    const resp = await httpPost(
        {
            uri: queryKey + "/config"
        },
    )
    return await resp.json()
}

const useConfig = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: config,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]}).then(r => console.log("Re-fetching data: ", r));
        },
        onError: () => {
        }
    });
};

export {
    useLogin,
    useSignUp,
    useConfig
};