let selct = [];
let selctSize = [];

function getUsenam() {
    const tokens = sessionStorage.getItem('tibule');
    if (tokens && tokens.split("°")) {
        const sploz = tokens.split("°");
        const name = sploz[1];
        const lastname = sploz[2];
        const admin = sploz[5];
        const mynam = thisiswhat(`${name}â${lastname}`)
        const usernam = document.getElementById('usernam');
        const usernama = document.getElementById('usernama');
        usernam.innerHTML = '';
        admin == "GIFV" ? true : false;
        usernama.innerHTML = `
        <a><i class="bx bx-log-in"></i>Se Deconecter</a>
        `;
        usernama.onclick = navigateAdminCLient;
        usernama.style.cursor = "pointer"



        if (admin == "GIFV") {
            const usernamBody =
                `
            <a href="admin/admindasdboard.html"><i class="bx bxs-user"></i> ${mynam}</a>

            `;

            usernam.innerHTML += usernamBody;
        } else {

            const usernamBody =
                `
            <a href="track-order.html"><i class="bx bxs-user"></i> ${mynam}</a>

            `;

            usernam.innerHTML += usernamBody;
        }

    }
};

getUsenam();



async function navigateAdminCLient() {
    await openOrdersDatabase();
    await clearOrder();
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
    getUsenam();
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

async function productStypes1(viewid) {
    if (viewid) {
        await openArticleDatabase()
        const transactiona = articldb.transaction(["ArticleStore"], "readonly");
        const objectStorea = transactiona.objectStore("ArticleStore");
        const getRequesta = objectStorea.get(viewid);
        getRequesta.onsuccess = (event) => {
            const prod = event.target.result;
            document.getElementById('artiname').innerText = prod.addarticle;
            document.getElementById('artiname').style.color = prod.addcoul.substring(0, 7);
            document.getElementById('description').innerText = prod.notes;
            document.getElementById('addexpe').innerText = prod.addexpe
            document.getElementById('addexpea').innerText = prod.addexpe
            document.getElementById('artinamea').innerText = prod.addarticle;
            document.getElementById('artinamea').style.color = prod.addcoul.substring(0, 7);
            document.getElementById('rating').innerText = `4.9 avis`;

            const modalImage1 = document.getElementById('ima1');
            const modalImage2 = document.getElementById('ima2');
            const modalImage3 = document.getElementById('ima3');
            const modalImage4 = document.getElementById('ima4');
            const modalImage5 = document.getElementById('ima5');
            modalImage1.src = prod.image[0].ima;
            modalImage1.style.backgroundColor = prod.addcoul.substring(0, 7);
            modalImage2.src = prod.image[1].ima;
            modalImage2.style.backgroundColor = prod.addcoul.substring(8, 15);
            modalImage3.src = prod.image[2].ima;
            modalImage3.style.backgroundColor = prod.addcoul.substring(16, 23);
            modalImage4.src = prod.image[3].ima;
            modalImage4.style.backgroundColor = prod.addcoul.substring(24, 31);
            modalImage5.src = prod.image[4].ima;
            modalImage5.style.backgroundColor = prod.addcoul.substring(32, 39);

            const modalImagea = document.getElementById('imaa');
            const modalImageb = document.getElementById('imab');
            const modalImagec = document.getElementById('imac');
            const modalImaged = document.getElementById('imad');
            const modalImagee = document.getElementById('imae');
            modalImagea.src = prod.image[0].ima;
            modalImageb.src = prod.image[1].ima;
            modalImagec.src = prod.image[2].ima;
            modalImaged.src = prod.image[3].ima;
            modalImagee.src = prod.image[4].ima;
            modalImagea.style.backgroundColor = prod.addcoul.substring(0, 7);
            modalImageb.style.backgroundColor = prod.addcoul.substring(8, 15);
            modalImagec.style.backgroundColor = prod.addcoul.substring(16, 23);
            modalImaged.style.backgroundColor = prod.addcoul.substring(24, 31);
            modalImagee.style.backgroundColor = prod.addcoul.substring(32, 39);

            const productInfo = document.getElementById('product-info');
            productInfo.innerHTML = '';
            const productInfoHTML = `
                                    <li><span>Fournisseur:</span> <a href="#">${prod.addfour}</a></li>
                                    <li><span>Disponibilité:</span> <a href="#">${prod.adddispo}</a></li>
                                    <li><span>Type de produit:</span> <a href="#">${prod.addtype}</a></li>
                                    `;
            productInfo.innerHTML += productInfoHTML;



            const splo = prod.addcoul.split(",") ? prod.addcoul.split(",") : "#eeeeee";
            const colora = splo[0] == "null" ? "#eeeeee" : splo[0];
            const colorb = splo[1] == "null" ? "#eeeeee" : splo[1];
            const colorc = splo[2] == "null" ? "#eeeeee" : splo[2];
            const colord = splo[3] == "null" ? "#eeeeee" : splo[3];
            const colore = splo[4] == "null" ? "#eeeeee" : splo[4];

            const sploa = prod.addtail.split(",") ? prod.addtail.split(",") : "-";
            const qsizea = sploa[0] == "null" ? "-" : sploa[0];
            const qsizeb = sploa[1] == "null" ? "-" : sploa[1];
            const qsizec = sploa[2] == "null" ? "-" : sploa[2];
            const qsized = sploa[3] == "null" ? "-" : sploa[3];
            const qsizee = sploa[4] == "null" ? "-" : sploa[4];
            document.getElementById('coloholder').innerText = prod.addcoul;
            document.getElementById('achetematn').style.backgroundColor = colora;
            document.getElementById('achetematn').style.borderColor = colora;

            if (prod.addreduction > prod.addprix) {
                document.getElementById('quickViewOldPrice').innerText = `${prod.addreduction} F.CFA`;
            }

            document.getElementById('quickViewNewPrice').innerText = `${prod.addprix} F.CFA`;
            document.getElementById('quickViewNewPrice').style.color = colora;

            const quickCouleuHtml = document.getElementById('quickCouleu');
            const quickTailHtml = document.getElementById('quickTail');
            quickCouleuHtml.innerHTML = '';
            quickTailHtml.innerHTML = '';

            const quickColoHTML = `
                            <li><a onclick="quiColorfun('0', '${colora}', '${prod.image[0].ima}')" style="cursor: pointer !important; background-color: ${colora} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('1', '${colorb}', '${prod.image[1].ima}')" style="cursor: pointer !important; background-color: ${colorb} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('2', '${colorc}', '${prod.image[2].ima}')" style="cursor: pointer !important; background-color: ${colorc} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('3', '${colord}', '${prod.image[3].ima}')" style="cursor: pointer !important; background-color: ${colord} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('4', '${colore}', '${prod.image[4].ima}')" style="cursor: pointer !important; background-color: ${colore} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            `
            quickCouleuHtml.innerHTML = quickColoHTML;

            const quickSizeHTML = `
                            <li><a id="quisizelia" onclick="quiSizefun('a', '${qsizea}')" style="cursor: pointer !important; border-color: ${colora}; color: ${colora}">${qsizea}</a></li>
                            <li><a id="quisizelib" onclick="quiSizefun('b', '${qsizeb}')" style="cursor: pointer !important;">${qsizeb}</a></li>
                            <li><a id="quisizelic" onclick="quiSizefun('c', '${qsizec}')" style="cursor: pointer !important;">${qsizec}</a></li>
                            <li><a id="quisizelid" onclick="quiSizefun('d', '${qsized}')" style="cursor: pointer !important;">${qsized}</a></li>
                            <li><a id="quisizelie" onclick="quiSizefun('e', '${qsizee}')" style="cursor: pointer !important;">${qsizee}</a></li>
                            `
            quickTailHtml.innerHTML = quickSizeHTML;
        };


        getRequesta.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
        };

    }
};


