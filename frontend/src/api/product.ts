import axios from "axios";

export interface Product {
    name: string;
    description: string;
    price: number;
    countInStock: number;
    imageUrl: string;
}

const USER_SERVICE_URL = "http://localhost:4000";
const PRODUCTS_BASE = "/products";

const api = axios.create({
    baseURL: USER_SERVICE_URL,
    withCredentials: true,
});

export async function getAllProducts() {
    // GET "/"
    return await api
        .get(PRODUCTS_BASE)
        .then((response) => {
            const productInfo = response.data;
            return {
                status: response.status,
                message: response.data.message,
                productInfo: productInfo,
            };
        })
        .catch((error) => {
            return {
                status: error.status,
                message: error.response.data.message,
                productInfo: [],
            };
        });

}

export async function getProduct(id : string) {
    // GET "/:id"
    return await api
        .get(PRODUCTS_BASE + "/" + id)
        .then((response) => {
            const productInfo = response.data;
            return {
                status: response.status,
                message: response.data.message,
                productInfo: productInfo,
            };
        })
        .catch((error) => {
            return {
                status: error.status,
                message: error.response.data.message,
                productInfo: [],
            };
        });
}

export async function createProduct(product : Product) {
    // POST "/"
    return await api
        .get(PRODUCTS_BASE)
        .then((response) => {
            const productInfo = response.data;
            return {
                status: response.status,
                message: response.data.message,
                productInfo: productInfo,
            };
        })
        .catch((error) => {
            return {
                status: error.status,
                message: error.response.data.message,
                productInfo: [],
            };
        });
    
}

export async function updateProduct(
    id : string,
    name?: string,
    description?: string,
    price?: number,
    countInStock?: number,
    imageUrl?: string
) {
    // PATCH "/update"
    const updateBody = {
        id : id,
        name: name,
        description: description,
        price: price,
        countInStock: countInStock,
        imageUrl: imageUrl
    };

    return await api
        .patch(PRODUCTS_BASE + "/update", updateBody)
        .then((response) => {
            console.log("Successfully updated product!");
            return {
                status: response.status,
                message: response.data.message,
            };
        })
        .catch((error) => {
            return {
                status: error.status,
                message: error.response.data.message,
            };
        });
}

export async function deleteProduct(id : string) {
    // DELETE "/:id"

    try {
        const response = await api.delete(
            PRODUCTS_BASE + "/" + id
        );
        return { status: response.status, message: response.data.message };
    } catch (error: any) {
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
}