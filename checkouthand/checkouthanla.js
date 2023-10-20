function totalManager() {
    TotalAll('all2', "");

    const token = sessionStorage.getItem('tibule');
    const splo = token.split("°");
    if (splo) {
        const phone = splo[3];
        const mynam = thisiswhat(`${phone}`);
        document.getElementById('prenomValue').disabled = true;
        document.getElementById('nomValue').disabled = true;
        document.getElementById('motValue').disabled = true;
        document.getElementById('confirmezValue').disabled = true;
        document.getElementById('emailValue').disabled = true;
        document.getElementById('telephoneValue').value = mynam;
        document.getElementById('connectedor').innerHTML = '';
    };
};

totalManager();

async function sendCommen() {
    try {

        const token = sessionStorage.getItem('tibule');
        if (token) {
            const splo = token.split("°");

            const _id = splo[0];
            const mynam = thisiswhat(`${_id}`);
            const villeValue = document.getElementById('villeValue').value;
            const communeValue = document.getElementById('communeValue').value;
            const adresseValue = document.getElementById('adresseValue').value;
            const telephoneValue = document.getElementById('telephoneValue').value;
            const notesValue = document.getElementById('notes').value;

            if (villeValue && communeValue && adresseValue) {

                const articleOne = {
                    articles: [],
                    ville: villeValue,
                    commune: communeValue,
                    lieu: adresseValue,
                    phone: telephoneValue,
                    note: notesValue,
                    client: mynam,
                };


                TotalAll('sendOrder', articleOne);
            };

        } else {

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

            if (prenomValue && nomValue && villeValue && communeValue && adresseValue && motValue && emailValue && telephoneValue) {
                if (confirmezValue === motValue) {
                    const person = {
                        prenom: prenomValue,
                        nom: nomValue,
                        motdepass: motValue,
                        email: emailValue,
                        phone: telephoneValue,
                    };

                    const clientId = await CreatClientd(person);  // Await the result
                    if (clientId) {
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
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");
                        document.getElementById('nointer').innerText = `Le ${telephoneValue} est déjà associé un compte, \n ( Cliquez ici pour vous connecter)`;

                        setTimeout(() => {
                            errer.classList.remove("rejected");
                        }, 4000);
                    }
                } else {
                    alert("mot de passe n'est conforme à la confirmation")
                }
            }
        }



    } catch (error) {
        console.log(error)
    }
};



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

    const response = await fetch(apiUrlfine + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

async function CreatClientd(client) {
    try {
        const createItem = async (method, endpoint) => {
            try {
                const options = {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                if (client) {
                    options.body = JSON.stringify(client);
                }

                const response = await fetch(apiUrlfine + endpoint, options);
                const responseData = await response.json();

                if (!response.ok) {
                    load.classList.remove("load28")
                    load.classList.add("tohi")
                    tohia.classList.remove("tohi");
                    errer.classList.add("rejected");
                    document.getElementById('nointer').innerText = "Vérifiez que vous avez access a l'internet";

                    setTimeout(() => {
                        errer.classList.remove("rejected");
                    }, 3500);
                }

                if (responseData.ee) {
                    return null
                } else {
                    sessionStorage.setItem('tibule', responseData.token);
                    const splo = responseData.token.split("°");
                    return thisiswhat(splo[0]);
                }

            } catch (e) {
               

            }
        };

        const createdItemId = await createItem('POST', 'people'); // Await the result of createItem()
        return createdItemId;
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to handle it in the calling function if needed
    }
};
