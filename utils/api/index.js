import axios from "axios";
import { __getToken, __ROLE, __School_Id, __TOKEN, __USER } from "../localization";
import { baseUrl } from "./constant";

const BASE_URL = baseUrl;
// console.log(__TOKEN, '__TOKEN')
console.log(__School_Id, "school_id")

console.log(BASE_URL, 'BASE_URL')

// https://newerp.techsallysolutions.com/api/webservice/token
export function __apiHeader() {
    return {
        headers: {
            "Content-Type": "application/json",
            // "auth-token": __getToken(),
            "Client-Service": "smartschool",
            "Auth-Key": "schoolAdmin@",
            "token": __TOKEN,
            // "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZXJwQG11Zy5jb20iLCJ1c2VybmFtZSI6InJpd2Vic29mdCJ9.89EaZzArzGv44nHv6mZCkcVjL9ruMhAxarhvgjY-umU",
            // "Schoolid": 18
            "Schoolid": __School_Id
        },
    };
}

export function __apiHeaderFormData() {
    return {
        headers: {
            "Content-Type": "multipart/form-data",
            // "auth-token": __getToken(),
            "Client-Service": "smartschool",
            "Auth-Key": "schoolAdmin@",
            "token": __TOKEN,
            // "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZXJwQG11Zy5jb20iLCJ1c2VybmFtZSI6InJpd2Vic29mdCJ9.89EaZzArzGv44nHv6mZCkcVjL9ruMhAxarhvgjY-umU",
            // "Schoolid": 18
            "Schoolid": __School_Id
        },
    };
}
const __getApiData = (endpoint) => {
    return axios
        .get(`${BASE_URL}${endpoint}`, __apiHeader())
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

const __postApiData = (endpoint, data, type) => {
    console.log(endpoint, data, type)
    return axios
        .post(
            `${BASE_URL}${endpoint}`,
            data,
            type == "from" ? __apiHeaderFormData() : __apiHeader(),
            {
                onUploadProgress: ({ progress }) => {
                    console.log(
                        "onUploadProgress",
                        (progress * 100).toFixed(2)
                    );
                },
                onDownloadProgress: ({ progress }) => {
                    console.log(
                        "onDownloadProgress",
                        (progress * 100).toFixed(2)
                    );
                },
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

const __putApiData = (endpoint, data, type) => {
    return axios
        .put(
            `${BASE_URL}${endpoint}`,
            data,
            type == "from" ? __apiHeaderFormData() : __apiHeader()
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

const __deleteApiData = (endpoint) => {
    return axios
        .delete(`${BASE_URL}${endpoint}`, __apiHeader())
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export { __getApiData, __postApiData, __putApiData, __deleteApiData };
