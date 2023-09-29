const pannierCotent = [];
const pannierPrin = [];

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
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

function clearArticle() {
    pannierPrin.length = 0;
    pannierCotent.length = 0;
    const transaction = articldb.transaction(["ArticleStore"], "readwrite");
    const objectStore = transaction.objectStore("ArticleStore");

    const clearRequest = objectStore.clear();
    let answer;

    clearRequest.onsuccess = (event) => {
        answer = "cleared"
    };

    clearRequest.onerror = (event) => {
        answer = event.target.error;
    };

    TotalAll("clear", {});
}


async function DataLoad() {
    try {
        const items = await sendRequestnot('GET', 'boutique');
        return new Promise((resolve, reject) => {
            openArticleDatabase().then(() => clearArticle().then(result => resolve(result)).catch(error => reject(error)));
            openArticleDatabase().then(() => addArticles(items).then(result => resolve(result)).catch(error => reject(error)));
            recentProduct(items);
            populaProduct(items);
        }).catch(error => console.log(error));

    } catch (error) {
        console.error('Error fetching items:', error.message);
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
