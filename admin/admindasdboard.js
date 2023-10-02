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
            let odernotnu = 0
            data.forEach((pan) => {
                pan.articles.forEach((pani) => {
                    odernotnu += pani.statut == "review" ? 1 : 0;
                    const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";
                    const panierTBODY = `
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
                                <a>${pani.arti_id ? pani.arti_id.addarticle : 'Article Supprimé'}</a>
                                <ul>
                                    <li>Color: <span style="background-color: ${pani.color.substring(0, 7)}; color: ${pani.color.substring(0, 7)}">${pani.color.substring(0, 7)}</span></li>
                                    <li>Size: <span>${pani.size}</span></li>
                                    <li>Material: <span>${pani.arti_id ? pani.arti_id.addmateri : 'Article Supprimé'}</span></li>
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
            const odernotifi = document.getElementById('odernotifi');
            odernotifi.innerHTML = '';
            const odernotifia = document.getElementById('odernotifia');
            odernotifia.innerHTML = '';
            if (odernotnu > 0) {
                const odernotifiHTML = `
                        <i class="bx bx-notification"></i>
                        <span>${odernotnu}</span>
                    `;
                odernotifi.innerHTML += odernotifiHTML;
                odernotifia.innerHTML += odernotifiHTML;
            } else {
                const odernotifiHTML = `
                <i class="bx bx-notification"></i>
            `;
                odernotifi.innerHTML += odernotifiHTML;
                odernotifia.innerHTML += odernotifiHTML;
            }
        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };
}


async function selectStatus(ido, idar, sta) {
    await sendRequestforOrder('PUT', `orders/statoo/${ido}/${idar}`, { statut: sta });
    AdminAdministrtion("commande", "");
};


async function optionCancileView(_id, proid) {
    await openOrdersDatabase();

    getDasbordById(_id).then(result => {
        const product = result.articles.find(po => po._id == proid);


        if (product && product.arti_id) {
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

        } else {
            document.getElementById('optionCancilename').innerText = "Article Supprimé";

        };

    }).catch();

};

const imasEdi = [];

function previewImageEdite(event) {
    if (imasEdi.length < 5) {
        const imagePreview = document.getElementById(`Editeimage${imasEdi.length + 1}`);
        imagePreview.innerHTML = '';

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imasEdi.push({ _id: _idim[0] ? _idim[0].id : imasEdi[0].id, ima: e.target.result, nam: file.name, status: "update"});
                _idim.length > 0 ? _idim.splice(0, 1) : null;
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.height = '300px';
                img.style.width = '200px';
                img.setAttribute('onclick', 'removeImageEdite(event)');
                img.setAttribute('id', `EdieId${imasEdi.length}`);
                imagePreview.appendChild(img);

            };
            reader.readAsDataURL(file);
        };
    }
};

const _idim = [];

function removeImageEdite(event) {
    const clickedElementId = event.target.id;
    if (clickedElementId.startsWith('EdieId')) {
        const imageNumber = parseInt(clickedElementId.replace('EdieId', '')) - 1;
        if (imageNumber >= 0 && imageNumber < imasEdi.length) {
            // Remove the item from the array at the specified index
            _idim.push({ id: imasEdi[imageNumber]._id });
            const createItem = async () => {
                try {
                    await sendRequestforOrder('POST', `boutique/deleteim`, {name: imasEdi[imageNumber].ima});
                } catch (error) {
                    console.error('Error updating product:', error.message);
                }
            };

            createItem();
            imasEdi.splice(imageNumber, 1);

            // Clear the image previews
            const imagePreviews = document.querySelectorAll('[id^="Editeimage"]');
            imagePreviews.forEach((preview) => {
                preview.innerHTML = '';
            });

            // Update the remaining image previews
            imasEdi.forEach((ed, index) => {
                const imagePreview = document.getElementById(`Editeimage${index + 1}`);
                const img = document.createElement('img');
                img.src = ed.ima;
                img.style.height = '300px';
                img.style.width = '200px';
                img.setAttribute('onclick', 'removeImageEdite(event)');
                img.setAttribute('id', `EdieId${index + 1}`);
                imagePreview.appendChild(img);
            });
        }
    }
}

async function EditeViewArticle() {
    const _id = document.getElementById('ediatiid').value;
    try {
        const addarticle = document.getElementById('Editearticle').value;
        const addprixpro = document.getElementById('Editeprixpro').value;
        const addprix = document.getElementById('Editeprix').value;
        const addfour = document.getElementById('Editefour').value;
        const adddispo = document.getElementById('Editedispo').value;
        const addcoul = document.getElementById('Editecoul').value;
        const addtail = document.getElementById('Editetail').value;
        const addmateri = document.getElementById('Editemateri').value;
        const addtype = document.getElementById('Editetype').value;
        const addphone = document.getElementById('Editephone').value;
        const addquant = parseInt(document.getElementById('Editequant').value);
        const addexpe = document.getElementById('Editeexpe').value;
        const notes = document.getElementById('Editenotes').value;


        if (addarticle && addprixpro && addprix && addfour && adddispo && addcoul && addtail && addmateri && addtype && addphone && addexpe && notes) {
            const product = {
                addarticle: addarticle,
                addprixpro: parseInt(addprixpro),
                addprix: parseInt(addprix),
                addfour: addfour,
                adddispo: adddispo,
                addcoul: addcoul,
                addtail: addtail,
                addmateri: addmateri,
                addtype: addtype,
                addphone: addphone,
                quantity: parseInt(addquant),
                addexpe: addexpe,
                notes: notes,
                image: imasEdi
            };
            const createItem = async () => {
                try {
                    await sendRequestforOrder('PUT', `boutique/${_id}`, product);
                } catch (error) {
                    console.error('Error updating product:', error.message);
                }
            };

            createItem();
        }
    } catch (error) {
        console.log(error)
    }


};

async function optionEditeView(_id) {
    imasEdi.length = 0
    await openArticleDatabase();
    getArticleById(_id).then(product => {
        document.getElementById('ediatiid').value = _id;
        document.getElementById('Editearticle').value = product.addarticle;
        document.getElementById('Editequant').value = parseInt(product.quantity);
        document.getElementById('Editeprixpro').value = product.addprixpro;
        document.getElementById('Editeprix').value = product.addprix;
        document.getElementById('Editefour').value = product.addfour;
        document.getElementById('Editedispo').value = product.adddispo;
        document.getElementById('Editecoul').value = product.addcoul;
        document.getElementById('Editetail').value = product.addtail;
        document.getElementById('Editemateri').value = product.addmateri;
        document.getElementById('Editetype').value = product.addtype;
        document.getElementById('Editephone').value = product.addphone;
        document.getElementById('Editeexpe').value = product.addexpe;
        document.getElementById('Editenotes').value = product.notes;

        product.image.forEach((ed, index) => {
            const imagePreview = document.getElementById(`Editeimage${index + 1}`);
            imagePreview.innerHTML = '';
            imasEdi.push(ed);
            const img = document.createElement('img');
            img.src = ed.ima;
            img.style.height = '300px';
            img.style.width = '200px';
            img.setAttribute('onclick', 'removeImageEdite(event)');
            img.setAttribute('id', `EdieId${index + 1}`);
            imagePreview.appendChild(img);
        });

    });
};

async function deleteArticleById(_ide) {
    await sendRequestforOrder('DELETE', `boutique/${_ide}`);
    await openArticleDatabase();
    await clearArticlea();
    const items = await sendRequestforOrderget('GET', 'boutique');
    await addArticlesa(items);
    await getAdminDasboardproduc()

}

function addArticlesa(data) {
    return new Promise((resolve, reject) => {
        const transaction = articldb.transaction(["ArticleStore"], "readwrite");
        const objectStore = transaction.objectStore("ArticleStore");

        const requests = data.map(article => {
            return new Promise((innerResolve, innerReject) => {
                const request = objectStore.add(article);
                request.onsuccess = () => innerResolve();
                request.onerror = (event) => innerReject(event.target.error);
            });
        });

        Promise.all(requests)
            .then(() => resolve('done'))
            .catch(error => reject(error));
    });
}

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


async function getArticleById(_id) {
    return new Promise((resolve, reject) => {
        const transaction = articldb.transaction(["ArticleStore"], "readonly");
        const objectStore = transaction.objectStore("ArticleStore");
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
                    const panierTBODY =
                        `
                            <tr onmouseover="this.style.backgroundColor='#f8f8f8'" onmouseout="this.style.backgroundColor='#fff'" style="cursor: pointer !important;">
                                <td onclick="optionEditeView('${pani._id}')" class="product-thumbnail" data-bs-toggle="modal" data-bs-target="#modArticle">
                                    <a href="#">
                                        <img src="${pani.image[0].ima}" alt="item">
                                    </a>
                                </td>
                                <td onclick="optionEditeView('${pani._id}')" class="product-name" data-bs-toggle="modal" data-bs-target="#modArticle">
                                    <a href="#">${pani.addarticle}</a>
                                    <ul>
                                        <li>Color: <span style="background-color: ${pani.addcoul.substring(0, 7)}; color: ${pani.addcoul.substring(0, 7)}">${pani.addcoul.substring(0, 7)}</span></li>
                                        <li>Size: <span>${pani.addtail}</span></li>
                                        <li>Material: <span>${pani.addmateri}</span></li>
                                        <li>Type de produit: <span>${pani.addtype}</span></li>
                                    </ul>
                                </td>
                                <td onclick="optionEditeView('${pani._id}')" class="product-price" data-bs-toggle="modal" data-bs-target="#modArticle">
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
                                    <span onclick="optionEditeView('${pani._id}')" data-bs-toggle="modal" data-bs-target="#modArticle" class="subtotal-amount">${parseInt(pani.addprix) * parseInt(pani.quantity)} F.CFA</span>
                                    <a class="remove" style="cursor: pointer !important;" onclick="deleteArticleById('${pani._id}')"><i class="bx bx-trash"></i></a>
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
        await openArticleDatabase();
        await getAdminDasboardproduc()
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
    const nam = splo[1];
    const lastname = splo[2];
    document.getElementById('adminnom').innerText = thisiswhat(`${nam}â${lastname}`);
    /*
    const phone = splo[2];
    const mail = splo[3];
    const admin = splo[5];
    const mynam = thisiswhat(`${name}â${lastname}â${phone}â${mail}â${admin}`)
    sessionStorage.clear();
    */
    return splo[5] == "GIFV" ? true : false

};
async function Disconexion() {
    await openOrdersDatabase();
    await clearOrder();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "../login.html"
}

adminDasboard("commande");