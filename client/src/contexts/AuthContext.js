import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api";
import { hasExpiretedToken } from "../utils"

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props){
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      //Comprovar que usuário está logado
      //console.log("Entrou no UserEffect");
      //setToken(userControlller.getAccessToken);
      //setUser();
      (async () => {
        const accessToken = authController.getAccessToken();
        const refreshToken = authController.getRefreshToken();
        //await login(accessToken);
        if(!accessToken || !refreshToken){
            logout();
            setLoading(false);
            return;
        }

        if(hasExpiretedToken(accessToken)){
            if(hasExpiretedToken(refreshToken)){
                logout();
            }else{
                await reLogin(refreshToken);
            }
        }else{
            await login(accessToken);
        }
        
        setLoading(false);
      })();
    }, []);


    const reLogin = async (refreshToken) => {
        try {
            const { accessToken } = await authController.refreshAccessesToken(refreshToken);
            authController.setAccessToken(accessToken);
            await login(accessToken);
        } catch (error) {
            console.error(error)
;        }
    }

    const login = async (accessToken) => {
        //console.log("Login Context");
        //console.log(accessToken);
        try {
            const response = await userController.getMe(accessToken);
            //console.log("TOKEN", accessToken);
            delete response.password;
            //console.log(response);
            setUser(response);
            setToken(accessToken);
            //console.log(token);
            //console.log(accessToken);
            //console.log(user);
        } catch (error) {
            console.error(error);
        }
    };
    //console.log(token);
    //console.log(user);

    const logout = () => {
        setUser(null);
        setToken(null);
        authController.removeTokens();
    };

    const data = {
        accessToken: token,
        user,
        login,
        logout,
    };
    //console.log(data);

    if (loading) return null;

    return <AuthContext.Provider value={data}>{ children }</AuthContext.Provider>
    
}

