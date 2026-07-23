
export const fetchTutors = async (searchTerm = "", sortBy = "") => {
    const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/all-tutors?search=${searchTerm}&sortBy=${sortBy}`, {
        cache: "no-store"
    });

    const data = await res.json();
    return data || [];
}


export const popularTutors = async () => {
    const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/popular-tutors`, {
        cache: "no-store"
    });

    const data = await res.json();
    return data || [];
}


