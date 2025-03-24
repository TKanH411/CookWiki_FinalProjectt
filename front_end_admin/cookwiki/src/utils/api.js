import {QueryClient} from "@tanstack/react-query";
import {LOCAL_STORAGE_KEY} from "@/utils/localStorage";
import {ENV} from "@/utils/env";

const METHOD = {
    GET: "GET",
    POST: "POST",
    PATCH: "PATCH",
    PUT: "PUT",
    DELETE: "DELETE"
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false, // Không tự động refetch khi đổi tab
        }
    }
})

const httpRequest = async ({uri, options}) => {
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);

    if (options) {
        const body = options?.body;
        const isFormDataBody = body instanceof FormData;

        const headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
        if (!isFormDataBody) {
            headers.set("Content-Type", "application/json");
        }
        if (authToken) {
            headers.set("Authorization", `Bearer ${authToken}`);
        }

        options.headers = headers;
        options.body = options.method === "GET" ? undefined : body;
    }

    const response = await fetch(ENV.API_URL + uri, options);

    if (!response || !response.ok) {
        console.error("API Request failed: ", response);
        throw new Error("API Request failed");
    }

    return response;
}

const httpGet = ({uri, options}) => {
    let queryString = "";
    if (options?.body) {
        let searchParams = options.body;

        try {
            if (!(searchParams instanceof URLSearchParams)) {
                const queryParams = new URLSearchParams();
                Object.entries(JSON.parse(searchParams)).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((value) => {
                            queryParams.append(key, value);
                        });
                    } else {
                        queryParams.set(key, value || "");
                    }
                });
                searchParams = queryParams;
            }
        } catch (error) {
            console.error("Failed to parse params: ", error);
        }

        queryString = `?${searchParams.toString()}`;
    }

    return httpRequest({
        uri: uri + queryString,
        options: {
            method: METHOD.GET,
            ...options
        }
    });
}

const httpPost = ({uri, options}) => {
    return httpRequest({
        uri: uri,
        options: {method: METHOD.POST, ...options}
    });
}

const httpPatch = ({uri, options}) => {
    return httpRequest({
        uri: uri,
        options: {method: METHOD.PATCH, ...options}
    });
}

// const httpPut = ({uri, options}: HttpRequest) => {
//     return httpRequest({
//         uri: uri,
//         options: {method: METHOD.PUT, ...options}
//     });
// }
//
// const httpDelete = ({uri, options}: HttpRequest) => {
//     return httpRequest({
//         uri: uri,
//         options: {method: METHOD.DELETE, ...options}
//     });
// }

export {
    METHOD,
    queryClient,
    httpGet,
    httpPost,
    httpPatch
    // httpPut,
    // httpDelete
}