function quiSizefun(id, siz) {
    const colo = document.getElementById("coloholder").innerText;

    if (selct.length == 0 && `quisizeli${id}` !== "quisizelia") {
        const onea = document.getElementById("quisizelia");
        const one = document.getElementById(`quisizeli${id}`);
        onea.style.color = "#858585";
        onea.style.borderColor = "#eeeeee";
        switch (id) {
            case "a":
                one.style.color = colo.substring(0, 7);
                one.style.borderColor = colo.substring(0, 7);
                break;
            case "b":
                one.style.color = colo.substring(8, 15);
                one.style.borderColor = colo.substring(8, 15);
                break;

            case "c":
                one.style.color = colo.substring(16, 23);
                one.style.borderColor = colo.substring(16, 23);
                break;

            case "d":
                one.style.color = colo.substring(24, 31);
                one.style.borderColor = colo.substring(24, 31);
                break;

            case "e":
                one.style.color = colo.substring(32, 39);
                one.style.borderColor = colo.substring(32, 39);
                break;

            default:
                break;
        }
        selct.push({ id: `quisizeli${id}`, size: siz });
    } else {
        let prodque = document.getElementById('productQuantity').value;
        if (parseInt(prodque) + 1 > selct.length + 1) {
            const one = document.getElementById(`quisizeli${id}`);
            switch (id) {
                case "a":
                    one.style.color = colo.substring(0, 7);
                    one.style.borderColor = colo.substring(0, 7);
                    break;
                case "b":
                    one.style.color = colo.substring(8, 15);
                    one.style.borderColor = colo.substring(8, 15);
                    break;

                case "c":
                    one.style.color = colo.substring(16, 23);
                    one.style.borderColor = colo.substring(16, 23);
                    break;

                case "d":
                    one.style.color = colo.substring(24, 31);
                    one.style.borderColor = colo.substring(24, 31);
                    break;

                case "e":
                    one.style.color = colo.substring(32, 39);
                    one.style.borderColor = colo.substring(32, 39);
                    break;

                default:
                    break;
            }

            selct.push({ id: `quisizeli${id}`, size: siz });
        } else {
            selct.forEach(ee => {
                const one = document.getElementById(`${ee.id}`);
                one.style.color = "#858585";
                one.style.borderColor = "#eeeeee";
            });
            selct = [];
            const one = document.getElementById(`quisizeli${id}`);
            switch (id) {
                case "a":
                    one.style.color = colo.substring(0, 7);
                    one.style.borderColor = colo.substring(0, 7);
                    break;
                case "b":
                    one.style.color = colo.substring(8, 15);
                    one.style.borderColor = colo.substring(8, 15);
                    break;

                case "c":
                    one.style.color = colo.substring(16, 23);
                    one.style.borderColor = colo.substring(16, 23);
                    break;

                case "d":
                    one.style.color = colo.substring(24, 31);
                    one.style.borderColor = colo.substring(24, 31);
                    break;

                case "e":
                    one.style.color = colo.substring(32, 39);
                    one.style.borderColor = colo.substring(32, 39);
                    break;

                default:
                    break;
            }
            selct.push({ id: `quisizeli${id}`, size: siz });
        };
    }

};


