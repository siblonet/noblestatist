let orderdb;

function Dasboard(what) {
    if (getAdmin()) {
        OrderLoad(what, "");
    }
};

function getAdmin() {
    const token = sessionStorage.getItem('tibule');
    return token ? true : false
}

Dasboard("commande");


const apiUrlb = 'http://localhost:3000/'; // Replace with your API endpoint
const apiUrlbq = 'https://zany-plum-bear.cyclic.cloud/'; // Replace with your API endpoint

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

    const response = await fetch(apiUrla + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

function ClienDasbordAdministration(who, data) {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(() => {
                if (who === "commande") {
                    getDasboardCustomer()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "article") {
                    getDasboardCustomer()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "client") {
                    getDasboardCustomer()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else {
                    reject(new Error("Invalid operation"));
                }
            })
            .catch(error => reject(error));
    });
}


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

        const response = await fetch(apiUrla + endpoint, options);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Request failed!');
        }

        return responseData;
    };

    try {
        const items = await sendRequestforOrder('GET', 'oders');
        return new Promise((resolve, reject) => {
            openOrdersDatabase().then(() => clearOrder().then(result => resolve(result)).catch(error => reject(error)));
            openOrdersDatabase().then(() => addOrders(items).then(result => resolve(result)).catch(error => reject(error)));
            ClienDasbordAdministration("commande", "")
        }).catch(error => reject(error));

    } catch (error) {
        console.error('Error fetching items:', error.message);
    };

};


function getDasboardCustomer() {
    const transaction = db.transaction(["OrderdStore"], "readonly");
    const objectStore = transaction.objectStore("OrderdStore");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else {
            console.log(data);
            const tbodyId = document.getElementById('tbody-data');
            tbodyId.innerHTML = '';

            data.forEach(pani => {
                const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";

                const panierTBODY =
                    `
                        <tr onclick="optionCancileView(${pani._id})" style="cursor: pointer !important;" onmouseover="this.style.backgroundColor='#f8f8f8'" onmouseout="this.style.backgroundColor='#fff'"  data-bs-toggle="modal" data-bs-target="#optionCancile">
                            <td class="product-thumbnail">
                                <a>
                                    <img src="${pani.image1}" alt="item">
                                </a>
                            </td>
                            <td class="product-name">
                                <a>${pani.articleName}</a>
                                <ul>
                                    <li>Color: <span>${pani.color}</span></li>
                                    <li>Size: <span>${pani.size}</span></li>
                                    <li>Material: <span>${pani.material}</span></li>
                                </ul>
                            </td>
                            <td class="product-price">
                                <span class="unit-amount">${pani.newPrice} F</span>
                            </td>
                            <td class="product-quantity">
                                   <div class="input-counter">
                                      <input type="text" min="1" value="${pani.quantity}">
                                   </div>
                            </td>
                            <td class="product-subtotal">
                                <span class="subtotal-amount">${pani.newPrice * pani.quantity} F.CFA</span>
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

            const pantotalid = document.getElementById('toteaux');
            pantotalid.innerHTML = '';

            let totalPricea = 0; // Initialize to 1 so that the first multiplication works

            for (const pri of data) {
                const adda = pri.newPrice * pri.quantity;
                totalPricea += adda;
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
        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return "data"
};

