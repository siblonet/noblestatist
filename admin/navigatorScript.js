const articlesData = [];
let ClientData = [];
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
    const addAticlebtn = document.getElementById('addAticlebtn');
    const adminiSpace = document.getElementById('main-content');
    adminiSpace.innerHTML = '';

    if (where === "dasboard") {
        addAticlebtn.innerHTML = "";
        const dasboardHTML = `
        
            <div class="container-fluid content-top-gap">

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb my-breadcrumb">
                        <li class="breadcrumb-item active" aria-current="page">Tableau de bord</li>
                    </ol>
                </nav>
                <div class="welcome-msg pt-3 pb-4">
                    <h1>Bonjour <span class="text-primary">${username}</span>, Bienvenue</h1>
                    <p>Vous étes dans votre espace administratif.</p>
                </div>


                <div class="statistics">
                    <div class="row">
                        <div class="col-xl-6 pr-xl-2">
                            <div class="row">
                                <div class="col-sm-6 pr-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topa p-4" style="cursor: pointer" onclick="NafigatioTo('articles')">
                                        <i class="lnr lnr-cloud-download"> </i>
                                        <h3 class="text-primary number" id="availableArticle">0</h3>
                                        <p class="stat-text">Article Disponible</p>
                                    </div>
                                </div>
                                <div class="col-sm-6 pl-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topb p-4" style="cursor: pointer" onclick="NafigatioTo('commandes')">
                                        <i class="lnr lnr-cart"> </i>
                                        <h3 class="text-secondary number" id="CommandesNum">0</h3>
                                        <p class="stat-text">Commandes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 pl-xl-2">
                            <div class="row">
                                <div class="col-sm-6 pr-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topc p-4" style="cursor: pointer" onclick="NafigatioTo('clients')">
                                        <i class="lnr lnr-users" style="color:#000000 !important;"> </i>
                                        <h3 class="text-success number"  style="color:#000000 !important;"id="ClientNum">0</h3>
                                        <p class="stat-text">Clients</p>
                                    </div>
                                </div>
                                <div class="col-sm-6 pl-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topd p-4">
                                        <i class="fa fa-money"> </i>
                                        <h3 class="text-red number"  id="recetteMoney">0 F.CFA</h3>
                                        <p class="stat-text">Recettes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="chart">
                    <div class="row">
                        <div class="col-lg-6 pr-lg-2 chart-grid">


                            <div class="col-lg-12 chart-grid mb-4">
                                <div class="card card_border p-4">
                                    <div class="card-header chart-grid__header pl-0 pt-0">
                                        Conversation
                                    </div>
                                    <div class="messaging">
                                        <div class="inbox_msg">
                                            <div class="inbox_people">
                                                <div class="headind_srch">
                                                    <div class="srch_bar">
                                                        <div class="stylish-input-group">
                                                            <input type="text" class="search-bar"
                                                                placeholder="Chercher une conversation">
                                                            <span class="input-group-addon">
                                                                <button type="button"> <i class="fa fa-search"
                                                                        aria-hidden="true"></i> </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="inbox_chat">
                                                    <div class="chat_list active_chat">
                                                        <div class="chat_people">

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="mesgs">
                                                <div class="msg_history">
                                                    <div class="incoming_msg">
                                                        
                                                    </div>
                                                    <div class="outgoing_msg">
                                                      
                                                    </div>
                                                   
                                                    <div class="incoming_msg">
                                                        
                                                    </div>
                                                </div>
                                                <div class="type_msg">
                                                    <div class="input_msg_write">
                                                        <input type="text" class="write_msg"
                                                            placeholder="Écrivez un message" />
                                                        <button class="msg_send_btn" type="button"><i
                                                                class="fa fa-paper-plane-o"
                                                                aria-hidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="col-lg-6 pl-lg-2 chart-grid">
                            <div class="card text-center card_border">
                                <div class="card-header chart-grid__header">
                                </div>
                                <div class="card-body">
                                    <div id="container">
                                        <canvas id="linechart"></canvas>
                                    </div>
                                </div>
                                <div class="card-footer text-muted chart-grid__footer">
                                    Mis à jour à l'instant
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
                labels: ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juillet'],
                datasets: [{
                    label: 'Activités',
                    backgroundColor: "#20c997",
                    borderColor: "#28a745",
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                }, {
                    label: 'Commandes',
                    fill: false,
                    backgroundColor: "#ffc107",
                    borderColor: "#fd7e14",
                    data: [10, 40, 20, 35, 25, 50, 10, 70],
                }]
            },
            options: {
                responsive: true,
                // title: {
                // 	display: true,
                // 	text: 'Chart.js Line Chart'
                // },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Mois'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        });
        NavBaractivity();
        getArticles();
    } else if (where === "commandes") {
        await openOrdersDatabase();

        addAticlebtn.innerHTML = "";
        const commandesHTML = `
                <main class="main">
                <br>
                <br>
                <br>
                <section class="main__section">
                    <table>
                        <thead>
                            <tr>
                                <th>Client <span class="icon-arrow">&UpArrow;</span></th>
                                <th>Article <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;">Prix Unité <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;">Quantité <span class="icon-arrow">&UpArrow;</span></th>
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
        const data = [];

        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                data.push(cursor.value);
                cursor.continue();
            } else {

                const tbodyId = document.getElementById('tbody-data');
                tbodyId.innerHTML = '';

                data.forEach((pan) => {
                    pan.articles.forEach((pani) => {
                        const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";
                        const panierTBODY = `
                        <tr  style="cursor: pointer" data-toggle="modal" data-target="#optionCancile" onclick="optionCancileView('${pan._id}', '${pani._id}', '${pani.arti_id._id}')">

                            <td style="color: #ffffff !important">
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
        addAticlebtn.innerHTML = "";
        const clientsHTML = ``;

        adminiSpace.innerHTML = clientsHTML
    } else if (where === "articles") {
        addAticlebtn.innerHTML = `
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addArticle">
                    Ajouter
                </button>
        
        `;

        const articlesHTML = `
                <main class="main">
                <br>
                <br>
                <br>
                <section class="main__section">
                    <table>
                        <thead>
                            <tr>
                                <th>Image <span class="icon-arrow">&UpArrow;</span></th>
                                <th>Détails <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;">Prix Unité <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;">Quantité <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;"> Action <span class="icon-arrow">&UpArrow;</span></th>
                            </tr>
                        </thead>
                        <tbody id="tbody-data">
                          
                            

                        </tbody>
                    </table>
                </section>
            </main>
        `;
        adminiSpace.innerHTML = articlesHTML

        {
            const tbodyId = document.getElementById('tbody-data');
            tbodyId.innerHTML = '';

            articlesData.forEach(pani => {
                const panierTBODY =
                    `
                    <tr  style="cursor: pointer" data-toggle="modal" data-target="#modArticle" onclick="optionEditeView('${pani._id}')" >
                        <td class=""> 
                            <img src="${pani.image[0].ima}" alt="">
                        </td>
                        <td class="" style="color: #ffffff !important">
                            <a style="color: #ffffff !important">${pani.addarticle}</a>
                            <ul>
                                <li>Color: <span style="background-color: ${pani.addcoul.substring(8, 15)} !important; color: #ffffff; padding-left: 5px; padding-right: 5px">${pani.addcoul.substring(8, 15)}</span></li>
                                <li>Size: <span>${pani.addtail}</span></li>
                                <li>Material: <span>${pani.addmateri}</span></li>
                                <li>Type de produit: <span>${pani.addtype}</span></li>
                            </ul>
                        </td>
                        <td style="color: #ffffff !important; text-align: center !important;"> 
                            <strong> ${pani.addprix} F </strong>
                        </td>
                
                        <td class="" style="color: #ffffff !important; text-align: center !important;">
                            ${pani.quantity}
                        </td>
                    
                        <td onclick="deleteArticleById('${pani._id}')" class="" style="cursor: pointer">
                            <p class="status cancelled">Supprimer</p>
                        </td>
                    </tr>
                    `;

                tbodyId.innerHTML += panierTBODY;

            });

        }


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
    const items = await sendRequestforOrderget('GET', 'orders');
    await openOrdersDatabase();
    await clearOrder();
    await addOrders(items);
    //const items = [{ articles: [{ statut: "review" }, { statut: "review" }, { statut: "review" }] }];
    const ordernotif = [];

    let odernotnu = 0;
    let totalSold = 0;
    if (items.length > 0) {
        items.forEach((pan) => {
            pan.articles.forEach((pani) => {
                totalSold += pani.statut == "done" ? pani.prix * pani.quantcho : 0;
                if (pani.statut == "review") {
                    odernotnu += 1;
                    if (ordernotif.length < 3) {
                        ordernotif.push(pan);
                    }
                }

            });
        });

        const odernotifi = document.getElementById('odernotifi');
        odernotifi.innerHTML = '';
        if (odernotnu > 0) {
            document.getElementById('CommandesNum').innerText = odernotnu;
            document.getElementById('recetteMoney').innerText = `${totalSold} F.CFA`;
            const odernotifiHTML = `
    
                    <i class="fa fa-bell-o"></i>
                    <span class="badge blue" style="background-color: rgb(255, 0, 98);">${odernotnu}</span>
    
                        `;
            odernotifi.innerHTML = odernotifiHTML;
            const notification_header = document.getElementById('notification_header');
            notification_header.innerHTML = `
            <li>
                <div class="notification_header">
                    <h3>Vous avez ${odernotnu > 1 ? `<i style='color: red'>${odernotnu}</i>` + " nouvelles commandes en attentes" : "<i style='color: red'>Une</i> nouvelle commande en attente"}</h3>
                </div>
            </li>

            <li>
                <a href="#" class="grid">
                    <div class="user_img"><img src="../assets/img/avatay.png" alt=""></div>
                    <div class="notification_desc">
                    <p>${ordernotif[0].client.nom + " " + ordernotif[0].client.prenom}</p>
                    <span>${ordernotif[0].articles[0].arti_id.addarticle} ${ordernotif[0].articles[0].prix * ordernotif[0].articles[0].quantcho} F</span>
                    </div>
                </a>
            </li>
            ${ordernotif.length > 1 ?
                    `
               
            <li class="odd">
                <a href="#" class="grid">
                    <div class="user_img"><img src="../assets/img/avatay.png" alt=""></div>
                    <div class="notification_desc">
                    <p>${ordernotif[1].client.nom + " " + ordernotif[1].client.prenom}</p>
                    <span>${ordernotif[1].articles[0].arti_id.addarticle} ${ordernotif[1].articles[0].prix * ordernotif[1].articles[0].quantcho} F</span>
                    </div>
                </a>
            </li>
            `
                    :
                    ""
                }
            ${ordernotif.length > 2 ?
                    `
            <li>
                <a href="#" class="grid">
                    <div class="user_img"><img src="../assets/img/avatay.png" alt=""></div>
                    <div class="notification_desc">
                    <p>${ordernotif[2].client.nom + " " + ordernotif[2].client.prenom}</p>
                    <span>${ordernotif[2].articles[0].arti_id.addarticle} ${ordernotif[2].articles[0].prix * ordernotif[2].articles[0].quantcho} F</span>
                    </div>
                </a>
            </li>
            `
                    :
                    ""
                }
            <li>
            <div class="notification_bottom">
                <a style="cursor: pointer" onclick="NafigatioTo('commandes')" class="bg-primary">Traiter les commandes</a>
            </div>
            </li>
            `;

        } else {
            const odernotifiHTML = `
                    <i class="fa fa-bell-o"></i>
                `;
            odernotifi.innerHTML = odernotifiHTML;
        }
    } else {

        const odernotifi = document.getElementById('odernotifi');
        odernotifi.innerHTML = '';
        const odernotifiHTML = `
                    <i class="fa fa-bell-o"></i>
                `;
        odernotifi.innerHTML = odernotifiHTML;
    }


}


async function getArticles() {
    let available = 0;
    const ClientNum = await sendRequestforOrderget('GET', 'people/persons');
    document.getElementById('ClientNum').innerText = ClientNum.length;
    ClientData = ClientNum;

    await openArticleDatabase();
    const transaction = articldb.transaction(["ArticleStore"], "readonly");
    const objectStore = transaction.objectStore("ArticleStore");

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            articlesData.push(cursor.value);
            available += cursor.value.quantity > 0 ? 1 : 0;
            cursor.continue();
        } else {
            document.getElementById('availableArticle').innerText = available;

        };
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };
}


async function Disconexion() {
    await openOrdersDatabase();
    await clearOrder();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "../login.html"
}