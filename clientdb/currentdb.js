let db;

function openDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "panierDatabase";
        const dbVersion = 2;

        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = (event) => {
            reject("Database error: " + event.target.errorCode);
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve();
        };

        request.onupgradeneeded = (event) => {
            db = event.target.result;

            if (!db.objectStoreNames.contains("PannierContent")) {
                db.createObjectStore("PannierContent", { keyPath: "_id" });
            }
        };
    });
}


function adminDasboard(what) {
    if (getAdmin()) {
        AdminAdministrtion(what, "");
    }
};

adminDasboard("commande");

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

const imas = [];

function previewImage(event) {
    if (imas.length < 5) {
        const imagePreview = document.getElementById(`imagePreview${imas.length + 1}`);
        imagePreview.innerHTML = '';

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imas.push({ ima: e.target.result });
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.height = '300px';
                img.style.width = '200px';
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        };
    }
};

const apiUrl = 'http://localhost:3000/'; // Replace with your API endpoint
const token = 'YOUR_TOKEN_HERE'; // Replace with your actual token
const apiUrlf = 'https://zany-plum-bear.cyclic.cloud/'; // Replace with your API endpoint

// Helper function to send authenticated requests
const sendRequest = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrl + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

const sendRequestnoto = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrl + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

function AddArticle(who) {
    try {
        const addarticle = document.getElementById('addarticle').value;
        const addprixpro = document.getElementById('addprixpro').value;
        const addprix = document.getElementById('addprix').value;
        const addfour = document.getElementById('addfour').value;
        const adddispo = document.getElementById('adddispo').value;
        const addcoul = document.getElementById('addcoul').value;
        const addtail = document.getElementById('addtail').value;
        const addmateri = document.getElementById('addmateri').value;
        const addtype = document.getElementById('addtype').value;
        const addphone = document.getElementById('addphone').value;
        const addexpe = document.getElementById('addexpe').value;
        const notes = document.getElementById('notes').value;

        if (addarticle && addprixpro && addprix && addfour && adddispo && addcoul && addtail && addmateri && addtype && addphone && addexpe && notes) {
            const product = {
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
                who: who,
                notes: notes,
                image: imas
            };

            const createItem = async () => {
                try {
                    const response = await sendRequestnoto('POST', 'boutique', product);

                    console.log('Item created:', response);
                } catch (error) {
                    console.error('Error creating item:', error.message);
                }
            };

            createItem();
        }
    } catch (error) {
        console.log(error)
    }
}

function AdminAdministrtion(who, data) {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(() => {
                if (who === "commande") {
                    getAdminDasboard()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "article") {
                    getAdminDasboardproduc()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "client") {
                    getAdminDasboarduser()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else {
                    reject(new Error("Invalid operation"));
                }
            })
            .catch(error => reject(error));
    });
}



function addData(data) {
    //console.log(data);
    const transaction = db.transaction(["PannierContent"], "readwrite");
    const objectStore = transaction.objectStore("PannierContent");

    const addRequest = objectStore.add(data);
    let answer;

    addRequest.onsuccess = (event) => {
        answer = "created";
    };

    addRequest.onerror = (event) => {
        answer = event.target.error;
    };

    transaction.onerror = (event) => {
        answer = event.target.error;
    };

    return answer
}



function getDataById(id) {
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");

    const getRequest = objectStore.get(id._id);

    getRequest.onsuccess = (event) => {
        const result = event.target.result;

        if (id.even === "incre") {
            result.aquantity = parseInt(result.aquantity) + 1;
            TotalAll('put', result);
            TotalAll('dasboard', "");

        } else {
            result.aquantity = parseInt(result.aquantity) - 1;
            TotalAll('put', result);
            TotalAll('dasboard', "");

        }

    };

    transaction.onerror = (event) => {
        consolelog(event.target.error);
    };

    return "answer";
};

