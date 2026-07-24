
// export const fetchTutors = async (searchTerm = "", sortBy = "") => {
//     const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/all-tutors?search=${searchTerm}&sortBy=${sortBy}`, {
//         cache: "no-store"
//     });

//     const data = await res.json();
//     return data || [];
// }
export const fetchTutors = async (searchTerm = "", sortBy = "", startDate = "", endDate = "") => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (sortBy) params.set("sortBy", sortBy);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-tutors?${params.toString()}`, {
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


