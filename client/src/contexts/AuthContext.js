import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider(props){
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
      //Comprovar que usuário está logado
    }, []);

    const login = async (accessToken) => {
        //console.log("Login Context");
        //console.log(accessToken);
        try {
            //console.log("TOKEN", accessToken);
            setUser({ username: "Walter Pessoa"})
            setToken(accessToken);
            console.log(token);
        } catch (error) {
            console.error(error);
        }
    };

    const data = {
        accessToken: token,
        user,
        login,
    };

    return <AuthContext.Provider value={data}>{ children }</AuthContext.Provider>
    
}

