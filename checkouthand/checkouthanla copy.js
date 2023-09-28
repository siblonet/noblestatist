/*function totalManager() {
    TotalAll('all2', "")
};
totalManager();*/

const Upcased = {
    "A": "z",
    "B": "y",
    "C": "x",
    "D": "w",
    "E": "v",
    "F": "u",
    "G": "t",
    "H": "s",
    "I": "r",
    "J": "q",
    "K": "p",
    "L": "o",
    "M": "n",
    "N": "m",
    "O": "l",
    "P": "k",
    "Q": "j",
    "R": "i",
    "S": "h",
    "T": "g",
    "U": "f",
    "V": "e",
    "W": "d",
    "X": "c",
    "Y": "b",
    "Z": "a"
}




const Lowcasd = {
    "a": "Z",
    "b": "Y",
    "c": "X",
    "d": "W",
    "e": "V",
    "f": "U",
    "g": "T",
    "h": "S",
    "i": "R",
    "j": "Q",
    "k": "P",
    "l": "O",
    "m": "N",
    "n": "M",
    "o": "L",
    "p": "K",
    "q": "J",
    "r": "I",
    "s": "H",
    "t": "G",
    "u": "F",
    "v": "E",
    "w": "D",
    "x": "C",
    "y": "B",
    "z": "A"
}



const Nud = {
    "1": 0,
    "2": 9,
    "3": 8,
    "4": 7,
    "5": 6,
    "6": 5,
    "7": 4,
    "8": 3,
    "9": 2,
    "0": 1
}

const Sumd = {
    "é": "|",
    "â": " ",
    "ô": "Ü",
    "î": "Ï",
    "ê": "Ë",
    "û": "Ö",
    "ë": "Ä",
    "ï": "ÿ",
    "ä": "ü",
    "ö": "ö",
    "ü": "ä",
    "ÿ": "ï",
    "Ä": "ë",
    "Ö": "û",
    "Ë": "ê",
    "Ï": "î",
    "Ü": "ô",
    " ": "â",
    "|": "é",
    "`": "@",
    "~": "§",
    "#": "<",
    "{": ">",
    "}": "£",
    "[": "%",
    "]": "µ",
    "§": "~",
    "µ": "]",
    "%": "[",
    "£": "}",
    ">": "{",
    "<": "#",
    "@": "`",
    "?": "+",
    "&": ".",
    "'": ",",
    "(": ";",
    "-": ":",
    "è": "!",
    "_": "*",
    "ç": "ù",
    "à": "$",
    ")": "^",
    "=": "=",
    "^": ")",
    "$": "à",
    "ù": "ç",
    "*": "_",
    "!": "è",
    ":": "-",
    ";": "(",
    ",": "'",
    ".": "&",
    "+": "?"
}

const deed = {
    "¨": "²",
    "²": "/",
    "°": "°"
}


function whatisthisd(ee) {
    const adaa = ee.replaceAll("/", "¨");
    let dof = "";
    [...adaa].forEach(en => {
        dof += Upcase[`${en}`];
        dof += Lowcas[`${en}`];
        dof += Nu[`${en}`];
        dof += Sum[`${en}`];
        dof += dee[`${en}`];

    });
    const ad = dof.replaceAll("undefined", "");
    return ad;
}


function thisiswhatd(eee) {
    let dof = "";
    [...eee].forEach(en => {
        dof += Upcased[`${en}`];
        dof += Lowcasd[`${en}`];
        dof += Nud[`${en}`];
        dof += Sumd[`${en}`];
        dof += deed[`${en}`];
    })
    const adaa = dof.replaceAll("undefined", "");
    return adaa;
};


function sendCommen() {
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
 
                const clientId = CreatClientd(person);
                console.log(clientId);

                const articleOne = {
                    articles: [],
                    ville: villeValue,
                    commune: communeValue,
                    lieu: adresseValue,
                    phone: telephoneValue,
                    note: notesValue,
                    client: clientId,
                }
                
                const axc = {
                    arti_id: "",
                    quantcho: 0,
                    image: "String",
                    color: "String",
                    size: "String",
                    statut: string,
                    prix: 0
                }

                //const daa = TotalAll('sendOrder', "");

            } else {
                alert("mot de passe n'est conform a la confirmation")
            }
        }
    } catch (error) {
        console.log(error)
    }
};



const apiUrl1 = 'http://localhost:3000/'; // Replace with your API endpoint
const apiUrl2 = 'https://zany-plum-bear.cyclic.cloud/'; // Replace with your API endpoint

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


function CreatClientd(client) {
    try {

        const createItem = async () => {
            try {
                const response = await sendRequestOrder('POST', 'people', client);
                sessionStorage.setItem('tibule', response.token);
                const splo = response.token.split("°");
                return thisiswhatd(splo[0]);

            } catch (error) {
                console.error('Error creating item:', error.message);
            }
        };

        return createItem();



    } catch (error) {
        console.log(error);
    }
};

sendCommen();