import {httpGet, httpPost} from "@/utils/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const queryKey = "/api/recipe-favourite";

const fetchRecipeFavouriteByRecipeId = async (params) => {
    if (!params) return []; // Trả về mảng rỗng nếu không có ID

    const resp = await httpGet(
        {
            uri: queryKey + "/get-favourite",
            options: {body: JSON.stringify(params)}
        }
    )
    return await resp.json()
}

const useRecipeFavouriteByRecipeId = (params) => {
    return useQuery({
        queryKey: params ? [queryKey, params] : null,
        queryFn: () => fetchRecipeFavouriteByRecipeId(params),
        enabled: !!params, // Chỉ chạy query khi có productID
    })
}

const fetchRecipeFavouriteByUser = async (params) => {
    if (!params) return []; // Trả về mảng rỗng nếu không có ID

    const resp = await httpGet(
        {
            uri: queryKey + "/user",
            options: {body: JSON.stringify(params)}
        }
    )
    return await resp.json()
}

const useRecipeFavouriteByUser = (params) => {
    return useQuery({
        queryKey: params ? [queryKey, params] : null,
        queryFn: () => fetchRecipeFavouriteByUser(params),
        enabled: !!params, // Chỉ chạy query khi có productID
    })
}

const addRecipeFavourite = async (params) => {
    const resp = await httpPost(
        {
            uri: queryKey + "/toggle-favourite",
            options: {body: JSON.stringify(params)}
        },
    )
    return await resp.json()
}

const useAddRecipeFavourite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addRecipeFavourite,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]}).then(r => console.log("Re-fetching data: ", r));
        },
        onError: () => {
        }
    });
};

export {
    useRecipeFavouriteByRecipeId,
    useRecipeFavouriteByUser,
    useAddRecipeFavourite,
};