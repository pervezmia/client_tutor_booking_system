
export const fetchTutors = async () => {
    const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/all-tutors`, {
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


