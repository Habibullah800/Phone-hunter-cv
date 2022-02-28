const allMobiles = () => {
    const searchValue = document.getElementById('search-box').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue};
    `
    fetch(url)
        .then((Response) => Response.json())
        .then((data) => console.log(data));
    // console.log(url)
}