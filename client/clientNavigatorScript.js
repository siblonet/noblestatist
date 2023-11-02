const articlesData = [];
const ClientData = [];
const AdminData = [];
const Orderdata = [];



function chatConver() {
    const livecha = document.getElementById('live-chat');
    livecha.classList.add('active');
}


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




const NafigatioTo = async (where) => {
    const ActiveDas = document.getElementById('ActiveDas');
    const ActiveCo = document.getElementById('ActiveCo');
    const ActiveCl = document.getElementById('ActiveCl');



    const adminiSpace = document.getElementById('main-content');
    adminiSpace.innerHTML = '';

    if (where === "dasboard") {
        ActiveDas.classList.add('active');
        ActiveCo.classList.remove('active');
        ActiveCl.classList.remove('active');

        const dasboardHTML = `
        
            <div class="container-fluid content-top-gap">

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb my-breadcrumb">
                        <li class="breadcrumb-item" aria-current="page">
                            <a href="">
                                <i class="fa fa-angle-double-left"></i>
                                    Aller à la boutique
                            </a>
                        </li>
                    </ol>
                </nav>
                <div class="welcome-msg pt-3 pb-4">
                    <h1>Bonjour <span class="text-primary">${username}</span></h1>
                    <p>Vous étes dans votre espace Client.</p>
                </div>

                <div class="statistics">
                    <div class="row">
                        <div class="col-xl-6 pr-xl-2">
                            <div class="row">
                                <div class="col-sm-6 pr-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topa p-4" style="cursor: pointer;" onclick="NafigatioTo('commandes')">
                                        <i class="lnr lnr-cart"> </i>
                                        <h3 class="text-primary number" id="oderLivre">0</h3>
                                        <p class="stat-text">Commandes Livré</p>
                                    </div>
                                </div>
                                <div class="col-sm-6 pl-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topc p-4" style="cursor: pointer" onclick="NafigatioTo('commandes')">
                                        <i class="lnr lnr-cart"> </i>
                                        <h3 class="text-success number" id="oderCours">0</h3>
                                        <p class="stat-text">Commandes en cours</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 pl-xl-2">
                            <div class="row">
                                <div class="col-sm-6 pr-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topb p-4" style="cursor: pointer;" onclick="NafigatioTo('commandes')">
                                        <i class="lnr lnr-cart"> </i>
                                        <h3 class="text-secondary number" id="oderAttent">0</h3>
                                        <p class="stat-text">Commandes en attente</p>
                                    </div>
                                </div>
                                <div class="col-sm-6 pl-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topd p-4" style="cursor: pointer;" onclick="NafigatioTo('commandes')">
                                    <i class="lnr lnr-cart"> </i>
                                    <h3 class="text-red number"  id="oderEchoue">0</h3>
                                        <p class="stat-text">Commandes échoué</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        `;


        adminiSpace.innerHTML = dasboardHTML;


        NavBaractivity();
    } else if (where === "commandes") {
        ActiveDas.classList.remove('active');
        ActiveCo.classList.add('active');
        ActiveCl.classList.remove('active');
        await openOrdersDatabase();
        const transaction = orderdb.transaction(["OrderdStore"], "readonly");

        function isMobileDevice() {
            const userAgent = navigator.userAgent.toLowerCase();
            return userAgent.includes('mobile');
        }
        if (isMobileDevice()) {

            const objectStore = transaction.objectStore("OrderdStore");
            Orderdata.length = 0

            objectStore.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    Orderdata.push(cursor.value);
                    cursor.continue();
                } else {

                    const articlesHTML = `
                    <br>
                    <br>
                    <br>
                    <div class="articlerow">
                      ${Orderdata.flatMap((pan) =>
                        pan.articles.map((pani) => {
                            const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut === "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";

                            const colorHTML = pani.color.split(',').map((e) => {
                                return `
                              <p style="background-color: ${e}; height: 20px; width: 20px; border-radius: 3px"></p>
                            `;

                            }).join('');

                            const imageHTML = pani.image.split(',').map((e) => {
                                return `
                                 <img class="imago" src="${pani.arti_id ? pani.arti_id.image[parseInt(e)].ima : 'eee'}" alt="image">
                            `;
                            }).join('');

                            return `
                            <div class="articlerowsub">
                              <div class="title">
                                <div class="leftone">
                                  <p style="max-height: 50px; overflow: hidden;">${pani.arti_id ? pani.arti_id.addarticle : 'Article Supprimé'}</p>
                                  <p>Ville: ${pan.ville}</p>
                                  <p style="max-height: 50px; overflow: hidden;">Lieu: ${pan.lieu}</p>
                                  <p>Tél: ${pan.phone}</p>
                                  <p>Prix: ${pani.prix} F</p>
                                  <p>Quantité: ${pani.quantcho}</p>
                                  <p>Total: ${pani.prix * pani.quantcho} F</p>
                                  <p>Total: ${pani.size}</p>

                                  <div class="clolo">
                                    <p>Couleur: </p>${colorHTML}
                                  </div>
                                  <div class="clola">
                                    ${imageHTML}
                                  </div>
                                </div>

                                <div class="rightone">
                                    <p class="sta shipp" style="cursor: pointer" data-toggle="modal" data-target="#optionCancile" onclick="optionCancileView('${pan._id}', '${pani._id}', '${pani.arti_id._id}')">Ouvrir</p>
                                    <div style="height: 5px">
                                    </div>
                                    <p style="cursor: pointer" class="status ${deliveryStatus === 'livré' ? 'delivered' : deliveryStatus === 'en attente' ? 'pending' : deliveryStatus === 'en cours' ? 'shipped' : 'cancelled'}">
                                        ${deliveryStatus}
                                    </p>
                                    <p class="sta" style="color: #C3C3C3">Fournisseur: ${pani.arti_id ? pani.arti_id.addphone : 'Article Supprimé'}</p>
                                </div>
                              </div>
                            </div>
                          `;
                        })
                    ).join('')}
                    </div>
                  `;

                    adminiSpace.innerHTML = articlesHTML;


                    adminiSpace.innerHTML = articlesHTML;
                }

            }
        } else {

            {/*
            
            
            <div class="rightone">
                                                            <p class="status">${pani.prix} F</p>
                                                            <p class="status">${pani.quantcho}</p>
                                                            <p class="status">Total: ${pani.prix * pani.quantcho} F</p>
                                                            <p class="sta shipp" style="cursor: pointer" data-toggle="modal" data-target="#optionCancile" onclick="optionCancileView('${pan._id}', '${pani._id}', '${pani.arti_id._id}')">Ouvrir</p>
                                                            <div style="height: 5px"></div>
                                                            <p style="cursor: pointer" class="status ${deliveryStatus === 'livré' ? 'delivered' : deliveryStatus === 'en attente' ? 'pending' : deliveryStatus === 'en cours' ? 'shipped' : 'cancelled'}">
                                                                ${deliveryStatus}
                                                            </p>
                                                        </div>


            
            <!--<div class="imaros">
            <div style="background-color: ${pani.addcoul.substring(0, 7)};">
                <img src="${pani.image[0].ima}" alt="image1">
            </div>
            <span style="width: 10px;"></span>
            <div style="background-color: ${pani.addcoul.substring(8, 15)};">
                <img src="${pani.image[1].ima}" alt="image2">
            </div>
            <span style="width: 10px;"></span>
            <div style="background-color: ${pani.addcoul.substring(16, 23)};">
                <img src="${pani.image[2].ima}" alt="image3">
            </div>
            <span style="width: 10px;"></span>
            <div style="background-color: ${pani.addcoul.substring(24, 31)};">
                <img src="${pani.image[3].ima}" alt="image4">
            </div>
            <span style="width: 10px;"></span>
            <div style="background-color: ${pani.addcoul.substring(32, 39)};">
                <img src="${pani.image[4].ima}" alt="image5">
            </div>
        </div>-->*/}
            const commandesHTML = `
                            <main class="main">
                            <br>
                            <br>
                            <br>
                            <section class="main__section">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Adress <span class="icon-arrow">&UpArrow;</span></th>
                                            <th>Article <span class="icon-arrow">&UpArrow;</span></th>
                                            <th style="text-align: center !important;">Prix Unité <span class="icon-arrow">&UpArrow;</span></th>
                                            <th style="text-align: center !important;">Quantité <span class="icon-arrow">&UpArrow;</span></th>
                                            <th style="text-align: center !important;">Total <span class="icon-arrow">&UpArrow;</span></th>
                                            <th style="text-align: center !important;"> Statut <span class="icon-arrow">&UpArrow;</span></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody-data">
                                    
                                        

                                    </tbody>
                                </table>
                            </section>
                        </main>
                    `;
            adminiSpace.innerHTML = commandesHTML;

            const transaction = orderdb.transaction(["OrderdStore"], "readonly");
            const objectStore = transaction.objectStore("OrderdStore");
            const tbodyId = document.getElementById('tbody-data');
            tbodyId.innerHTML = '';
            Orderdata.length = 0

            objectStore.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    Orderdata.push(cursor.value);
                    cursor.continue();
                } else {

                    Orderdata.forEach((pan) => {
                        pan.articles.forEach((pani) => {
                            const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";
                            const panierTBODY = `
                                    <tr  style="cursor: pointer" data-toggle="modal" data-target="#optionCancile" onclick="optionCancileView('${pan._id}', '${pani._id}', '${pani.arti_id._id}')">

                                        <td style="color: #ffffff !important">
                                            <a>${pan.lieu}</a>
                                            <ul>
                                                <li>
                                                    <span>${pan.phone}</span>
                                                </li>
                                                <li>
                                                    <span>${pan.ville}</span>
                                                </li>
                                            </ul>

                                        </td>
                                        
                                        <td style="color: #ffffff !important">
                                            <a>${pani.arti_id ? pani.arti_id.addarticle : 'Article Supprimé'}</a>
                                            <ul>
                                                <li>Color: <span style="background-color: ${pani.color.substring(0, 7)}; color: ${pani.color.substring(0, 7)}">${pani.color.substring(0, 7)}</span></li>
                                                <li>Size: <span>${pani.size}</span></li>
                                                <li>Material: <span>${pani.arti_id ? pani.arti_id.addmateri : 'Article Supprimé'}</span></li>
                                            </ul>
                                        </td>
                                        
                                        <td style="color: #ffffff !important; text-align: center !important;"> 
                                            <strong> ${pani.prix} F </strong>
                                        </td>
                                
                                        <td style="color: #ffffff !important; text-align: center !important;">
                                            ${pani.quantcho}
                                        </td>

                                        <td style="color: #ffffff !important; text-align: center !important;">
                                            ${pani.prix * pani.quantcho} F
                                        </td>
                                    
                                        <td style="color: #ffffff !important; text-align: center !important;">
                                            <p style="cursor: pointer" class="status ${deliveryStatus === 'livré' ? 'delivered' : deliveryStatus === 'en attente' ? 'pending' : deliveryStatus === 'en cours' ? 'shipped' : 'cancelled'}">
                                                ${deliveryStatus}
                                            </p>
                                        
                                        </td>
                                    </tr>
                                `;

                            tbodyId.innerHTML += panierTBODY;
                        });
                    });

                }
            };
        }
        transaction.onerror = (event) => {
            console.error("Transaction error:", event.target.error);
        };

    } else if (where === "clients") {
        ActiveDas.classList.remove('active');
        ActiveCo.classList.remove('active');
        ActiveCl.classList.add('active');

        const token = sessionStorage.getItem('tibule');
        const splo = token.split("°");
        const userid = splo[0];
        const name = splo[1];
        const lastname = splo[2];
        const phone = splo[3];
        const mail = splo[4];
        const admin = splo[5];
        const myinfos = thisiswhat(`${userid}â${name}â${lastname}â${phone}â${mail}â${admin}`)
        const myinfo = myinfos.split(" ");

        const clientsHTML = `
        
        <main class="table">
            <br>
            <br>
            <br>
            <section class="table__body">
            <table>
                <thead>
                <tr>
                    <th>Nom et Prénom<span class="icon-arrow">&UpArrow;</span></th>
                    <th style="text-align: center !important;">eMail<span class="icon-arrow">&UpArrow;</span></th>
                    <th style="text-align: center !important;">Contacts<span class="icon-arrow">&phone;</span></th>
                    <th style="text-align: center !important;">Statut<span class="icon-arrow">&UpArrow;</span></th>
                </tr>
                </thead>
                <tbody>
                    <tr  style="cursor: pointer" data-toggle="modal" data-target="#optionClient" onclick="optionClientView('${myinfo[0]}', '${myinfo[1]}', '${myinfo[2]}', '${myinfo[3]}', '${myinfo[4]}', '${myinfo[5]}')" >
                        <td class="" style="color: #ffffff !important;"> 
                        ${myinfo[2]} ${myinfo[1]}
                        </td>
                        <td class="" style="color: #ffffff !important; text-align: center !important">
                        ${myinfo[4]}
                        </td>
                        <td class="" style="color: #ffffff !important; text-align: center !important;">
                            <strong>${myinfo[3]}</strong>
                        </td>
                        <td class="" style="text-align: center !important;">
                            <p class="status ${myinfo[5] === 'false' ? 'shipped' : 'cancelled'}">${myinfo[5] === 'false' ? 'Actif' : 'Bloqué'}</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            </section>
        </main>
        `;

        adminiSpace.innerHTML = clientsHTML
    }
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

