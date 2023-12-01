//! Const References

//Navbar
const navbar = document.getElementById("navbar");

//Checkout Button
const cart = navbar.querySelector("#cart");

//Filter item links
const electronics = navbar.querySelector("#electronics");
const jewelry = navbar.querySelector("#jewelry");
const clothingMen = navbar.querySelector("#clothingMen");
const clothingWomen = navbar.querySelector("#clothingWomen");

const display = document.getElementById("display");

const fakeStoreURLBase = "https://fakestoreapi.com";


// !Main async function for handling table updates
const fakeStore =  async (endpoint) => {
    try{
        let response = await fetch(fakeStoreURLBase + "/products/" + endpoint);
        let data = await response.json();

        console.log(data);

    }
    catch(err){
        console.log(err);
    }
}


// !Event Listeners
// Filter inventory

electronics.addEventListener('click', e => {
    e.preventDefault();
    // console.log('test electronics event');
    fakeStore("category/electronics");
    return;
});

jewelry.addEventListener('click', e => {
    e.preventDefault();
    // console.log('test jewelery event');
    fakeStore("category/jewelery");
    return;
});

clothingMen.addEventListener('click', e => {
    e.preventDefault();
    // console.log('test clothingMen event');
    fakeStore("category/men's clothing");
    return;
});

clothingWomen.addEventListener('click', e => {
    e.preventDefault();
    // console.log('test clothingWomen event');
    fakeStore("category/women's clothing");
    return;
});

//checkout
cart.addEventListener('click', e => {
    e.preventDefault();
    console.log("test checkout event");
    return;
});

function onload(){
    fakeStore("");
}

onload();