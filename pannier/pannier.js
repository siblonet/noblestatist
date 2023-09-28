async function Pannier(ad, who) {
    const exista = pannierCotent.find(dd => dd._id === ad);

    if (ad === "rapide") {

    } else if (!exista) {
        let prod;

        if (who === "recenProd") {
            prod = recenProd.find(item => item._id === ad)

        } else if (who === "populaProd") {
            prod = populaProd.find(item => item._id === ad)

        };
        prod.quantcho = 1;
        prod.prix = prod.addprix;
        prod.imago = "0";
        prod.color = prod.addcoul.substring(0, 7);
        prod.size = prod.addtail[2] == "," ? prod.addtail[0] + prod.addtail[1] : prod.addtail[0];
        //console.log(prod);
        TotalAll("post", prod);
        pannierCotent.push(prod);
        try {
            const items = await sendRequestnot('GET', 'boutique');
            recenProd.length = 0;
            //recenProd.splice(0, recenProd.length);
            items.forEach(proda => {
                if (proda.who === "recenProd") {
                    recenProd.push(proda);
                } else {
                    populaProduct(items);
    
                }
            })
        } catch (error) {
            console.error('Error fetching items:', error.message);
        };

    } else {
        setTimeout(() => alert("Exist déjà dans le panier!"), 10);
    };


    const pannierNumber1 = document.getElementById('paniernumber1');
    pannierNumber1.innerHTML = ''; // Clear previous content
    const panniernumHTML1 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannierCotent.length}</span>
                        `;
    pannierNumber1.innerHTML += panniernumHTML1;


    const pannierNumber2 = document.getElementById('paniernumber2');
    pannierNumber2.innerHTML = ''; // Clear previous content
    const panniernumHTML2 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannierCotent.length}</span>
                        `;
    pannierNumber2.innerHTML += panniernumHTML2;

    const pannierNumber3 = document.getElementById('paniernumber3');
    pannierNumber3.innerHTML = ''; // Clear previous content
    const panniernumHTML3 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannierCotent.length}</span>
                        `;
    pannierNumber3.innerHTML += panniernumHTML3;



    const productContainer = document.getElementById('pannierid');
    productContainer.innerHTML = '';

    pannierCotent.forEach(pro => {
        const productHTML = `
                        <div class="products-cart">
                            <div class="products-image">
                                <a href="#"><img src="${pro.image[parseInt(pro.imago[0])].ima}" alt="image"></a>
                            </div>
                            <div class="products-content">
                                <h3><a href="#">${pro.addarticle}</a></h3>
                                <span>Bleu / XS</span>
                                <div class="products-price">
                                    <span>${pro.quantcho}</span>
                                    <span>x</span>
                                    <span class="price">${pro.prix}</span>
                                    <span>=</span>
                                    <span class="price">${pro.prix * pro.quantcho}</span>
                                </div>
                                <a style="cursor: pointer !important;" class="remove-btn" onclick="removeItemById('${pro._id}')"><i class="bx bx-trash"></i></a>
                            </div>
                        </div>
        `;
        productContainer.innerHTML += productHTML;

    });

    const h3Element = document.getElementById('monpanier');

    if (h3Element) {
        h3Element.innerText = `Mon Panier (${pannierCotent.length})`;
    }



    let totalPrice = 0; // Initialize to 1 so that the first multiplication works

    for (const pri of pannierCotent) {
        totalPrice += pri.addprix * pri.quantcho;
    };

    const subtotal = document.getElementById('subtotal');

    if (subtotal) {
        subtotal.innerText = `${totalPrice} F.CFA`;
    };

};


function removeItemById(id) {
    const index = pannierCotent.findIndex(item => item._id === id);

    if (index !== -1) {
        TotalAll("del", id);
        pannierCotent.splice(index, 1);
    };

    const productContainer = document.getElementById('pannierid');
    productContainer.innerHTML = ''; // Clear previous content

    pannierCotent.forEach(pro => {
        const productHTML = `
                        <div class="products-cart">
                            <div class="products-image">
                                <a href="#"><img src="${pro.image[parseInt(pro.imago[0])].ima}" alt="image"></a>
                            </div>
                            <div class="products-content">
                                <h3><a href="#">${pro.addarticle}</a></h3>
                                <span>Bleu / XS</span>
                                <div class="products-price">
                                    <span>${pro.quantcho}</span>
                                    <span>x</span>
                                    <span class="price">${pro.addprix}</span>
                                    <span>=</span>
                                    <span class="price">${pro.addprix * pro.quantcho}</span>
                                </div>
                                <a style="cursor: pointer !important;" class="remove-btn" onclick="removeItemById('${pro._id}')"><i class="bx bx-trash"></i></a>
                            </div>
                        </div>
        `;
        productContainer.innerHTML += productHTML;

    });



    const h3Element = document.getElementById('monpanier');

    if (h3Element) {
        h3Element.innerText = `Mon Panier (${pannierCotent.length})`;
    }


    let totalPrice = 0; // Initialize to 1 so that the first multiplication works

    for (const pri of pannierCotent) {
        totalPrice += pri.addprix * pri.quantcho;
        //totalPrice *= pri.newPrice;
    }
    const subtotal = document.getElementById('subtotal');

    if (subtotal) {
        subtotal.innerText = `${totalPrice} F.CFA`;
    }

    const pannierNumber1 = document.getElementById('paniernumber1');
    const pannierNumber2 = document.getElementById('paniernumber2');
    const pannierNumber3 = document.getElementById('paniernumber3');

    if (pannierCotent.length > 0) {

        pannierNumber1.innerHTML = ''; // Clear previous content
        const panniernumHTML1 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannierCotent.length}</span>
                        `;
        pannierNumber1.innerHTML += panniernumHTML1;


        pannierNumber2.innerHTML = ''; // Clear previous content
        const panniernumHTML2 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannierCotent.length}</span>
                        `;
        pannierNumber2.innerHTML += panniernumHTML2;

        pannierNumber3.innerHTML = ''; // Clear previous content
        const panniernumHTML3 = `
                            <i class="bx bx-shopping-bag"></i>
                            <span>${pannierCotent.length}</span>
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
async function handleAddToCartClick() {
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const ido = document.getElementById('ido').value;
    const idp = document.getElementById('idp').value;
    let prod;

    if (idp === "recenProd") {
        prod = recenProd.find(item => item._id === ido)

    } else if (idp === "populaProd") {
        prod = populaProd.find(item => item._id === ido)

    };
    let sizo = "";
    let imago = "";
    selct.forEach((si, index) => sizo += index + 1 == selct.length ? si.size : si.size + ",");

    let cilor = "";
    selctSize.forEach((si, index) => {
        cilor += index + 1 == selctSize.length ? si.col : si.col + ",";
        imago += index + 1 == selctSize.length ? si.id : si.id + ","
    });
    prod.quantcho = quantity;
    prod.prix = prod.addprix;
    prod.imago = selctSize.length > 0 ? imago : "0";
    prod.color = selctSize.length > 0 ? cilor : prod.addcoul.substring(0, 7);
    prod.size = selct.length > 0 ? sizo : prod.addtail[2] == "," ? prod.addtail[0] + prod.addtail[1] : prod.addtail[0];
    TotalAll("post", prod);
    pannierCotent.push(prod);
    Pannier("rapide");

    try {
        const items = await sendRequestnot('GET', 'boutique');
        recenProd.length = 0;
        //recenProd.splice(0, recenProd.length);
        items.forEach(proda => {
            if (proda.who === "recenProd") {
                recenProd.push(proda);
            } else {
                populaProduct(items);

            }
        })
    } catch (error) {
        console.error('Error fetching items:', error.message);
    };

    const element = document.getElementById('hidlater');
    element.classList.remove('hiddendshow');
    element.classList.add('hiddendhid');

    /*
        const product = {
            id: parseInt(prod._id),
            image: prod.image,
            articleName: prod.addarticle,
            oldPrice: parseInt(prod.oldPrice),
            newPrice: parseInt(prod.newPrice),
            quantity: quantity,
            quatotal: parseInt(prod.newPrice) * quantity,
            color: "Light Blue",
            size: "XL",
            material: "Cotton",
            statut: "review"
        };*/

};

/*
addarticle: addarticle,
addprixpro: addprixpro,
addprix: addprix,
addfour: addfour,
adddispo: adddispo,
addcoul: addcoul,
addtail: addtail,
addmateri: addmateri,
addtype: addtype,
addphone: addphone,
addexpe: addexpe,
who: '',
notes: notes,
image: imas
*/



/*
 statut: {
    type: String,
        default: "uncomplete"
},
client: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
      },


arti_id: parseInt(prod._id),
quantity: quantity,
color: prod.,
size: prod.,
prix: parseInt(prod.newPrice)*/


function PannierOr() {
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const ido = parseInt(document.getElementById('ido').value);
    const idp = document.getElementById('idp').value;
    let prod;

    if (idp === "recentProd") {
        prod = recenProd.find(item => item._id === ido);

    } else if (idp === "populaProd") {
        prod = populaProd.find(item => item._id === ido);

    } else if (idp === "meilleurProd") {
        prod = meilleurProd.find(item => item._id === ido);

    };

    const product = {
        id: parseInt(prod._id),
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
    pannierCotent.push(product);
    Pannier("rapide");
};

