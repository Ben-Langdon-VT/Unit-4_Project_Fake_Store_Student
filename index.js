//! Const References
const cart = []

//Navbar
const navbar = document.getElementById("navbar");

//Checkout Button
const checkoutBtn = navbar.querySelector("#cart");

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

        // console.log(data);
        displayCards(data);

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
checkoutBtn.addEventListener('click', e => {
    e.preventDefault();
    console.log("test checkout event");
    console.log(cart);
    return;
});

//! Other Functions

const submitCart = (item) => {
    let itemExists = cart.find(item2 => item2.title === item.title);
    if(itemExists !== undefined){
        itemExists.quantity = itemExists.quantity + 1;
    }
    else{
        cart.push(item);
    }
}

const clearCards = () => {
    while (display.firstChild != null){
        display.removeChild(display.lastChild);
    }
}
const buildAccordionItem = (title,value,collapseVal) => {

    //Elements
    let item = document.createElement('div');
    let item_header = document.createElement('h2');
    let item_header_btn = document.createElement('button');
    let item_collapse = document.createElement('div');
    let item_collapse_body = document.createElement('div');

    //Attributes
    item.className = "accordion-item";
    item_header.className = "accordion-header";
    item_header_btn.className = "accordion-button collapsed";
    item_header_btn.type = "button";
    item_header_btn.setAttribute("data-bs-toggle", "collapse");
    item_header_btn.setAttribute("data-bs-target", "#"+collapseVal);
    item_header_btn.innerText = title;
    item_collapse.id = collapseVal;
    item_collapse.className = "accordion-collapse collapse";
    item_collapse.setAttribute("data-bs-parent", "#accordionExample");
    item_collapse_body.className = "accordion-body";
    item_collapse_body.innerText = value;

    //stack together
    item_header.appendChild(item_header_btn);
    item_collapse.appendChild(item_collapse_body);
    item.appendChild(item_header);
    item.appendChild(item_collapse);
    return item;
}

const buildAccordion = (desc, price, countStr) => {
    //Standardize formatting for all
    let usDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let dollarPrice = usDollar.format(price);

    //Elements
    let accordion = document.createElement('div');
    let descItem = buildAccordionItem('Description',desc, 'collapseOne'+countStr);
    let priceItem = buildAccordionItem('Price', dollarPrice, 'collapseTwo'+countStr);

    //Set Attributes
    accordion.className = "accordion";
    accordion.id = "accordionExample";

    //combine
    accordion.appendChild(descItem);
    accordion.appendChild(priceItem);

    return accordion;
}

const buildCard = (item, countStr) => {
    // console.log(item);
    //Create Elements
    let card = document.createElement('div');
    let card_top = document.createElement('div');
    let card_image = document.createElement('img');
    let card_title = document.createElement('h4');
    let accordion = buildAccordion(item["description"], item["price"], countStr);
    let card_footer = document.createElement('div');
    let card_footer_title = document.createElement('h5');
    
    //Set properties/attributes
    card.className = "card";
    card_top.className = "card_top";
    card_image.className = "card_image card-img-top";
    card_image.src = item.image;
    card_image.alt = item.image;
    card_title.textContent = item.title;

    card_footer.className = "card-footer btn text-body-secondary";
    card_footer_title.textContent = "Add to Cart";

    //add event handlers

    card_footer.addEventListener("click", e=> {
        e.preventDefault();

        let newObj = {
            id: item.id,
            title: item.title,
            cost: item.price,
            quantity: 1,
        }
        submitCart(newObj);
    })

    //stack them together in the proper hierarchy with .appendChild()
    card_top.appendChild(card_image);
    card_top.appendChild(card_title);
    card_footer.appendChild(card_footer_title);

    card.appendChild(card_top);
    card.appendChild(accordion);
    card.appendChild(card_footer);

    return card;
}

const displayCards = (items) => {
    console.log(items);
    clearCards();
    let count = 1;
    items.forEach(item => {
        count+=1;
        let card = buildCard(item,count.toString());
        display.appendChild(card);
    });

}

function onload(){
    fakeStore("");
}


onload();
