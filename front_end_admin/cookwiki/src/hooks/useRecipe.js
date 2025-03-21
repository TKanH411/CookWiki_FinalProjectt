import {httpGet, httpPatch, httpPost} from "@/utils/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const queryKey = "/api/recipes";

const fetchRecipe = async (params) => {
    if (!params) return []; // Trả về mảng rỗng nếu không có ID

    const resp = await httpGet(
        {
            uri: queryKey,
            options: {body: JSON.stringify(params)}
        }
    )
    return await resp.json()
}

const useRecipe = (params) => {
    return useQuery({
        queryKey: params ? [queryKey, params] : null,
        queryFn: () => fetchRecipe(params),
        enabled: !!params, // Chỉ chạy query khi có productID
    })
}

const fetchDetailRecipe = async (id) => {
    if (!id) return []; // Trả về mảng rỗng nếu không có ID

    const resp = await httpGet(
        {
            uri: queryKey + `/${id}`
        }
    )
    return await resp.json()
}

const useDetailRecipe = (id) => {
    return useQuery({
        queryKey: id ? [queryKey, id] : null,
        queryFn: () => fetchDetailRecipe(id),
        enabled: !!id, // Chỉ chạy query khi có productID
    })
}

const addRecipe = async (params) => {
    const resp = await httpPost(
        {
            uri: queryKey,
            options: {body: JSON.stringify(params)}
        },
    )
    return await resp.json()
}

const useAddRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]}).then(r => console.log("Re-fetching data: ", r));
        },
        onError: () => {
        }
    });
};

const changeStatusRecipe = async ({id, params}) => {
    const resp = await httpPatch(
        {
            uri: queryKey + `/${id}/status`,
            options: {body: JSON.stringify(params)}
        },
    )
    return await resp.json()
}

const useChangeStatusRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: changeStatusRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]}).then(r => console.log("Re-fetching data: ", r));
        },
        onError: () => {
        }
    });
};

export {
    useRecipe,
    useDetailRecipe,
    useAddRecipe,
    useChangeStatusRecipe
};