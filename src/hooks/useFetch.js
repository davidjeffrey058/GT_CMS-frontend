import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";



const useFetch = (url) => {
    const [result, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const abortCont = new AbortController();
        setIsPending(true);
        console.log(user);
        if(!user){
            setError('User authorization required');
            setIsPending(false);
            return;
        }
        
         fetch(url, { 
            signal: abortCont.signal,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
         })
            .then(res => {
                if(!res.ok){
                    throw Error('Could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted');
                } else {
                    setError(err.message);
                    setIsPending(false);
                    console.log(err)
                }
            })

       return () => abortCont.abort();
    }, [url, user]);

    return { result, isPending, error, }
}

export default useFetch;