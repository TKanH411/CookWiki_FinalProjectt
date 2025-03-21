import {httpGet, httpPost} from "@/utils/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const queryKey = "/api/comments";

const fetchComment = async (productID) => {
    if (!productID) return []; // Trả về mảng rỗng nếu không có ID

    const resp = await httpGet(
        {
            uri: queryKey + `/${productID}`
        }
    )
    return await resp.json()
}

const useComment = (productID) => {
    return useQuery({
        queryKey: productID ? [queryKey, productID] : null,
        queryFn: () => fetchComment(productID),
        enabled: !!productID, // Chỉ chạy query khi có productID
    })
}

const sendComment = async (params) => {
    const resp = await httpPost(
        {
            uri: queryKey + "/send",
            options: {body: JSON.stringify(params)}
        },
    )
    return await resp.json()
}

const useSendComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: sendComment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]}).then(r => console.log("Re-fetching data: ", r));
        },
        onError: () => {
        }
    });
};

// const createModelLibrary = async (params) => {
//     const resp = await httpPost(
//         {
//             uri: API_ROUTES.LIBRARIES_ADD_MODEL.replace(":id", String(params.library_id)),
//             options: {body: JSON.stringify(params)}
//         },
//     )
//     return await resp.json()
// }
//
// const useCreateModelLibrary = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: createModelLibrary,
//         onSuccess: () => {
//             queryClient.invalidateQueries({queryKey: [queryKey]}).then(r => console.log("Re-fetching data: ", r));
//         },
//         onError: () => {
//         }
//     });
// };

export {
    useComment,
    useSendComment
};