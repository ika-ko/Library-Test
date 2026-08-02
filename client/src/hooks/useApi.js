import { useEffect, useState } from 'react';

/**
 * Runs `func` on mount and whenever `deps` change.
 *
 * `deps` exists because passing `[func]` would loop forever: a caller writing
 * `useApi(() => getBookById(id))` builds a new arrow function on every render, so a
 * dependency on the function itself is a dependency on "every render". Callers pass the
 * values the call actually varies on instead — `[id]`.
 */
export default function useApi(func, deps = []){
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        let cancelled = false;

        const getData = async()=>{
            setLoading(true);
            try{
                const response = await func();
                if(cancelled) return;
                setData(response);
                setError(null);
            }catch(err){
                if(cancelled) return;
                setData(null);
                setError(err.message);
            }finally{
                if(!cancelled) setLoading(false);
            }
        }
        getData();

        return () => {
            cancelled = true;
        };
        // `func` is deliberately excluded — see the note above.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },deps);

    return {data,error,loading};
}
