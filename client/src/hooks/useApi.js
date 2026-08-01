import {useEffect,useState} from 'react';

export default function useApi(func){
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    useEffect(()=>{
        const getData = async()=>{
            try{
                const response = await func();
                setData(response);
                setError(null);
            }catch(err){
                setData(null);
                setError(err.message);
            }finally{
                setLoading(false);
        }
        }
        getData();
    },[]);
    return {data,error,loading};
}