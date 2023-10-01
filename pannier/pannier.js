async function Pannier(ad) {
    const exista = await getDataById({ _id: ad, even: "get" });


    if (ad === "rapide") {

    } else if (!exista) {
        await getArticleByIdforpanier(ad);

    } else {
        setTimeout(() => alert("Exist déjà dans le panier!"), 10);
    };

};


async function PannierOr() {
    const ido = document.getElementById('ido').value;
    await openDatabase();
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const getRequest = objectStore.get(ido);

    getRequest.onsuccess = async (event) => {
        const result = event.target.result;
        if (!result) {
            await getArticleByIdforpanier(ido);

        } else {
            setTimeout(() => alert("Exist déjà dans le panier!"), 10);
        };
    };

    transaction.onerror = (event) => {
        console.log(event.target.error);
    };
};


function removeItemById(id) {
    TotalAll("del", id);
}

// Function to handle the button click
async function handleAddToCartClick() {
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const ido = document.getElementById('ido').value;
    await getArticleByIdforpaniera(ido, quantity);

    const element = document.getElementById('hidlater');
    element.classList.remove('hiddendshow');
    element.classList.add('hiddendhid');

};

async function getArticleByIdforpaniera(idm, quand) {
    await openArticleDatabase()
    const transactiona = articldb.transaction(["ArticleStore"], "readonly");
    const objectStorea = transactiona.objectStore("ArticleStore");
    const getRequesta = objectStorea.get(idm);
    getRequesta.onsuccess = (event) => {
        const prod = event.target.result;

        let sizo = "";
        let imago = "";
        selct.forEach((si, index) => sizo += index + 1 == selct.length ? si.size : si.size + ",");

        let cilor = "";
        selctSize.forEach((si, index) => {
            cilor += index + 1 == selctSize.length ? si.col : si.col + ",";
            imago += index + 1 == selctSize.length ? si.id : si.id + ","
        });
        prod.quantcho = quand;
        prod.prix = prod.addprix;
        prod.imago = selctSize.length > 0 ? imago : "0";
        prod.color = selctSize.length > 0 ? cilor : prod.addcoul.substring(0, 7);
        prod.size = selct.length > 0 ? sizo : prod.addtail[2] == "," ? prod.addtail[0] + prod.addtail[1] : prod.addtail[0];
        TotalAll("post", prod);
    };


    getRequesta.onerror = (event) => {
        console.error("Error accessing object store:", event.target.error);
    };
}






/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */





async function getDataById(id) {
    await openDatabase()
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");

    const getRequest = objectStore.get(id._id);
    let answer;
    getRequest.onsuccess = (event) => {
        const result = event.target.result;
        if (id.even === "incre") {
            result.aquantity = parseInt(result.aquantity) + 1;
            TotalAll('put', result);
            TotalAll('dasboard', "");

        } else if (id.even == "get") {
            answer = result
        } else {
            result.aquantity = parseInt(result.aquantity) - 1;
            TotalAll('put', result);
            TotalAll('dasboard', "");

        }

    };

    transaction.onerror = (event) => {
        console.log(event.target.error);
    };

    return answer;
};

async function getArticleByIdforpanier(_id) {
    await openArticleDatabase()
    const transactiona = articldb.transaction(["ArticleStore"], "readonly");
    const objectStorea = transactiona.objectStore("ArticleStore");
    const getRequesta = objectStorea.get(_id);
    getRequesta.onsuccess = (event) => {
        const prod = {};
        const proda = event.target.result;
        alert(proda.addprix);
        const prodb = { 
            quantcho: 1, 
            prix: proda.addprix,
            imago: "0",
            color: proda.addcoul.substring(0, 7),
            size: proda.addtail[2] == "," ? proda.addtail[0] + proda.addtail[1] : proda.addtail[0],
        };
        Object.assign(prod, proda, prodb);
        alert("concentination");   
        TotalAll("post", prod);
    };


    getRequesta.onerror = (event) => {
        console.error("Error accessing object store:", event.target.error);
    };
}



