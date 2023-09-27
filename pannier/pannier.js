function Pannier(a) {
    const prod = a.split(',').map(item => item.trim()).filter(Boolean);
    const exista = pannier.find(dd => dd.id === parseInt(prod[0]));

    if (a === "rapide") {

    } else if (!exista) {
        const product = {
            id: parseInt(prod[0]),
            backgroundColor: prod[1],
            image1: prod[2],
            image2: prod[3],
            articleName: prod[4],
            oldPrice: parseInt(prod[5]),
            newPrice: parseInt(prod[6]),
            quantity: 1,
            quatotal: parseInt(prod[6]),
            color: "Light Blue",
            size: "XL",
            material: "Cotton",
            statut: "review"
        };
        TotalAll("post", product);
        pannier.push(product);

    } else {
        setTimeout(() => alert("Exist déjà dans le panier!"), 10);
    }


    const pannierNumber1 = document.getElementById('paniernumber1');
    pannierNumber1.innerHTML = ''; // Clear previous content
    const panniernumHTML1 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannier.length}</span>
                        `;
    pannierNumber1.innerHTML += panniernumHTML1;


    const pannierNumber2 = document.getElementById('paniernumber2');
    pannierNumber2.innerHTML = ''; // Clear previous content
    const panniernumHTML2 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannier.length}</span>
                        `;
    pannierNumber2.innerHTML += panniernumHTML2;

    const pannierNumber3 = document.getElementById('paniernumber3');
    pannierNumber3.innerHTML = ''; // Clear previous content
    const panniernumHTML3 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannier.length}</span>
                        `;
    pannierNumber3.innerHTML += panniernumHTML3;



    const productContainer = document.getElementById('pannier');
    productContainer.innerHTML = ''; 

    pannier.forEach(pro => {
        const productHTML = `
                        <div class="products-cart">
                            <div class="products-image">
                                <a href="#"><img src="${pro.image1}" alt="image"></a>
                            </div>
                            <div class="products-content">
                                <h3><a href="#">${pro.articleName}</a></h3>
                                <span>Bleu / XS</span>
                                <div class="products-price">
                                    <span>${pro.quantity}</span>
                                    <span>x</span>
                                    <span class="price">${pro.newPrice}</span>
                                    <span>=</span>
                                    <span class="price">${pro.newPrice * pro.quantity}</span>
                                </div>
                                <a style="cursor: pointer !important;" class="remove-btn" onclick="removeItemById(${pro.id})"><i class="bx bx-trash"></i></a>
                            </div>
                        </div>
        `;
        productContainer.innerHTML += productHTML;

    });

    const h3Element = document.getElementById('monpanier');

    if (h3Element) {
        h3Element.innerText = `Mon Panier (${pannier.length})`;
    }



    let totalPrice = 0; // Initialize to 1 so that the first multiplication works

    for (const pri of pannier) {
        totalPrice += pri.newPrice * pri.quantity;
    };

    const subtotal = document.getElementById('subtotal');

    if (subtotal) {
        subtotal.innerText = `${totalPrice} F.CFA`;
    }
};


function removeItemById(id) {
    const index = pannier.findIndex(item => item.id === id);

    if (index !== -1) {
        TotalAll("del", id);
        pannier.splice(index, 1);
    };

    const productContainer = document.getElementById('pannier');
    productContainer.innerHTML = ''; // Clear previous content

    pannier.forEach(pro => {
        const productHTML = `
                        <div class="products-cart">
                            <div class="products-image">
                                <a href="#"><img src="${pro.image1}" alt="image"></a>
                            </div>
                            <div class="products-content">
                                <h3><a href="#">${pro.articleName}</a></h3>
                                <span>Bleu / XS</span>
                                <div class="products-price">
                                    <span>${pro.quantity}</span>
                                    <span>x</span>
                                    <span class="price">${pro.newPrice}</span>
                                    <span>=</span>
                                    <span class="price">${pro.newPrice * pro.quantity}</span>
                                </div>
                                <a style="cursor: pointer !important;" class="remove-btn" onclick="removeItemById(${pro.id})"><i class="bx bx-trash"></i></a>
                            </div>
                        </div>
        `;
        productContainer.innerHTML += productHTML;

    });



    const h3Element = document.getElementById('monpanier');

    if (h3Element) {
        h3Element.innerText = `Mon Panier (${pannier.length})`;
    }


    let totalPrice = 0; // Initialize to 1 so that the first multiplication works

    for (const pri of pannier) {
        totalPrice += pri.newPrice * pri.quantity;
        //totalPrice *= pri.newPrice;
    }
    const subtotal = document.getElementById('subtotal');

    if (subtotal) {
        subtotal.innerText = `${totalPrice} F.CFA`;
    }

    const pannierNumber1 = document.getElementById('paniernumber1');
    const pannierNumber2 = document.getElementById('paniernumber2');
    const pannierNumber3 = document.getElementById('paniernumber3');

    if (pannier.length > 0) {

        pannierNumber1.innerHTML = ''; // Clear previous content
        const panniernumHTML1 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannier.length}</span>
                        `;
        pannierNumber1.innerHTML += panniernumHTML1;


        pannierNumber2.innerHTML = ''; // Clear previous content
        const panniernumHTML2 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannier.length}</span>
                        `;
        pannierNumber2.innerHTML += panniernumHTML2;

        pannierNumber3.innerHTML = ''; // Clear previous content
        const panniernumHTML3 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannier.length}</span>
                        `;
        pannierNumber3.innerHTML += panniernumHTML3;


    } else {


        pannierNumber1.innerHTML = ''; // Clear previous content
        const panniernumHTML1 = `
                            <i class="bx bx-shopping-bag"></i>
                        `;
        pannierNumber1.innerHTML += panniernumHTML1;


        pannierNumber2.innerHTML = ''; // Clear previous content
        const panniernumHTML2 = `
                            <i class="bx bx-shopping-bag"></i>
                        `;
        pannierNumber2.innerHTML += panniernumHTML2;

        pannierNumber3.innerHTML = ''; // Clear previous content
        const panniernumHTML3 = `
                            <i class="bx bx-shopping-bag"></i>
                        `;
        pannierNumber3.innerHTML += panniernumHTML3;
    }
}

