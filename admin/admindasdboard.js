async function getAdminDasboard() {
    const transaction = orderdb.transaction(["OrderdStore"], "readonly");
    const objectStore = transaction.objectStore("OrderdStore");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else {

            const adminitrationId = document.getElementById('adminitration');
            adminitrationId.innerHTML = '';
            const adminbody = `
                                    <div class="container">
                                        <form>
                                            <div class="cart-table table-responsive">
                                                <table class="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Client</th>
                                                            <th scope="col">Article</th>
                                                            <th scope="col">Quantité</th>
                                                            <th scope="col">Statut</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbody-dataad">

                                                    </tbody>
                                                </table>
                                            </div>
                                        </form>
                                    </div>
                                    `;

            adminitrationId.innerHTML += adminbody;

            const tbodyId = document.getElementById('tbody-dataad');
            tbodyId.innerHTML = '';


            data.forEach(pan => {
                pan.articles.forEach((pani, inde) => {
                    const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";
                    const panierTBODY =
                        /*
                        
                        onclick="optionCancileView('${pan._id}', '${pani._id}')" style="cursor: pointer !important;"
    
                        */
                        `
                            <tr onmouseover="this.style.backgroundColor='#f8f8f8'" onmouseout="this.style.backgroundColor='#fff'">
                                <td data-bs-toggle="modal" data-bs-target="#optionCancile" onclick="optionCancileView('${pan._id}', '${pani._id}')" class="product-name" style="cursor: pointer !important; max-width: 40px !important; overflow: hidden !important">
                                   <a>${pan.client.nom} ${pan.client.prenom}</a>
                                    <ul>
                                        <li>
                                            <span>${pan.phone}</span>
                                        </li>
                                        <li>
                                            <span>${pan.ville}</span>
                                        </li>
                                        <li>
                                            <span">${pan.lieu}</span>
                                        </li>
                                    </ul>

                                </td>
                                
                                <td   data-bs-toggle="modal" data-bs-target="#optionCancile" onclick="optionCancileView('${pan._id}', '${pani._id}')" class="product-name" style="cursor: pointer !important; max-width: 40px !important; overflow: hidden !important">
                                    <a>${pani.arti_id.addarticle}</a>
                                    <ul>
                                        <li>Color: <span style="background-color: ${pani.color.substring(0, 7)}; color: ${pani.color.substring(0, 7)}">${pani.color.substring(0, 7)}</span></li>
                                        <li>Size: <span>${pani.size}</span></li>
                                        <li>Material: <span>${pani.arti_id.addmateri}</span></li>
                                    </ul>
                                </td>
                                <td   data-bs-toggle="modal" data-bs-target="#optionCancile" onclick="optionCancileView('${pan._id}', '${pani._id}')" class="product-quantity"  style="cursor: pointer !important; max-width: 40px !important; overflow: hidden !important">
                                    <div class="input-counter">
                                        <input type="text" min="1" value="${pani.quantcho}">
                                    </div>
                                </td>
                               
                                <td class="product-subtotal"  style="max-width: 40px !important; overflow: hidden !important">
                                <div class="dropdown">
                                    <a class="dropdown-toggle remove${deliveryStatus === 'livré' ? 'c' : deliveryStatus === 'en attente' ? 'a' : deliveryStatus === 'en cours' ? 'b' : 'd'}" onclick="toggleDropdown(event)">
                                        ${deliveryStatus}
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><span onclick="selectStatus('${pan._id}', '${pani._id}','done')">Livré</span></li>
                                        <li><span onclick="selectStatus('${pan._id}', '${pani._id}','review')">En attente</span></li>
                                        <li><span onclick="selectStatus('${pan._id}', '${pani._id}','onway')">En cours</span></li>
                                        <li><span onclick="selectStatus('${pan._id}', '${pani._id}','fail')">Échoué</span></li>
                                    </ul>
                                </div>
                            </td>
                            </tr>
                            
                        `;

                    tbodyId.innerHTML += panierTBODY;
                });
            });



        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return "data"
};

async function selectStatus(ido, idar, sta) {
    await sendRequestforOrder('PUT', `orders/statoo/${ido}/${idar}`, { statut: sta });
    AdminAdministrtion("commande", "");
};


async function optionCancileView(_id, proid) {
    await openOrdersDatabase();

    getDasbordById(_id).then(result => {
        const product = result.articles.find(po => po._id == proid);
        //console.log(result);
        //console.log(product);

        if (product) {
            const splo = product.arti_id.addcoul.split(",") ? product.arti_id.addcoul.split(",") : "#eeeeee";
            const colora = splo[0] == "null" ? "#eeeeee" : splo[0];
            const colorb = splo[1] == "null" ? "#eeeeee" : splo[1];
            const colorc = splo[2] == "null" ? "#eeeeee" : splo[2];
            const colord = splo[3] == "null" ? "#eeeeee" : splo[3];
            const colore = splo[4] == "null" ? "#eeeeee" : splo[4];

            const sploa = product.arti_id.addtail.split(",") ? product.arti_id.addtail.split(",") : "-";
            const qsizea = sploa[0] == "null" ? "-" : sploa[0];
            const qsizeb = sploa[1] == "null" ? "-" : sploa[1];
            const qsizec = sploa[2] == "null" ? "-" : sploa[2];
            const qsized = sploa[3] == "null" ? "-" : sploa[3];
            const qsizee = sploa[4] == "null" ? "-" : sploa[4];

            document.getElementById('optionCancilename').innerText = product.arti_id.addarticle;
            document.getElementById('optionViewNewPrice').innerText = `${product.arti_id.addprix} F.CFA`;
            document.getElementById('rating').innerText = `5 avis`;
            document.getElementById('quickFour').innerText = `${product.arti_id.addfour}`;
            document.getElementById('quickDispo').innerText = `${product.arti_id.adddispo}`;
            document.getElementById('quickType').innerText = `${product.arti_id.addtype}`;
            document.getElementById('productQuantity').value = product.quantcho;


            const quickCouleuHtml = document.getElementById('quickCouleu');
            const quickTailHtml = document.getElementById('quickTail');
            quickCouleuHtml.innerHTML = '';
            quickTailHtml.innerHTML = '';

            const quickColoHTML = `
                                    <li><a style="background-color: ${colora} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colorb} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colorc} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colord} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colore} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    `;
            quickCouleuHtml.innerHTML = quickColoHTML;

            const quickSizeHTML = `
                                    <li id="quisizeli0"><a>${qsizea}</a></li>
                                    <li id="quisizeli1"><a>${qsizeb}</a></li>
                                    <li id="quisizeli2"><a>${qsizec}</a></li>
                                    <li id="quisizeli3"><a>${qsized}</a></li>
                                    <li id="quisizeli4"><a>${qsizee}</a></li>
                                    `;
            quickTailHtml.innerHTML = quickSizeHTML;

            const orderStatuHtml = document.getElementById('statusOrder');
            orderStatuHtml.innerHTML = '';
            const orderStatus = product.statut === "done" ? "livré" : product.statut == "review" ? "en attente" : product.statut === "onway" ? "en cours" : "échoué";
            const orderStatu = ` <span style="color: ${orderStatus === 'livré' ? 'green' : orderStatus === 'en attente' ? 'orange' : orderStatus === 'en cours' ? 'pink' : 'red'}">Commande ${orderStatus}</span>
                                    `;
            orderStatuHtml.innerHTML = orderStatu;


            document.getElementById('ido').value = `${_id}`;
            document.getElementById('proid').value = `${proid}`;

            const element = document.getElementById('hidlater');
            element.classList.remove('hiddendhid');
            element.classList.add('hiddendshow');


            document.getElementById('villeValue').value = `${result.ville}`;
            document.getElementById('communeValue').value = `${result.commune}`;
            document.getElementById('adresseValue').value = `${result.lieu}`;
            document.getElementById('telephoneValue').value = `${result.phone}`;

            const bacgro = document.getElementById('bagron');
            bacgro.style.backgroundColor = product.backgroundColor;
            const modalImage = document.getElementById('ipage');
            modalImage.src = product.arti_id.image[0].ima;
            const colSizeImage = product.image.split(",");
            const quickColose = document.getElementById('quickColose');
            quickColose.innerHTML = '';
            selctSizea = [];
            selcta = [];
            for (let poa = 0; poa < colSizeImage.length; poa++) {
                quiColorfunb(poa, splo[parseInt(colSizeImage[poa])], product.arti_id.image[parseInt(colSizeImage[poa])].ima)
                quiSizefunab(parseInt(colSizeImage[poa]), sploa[parseInt(colSizeImage[poa])])
            }

        };

    }).catch();

};

async function optionEditeView(_id, proid) {
    await openOrdersDatabase();

    getDasbordById(_id).then(result => {
        const product = result.articles.find(po => po._id == proid);
        //console.log(result);
        //console.log(product);

        if (product) {
            const splo = product.arti_id.addcoul.split(",") ? product.arti_id.addcoul.split(",") : "#eeeeee";
            const colora = splo[0] == "null" ? "#eeeeee" : splo[0];
            const colorb = splo[1] == "null" ? "#eeeeee" : splo[1];
            const colorc = splo[2] == "null" ? "#eeeeee" : splo[2];
            const colord = splo[3] == "null" ? "#eeeeee" : splo[3];
            const colore = splo[4] == "null" ? "#eeeeee" : splo[4];

            const sploa = product.arti_id.addtail.split(",") ? product.arti_id.addtail.split(",") : "-";
            const qsizea = sploa[0] == "null" ? "-" : sploa[0];
            const qsizeb = sploa[1] == "null" ? "-" : sploa[1];
            const qsizec = sploa[2] == "null" ? "-" : sploa[2];
            const qsized = sploa[3] == "null" ? "-" : sploa[3];
            const qsizee = sploa[4] == "null" ? "-" : sploa[4];

            document.getElementById('optionCancilename').innerText = product.arti_id.addarticle;
            document.getElementById('optionViewNewPrice').innerText = `${product.arti_id.addprix} F.CFA`;
            document.getElementById('rating').innerText = `5 avis`;
            document.getElementById('quickFour').innerText = `${product.arti_id.addfour}`;
            document.getElementById('quickDispo').innerText = `${product.arti_id.adddispo}`;
            document.getElementById('quickType').innerText = `${product.arti_id.addtype}`;
            document.getElementById('productQuantity').value = product.quantcho;


            const quickCouleuHtml = document.getElementById('quickCouleu');
            const quickTailHtml = document.getElementById('quickTail');
            quickCouleuHtml.innerHTML = '';
            quickTailHtml.innerHTML = '';

            const quickColoHTML = `
                                    <li><a style="background-color: ${colora} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colorb} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colorc} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colord} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colore} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    `;
            quickCouleuHtml.innerHTML = quickColoHTML;

            const quickSizeHTML = `
                                    <li id="quisizeli0"><a>${qsizea}</a></li>
                                    <li id="quisizeli1"><a>${qsizeb}</a></li>
                                    <li id="quisizeli2"><a>${qsizec}</a></li>
                                    <li id="quisizeli3"><a>${qsized}</a></li>
                                    <li id="quisizeli4"><a>${qsizee}</a></li>
                                    `;
            quickTailHtml.innerHTML = quickSizeHTML;

            const orderStatuHtml = document.getElementById('statusOrder');
            orderStatuHtml.innerHTML = '';
            const orderStatus = product.statut === "done" ? "livré" : product.statut == "review" ? "en attente" : product.statut === "onway" ? "en cours" : "échoué";
            const orderStatu = ` <span style="color: ${orderStatus === 'livré' ? 'green' : orderStatus === 'en attente' ? 'orange' : orderStatus === 'en cours' ? 'pink' : 'red'}">Commande ${orderStatus}</span>
                                    `;
            orderStatuHtml.innerHTML = orderStatu;


            document.getElementById('ido').value = `${_id}`;
            document.getElementById('proid').value = `${proid}`;

            const element = document.getElementById('hidlater');
            element.classList.remove('hiddendhid');
            element.classList.add('hiddendshow');


            document.getElementById('villeValue').value = `${result.ville}`;
            document.getElementById('communeValue').value = `${result.commune}`;
            document.getElementById('adresseValue').value = `${result.lieu}`;
            document.getElementById('telephoneValue').value = `${result.phone}`;

            const bacgro = document.getElementById('bagron');
            bacgro.style.backgroundColor = product.backgroundColor;
            const modalImage = document.getElementById('ipage');
            modalImage.src = product.arti_id.image[0].ima;
            const colSizeImage = product.image.split(",");
            const quickColose = document.getElementById('quickColose');
            quickColose.innerHTML = '';
            selctSizea = [];
            selcta = [];
            for (let poa = 0; poa < colSizeImage.length; poa++) {
                quiColorfunb(poa, splo[parseInt(colSizeImage[poa])], product.arti_id.image[parseInt(colSizeImage[poa])].ima)
                quiSizefunab(parseInt(colSizeImage[poa]), sploa[parseInt(colSizeImage[poa])])
            }

        };

    }).catch();

};

const sendRequestforOrder = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfine + endpoint, options);

    return response;

};

