export const base_url = import.meta.env.VITE_BACKEND_URL

export const api = {
    user : {
        register : base_url + "/api/user/register",
        login : base_url + "/api/user/login",
        getUserDetails : base_url + "/api/user/get-user-details",
        getAllUsers : base_url + "/api/user/get-all-users"
    }
}

