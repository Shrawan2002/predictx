// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface FetchOptions extends RequestInit {
//     token?: string;
// }

// export async function apiFetch(endpoint: string, options?: FetchOptions) {
//     const response = await fetch(`${API_URL}${endpoint}`, {
//         ...options,
//         headers: {
//             "Content-Type": "application/json",
//             ...(options?.token && {
//                 Authorization: `Bearer ${options.token}`,
//             }),
//             ...(options?.headers || {}),
//         },
//         credentials: "include",
//     });
//     const data = await response.json();
//     if (!response.ok) {
//         throw new Error(data.message || "Something went wrong");
//     }
//     return data;
// }



import { useAuthStore }
    from "@/store/authStore";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL;
let isLoggingOut = false;

// export async function apiFetch(endpoint: string, options?: RequestInit) {
//     const token = useAuthStore.getState().token;

//     const response =
//         await fetch(
//             `${API_URL}${endpoint}`,
//             {
//                 ...options,

//                 headers: {

//                     "Content-Type":
//                         "application/json",

//                     ...(token && {
//                         Authorization:
//                             `Bearer ${token}`,
//                     }),

//                     ...(options?.headers || {}),
//                 },
//             }
//         );

//     const data = await response.json().catch(() => null);

//     /* UNAUTHORIZED */

//     if (response.status === 401) {

//         useAuthStore
//             .getState()
//             .logout();

//         throw new Error(
//             "Unauthorized"
//         );
//     }

//     /* OTHER ERRORS */

//     if (!response.ok) {

//         const errorData =
//             await response.json();

//         throw new Error(
//             errorData.message ||
//             "Something went wrong"
//         );
//     }

//     return data;
// }



//middle-ware

// export async function apiFetch(
//     endpoint: string,
//     options?: RequestInit
// ) {

//     const token =
//         useAuthStore.getState()
//             .token;

//     const response =
//         await fetch(
//             `${API_URL}${endpoint}`,
//             {
//                 ...options,

//                 headers: {

//                     "Content-Type":
//                         "application/json",

//                     ...(token && {
//                         Authorization:
//                             `Bearer ${token}`,
//                     }),

//                     ...(options?.headers ||
//                         {}),
//                 },
//             }
//         );

//     const data =
//         await response
//             .json()
//             .catch(() => null);

//     /* UNAUTHORIZED */

//     if (response.status === 401) {
//         // ✅ Guard: only logout once, ignore all subsequent 401s during redirect
//         if (!isLoggingOut) {
//             isLoggingOut = true;
//             useAuthStore.getState().logout();

//             // ✅ Reset flag after redirect completes so future sessions work
//             setTimeout(() => {
//                 isLoggingOut = false;
//             }, 3000);
//         }

//         throw new Error(data?.message || "Something went wrong");
//     }

//     /* OTHER ERRORS */

//     if (!response.ok) {

//         throw new Error(
//             data?.message ||
//             "Something went wrong"
//         );
//     }

//     return data;
// }


export async function apiFetch(endpoint: string, options?: RequestInit) {

    // USER TOKEN
    const token = sessionStorage.getItem("token");

    // ADMIN TOKEN
    const adminToken = sessionStorage.getItem("adminToken");

    // PRIORITY
    const accessToken = adminToken || token;

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...(options?.headers || {}),
        },
    });

    const data = await response.json().catch(() => null);

    // ================= 401 =================
    if (response.status === 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("adminToken");
        throw new Error(data?.message || "Unauthorized");
    }

    // =================OTHER ERRORS =================
    if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
    }

    return data;
}

export async function fetchMarkets(category?: string, status?: string) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (status) params.set("status", status);
    const queryString = params.toString();
    return apiFetch(`/market${queryString ? `?${queryString}` : ""}`);
}
export async function fetchMarketById(id: string) {
    return apiFetch(`/market/${id}`);
}
export async function fetchMarketOrderBook(id: string) {
    return apiFetch(`/market/${id}/orderbook`);
}
export async function fetchMarketTrades(id: string) {
    return apiFetch(`/market/${id}/trades`);
}