// Function to handle the button click
function handleAddToCartClick() {
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const ido = parseInt(document.getElementById('ido').value);
    const idp = document.getElementById('idp').value;
    let prod;

    if (idp === "recentProd") {
        prod = recenProd.find(item => item.id === ido);

    } else if (idp === "populaProd") {
        prod = populaProd.find(item => item.id === ido);

    } else if (idp === "meilleurProd") {
        prod = meilleurProd.find(item => item.id === ido);

    };

    const product = {
        id: parseInt(prod.id),
        backgroundColor: prod.backgroundColor,
        image1: prod.image1,
        image2: prod.image2,
        articleName: prod.articleName,
        oldPrice: parseInt(prod.oldPrice),
        newPrice: parseInt(prod.newPrice),
        quantity: quantity,
        quatotal: parseInt(prod.newPrice) * quantity,
        color: "Light Blue",
        size: "XL",
        material: "Cotton",
        statut: "review"
    };
    TotalAll("post", product);
    pannier.push(product);
    Pannier("rapide");

    const element = document.getElementById('hidlater');
    element.classList.remove('hiddendshow');
    element.classList.add('hiddendhid');
};



function PannierOr() {
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const ido = parseInt(document.getElementById('ido').value);
    const idp = document.getElementById('idp').value;
    let prod;

    if (idp === "recentProd") {
        prod = recenProd.find(item => item.id === ido);

    } else if (idp === "populaProd") {
        prod = populaProd.find(item => item.id === ido);

    } else if (idp === "meilleurProd") {
        prod = meilleurProd.find(item => item.id === ido);

    };

    const product = {
        id: parseInt(prod.id),
        backgroundColor: prod.backgroundColor,
        image1: prod.image1,
        image2: prod.image2,
        articleName: prod.articleName,
        oldPrice: parseInt(prod.oldPrice),
        newPrice: parseInt(prod.newPrice),
        quantity: quantity,
        quatotal: parseInt(prod.newPrice) * quantity,
        color: "Light Blue",
        size: "XL",
        material: "Cotton",
        statut: "review"
    };
    TotalAll("post", product);
    pannier.push(product);
    Pannier("rapide");
};

