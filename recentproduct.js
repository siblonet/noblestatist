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
        notes: notes,
        image: imas
    */
    recenPr.forEach(product => {
        recenProd.push(product);
        const productHTML = `
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-products-box">
                            <div class="products-image" style="background-color: ${'#fff'};">
                               <a href="products-type-1.html?ov=${product.id}?vo='recentProd'">
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
                                            <div class="quick-view-btn" onclick="showProductQuickView(${product.id})">
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
                                <a style="cursor: pointer !important;" class="add-to-cart" onclick="Pannier('${product.id}, ${'#fff'}, ${product.image[0].ima}, ${product.image[1].ima}, ${product.addarticle}, ${product.addprixpro}, ${product.addprix}')">Ajouter au panier</a>
                               </div>
                        </div>
                    </div>
        `;

        productContainer.innerHTML += productHTML;
    });
};


function showProductQuickView(productId) {
    const product = recenProd.find(item => item.id === productId);
    const exista = pannier.find(dd => dd.id === productId);
    if (product && !exista) {
        document.getElementById('quickViewProductName').innerText = product.addarticle;
        document.getElementById('quickViewOldPrice').innerText = `$ ${product.addprixpro}`;
        document.getElementById('quickViewNewPrice').innerText = `$ ${product.addprix}`;
        document.getElementById('rating').innerText = `5 avis`;
        document.getElementById('idp').value = product.who ? product.who : "recenProd";
        document.getElementById('ido').value = product.id;
        const element = document.getElementById('hidlater');
        element.classList.remove('hiddendhid');
        element.classList.add('hiddendshow');

        let prodque = document.getElementById('productQuantity');
        if (prodque) {
            prodque.value = 1
        };

        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = product.backgroundColor;
        const modalImage = document.getElementById('ipage');
        modalImage.src = product.image[0].ima;

        const newURL = `products-type-1.html?ov=${product.id}?vo=${product.who}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    } else {
        document.getElementById('quickViewProductName').innerText = product.addarticle;
        document.getElementById('quickViewOldPrice').innerText = `$ ${product.addprixpro}`;
        document.getElementById('quickViewNewPrice').innerText = `$ ${product.addprix}`;
        document.getElementById('rating').innerText = `5 avis`;
        document.getElementById('ido').value = product.id;

        const element = document.getElementById('hidlater');
        element.classList.remove('hiddendshow');
        element.classList.add('hiddendhid');



        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = product.backgroundColor;
        const modalImage = document.getElementById('ipage');
        modalImage.src = product.image[0].ima;

        const newURL = `products-type-1.html?ov=${product.id}?vo=${product.who}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    }
}