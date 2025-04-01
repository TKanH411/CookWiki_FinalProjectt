import {httpGet, httpPost, httpPut} from "@/utils/api";
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

const fetchRecipeVerify = async (params) => {
    if (!params) return []; // Trả về mảng rỗng nếu không có ID

    const resp = await httpGet(
        {
            uri: queryKey + "/verify",
            options: {body: JSON.stringify(params)}
        }
    )
    return await resp.json()
}

const useRecipeVerify = (params) => {
    return useQuery({
        queryKey: params ? [queryKey, params] : null,
        queryFn: () => fetchRecipeVerify(params),
        enabled: !!params, // Chỉ chạy query khi có productID
    })
}

const fetchRecipeSearch = async (params) => {
    if (!params) return []; // Trả về mảng rỗng nếu không có ID

    const resp = await httpGet(
        {
            uri: queryKey + "/search",
            options: {body: JSON.stringify(params)}
        }
    )
    return await resp.json()
}

const useRecipeSearch = (params) => {
    return useQuery({
        queryKey: params ? [queryKey, params] : null,
        queryFn: () => fetchRecipeSearch(params),
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

const updateRecipe = async (params) => {
    const resp = await httpPut(
        {
            uri: queryKey + `/${params.id}`,
            options: {body: JSON.stringify(params)}
        },
    )
    return await resp.json()
}

const useUpdateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]}).then(r => console.log("Re-fetching data: ", r));
        },
        onError: () => {
        }
    });
};

const fetchMyRecipes = async (page = 1, size = 10) => {
    const resp = await httpGet({
        uri: queryKey + "/my-recipes",
        options: { params: { page, size } }
    });
    return await resp.json();
};

const useMyRecipes = (page = 1, size = 10) => {
    return useQuery({
        queryKey: [queryKey, "my-recipes", page, size],
        queryFn: () => fetchMyRecipes(page, size),
        keepPreviousData: true,
    });
};
const StatusRecipe = async ({ id, params }) => {
    const resp = await httpPatch(
        {
            uri: `/api/recipes/${id}/status`,
            options: { body: JSON.stringify(params) }
        }
    );
    return await resp.json();
};

const useStatusRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: StatusRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/recipes"] }).then((r) => console.log("Re-fetching data: ", r));
        },
        onError: (error) => {
            console.error("Error changing status", error);
        }
    });
};

export {
    useRecipe,

    useStatusRecipe,
   useMyRecipes,

    useRecipeVerify,
    useRecipeSearch,
    useDetailRecipe,
    useAddRecipe,
    useUpdateRecipe
};