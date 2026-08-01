const BASE = import.meta.env.VITE_API_URL;
export async function request(urlPath, options){
    const res  = await  fetch(BASE + '/api'+ urlPath, 
        {headers : {
        'content-type' : 'application/json',
        },
        ...options
    })
     if(!res.ok){
        let message = `Request failed with ${res.status}`;
        try{
            const body = await res.json();
            if(body.message) message = body.message;

        }catch{
            //body message is empty so we cant send nothing
        }
        throw new Error(message);
     }
     if(res.status === 204) return null;
     return res.json();
}
