const articlesData = [];
const ClientData = [];
const AdminData = [];
const Orderdata = [];

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
                            <a href="../index.html">
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


                <div class="chart">
                    <div class="row">
                        <div class="col-lg-6 pl-lg-2 chart-grid">
                            <div class="card text-center card_border">
                                <div class="card-body">
                                    <div id="container">
                                        <canvas id="linechart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 pr-lg-2 chart-grid">
                            <div class="card text-center card_border">
                                <div class="card-body">
                                <!-- bar chart -->
                                <div id="container">
                                    <canvas id="barchart"></canvas>
                                </div>
                                <!-- //bar chart -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        `;


        adminiSpace.innerHTML = dasboardHTML;
        new Chart(document.getElementById("linechart"), {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mars', 'Avl', 'Mai', 'Juin', 'Juillet'],
                datasets: [{
                    label: 'Activité',
                    backgroundColor: window.chartColors.navy,
                    borderColor: window.chartColors.navy,
                    data: [30, 10, 70, 15, 60, 20, 70, 80],
                    fill: false,
                }, {
                    label: 'Visite',
                    fill: false,
                    backgroundColor: window.chartColors.purple,
                    borderColor: window.chartColors.purple,
                    data: [10, 40, 20, 35, 25, 50, 10, 70],
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Activité'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            }
        });

        new Chart(document.getElementById("barchart"), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mars', 'Avl', 'Mai', 'Juin', 'Juillet'],
                datasets: [{
                    data: [10, 20, 30, 40, 50, 60, 70, 80],
                    label: 'Achats',
                    backgroundColor: "#4755AB",
                    borderWidth: 1,
                }, {
                    data: [30, 10, 70, 15, 30, 20, 70, 80],
                    label: 'Commandes',
                    backgroundColor: "#E7EDF6",
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Achats'
                },
                legend: {
                    position: 'top',
                },
            }
        });

        NavBaractivity();
    } else if (where === "commandes") {
        ActiveDas.classList.remove('active');
        ActiveCo.classList.add('active');
        ActiveCl.classList.remove('active');
        await openOrdersDatabase();

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
    window.location.href = "../login.html"
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
    window.location.href = "../login.html"
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
    document.getElementById('userStatus').innerText = `${admin === 'false' ? 'Client' :  admin === 'vendeur' ? 'Vendeur' : 'Bloqué'}`;
};