//cart data entering
function getallData() {
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const allPannier = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            allPannier.push(cursor.value);
            //pannierPrin.push(cursor.value);
            cursor.continue();
        } else {
            const tbodyId = document.getElementById('tbody-data');
            tbodyId.innerHTML = '';

            allPannier.forEach(pani => {
                const panierTBODY =
                    `
                        <tr>
                            <td class="product-thumbnail">
                                <a href="#">
                                    <img src="${pani.image[parseInt(pani.imago[0])].ima}" alt="item">
                                </a>
                            </td>
                            <td class="product-name">
                                <a href="#">${pani.addarticle}</a>
                                <ul>
                                    <li>Color: <span style="background-color: ${pani.color.substring(0, 7)}; color: ${pani.color.substring(0, 7)}">${pani.color.substring(0, 7)}</span></li>
                                    <li>Size: <span>${pani.size}</span></li>
                                    <li>Material: <span>${pani.addmateri}</span></li>
                                </ul>
                            </td>
                            <td class="product-price">
                                <span class="unit-amount">${pani.prix} F</span>
                            </td>
                            <td class="product-quantity">
                                <div class="input-counter" id="quantity-manipulate">
                                    <div class="input-counter">
                                        <span class="minus-btn" onclick="decreaseQuantity('${pani._id}')">-</span>
                                        <input type="text" min="1" id="${pani._id}" value="${parseInt(pani.quantcho)}">
                                        <span class="plus-btn" onclick="increaseQuantity('${pani._id}')">+</span>
                                    </div>
                                </div>
                            </td>
                            <td class="product-subtotal">
                                <span class="subtotal-amount">${parseInt(pani.prix) * parseInt(pani.quantcho)} F.CFA</span>
                                <a class="remove" style="cursor: pointer !important;" onclick="removePanierById('${pani._id}')"><i class="bx bx-trash"></i></a>
                            </td>
                        </tr>
                    `;

                tbodyId.innerHTML += panierTBODY;

            });

            const pantotalid = document.getElementById('toteaux');
            pantotalid.innerHTML = '';

            let totalPricea = 0; // Initialize to 1 so that the first multiplication works

            for (const pri of allPannier) {
                const adda = parseInt(pri.prix) * parseInt(pri.quantcho);
                totalPricea += adda;
            };

            const pantotalhtml = `
                            <li>Sous-total <span>${totalPricea} F</span></li>
                            <li>Livraison <span>1000 F</span></li>
                            <li>Total <span>${totalPricea + 1000} F.CFA</span></li>
                            `;
            pantotalid.innerHTML += pantotalhtml;
        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return "data"
}

function getallDataa() {
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const panner = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            panner.push(cursor.value);
            cursor.continue();
        } else {

            const productContainer = document.getElementById('pannierid');
            productContainer.innerHTML = ''; // Clear previous content

            if (panner.length > 0) {
                const pannierNumber1 = document.getElementById('paniernumber1');
                pannierNumber1.innerHTML = ''; // Clear previous content
                const panniernumHTML1 = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${panner.length}</span>
                                `;
                pannierNumber1.innerHTML += panniernumHTML1;


                const pannierNumber2 = document.getElementById('paniernumber2');
                pannierNumber2.innerHTML = ''; // Clear previous content
                const panniernumHTML2 = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${panner.length}</span>
                                `;
                pannierNumber2.innerHTML += panniernumHTML2;

                const pannierNumber3 = document.getElementById('paniernumber3');
                pannierNumber3.innerHTML = ''; // Clear previous content
                const panniernumHTML3 = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${panner.length}</span>
                                `;
                pannierNumber3.innerHTML += panniernumHTML3;




                panner.forEach(pro => {
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
                    h3Element.innerText = `Mon Panier (${panner.length})`;
                }



                let totalPrice = 0; // Initialize to 1 so that the first multiplication works

                for (const pri of panner) {
                    totalPrice += pri.prix * pri.quantcho;
                };

                const subtotal = document.getElementById('subtotal');

                if (subtotal) {
                    subtotal.innerText = `${totalPrice} F.CFA`;
                }
            } else {
                const h3Element = document.getElementById('monpanier');

                if (h3Element) {
                    h3Element.innerText = `Mon Panier (${panner.length})`;
                }


                const subtotal = document.getElementById('subtotal');

                if (subtotal) {
                    subtotal.innerText = `${0} F.CFA`;
                }
                const pannierNumber1 = document.getElementById('paniernumber1');



                const pannierNumber2 = document.getElementById('paniernumber2');


                const pannierNumber3 = document.getElementById('paniernumber3');



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
        };
    };
};


function updateData(data) {
    const transaction = panierdb.transaction(["PannierContent"], "readwrite");
    const objectStore = transaction.objectStore("PannierContent");

    const updateRequest = objectStore.put(data);
    let answer;

    updateRequest.onsuccess = (event) => {
        answer = "updated";
    };

    updateRequest.onerror = (event) => {
        answer = event.target.error;
    };

    transaction.onerror = (event) => {
        answer = event.target.error;
    };

    return answer
};

function deleteData(id) {
    const transaction = panierdb.transaction(["PannierContent"], "readwrite");
    const objectStore = transaction.objectStore("PannierContent");

    const deleteRequest = objectStore.delete(id);
    deleteRequest.onsuccess = (event) => {
        getallDataa();
    };

    deleteRequest.onerror = (event) => {
        console.log(event.target.error);
    };

    transaction.onerror = (event) => {
        console.log(event.target.error);
    };

};

function clearData() {
    const transaction = panierdb.transaction(["PannierContent"], "readwrite");
    const objectStore = transaction.objectStore("PannierContent");

    const clearRequest = objectStore.clear();
    let answer;

    clearRequest.onsuccess = (event) => {
        answer = "cleared"
    };

    clearRequest.onerror = (event) => {
        answer = event.target.error;
    };

    return answer
}
