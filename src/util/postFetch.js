
export const postFetch = async (url, data, token, method) => {

    try {
        const res = await fetch(url, {
            method: method || "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (error) {
        throw error;
    }
};