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
                img.setAttribute('onclick', 'removeImageCreate(event)');
                img.setAttribute('id', `todeleId${imas.length + 1}`);
                imagePreview.appendChild(img);
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        };
    }
};


function removeImageCreate(event) {
    const clickedElementId = event.target.id;
    if (clickedElementId.startsWith('todeleId')) {
        const imageNumber = parseInt(clickedElementId.replace('todeleId', '')) - 1;
        if (imageNumber >= 0 && imageNumber) {
            imas.splice(imageNumber, 1);


            // Clear the image previews
            const imagePreviews = document.querySelectorAll('[id^="imagePreview"]');
            imagePreviews.forEach((preview) => {
                preview.innerHTML = '';
            });

            // Update the remaining image previews
            imas.forEach((ed, index) => {
                const imagePreview = document.getElementById(`imagePreview${index + 1}`);
                const img = document.createElement('img');
                img.src = ed.ima;
                img.style.height = '300px';
                img.style.width = '200px';
                img.setAttribute('onclick', 'removeImageCreate(event)');
                img.setAttribute('id', `todeleId${index + 1}`);
                imagePreview.appendChild(img);
            });
        }
    }
}

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

    const response = await fetch(apiUrlfine + endpoint, options);
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

    const response = await fetch(apiUrlfine + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

function ClearImage() {
    imas.forEach((ef, da) => {
        const imagePreview = document.getElementById(`imagePreview${da + 1}`);
        imagePreview.innerHTML = '';
    });
    imas.length = 0;
}

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
        const addquant = document.getElementById('addquant').value;
        const addexpe = document.getElementById('addexpe').value;
        const notes = document.getElementById('notes').value;

        if (addarticle && addprixpro && addprix && addfour && adddispo && addcoul && addtail && addmateri && addtype && addphone && addexpe && notes && imas.length > 4) {
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
                who: who,
                notes: notes,
                image: imas
            };
            const createItem = async () => {
                try {
                    const response = await sendRequestnoto('POST', 'boutique', product);

                    console.log('product created:', response);
                } catch (error) {
                    console.error('Error creating product:', error.message);
                }
            };

            createItem();
        }
    } catch (error) {
        console.log(error)
    }
}


//addtoPanier
function addtoPanier(data) {
    alert("data");
    const transaction = panierdb.transaction(["PannierContent"], "readwrite");
    const objectStore = transaction.objectStore("PannierContent");

    const addRequest = objectStore.add(data);

    addRequest.onsuccess = () => {
        alert("added successfully");
        getallDataa();
    };

    addRequest.onerror = () => {
        alert("not panier added");
        console.log("not panier added");
    };

    transaction.onerror = (event) => {
        setTimeout(() => alert("Exist déjà dans le panier!"), 10);
    };

}


function getPanierSend(tocompl) {
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    objectStore.openCursor().onsuccess = async (event) => {
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

            const sendReque = async (method, endpoint, data = null) => {
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
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message || 'Request failed!');
                }

                return responseData;
            };


            try {
                const response = await sendReque('POST', 'orders', tocompl);
                if (response.done == "done") {
                    TotalAll("clear", "");
                    pannierCotent.length = 0;
                    window.location.href = "./track-order.html"
                };

            } catch (error) {
                console.error('Error creating item:', error.message);
                throw error; // Re-throw the error to handle it in the calling function if needed
            }

        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return done
};

function getallCheckou() {
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
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
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
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


function TotalAll(who, data) {
    alert("TotalAll");

    return new Promise((resolve, reject) => {
        openDatabase()
            .then(() => {
                if (who === "post") {
                    alert("TotalAllin");
                    addtoPanier(data);
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
};

function navigateAdminCLient() {
    const token = sessionStorage.getItem('tibule');
    if (token) {
        const splo = token.split("°");
        const admin = splo[5];
        window.location.href = admin == "GIFV" ? "./admin/admindasdboard.html" : "./track-order.html"
    } else {
        window.location.href = "login.html"
    }

}