function getDasbordById(id) {
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");

    const getRequest = objectStore.get(id);

    getRequest.onsuccess = (event) => {
        const result = event.target.result;
        document.getElementById('optionCancilename').innerText = result.articleName;
        document.getElementById('ido').value = result._id;
        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = result.backgroundColor;
        const modalImage = document.getElementById('ipage');
        modalImage.src = result.image1;


        const optionid = document.getElementById('quantity-manipulate');
        optionid.innerHTML = '';
        const optionQuanhtml =
            `
                                <span class="minus-btn" onclick="decreaseQuantity(${result._id})"><i class="bx bx-minus"></i></span>
                                <input type="text" min="1" id="optionQuantity" value="${result.quantity}">
                                <span class="plus-btn" onclick="increaseQuantity(${result._id})"><i class="bx bx-plus"></i></span>
                             `;
        optionid.innerHTML += optionQuanhtml;

        document.getElementById('optionViewNewPrice').innerText = `${result.newPrice} F.CFA`;
        document.getElementById('optionQuantity').value = result.quantity;

    };


    transaction.onerror = (event) => {
        console.log(event.target.error);
    };

    return "answer";
};

//cart data entering
function getallData() {
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            pannierPrin.push(cursor.value);
            cursor.continue();
        } else {
            const tbodyId = document.getElementById('tbody-data');
            tbodyId.innerHTML = '';

            data.forEach(pani => {
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

            for (const pri of data) {
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
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            pannier.push(cursor.value);
            cursor.continue();
        } else {
            if (pannier.length > 0) {
                const productContainer = document.getElementById('pannier');
                productContainer.innerHTML = ''; // Clear previous content


                const pannierNumber1 = document.getElementById('paniernumber1');
                pannierNumber1.innerHTML = ''; // Clear previous content
                const panniernumHTML1 = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${data.length}</span>
                                `;
                pannierNumber1.innerHTML += panniernumHTML1;


                const pannierNumber2 = document.getElementById('paniernumber2');
                pannierNumber2.innerHTML = ''; // Clear previous content
                const panniernumHTML2 = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${data.length}</span>
                                `;
                pannierNumber2.innerHTML += panniernumHTML2;

                const pannierNumber3 = document.getElementById('paniernumber3');
                pannierNumber3.innerHTML = ''; // Clear previous content
                const panniernumHTML3 = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${data.length}</span>
                                `;
                pannierNumber3.innerHTML += panniernumHTML3;




                data.forEach(pro => {
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
                                        <a style="cursor: pointer !important;" class="remove-btn" onclick="removeItemById(${pro._id})"><i class="bx bx-trash"></i></a>
                                    </div>
                                </div>
                `;
                    productContainer.innerHTML += productHTML;

                });

                const h3Element = document.getElementById('monpanier');

                if (h3Element) {
                    h3Element.innerText = `Mon Panier (${data.length})`;
                }



                let totalPrice = 0; // Initialize to 1 so that the first multiplication works

                for (const pri of data) {
                    totalPrice += pri.newPrice * pri.quantity;
                };

                const subtotal = document.getElementById('subtotal');

                if (subtotal) {
                    subtotal.innerText = `${totalPrice} F.CFA`;
                }
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
        };
    };

    return "data";
};


function updateData(data) {
    const transaction = db.transaction(["PannierContent"], "readwrite");
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
    const transaction = db.transaction(["PannierContent"], "readwrite");
    const objectStore = transaction.objectStore("PannierContent");

    const deleteRequest = objectStore.delete(id);
    let answer;

    deleteRequest.onsuccess = (event) => {
        answer = "deleted";
    };

    deleteRequest.onerror = (event) => {
        answer = event.target.error;
    };

    transaction.onerror = (event) => {
        answer = event.target.error;
    };

    return answer
};

