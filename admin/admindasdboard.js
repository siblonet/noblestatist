async function selectStatus(sta) {
    const ido = document.getElementById('ido').value;
    const idar = document.getElementById('proid').value;

    await sendRequestforOrder('PUT', `orders/statoo/${ido}/${idar}`, { statut: sta });
    window.location.reload()
};

async function cancelItemById() {

    var result = window.confirm("Voulez vous vraiment annuller?");

    if (result) {

        const ido = document.getElementById('ido').value;
        const proid = document.getElementById('proid').value;
        const arti_id = document.getElementById('arti_id').value;
        const quan = document.getElementById('productQuantity').value;
        const vin_or = Orderdata.find(re => re._id === ido);
        if (vin_or.articles.length > 1) {
            await sendRequestforOrder('DELETE', `orders/oarderar/${ido}/${proid}/${arti_id}/${quan}`);
    
        } else {
            await sendRequestforOrder('DELETE', `orders/${ido}/${arti_id}/${quan}`);
    
        }
        window.location.reload()
    }

};

async function optionCancileView(_id, proid, arti_id) {
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

            /*
                   addarticle: addarticle,
                   addquant:,
                   addgenre
                   addtransage
                   addreduction: addreduction,
                   addprix: addprix,
                   addoccasion
                   addfour: addfour,
                   adddispo: adddispo,
                   addnouveaute
                   addcoul: addcoul,
                   addtail: addtail,
                   addmateri: addmateri,
                   addmarque
                   addtype: addtype,
                   addtypepro
                   addphone: addphone,
                   addexpe: addexpe,
                   who: '',
                   notes: notes,
                   image: imas
               */
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
            document.getElementById('arti_id').value = `${arti_id}`;

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
    const fileInput = document.getElementById('imageInputf');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            const base64Data = e.target.result.split(',')[1];
            const response = await fetch(apiUrlfine + "boutique/uploadImage", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ima: base64Data, nam: file.name }),
            });

            if (response.ok) {
                const url = await response.json();

                // Find the first element in imasEdi with ima set to "one"
                const firstOneIndex = imasEdi.findIndex(eo => eo.ima === "one");

                if (firstOneIndex !== -1) {
                    const id = imasEdi[firstOneIndex]._id;
                    imasEdi[firstOneIndex].ima = url.ima;

                    const imagePreview = document.getElementById(`Editeimage${firstOneIndex + 1}`);
                    imagePreview.innerHTML = '';

                    const img = document.createElement('img');
                    img.src = url.ima;
                    img.style.height = '300px';
                    img.style.width = '200px';
                    img.setAttribute('onclick', `removeImageEdite('${id}')`);
                    imagePreview.appendChild(img);
                } else {
                    alert("No placeholder image found in imasEdi.");
                }

                fileInput.value = '';
            } else {
                alert("Operation failed", response.statusText);
            }
        };

        reader.readAsDataURL(file);
    }
}


function removeImageEdite(id) {
    var result = window.confirm("Voulez vous vraiment le retirer?");

    if (result) {

        const removedImage = imasEdi.find((eo) => eo._id === id);
        if (removedImage) {
            removedImage.ima = "one";
        }
    
        imasEdi.forEach((ed, index) => {
            const imagePreview = document.getElementById(`Editeimage${index + 1}`);
            imagePreview.innerHTML = '';
            if (ed.ima !== "one") {
                const img = document.createElement('img');
                img.src = ed.ima;
                img.style.height = '300px';
                img.style.width = '200px';
                img.setAttribute('onclick', `removeImageEdite('${ed._id}')`);
                imagePreview.appendChild(img);
            }
        });
    }


}


async function EditeViewArticle() {
    const _id = document.getElementById('ediatiid').value;
    try {
        const addarticle = document.getElementById('Editearticle').value;
        const addquant = parseInt(document.getElementById('Editequant').value);
        const addgenre = document.getElementById('Editegenre').value;
        const addtransage = document.getElementById('Editetransage').value;
        const addprix = document.getElementById('Editeprix').value;
        const addreduction = document.getElementById('Editereduction').value;
        const addoccasion = document.getElementById('Editeoccasion').value;
        const addfour = document.getElementById('Editefour').value;
        const adddispo = document.getElementById('Editedispo').value;
        const addnouveaute = document.getElementById('Editenouveaute').value;
        const addcoul = document.getElementById('Editecoul').value;
        const addtail = document.getElementById('Editetail').value;
        const addmateri = document.getElementById('Editemateri').value;
        const addmarque = document.getElementById('Editemarque').value;
        const addtype = document.getElementById('Editetype').value;
        const addtypepro = document.getElementById('Editetypepro').value;
        const addphone = document.getElementById('Editephone').value;
        const addexpe = document.getElementById('Editeexpe').value;
        const notes = document.getElementById('Editenotes').value;


        if (addarticle && addgenre && addtransage && addprix && addfour && adddispo && addcoul && addtail && addmateri && addmarque && addtype && addtypepro && addphone && addexpe && notes) {
            const product = {
                addarticle: addarticle,
                quantity: parseInt(addquant),
                addgenre: addgenre,
                addtransage: addtransage,
                addprix: parseInt(addprix),
                addreduction: parseInt(addreduction),
                addoccasion: addoccasion,
                addfour: addfour,
                adddispo: adddispo,
                addnouveaute: addnouveaute,
                addcoul: addcoul,
                addtail: addtail,
                addmateri: addmateri,
                addmarque: addmarque,
                addtype: addtype,
                addtypepro: addtypepro,
                addphone: addphone,
                addexpe: addexpe,
                notes: notes,
                image: imasEdi

            };
            const createItem = async () => {
                try {
                    await sendRequestforOrder('PUT', `boutique/${_id}`, product);
                    FetchArticle('PUT', _id, product);

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
        document.getElementById('Editegenre').value = product.addgenre;
        document.getElementById('Editetransage').value = product.addtransage;
        document.getElementById('Editereduction').value = product.addreduction;
        document.getElementById('Editeprix').value = product.addprix;
        document.getElementById('Editeoccasion').value = product.addoccasion;
        document.getElementById('Editefour').value = product.addfour;
        document.getElementById('Editedispo').value = product.adddispo;
        document.getElementById('Editenouveaute').value = product.addnouveaute;
        document.getElementById('Editecoul').value = product.addcoul;
        document.getElementById('Editetail').value = product.addtail;
        document.getElementById('Editemateri').value = product.addmateri;
        document.getElementById('Editemarque').value = product.addmarque;
        document.getElementById('Editetype').value = product.addtype;
        document.getElementById('Editetypepro').value = product.addtypepro;
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
            img.setAttribute('onclick', `removeImageEdite('${ed._id}')`);
            imagePreview.appendChild(img);
        });


    });
};

async function deleteArticleById() {
    var result = window.confirm("Voulez vous vraiment supprimer?");

    if (result) {

        const _ide = document.getElementById("ediatiid").value;
        await sendRequestforOrder('DELETE', `boutique/${_ide}`);
        FetchArticle('DEL', _ide, 'DEL');
    }

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
