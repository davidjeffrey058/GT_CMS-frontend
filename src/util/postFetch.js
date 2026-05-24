

export const postFetch = async (url, data, token) => {

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};