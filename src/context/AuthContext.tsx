import { createContext, useContext, useEffect, useState } from "react";
import { SignUpUser, checkAuthStatus, loginUser, logoutUser } from "../helpers/api-communicator";

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('user') ) {
                // eslint-disable-next-line no-inner-declarations
        async function checkStatus() {
            const data = await checkAuthStatus();
            console.log(data);
            if (data) {
            setUser({ email: data.user.email, name: data.user.name });
            setIsLoggedIn(true);
               }
           }

          checkStatus();
        }
        }, 1000)
        
     }, []);

    const login = async (email: string, password: string) => { 
        const data = await loginUser(email, password);
        if (data) {
             localStorage.setItem('user', JSON.stringify({ email: data.user.email, name: data.user.name }));
            setUser({ email: data.user.email, name: data.user.name });
            setIsLoggedIn(true);
        }
    };
    const signup = async (name: string, email: string, password: string) => {
        const data = await SignUpUser(name,email, password);
        if (data) {
            localStorage.setItem('user', JSON.stringify({ email: data.user.email, name: data.user.name }));
            setUser({ email: data.user.email, name: data.user.name });
            setIsLoggedIn(true);
        }
     };
    const logout = async () => { 
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        await logoutUser();
        
        window.location.reload();
    }
    
    const value = {
        user, 
        isLoggedIn,
        login,
        signup,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);