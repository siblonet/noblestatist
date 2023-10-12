let selct = [];
let selctSize = [];


async function productStypes1(viewid) {
    if (viewid) {
        await openArticleDatabase()
        const transactiona = articldb.transaction(["ArticleStore"], "readonly");
        const objectStorea = transactiona.objectStore("ArticleStore");
        const getRequesta = objectStorea.get(viewid);
        getRequesta.onsuccess = (event) => {
            const prod = event.target.result;
            document.getElementById('artiname').innerText = prod.addarticle;
            document.getElementById('description').innerText = prod.notes;
            document.getElementById('addexpe').innerText = prod.addexpe            
            document.getElementById('addexpea').innerText = prod.addexpe            
            document.getElementById('artinamea').innerText = prod.addarticle;
            document.getElementById('rating').innerText = `4.9 avis`;

            const modalImage1 = document.getElementById('ima1');
            const modalImage2 = document.getElementById('ima2');
            const modalImage3 = document.getElementById('ima3');
            const modalImage4 = document.getElementById('ima4');
            const modalImage5 = document.getElementById('ima5');
            modalImage1.src = prod.image[0].ima;
            modalImage2.src = prod.image[1].ima;
            modalImage3.src = prod.image[2].ima;
            modalImage4.src = prod.image[3].ima;
            modalImage5.src = prod.image[4].ima;

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

            document.getElementById('quickViewOldPrice').innerText = `${prod.addprixpro} F.CFA`;
            document.getElementById('quickViewNewPrice').innerText = `${prod.addprix} F.CFA`;

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
                            <li class="active" id="quisizelia"><a onclick="quiSizefun('a', '${qsizea}')" style="cursor: pointer !important">${qsizea}</a></li>
                            <li id="quisizelib"><a onclick="quiSizefun('b', '${qsizeb}')" style="cursor: pointer !important">${qsizeb}</a></li>
                            <li id="quisizelic"><a onclick="quiSizefun('c', '${qsizec}')" style="cursor: pointer !important">${qsizec}</a></li>
                            <li id="quisizelid"><a onclick="quiSizefun('d', '${qsized}')" style="cursor: pointer !important">${qsized}</a></li>
                            <li id="quisizelie"><a onclick="quiSizefun('e', '${qsizee}')" style="cursor: pointer !important">${qsizee}</a></li>
                            `
            quickTailHtml.innerHTML = quickSizeHTML;
        };


        getRequesta.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
        };

    }
};


function quiSizefun(id, siz) {
    if (selct.length == 0 && `quisizeli${id}` !== "quisizelia") {
        const onea = document.getElementById("quisizelia");
        const one = document.getElementById(`quisizeli${id}`);
        onea.classList.remove('active');
        one.classList.add('active');
        selct.push({ id: `quisizeli${id}`, size: siz });
    } else {
        let prodque = document.getElementById('productQuantity').value;
        if (parseInt(prodque) + 1 > selct.length + 1) {
            const one = document.getElementById(`quisizeli${id}`);
            one.classList.add('active');
            selct.push({ id: `quisizeli${id}`, size: siz });
        } else {
            selct.forEach(ee => {
                const one = document.getElementById(`${ee.id}`);
                one.classList.remove('active');
            });
            selct = [];
            const one = document.getElementById(`quisizeli${id}`);
            one.classList.add('active');
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
        if(selctSize.length < 1){
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
    };


    getRequesta.onerror = (event) => {
        console.error("Error accessing object store:", event.target.error);
    };
}