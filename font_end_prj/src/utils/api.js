import {QueryClient} from "@tanstack/react-query";
import {LOCAL_STORAGE_KEY} from "@/utils/localStorage";
import {ENV} from "@/utils/env";

const METHOD = {
    GET: "GET",
    POST: "POST",
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
    const start = Date.now();
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

    try {
        console.log(`Sending ${options?.method || 'GET'} request to: ${ENV.API_URL + uri}`);
        
        const response = await fetch(ENV.API_URL + uri, options);

        // Log detailed response info for debugging
        console.log(`Response status: ${response.status}, statusText: ${response.statusText}`);

        if (response && response.ok) {
            return response;
        }

        if (response.status === 401) {
            localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
            console.error("Authentication failed: Token expired or invalid");
        }

        // Try to get more detailed error info
        let errorDetails;
        try {
            errorDetails = await response.text();
            console.error("Error response body:", errorDetails);
        } catch (e) {
            errorDetails = "Could not parse error response";
        }

        console.error(`API Request failed (${response.status}): ${uri}`, errorDetails);
        return Promise.reject({
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            details: errorDetails
        });
    } catch (error) {
        console.error("Network error:", error);
        return Promise.reject(error);
    } finally {
        console.log(`API Request ${uri} took ${Date.now() - start}ms`);
    }
};
// const httpRequest = async ({uri, options}) => {
//     const start = Date.now();

//     const authToken = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);

//     if (options) {
//         const body = options?.body;
//         const isFormDataBody = body instanceof FormData;

//         const headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
//         if (!isFormDataBody) {
//             headers.set("Content-Type", "application/json");
//         }
//         if (authToken) {
//             headers.set("Authorization", `Bearer ${authToken}`);
//         }

//         options.headers = headers;
//         options.body = options.method === "GET" ? undefined : body;
//     }

//     try {
//         const response = await fetch(ENV.API_URL + uri, options);

//         if (response && response.ok) return response;

//         if (response.status === 401) localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);

//         console.error("API Request failed: ", response);
//         return Promise.reject(response);
//     } catch (error) {
//         console.error("API Request failed exception: ", error);
//         return Promise.reject(error);
//     } finally {
//         console.log(`API Request ${uri} took ${Date.now() - start}ms`);
//     }
// }

// const httpGet = ({uri, options}) => {
//     let queryString = "";
//     if (options?.body) {
//         let searchParams = options.body;

//         try {
//             if (!(searchParams instanceof URLSearchParams)) {
//                 const queryParams = new URLSearchParams();
//                 Object.entries(JSON.parse(searchParams)).forEach(([key, value]) => {
//                     if (Array.isArray(value)) {
//                         value.forEach((value) => {
//                             queryParams.append(key, value);
//                         });
//                     } else {
//                         queryParams.set(key, value || "");
//                     }
//                 });
//                 searchParams = queryParams;
//             }
//         } catch (error) {
//             console.error("Failed to parse params: ", error);
//         }

//         queryString = `?${searchParams.toString()}`;
//     }

//     return httpRequest({
//         uri: uri + queryString,
//         options: {
//             method: METHOD.GET,
//             ...options
//         }
//     });
// }


// const httpPost = ({uri, options}) => {
//     return httpRequest({
//         uri: uri,
//         options: {method: METHOD.POST, ...options}
//     });
// }

// const httpPut = ({uri, options}) => {
//     return httpRequest({
//         uri: uri,
//         options: {method: METHOD.PUT, ...options}
//     });
// }

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
    httpPut,
    // httpDelete
}