const sendRequestforOrderget = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfine + endpoint, options);

    // Check if the response is valid (status in the range 200-299)
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    // Convert the response to JSON
    const responseData = await response.json();

    return responseData;
};



async function getDasbordById(_id) {
    return new Promise((resolve, reject) => {
        const transaction = orderdb.transaction(["OrderdStore"], "readonly");
        const objectStore = transaction.objectStore("OrderdStore");
        const getRequest = objectStore.get(_id);

        transaction.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
            reject("Error accessing object store");
        };

        getRequest.onsuccess = (event) => {
            const actioa = event.target.result;
            resolve(actioa)
        };


    });
}



let selcta = [];

function quiSizefunab(id, siz) {
    const one = document.getElementById(`quisizeli${id}`);
    one.classList.add('active');
    selcta.push({ id: `quisizeli${id}`, size: siz });
};


let selctSizea = [];
function quiColorfunb(impo, id, im) {
    const bacgro = document.getElementById('bagron');
    bacgro.style.backgroundColor = id;
    const modalImage = document.getElementById('ipage');
    modalImage.src = im;

    const quickTailHtml = document.getElementById('quickColose');

    selctSizea.push({ col: id, id: impo });

    const quickSizeHTML = `<li style="background-color: ${id};"><a></a></li>`;
    quickTailHtml.innerHTML += quickSizeHTML;
};



