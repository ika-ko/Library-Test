import {request} from "./client";

export function getAllAuthors(){
    return request('/authors');
}

export function getAuthorById(id){
    return request(`/authors/${id}`);
}

export function getAuthorBooks(id){
    return request(`/authors/${id}/books`);
}
export function createAuthor(data){
    return request("/authors",{
        method: "POST",
        body : JSON.stringify(data),
    })
}
export function deleteAuthor(id){
    return request(`/authors/${id}`,{
        method : "DELETE",
    })
}
export function updateAuthor(id,data){
    return request(`/authors/${id}`,{
        method: "PUT",
        body : JSON.stringify(data),
    })
}