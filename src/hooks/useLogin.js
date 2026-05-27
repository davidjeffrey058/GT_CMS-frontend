import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                if(data.error && data.error.email !== ''){
                    throw new Error(data.error.email);
                }
                if(data.error && data.error.password !== ''){
                    throw new Error(data.error.password);
                }
                throw new Error(data.error);
            }

            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify(data));

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: data });

        } catch (err) {
            // console.log(err)
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