function quiColorfun(impo, id, im) {
    let proquant = document.getElementById('productQuantity').value;
    document.getElementById('quickColTitle').innerText = "Couleur Choisi:";

    const quickTailHtml = document.getElementById('quickColose');
    quickTailHtml.innerHTML = '';

    if (selctSize.length == 0 && parseInt(proquant) == 1) {
        selctSize.push({ col: id, id: impo });

        const quickSizeHTML = `<li style="background-color: ${id};"><a onclick="quiColoremo(${0})" style="cursor: pointer !important"></a></li>`;
        quickTailHtml.innerHTML = quickSizeHTML;

    } else {
        if (parseInt(proquant) > selctSize.length) {
            selctSize.push({ col: id, id: impo });
            let quickSizeHTML = '';
            selctSize.forEach((coa, index) => {
                quickSizeHTML += `<li style="background-color: ${coa.col};"><a onclick="quiColoremo('${index}')" style="cursor: pointer !important"></a></li>`;
            });
            quickTailHtml.innerHTML = quickSizeHTML;
        } else {
            selctSize = [];
            selctSize.push({ col: id, id: impo });
            const quickSizeHTML = `<li style="background-color: ${id};"><a onclick="quiColoremo(${0})" style="cursor: pointer !important"></a></li>`;
            quickTailHtml.innerHTML = quickSizeHTML;
        }
    }
}

function quiColoremo(pos) {
    const quickTailHtml = document.getElementById('quickColose');
    quickTailHtml.innerHTML = '';
    if (pos >= 0 && pos < selctSize.length) {
        selctSize.splice(pos, 1);
        let quickSizeHTML = '';
        selctSize.forEach((coa, index) => {
            quickSizeHTML += `<li style="background-color: ${coa.col};"><a onclick="quiColoremo('${index}')" style="cursor: pointer !important"></a></li>`;
        });
        quickTailHtml.innerHTML = quickSizeHTML;
        if (selctSize.length < 1) {
            document.getElementById('quickColTitle').innerText = "";
        }
    }

};

async function PannierOr() {
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const ido = document.getElementById('ido').value;
    await getArticleByIdforpanieOr(ido, quantity);
};

async function getArticleByIdforpanieOr(idm, quand) {
    await openArticleDatabase()
    const transactiona = articldb.transaction(["ArticleStore"], "readonly");
    const objectStorea = transactiona.objectStore("ArticleStore");
    const getRequesta = objectStorea.get(idm);
    getRequesta.onsuccess = (event) => {
        const prod = event.target.result;
        
        if (prod.quantity >= quand) {
            let sizo = "";
            let imago = "";
            selct.forEach((si, index) => sizo += index + 1 == selct.length ? si.size : si.size + ",");

            let cilor = "";
            selctSize.forEach((si, index) => {
                cilor += index + 1 == selctSize.length ? si.col : si.col + ",";
                imago += index + 1 == selctSize.length ? si.id : si.id + ","
            });
            prod.quantcho = quand;
            prod.prix = prod.addprix;
            prod.imago = selctSize.length > 0 ? imago : "0";
            prod.color = selctSize.length > 0 ? cilor : prod.addcoul.substring(0, 7);
            prod.size = selct.length > 0 ? sizo : prod.addtail[2] == "," ? prod.addtail[0] + prod.addtail[1] : prod.addtail[0];
            TotalAll("post", prod);
        } else {
            alert(`Cet article ne rest que ${prod.quantity}`);
        }
    };


    getRequesta.onerror = (event) => {
        console.error("Error accessing object store:", event.target.error);
    };
}