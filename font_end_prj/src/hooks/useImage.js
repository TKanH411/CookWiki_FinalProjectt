import {httpPost} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {objectToFormData} from "@/utils/utils";

const queryKey = "/api/images";

const upload = async (params) => {
    const resp = await httpPost(
        {
            uri: queryKey + "/upload",
            options: {body: objectToFormData(params)}
        },
    )
    return await resp.json()
}

const useUpload = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: upload,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]}).then(r => console.log("Re-fetching data: ", r));
        },
        onError: () => {
        }
    });
};

export {
    useUpload
};