async function getAdminDasboardproduc() {
    const transaction = articldb.transaction(["ArticleStore"], "readonly");
    const objectStore = transaction.objectStore("ArticleStore");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else {
            const adminitrationId = document.getElementById('adminitration');
            adminitrationId.innerHTML = '';
            const adminbody = `
                                    <div class="container">
                                        <form>
                                            <div class="cart-table table-responsive">
                                                <table class="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Produit</th>
                                                            <th scope="col">Nom</th>
                                                            <th scope="col">Prix unitaire</th>
                                                            <th scope="col">Quantité</th>
                                                            <th scope="col">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbody-data">

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="cart-buttons">
                                            <div class="row align-items-center">
                                                <div class="col-lg-5 col-sm-5 col-md-5">
                                                    <a></a>
                                                </div>
                                                <div class="col-lg-7 col-sm-7 col-md-7  text-end">
                                                <a   data-bs-toggle="modal" data-bs-target="#addArticle" style="cursor: pointer !important;" class="optional-btn">Ajouter un article</a>
                                            </div>
                                            </div>
                                        </div>
                                        </form>
                                    </div>
                                    `;

            adminitrationId.innerHTML += adminbody;


            {
                const tbodyId = document.getElementById('tbody-data');
                tbodyId.innerHTML = '';

                data.forEach(pani => {
                    console.log(pani);
                    const panierTBODY =
                        `
                            <tr onmouseover="this.style.backgroundColor='#f8f8f8'" onmouseout="this.style.backgroundColor='#fff'" style="cursor: pointer !important;">
                                <td onclick="optionEditeView(${pani._id})" class="product-thumbnail" data-bs-toggle="modal" data-bs-target="#modArticle">
                                    <a href="#">
                                        <img src="${pani.image[0].ima}" alt="item">
                                    </a>
                                </td>
                                <td onclick="optionEditeView(${pani._id})" class="product-name" data-bs-toggle="modal" data-bs-target="#modArticle">
                                    <a href="#">${pani.addarticle}</a>
                                    <ul>
                                        <li>Color: <span style="background-color: ${pani.addcoul.substring(0, 7)}; color: ${pani.addcoul.substring(0, 7)}">${pani.addcoul.substring(0, 7)}</span></li>
                                        <li>Size: <span>${pani.addtail}</span></li>
                                        <li>Material: <span>${pani.addmateri}</span></li>
                                        <li>Type de produit: <span>${pani.addtype}</span></li>
                                    </ul>
                                </td>
                                <td onclick="optionEditeView(${pani._id})" class="product-price" data-bs-toggle="modal" data-bs-target="#modArticle">
                                    <span class="unit-amount">${pani.addprix} F</span>
                                </td>
                                <td class="product-quantity">
                                    <div class="input-counter" id="quantity-manipulate">
                                        <div class="input-counter">
                                            <input type="text" min="1" id="${pani._id}" value="${parseInt(pani.quantity)}">
                                        </div>
                                    </div>
                                </td>
                                <td class="product-subtotal">
                                    <span onclick="optionEditeView(${pani._id})" data-bs-toggle="modal" data-bs-target="#modArticle" class="subtotal-amount">${parseInt(pani.addprix) * parseInt(pani.quantity)} F.CFA</span>
                                    <a class="remove" style="cursor: pointer !important;" onclick="removePanierById('${pani._id}')"><i class="bx bx-trash"></i></a>
                                </td>
                            </tr>
                        `;

                    tbodyId.innerHTML += panierTBODY;

                });

            }


        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return "data"
};



function getAdminDasboarduser() {
    const transaction = orderdb.transaction(["OrderdStore"], "readonly");
    const objectStore = transaction.objectStore("OrderdStore");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            if (cursor.value._id == 50 || cursor.value._id == 51) {
                data.push(cursor.value);

            }
            cursor.continue();
        } else {
            const adminitrationId = document.getElementById('adminitration');
            adminitrationId.innerHTML = '';
            const adminbody = `
                                    <div class="container">
                                        <form>
                                            <div class="cart-table table-responsive">
                                                <table class="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Produit</th>
                                                            <th scope="col">Nom</th>
                                                            <th scope="col">Prix unitaire</th>
                                                            <th scope="col">Quantité</th>
                                                            <th scope="col">Total</th>
                                                            <th scope="col">Statut</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbody-data">

                                                    </tbody>
                                                </table>
                                            </div>
                                        </form>
                                    </div>
                                    `;

            adminitrationId.innerHTML += adminbody;

            const tbodyId = document.getElementById('tbody-data');
            tbodyId.innerHTML = '';

            data.forEach(pani => {
                const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";

                const panierTBODY =
                    `
                        <tr style="cursor: pointer !important;" onmouseover="this.style.backgroundColor='#f8f8f8'" onmouseout="this.style.backgroundColor='#fff'">
                        <td class="product-price">
                            <span class="unit-amount">${pani.client}</span>
                        </td>
                            <td class="product-name">
                                <a>${pani.article}</a>
                                <ul>
                                    <li>Color: <span>ani.color</span></li>
                                    <li>Size: <span>pani.size</span></li>
                                    <li>Material: <span>pani.material</span></li>
                                </ul>
                            </td>
                            <td class="product-price">
                                <span class="unit-amount">${pani.phone}</span>
                            </td>
                            <td class="product-quantity">
                                   <div class="input-counter">
                                      <input type="text" min="1" value="${pani.aquantity}">
                                   </div>
                            </td>
                            <!--<td class="product-subtotal">
                                <span class="subtotal-amount">${pani.newPrice * pani.aquantity} F.CFA</span>
                            </td>-->
                            <td class="product-subtotal">
                                <div class="dropdown">
                                    <a class="dropdown-toggle remove${deliveryStatus === 'livré' ? 'c' : deliveryStatus === 'en attente' ? 'a' : deliveryStatus === 'en cours' ? 'b' : 'd'}" onclick="toggleDropdown(event)">
                                        ${deliveryStatus}
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><span onclick="selectStatus(${pani._id}, 'done')">Livré</span></li>
                                        <li><span onclick="selectStatus(${pani._id}, 'review')">En attente</span></li>
                                        <li><span onclick="selectStatus(${pani._id}, 'onway')">En cours</span></li>
                                        <li><span onclick="selectStatus(${pani._id}, 'fail')">Échoué</span></li>
                                    </ul>
                                </div>
                            </td>
                            
                        </tr>
                        
                    `;

                tbodyId.innerHTML += panierTBODY;

            });


        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return "data"
};

function addOrders(data) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(data)) {
            reject(new Error('Data is not an array'));
            return;
        }

        const transaction = orderdb.transaction(["OrderdStore"], "readwrite");
        const objectStore = transaction.objectStore("OrderdStore");

        const requests = data.map(article => {
            return new Promise((innerResolve, innerReject) => {
                const request = objectStore.put(article);
                request.onsuccess = () => innerResolve();
                request.onerror = (event) => innerReject(event.target.error);
            });
        });

        Promise.all(requests)
            .then(() => resolve('done'))
            .catch(error => reject(error));
    });
}






