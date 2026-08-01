import { request } from "./client";

export function getAllBooks(){
    return request('/books');
}
export function getBookById(id){
    return request(`/books/${id}`);
}
export function createBook(data){
    return request('/books',{
        method : 'POST',
        body : JSON.stringify(data)
    })
}
export function deleteBook(id){
    return request(`/books/${id}`,{
        method: "DELETE"
    })
}
export function updateBook(id,data){
    return request(`/books/${id}`,{
        method: "PUT",
        body : JSON.stringify(data),
    })
}