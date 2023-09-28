const recenProd = [];
function recentProduct(recenPr) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    /*
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
        who: '',
        notes: notes,
        image: imas
    */
    recenPr.forEach(product => {
        if (product.who === "recenProd") {
            recenProd.push(product);
            const productHTML = `
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-products-box">
                            <div class="products-image" style="background-color: ${'#fff'};">
                               <a href="products-type-1.html?ov=${product._id}?vo=${product.who}">
                                <img src="${product.image[0].ima}" class="main-image" alt="image">
                                <img src="${product.image[1].ima}" class="hover-image" alt="image">
                                </a>
                                <div class="products-button">
                                    <ul>
                                    <!--<li>
                                            <div class="wishlist-btn">
                                                
                                            </div>
                                        </li>
                                        <li>
                                            <div class="compare-btn">
                                                <a href="#">
                                                    <i class="bx bx-refresh"></i>
                                                    <span class="tooltip-label">Comparer</span>
                                                </a>
                                            </div>
                                        </li>-->
                                        <li>
                                            <div class="quick-view-btn" onclick="showProductQuickView('${product._id}')">
                                                <a style="cursor: pointer !important;" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                                    <i class="bx bx-search-alt"></i>
                                                    <span class="tooltip-label">Vue rapide</span>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                            <div class="products-content">
                                <h3><a href="products-type-1.html">${product.addarticle}</a></h3>
                                <div class="price">
                                <span class="old-price">$ ${product.addprixpro}</span>
                                <span class="new-price">$ ${product.addprix}</span>
                                </div>
                                <div class="star-rating">
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                </div>
                                <a style="cursor: pointer !important;" class="add-to-cart" onclick="Pannier('${product._id}','${product.who}')">Ajouter au panier</a>
                               </div>
                        </div>
                    </div>
        `;

            productContainer.innerHTML += productHTML;

        }
    });
};


function showProductQuickView(productId) {
    const product = recenProd.find(item => item._id === productId);
    const exista = pannierCotent.find(dd => dd._id === productId);
    if (product && !exista) {
        const splo = product.addcoul.split(",") ? product.addcoul.split(",") : "#eeeeee";
        const colora = splo[0] == "null" ? "#eeeeee" : splo[0];
        const colorb = splo[1] == "null" ? "#eeeeee" : splo[1];
        const colorc = splo[2] == "null" ? "#eeeeee" : splo[2];
        const colord = splo[3] == "null" ? "#eeeeee" : splo[3];
        const colore = splo[4] == "null" ? "#eeeeee" : splo[4];

        const sploa = product.addtail.split(",") ? product.addtail.split(",") : "-";
        const qsizea = sploa[0] == "null" ? "-" : sploa[0];
        const qsizeb = sploa[1] == "null" ? "-" : sploa[1];
        const qsizec = sploa[2] == "null" ? "-" : sploa[2];
        const qsized = sploa[3] == "null" ? "-" : sploa[3];
        const qsizee = sploa[4] == "null" ? "-" : sploa[4];

        document.getElementById('quickViewProductName').innerText = product.addarticle;
        document.getElementById('quickViewOldPrice').innerText = `${product.addprixpro} F.CFA`;
        document.getElementById('quickViewNewPrice').innerText = `${product.addprix} F.CFA`;
        document.getElementById('rating').innerText = `5 avis`;
        document.getElementById('quickFour').innerText = `${product.addfour}`;
        document.getElementById('quickDispo').innerText = `${product.adddispo}`;
        document.getElementById('quickType').innerText = `${product.addtype}`;

        let prodque = document.getElementById('productQuantity');
        if (prodque) {
            prodque.value = 1
        };

        const quickCouleuHtml = document.getElementById('quickCouleu');
        const quickTailHtml = document.getElementById('quickTail');
        quickCouleuHtml.innerHTML = '';
        quickTailHtml.innerHTML = '';

        const quickColoHTML = `
                            <li><a onclick="quiColorfun('0', '${colora}', '${product.image[0].ima}')" style="cursor: pointer !important; background-color: ${colora} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('1', '${colorb}', '${product.image[1].ima}')" style="cursor: pointer !important; background-color: ${colorb} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('2', '${colorc}', '${product.image[2].ima}')" style="cursor: pointer !important; background-color: ${colorc} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('3', '${colord}', '${product.image[3].ima}')" style="cursor: pointer !important; background-color: ${colord} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('4', '${colore}', '${product.image[4].ima}')" style="cursor: pointer !important; background-color: ${colore} !important; border: 1px solid #f8f8f8 !important"></a></li>
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
        document.getElementById('idp').value = product.who;
        document.getElementById('ido').value = `${product._id}`;
        
        const element = document.getElementById('hidlater');
        element.classList.remove('hiddendhid');
        element.classList.add('hiddendshow');


        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = product.backgroundColor;
        const modalImage = document.getElementById('ipage');
        modalImage.src = product.image[0].ima;

        const newURL = `products-type-1.html?ov=${product._id}?vo=${product.who}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    } else {
        document.getElementById('quickViewProductName').innerText = product.addarticle;
        document.getElementById('quickViewOldPrice').innerText = `${product.addprixpro} F.CFA`;
        document.getElementById('quickViewNewPrice').innerText = `${product.addprix} F.CFA`;
        document.getElementById('rating').innerText = `5 avis`;
        document.getElementById('quickFour').innerText = `${product.addfour}`;
        document.getElementById('quickDispo').innerText = `${product.adddispo}`;
        document.getElementById('quickType').innerText = `${product.addtype}`;

        document.getElementById('ido').value = `${product._id}`;

        const element = document.getElementById('hidlater');
        element.classList.remove('hiddendshow');
        element.classList.add('hiddendhid');



        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = product.backgroundColor;
        const modalImage = document.getElementById('ipage');
        modalImage.src = product.image[0].ima;

        const newURL = `products-type-1.html?ov=${product._id}?vo=${product.who}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    }
};

let selct = [];
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

let selctSize = [];

function quiColorfun(impo, id, im) {
    const bacgro = document.getElementById('bagron');
    bacgro.style.backgroundColor = id;
    const modalImage = document.getElementById('ipage');
    modalImage.src = im;
    let proquant = document.getElementById('productQuantity').value;

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

    }

}