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


const apiUrlxxs = 'http://localhost:3000/'; // Replace with your API endpoint
const apiUrlxx = 'https://zany-plum-bear.cyclic.cloud/'; // Replace with your API endpoint

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
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};


function optionCancileView(productId) {
    TotalAll("getid", productId);
};

function cancelItemById() {
    const ido = parseInt(document.getElementById('ido').value);
    TotalAll("del", ido);
    TotalAll('dasboard', "");
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
    const apU = 'https://zany-plum-bear.cyclic.cloud/';
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
                            <tr onclick="optionCancileView(${pani._id})" style="cursor: pointer !important;" onmouseover="this.style.backgroundColor='#f8f8f8'" onmouseout="this.style.backgroundColor='#fff'"  data-bs-toggle="modal" data-bs-target="#optionCancile">
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