function clearData() {
    const transaction = db.transaction(["PannierContent"], "readwrite");
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

function getPanierSend(tocompl) {
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            tocompl.articles.push({
                arti_id: cursor.value._id,
                quantcho: cursor.value.quantcho,
                image: cursor.value.imago,
                color: cursor.value.color,
                size: cursor.value.size,
                prix: cursor.value.prix
            });
            cursor.continue();
        } else {
            //sendRequestnoto
            (async () => {
                try {
                    const response = await sendRequestnoto('POST', 'orders', tocompl);
                    if (response.done == "done") {
                        TotalAll("clear", "");
                        pannierCotent.length = 0;
                        window.location.href = "./track-order.html"
                    };

                } catch (error) {
                    console.error('Error creating item:', error.message);
                    throw error; // Re-throw the error to handle it in the calling function if needed
                }
            })();

        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return done
};

function getallCheckou() {
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else {
            const checkouId = document.getElementById('checkoutpanier');
            checkouId.innerHTML = '';

            data.forEach(pani => {
                const checkouTBODY =
                    `
                        <tr>                       
                            <td class="product-name">
                                <a href="#">${pani.addarticle}</a>
                            </td>
                            <td class="product-total">
                                <span class="subtotal-amount">${pani.prix * pani.quantcho} F.CFA</span>
                            </td>
                        </tr>  
                    `;

                checkouId.innerHTML += checkouTBODY;

            });

            const pantotalid = document.getElementById('toteauxche');
            pantotalid.innerHTML = '';

            let totalPricea = 0;

            for (const pri of data) {
                const adda = pri.prix * pri.quantcho;
                totalPricea += adda;
            };

            const pantotalhtml = `
                                <tr>                       
                                    <td class="product-name">
                                        <a href="#">Sous-total</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">${totalPricea} F.CFA</span>
                                    </td>
                                </tr> 
                                <tr>                       
                                    <td class="product-name">
                                        <a href="#">Expédition</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">1000 F</span>
                                    </td>
                                </tr> 
                                <tr>                       
                                    <td class="product-name">
                                        <a href="#">Total Géneral</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">${totalPricea + 1000} F.CFA</span>
                                    </td>
                                </tr> 
                        `;
            pantotalid.innerHTML += pantotalhtml;

        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return "data"
};





function getDasboard() {
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else {
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

function selectStatus(ido, sat) {
    TotalAll('action', { id: ido, status: sat });
};

function getselectDataById(id) {
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");

    const getRequest = objectStore.get(id._id);

    getRequest.onsuccess = (event) => {
        const actioa = event.target.result;
        actioa.statut = id.status;
        TotalAll('put', actioa);
        adminDasboard('commande');
    };

    transaction.onerror = (event) => {
        consolelog(event.target.error);
    };

    return "answer";
};

function getAdminDasboard() {
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            if (cursor.value._id == 50 || cursor.value._id == 51) {
                data.push(cursor.value);
            }
            cursor.continue();
        } else {
            const one = document.getElementById('adminitrationproduc');
            const two = document.getElementById('adminitrationuser');
            one.classList.remove('active');
            two.classList.remove('active');
            one.innerHTML = '';
            two.innerHTML = '';

            const adminitrationId = document.getElementById('adminitration');
            adminitrationId.classList.add('active');
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
                                                            <th scope="col">Téléphone</th>
                                                            <th scope="col">Quantité</th>
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


function getAdminDasboardproduc() {
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            if (cursor.value._id == 50 || cursor.value._id == 51) {
                data.push(cursor.value);

            }
            cursor.continue();
        } else {
            const one = document.getElementById('adminitration');
            const two = document.getElementById('adminitrationuser');
            one.classList.remove('active');
            two.classList.remove('active');
            one.innerHTML = '';
            two.innerHTML = '';

            const adminitrationId = document.getElementById('adminitrationproduc');
            adminitrationId.classList.add('active');
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



function getAdminDasboarduser() {
    const transaction = db.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            if (cursor.value._id == 50 || cursor.value._id == 51) {
                data.push(cursor.value);

            }
            cursor.continue();
        } else {
            const one = document.getElementById('adminitration');
            const two = document.getElementById('adminitrationproduc');
            one.classList.remove('active');
            two.classList.remove('active');
            one.innerHTML = '';
            two.innerHTML = '';

            const adminitrationId = document.getElementById('adminitrationuser');
            adminitrationId.classList.add('active');
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

function TotalAll(who, data) {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(() => {
                if (who === "post") {
                    addData(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "get") {
                    getDataById(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "getid" && getAdmin) {
                    getDasbordById(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "all") {
                    getallData()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "all1") {
                    getallDataa()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "all2") {
                    getallCheckou()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "action") {
                    getselectDataById(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "dasboard" && getAdmin()) {
                    getDasboard()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "put") {
                    updateData(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "del") {
                    deleteData(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "clear") {
                    clearData()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "sendOrder") {
                    getPanierSend(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else {
                    reject(new Error("Invalid operation"));
                }
            })
            .catch(error => reject(error));
    });
}
