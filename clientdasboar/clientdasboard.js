let orderdb;

function Dasboard(what) {
    if (getAdmin()) {


        //OrderLoad(what, "");
        OrderLoad()
            .then()
            .catch(error => {
                console.error('Error executing OrderLoad:', error.message);
            });
    }
};

function getAdmin() {
    const token = sessionStorage.getItem('tibule');
    return token ? true : false
}

Dasboard("commande");


const apiUrlxx = 'http://localhost:3000/'; // Replace with your API endpoint
const apiUrlxxs = 'https://zany-plum-bear.cyclic.cloud/'; // Replace with your API endpoint

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

    const response = await fetch(apiUrlxx + endpoint, options);

    return response;

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
                                    <li><a onclick="quiColorfuna('0', '${colora}', '${product.arti_id.image[0].ima}')" style="cursor: pointer !important; background-color: ${colora} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a onclick="quiColorfuna('1', '${colorb}', '${product.arti_id.image[1].ima}')" style="cursor: pointer !important; background-color: ${colorb} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a onclick="quiColorfuna('2', '${colorc}', '${product.arti_id.image[2].ima}')" style="cursor: pointer !important; background-color: ${colorc} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a onclick="quiColorfuna('3', '${colord}', '${product.arti_id.image[3].ima}')" style="cursor: pointer !important; background-color: ${colord} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a onclick="quiColorfuna('4', '${colore}', '${product.arti_id.image[4].ima}')" style="cursor: pointer !important; background-color: ${colore} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    `;
            quickCouleuHtml.innerHTML = quickColoHTML;

            const quickSizeHTML = `
                                    <li id="quisizeli0"><a onclick="quiSizefuna('0', '${qsizea}')" style="cursor: pointer !important">${qsizea}</a></li>
                                    <li id="quisizeli1"><a onclick="quiSizefuna('1', '${qsizeb}')" style="cursor: pointer !important">${qsizeb}</a></li>
                                    <li id="quisizeli2"><a onclick="quiSizefuna('2', '${qsizec}')" style="cursor: pointer !important">${qsizec}</a></li>
                                    <li id="quisizeli3"><a onclick="quiSizefuna('3', '${qsized}')" style="cursor: pointer !important">${qsized}</a></li>
                                    <li id="quisizeli4"><a onclick="quiSizefuna('4', '${qsizee}')" style="cursor: pointer !important">${qsizee}</a></li>
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

async function cancelItemById() {
    const ido = document.getElementById('ido').value;
    const proid = document.getElementById('proid').value;
    await sendRequestforOrder('DELETE', `orders/oarderar/${ido}/${proid}`);
    await openOrdersDatabase();
    await clearOrder().then()
        .catch(error => {
            console.error('Error executing OrderLoad:', error.message);
        });


    window.location.reload()
};


async function updateOrderById() {
    const ido = document.getElementById('ido').value;
    const proid = document.getElementById('proid').value;
    const quantity = document.getElementById('productQuantity').value;

    let sizo = "";
    let imago = "";
    selcta.forEach((si, index) => sizo += index + 1 == selcta.length ? si.size : si.size + ",");

    let cilor = "";
    selctSizea.forEach((si, index) => {
        cilor += index + 1 == selctSizea.length ? si.col : si.col + ",";
        imago += index + 1 == selctSizea.length ? si.id : si.id + ","
    });

    const upda = {
        quantcho: quantity,
        imago: selctSizea.length > 0 ? imago : "0",
        color: selctSizea.length > 0 ? cilor : addcoul.substring(0, 7),
        size: selcta.length > 0 ? sizo : addtail[2] == "," ? addtail[0] + addtail[1] : addtail[0]
    }
    
    
    
    /*await sendRequestforOrder('DELETE', `orders/oarderar/${ido}/${proid}`);
    await openOrdersDatabase();
    await clearOrder().then()
        .catch(error => {
            console.error('Error executing OrderLoad:', error.message);
        });
    window.location.reload()*/
};


function decreaseQuantity(id) {
    TotalAll('get', { id: id, even: "" });
    let doo = parseInt(document.getElementById('optionQuantity').value);
    if (doo > 1) {
        doo -= 1;
    }
    document.getElementById('optionQuantity').value = doo;
}

function increaseQuantity(id) {
    TotalAll('get', { id: id, even: "incre" });
    let doo = parseInt(document.getElementById('optionQuantity').value);
    doo += 1;
    document.getElementById('optionQuantity').value = doo;
};

function openOrdersDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "OrderdContent";
        const dbVersion = 3;

        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = (event) => {
            reject("Database error: " + event.target.errorCode);
        };

        request.onsuccess = (event) => {
            orderdb = event.target.result;
            resolve();
        };

        request.onupgradeneeded = (event) => {
            orderdb = event.target.result;

            if (!orderdb.objectStoreNames.contains("OrderdStore")) {
                orderdb.createObjectStore("OrderdStore", { keyPath: "_id" });
            }
        };
    });
}


function addOrders(data) {
    return new Promise((resolve, reject) => {
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
    const transaction = articldb.transaction(["OrderdStore"], "readwrite");
    const objectStore = transaction.objectStore("OrderdStore");

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


async function OrderLoad() {
    const apU = 'http://localhost:3000/'; //https://zany-plum-bear.cyclic.cloud/';
    const sendRequestforO = async (method, endpoint, data = null) => {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(apU + endpoint, options);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Request failed!');
        }

        return responseData;
    };

    try {
        await openOrdersDatabase();

        const items = await sendRequestforO('GET', 'orders');

        await addOrders(items);

        getDasboardCustomer().then(data => {
            const tbodyId = document.getElementById('tbody-data');
            tbodyId.innerHTML = '';

            data.forEach(pan => {
                pan.articles.forEach((pani, inde) => {
                    const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";
                    const panierTBODY =
                        `
                            <tr onclick="optionCancileView('${pan._id}', '${pani._id}')" style="cursor: pointer !important;" onmouseover="this.style.backgroundColor='#f8f8f8'" onmouseout="this.style.backgroundColor='#fff'"  data-bs-toggle="modal" data-bs-target="#optionCancile">
                                <td class="product-thumbnail">
                                    <a>
                                        <img src="${pani.arti_id.image[parseInt(pani.image[0])].ima}" alt="item">
                                    </a>
                                </td>
                                <td class="product-name">
                                    <a>${pani.arti_id.addarticle}</a>
                                    <ul>
                                        <li>Color: <span style="background-color: ${pani.color.substring(0, 7)}; color: ${pani.color.substring(0, 7)}">${pani.color.substring(0, 7)}</span></li>
                                        <li>Size: <span>${pani.size}</span></li>
                                        <li>Material: <span>${pani.arti_id.addmateri}</span></li>
                                    </ul>
                                </td>
                                <td class="product-price">
                                    <span class="unit-amount">${pani.prix} F</span>
                                </td>
                                <td class="product-quantity">
                                    <div class="input-counter">
                                        <input type="text" min="1" value="${pani.quantcho}">
                                    </div>
                                </td>
                                <td class="product-subtotal">
                                    <span class="subtotal-amount">${pani.prix * pani.quantcho} F.CFA</span>
                                </td>
                                <td class="product-subtotal">
                                    <a class="remove${deliveryStatus === 'livré' ? 'c' : deliveryStatus === 'en attente' ? 'a' : deliveryStatus === 'en cours' ? 'b' : 'd'}">
                                    <i class="bx bx-failed">${deliveryStatus}</i>
                                    </a>
                                </td>
                            </tr>
                            
                        `;

                    tbodyId.innerHTML += panierTBODY;
                });
            });

            const pantotalid = document.getElementById('toteaux');
            pantotalid.innerHTML = '';

            let totalPricea = 0;

            for (const pri of data) {
                for (const prid of pri.articles) {
                    const adda = prid.prix * prid.quantcho;
                    totalPricea += adda;
                };


            };

            const pantotalhtml = `
                            <li>Sous-total <span>${totalPricea} F</span></li>
                            <li>Livraison <span>1000 F</span></li>
                            <li>Total <span>${totalPricea + 1000} F.CFA</span></li>
                            `;
            pantotalid.innerHTML += pantotalhtml;




            const pannierNumber2 = document.getElementById('paniernumber2');
            pannierNumber2.innerHTML = '';
            const panniernumHTML2 = `
                                <i class="bx bx-shopping-bag"></i>
                                <span>${data.length}</span>
                            `;
            pannierNumber2.innerHTML += panniernumHTML2;

            const pannierNumber3 = document.getElementById('paniernumber3');
            pannierNumber3.innerHTML = '';
            const panniernumHTML3 = `
                                <i class="bx bx-shopping-bag"></i>
                                <span>${data.length}</span>
                            `;
            pannierNumber3.innerHTML += panniernumHTML3;
        }).catch(error => {
            console.error("Error getting data:", error);
        });


    } catch (error) {
        console.error('Error in OrderLoad:', error.message);
        throw error;
    }
}

async function getDasboardCustomer() {
    return new Promise((resolve, reject) => {
        const transaction = orderdb.transaction(["OrderdStore"], "readonly");
        const objectStore = transaction.objectStore("OrderdStore");
        const data = [];

        transaction.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
            reject("Error accessing object store");
        };

        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                data.push(cursor.value);
                cursor.continue();
            } else {
                resolve(data);
            }
        };
    });
}


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

function quiSizefuna(id, siz) {
    if (selcta.length == 0 && `quisizeli${id}` !== "quisizelia") {
        const onea = document.getElementById("quisizelia");
        const one = document.getElementById(`quisizeli${id}`);
        onea.classList.remove('active');
        one.classList.add('active');
        selcta.push({ id: `quisizeli${id}`, size: siz });
    } else {
        let prodque = document.getElementById('productQuantity').value;
        if (parseInt(prodque) + 1 > selcta.length + 1) {
            const one = document.getElementById(`quisizeli${id}`);
            one.classList.add('active');
            selcta.push({ id: `quisizeli${id}`, size: siz });
        } else {
            selcta.forEach(ee => {
                const one = document.getElementById(`${ee.id}`);
                one.classList.remove('active');
            });
            selcta = [];
            const one = document.getElementById(`quisizeli${id}`);
            one.classList.add('active');
            selcta.push({ id: `quisizeli${id}`, size: siz });
        };
    }

};

let selctSizea = [];
function quiColorfunb(impo, id, im) {
    const bacgro = document.getElementById('bagron');
    bacgro.style.backgroundColor = id;
    const modalImage = document.getElementById('ipage');
    modalImage.src = im;

    const quickTailHtml = document.getElementById('quickColose');

    selctSizea.push({ col: id, id: impo });

    const quickSizeHTML = `<li style="background-color: ${id};"><a onclick="quiColoremoa(${impo})" style="cursor: pointer !important"></a></li>`;
    quickTailHtml.innerHTML += quickSizeHTML;
};


function quiColorfuna(impo, id, im) {
    const bacgro = document.getElementById('bagron');
    bacgro.style.backgroundColor = id;
    const modalImage = document.getElementById('ipage');
    modalImage.src = im;
    let proquant = document.getElementById('productQuantity').value;

    const quickTailHtml = document.getElementById('quickColose');
    quickTailHtml.innerHTML = '';

    if (selctSizea.length == 0 && parseInt(proquant) == 1) {
        selctSizea.push({ col: id, id: impo });

        const quickSizeHTML = `<li style="background-color: ${id};"><a onclick="quiColoremoa(${0})" style="cursor: pointer !important"></a></li>`;
        quickTailHtml.innerHTML = quickSizeHTML;

    } else {
        if (parseInt(proquant) > selctSizea.length) {
            selctSizea.push({ col: id, id: impo });
            let quickSizeHTML = '';
            selctSizea.forEach((coa, index) => {
                quickSizeHTML += `<li style="background-color: ${coa.col};"><a onclick="quiColoremoa('${index}')" style="cursor: pointer !important"></a></li>`;
            });
            quickTailHtml.innerHTML = quickSizeHTML;
        } else {
            selctSizea = [];
            selctSizea.push({ col: id, id: impo });
            const quickSizeHTML = `<li style="background-color: ${id};"><a onclick="quiColoremoa(${0})" style="cursor: pointer !important"></a></li>`;
            quickTailHtml.innerHTML = quickSizeHTML;
        }
    }
}

function quiColoremoa(pos) {
    const quickTailHtml = document.getElementById('quickColose');
    quickTailHtml.innerHTML = '';
    if (pos >= 0 && pos < selctSizea.length) {
        selctSizea.splice(pos, 1);
        let quickSizeHTML = '';
        selctSizea.forEach((coa, index) => {
            quickSizeHTML += `<li style="background-color: ${coa.col};"><a onclick="quiColoremoa('${index}')" style="cursor: pointer !important"></a></li>`;
        });
        quickTailHtml.innerHTML = quickSizeHTML;

    }

}