function clearOrder() {
    return new Promise((resolve, reject) => {
        const transaction = orderdb.transaction(["OrderdStore"], "readwrite");
        const objectStore = transaction.objectStore("OrderdStore");
        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = (event) => {
            resolve("cleared")
        };

        transaction.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
            reject("Error accessing object store");
        };


    });

}

async function AdminAdministrtion(who, data) {
    if (who === "commande") {

        const items = await sendRequestforOrderget('GET', 'orders');
        await openOrdersDatabase();
        await clearOrder();
        await addOrders(items);
        await getAdminDasboard();
    } else if (who === "article") {
        await openOrdersDatabase();
        await openArticleDatabase();
        await getAdminDasboardproduc()
    } else if (who === "client") {
        await getAdminDasboarduser();
    } else {
        reject(new Error("Invalid operation"));
    }
};

function adminDasboard(what) {
    if (getAdmin()) {
        AdminAdministrtion(what, "");
    }
};

function getAdmin() {
    const token = sessionStorage.getItem('tibule');
    const splo = token.split("°");
    /*const name = splo[0];
    const lastname = splo[1];
    const phone = splo[2];
    const mail = splo[3];*/
    const admin = splo[5];
    //const mynam = thisiswhat(`${name}â${lastname}â${phone}â${mail}â${admin}`)
    //sessionStorage.clear();
    return admin == "GIFV" ? true : false

}

adminDasboard("commande");