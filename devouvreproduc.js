const decouProd = [
    {
        id: 1,
        backgroundColor: "#edbfa8",
        image1: "assets/img/categories/img1.jpg",
        articleName: "Ne manquez pas aujourd'hui",
        reduction: "50% de réduction",
        oldPrice: 321,
        newPrice: 250,
        rating: 4.5,
        Vendeur: "Lereve",
        disponibilite: "En stock (7 articles)",
        typeProduits: "T-Shirt",
        color: "",
        size: ""
    },
    {
        id: 2,
        backgroundColor: "#1a205a",
        image1: "assets/img/categories/img2.jpg",
        articleName: "Nouvelle collection",
        reduction: "Besoin maintenant",
        oldPrice: 321,
        newPrice: 250,
        rating: 4.5
    },
    {
        id: 3,
        backgroundColor: "#3a3b57",
        image1: "assets/img/categories/img3.jpg",
        articleName: "Votre look",
        reduction: "Must Haves",
        oldPrice: 321,
        newPrice: 250,
        rating: 4.5
    },
    {
        id: 4,
        backgroundColor: "#fff",
        image1: "assets/img/categories/img4.jpg",
        articleName: "Profitez de 20% de réduction",
        reduction: "Hiver-Printemps!",
        oldPrice: 321,
        newPrice: 250,
        rating: 4.5
    }];



function decouvreProduct() {
    const productContainer = document.getElementById('decouver-container');
    productContainer.innerHTML = ''; // Clear previous content

    decouProd.forEach(product => {
        const productHTML = `
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="single-categories-box" style="background-color: ${product.backgroundColor};">
                                <img src="${product.image1}" alt="image">
                                <div class="content text-white">
                                        <span>${product.articleName}</span>
                                        <h3>${product.reduction}</h3>
                                        <a href="products-right-sidebar-2.html" class="default-btn">Découvrir maintenant</a>
                                </div>
                                <a href="products-right-sidebar-2.html" class="link-btn"></a>
                            </div>
                        </div>          
        `;

        productContainer.innerHTML += productHTML;
    });
};


decouvreProduct();
