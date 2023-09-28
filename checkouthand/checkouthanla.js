function totalManager() {
    TotalAll('all2', "")
};
totalManager();

async function sendCommen() {
    try {
        const prenomValue = document.getElementById('prenomValue').value;
        const nomValue = document.getElementById('nomValue').value;
        const villeValue = document.getElementById('villeValue').value;
        const communeValue = document.getElementById('communeValue').value;
        const adresseValue = document.getElementById('adresseValue').value;
        const motValue = document.getElementById('motValue').value;
        const confirmezValue = document.getElementById('confirmezValue').value;
        const emailValue = document.getElementById('emailValue').value;
        const telephoneValue = document.getElementById('telephoneValue').value;
        const notesValue = document.getElementById('notes').value;

        if (prenomValue && nomValue && villeValue && communeValue && adresseValue && motValue && emailValue && telephoneValue && notesValue) {
            if (confirmezValue === motValue) {
                const person = {
                    prenom: prenomValue,
                    nom: nomValue,
                    motdepass: motValue,
                    email: emailValue,
                    phone: telephoneValue,
                };

                const clientId = await CreatClientd(person);  // Await the result

                const articleOne = {
                    articles: [],
                    ville: villeValue,
                    commune: communeValue,
                    lieu: adresseValue,
                    phone: telephoneValue,
                    note: notesValue,
                    client: clientId,
                };
                
                
                TotalAll('sendOrder', articleOne);

            } else {
                alert("mot de passe n'est conforme à la confirmation")
            }
        }
    } catch (error) {
        console.log(error)
    }
};


const apiUrl1 = 'https://zany-plum-bear.cyclic.cloud/'; //http://localhost:3000/';

const sendRequestOrder = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrl1 + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

async function CreatClientd(client) {
    try {
        const createItem = async () => {
            try {
                const response = await sendRequestOrder('POST', 'people', client);
                //return response.id;
                sessionStorage.setItem('tibule', response.token);
                const splo = response.token.split("°");
                return thisiswhat(splo[0]);
            } catch (error) {
                console.error('Error creating item:', error.message);
                throw error; // Re-throw the error to handle it in the calling function if needed
            }
        };

        const createdItemId = await createItem(); // Await the result of createItem()
        return createdItemId;
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to handle it in the calling function if needed
    }
};