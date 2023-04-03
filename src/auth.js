import { clearUserData, setUserData } from '../util.js';
import { get, post, put, del } from './api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: "/users/logout",
}

//TODO change user object according to project requirements
export async function login(email, password){
    const result = await post(endpoints.login, {email, password});
    setUserData(result);
}

export async function register(email, password){
    const result = await post(endpoints.register, {email, password});
    setUserData(result);
}

export async function logout(){
    get(endpoints.logout);
    clearUserData();
}

export async function getAllAds(){
    return get('/data/products?sortBy=_createdOn%20desc');
}

export async function createProduct(product){
    return post('/data/products', product);
}

export async function getProductById(id){
    return get(`/data/products/${id}`);
}

export async function editProductById(id, product){
    return put(`/data/products/${id}`, product);
}

export async function deleteProductById(id){
    return del(`/data/products/${id}`);
}

export async function buy(productId){
    return post("/data/bought", productId);
}

export async function getTotalBuys(productId){
    return get(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);
}

export async function didUserBought(productId, userId){
    return get(`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}