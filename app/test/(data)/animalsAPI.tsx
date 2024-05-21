
export async function getDogs() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random", {
        cache: "no-cache",
    });


    const data = await response.json();
    return data
}

export async function getCats() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search", {
        cache: "no-cache",
    });


    const data = await response.json();
    return data
}


