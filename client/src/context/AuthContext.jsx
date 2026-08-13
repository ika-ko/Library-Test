import { createContext,useContext,useState,useEffect } from "react";
import { getCurrentUser } from "../api/auth";
const AuthContext = createContext(null);
export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function loadUser(){
            try{
                const currentUser = await getCurrentUser();
                setUser(currentUser||null);
            }catch(error){
                setUser(null);
            }finally{
                setLoading(false);
            }
        }
        loadUser();
    },[]);
    
    return(
        <AuthContext.Provider value={{user,setUser,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}