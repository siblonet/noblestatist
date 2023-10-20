function addArticles(data) {
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


const sendRequestnot = async (method, endpoint, data = null) => {
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
        return null
    }

    return responseData;
};

function clearArticle() {
    const transacti = articldb.transaction(["ArticleStore"], "readwrite");
    const objectAr = transacti.objectStore("ArticleStore");

    const clearRequest = objectAr.clear();
    let answer;

    clearRequest.onsuccess = (event) => {
        answer = "cleared"
    };

    clearRequest.onerror = (event) => {
        answer = event.target.error;
    };

    //TotalAll("clear", {});
}
const Reloada = () => {
    window.location.reload();
}

async function DataLoad() {
    try {
        const items = await sendRequestnot('GET', 'boutique');
        if (!items) {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';

            const productHTML = `
            <div class="container">
                <div class="section-title">
                    <span style="color: red !important">Vérifiez que vous avez access a l'internet</span>
                </div>
                <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                    <img src="assets/img/error-404.png" alt="Internet Error">
                </div>
                <br>
                <br>
                <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                    <a style="align-self: center; cursor: pointer; color: #006e65" onclick="Reloada()">Cliquez ici pour actualiser</a>
                </div>
    
            </div>
    `;
            productContainer.innerHTML += productHTML;
            const loaderRemove = document.getElementById('loaderRemove');
            loaderRemove.innerHTML = "";
            loaderRemove.style.display = "none";
        } else {
            return new Promise((resolve, reject) => {
                openArticleDatabase().then(() => clearArticle().then(result => resolve(result)).catch(error => reject(error)));
                openArticleDatabase().then(() => addArticles(items).then(result => resolve(result)).catch(error => reject(error)));
                recentProduct(items);
                populaProduct(items);
            });
        }


    } catch (e) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        const productHTML = `
        <div class="container">
            <div class="section-title">
                <span style="color: red !important" id="isemptyorintern">Vérifiez que vous avez access a l'internet</span>
            </div>
            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                <img src="assets/img/error-404.png" alt="Internet Error">
            </div>
            <br>
            <br>
            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                <a style="align-self: center; cursor: pointer; color: #006e65" onclick="Reloada()">Cliquez ici pour actualiser</a>
            </div>

        </div>
`;
        productContainer.innerHTML += productHTML;
        const loaderRemove = document.getElementById('loaderRemove');
        loaderRemove.innerHTML = "";
        loaderRemove.style.display = "none";
    };

};

DataLoad();


function getallArticles() {
    const transaction = articldb.transaction(["ArticleStore"], "readonly");
    const objectStore = transaction.objectStore("ArticleStore");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            pannierCotent.push(cursor.value);
            cursor.continue();
        } else {




        }
    }
}