const NavBaractivity = async () => {
    const token = sessionStorage.getItem('tibule');
    const splo = token.split("°");
    const userid = thisiswhat(`${splo[0]}`);
    const items = await sendRequestforOrderget('GET', `orders/myorder/${userid}`);

    await openOrdersDatabase();
    await clearOrder();
    await addOrders(items);

    let oderAttent = 0;
    let oderCours = 0;
    let oderLivre = 0;
    let oderEchoue = 0;
    if (items.length > 0) {
        items.forEach((pan) => {
            pan.articles.forEach((pani) => {
                if (pani.statut == "review") {
                    oderAttent += 1;

                } else if (pani.statut == "onway") {
                    oderCours += 1;

                } else if (pani.statut == "done") {
                    oderLivre += 1;

                } else if (pani.statut == "fail") {
                    oderEchoue += 1;

                }
            });
        });

        document.getElementById('oderAttent').innerText = oderAttent;
        document.getElementById('oderCours').innerText = oderCours;
        document.getElementById('oderLivre').innerText = oderLivre;
        document.getElementById('oderEchoue').innerText = oderEchoue;
    }

}


async function Disconexion() {
    await openOrdersDatabase();
    await clearOrder();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "login"
};


async function updateUser() {
    const nom = document.getElementById('clientNom').value;
    const prenom = document.getElementById('clientPrenom').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const toUpda = {
        prenom: nom,
        nom: prenom,
        phone: phone,
        email: email,
    }
    const clid = document.getElementById('clientid').value;
    await sendRequestforOrder('PUT', `people/personupdate/${clid}`, toUpda);
    await openOrdersDatabase();
    await clearOrder();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "login"
};

async function deleteUser() {
    const clid = document.getElementById('clientid').value;

    const myode = await sendRequestforOrderget('GET', `orders/myorder/${clid}`);

    if (myode.length < 1) {
        await sendRequestforOrder('DELETE', `people/${clid}`);
        window.location.reload()
    } else {
        alert("Supprimez dabord vos commandes")
    }

};

function optionClientView(userid, nam, lastnam, phone, mail, admin) {
    document.getElementById('clientid').value = userid;
    document.getElementById('clientNom').value = nam;
    document.getElementById('clientPrenom').value = lastnam;
    document.getElementById('clientEmail').value = mail;
    document.getElementById('clientPhone').value = phone;
    document.getElementById('userStatus').classList.add(`${admin === 'false' ? 'btn-info' : admin === 'vendeur' ? 'btn-success' : 'btn-dangera'}`);
    document.getElementById('userStatus').innerText = `${admin === 'false' ? 'Client' : admin === 'vendeur' ? 'Vendeur' : 'Bloqué'}`;
};