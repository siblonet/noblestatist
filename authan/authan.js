


const apiUrl = 'http://localhost:3000/'; // Replace with your API endpoint
const apiUrlq = 'https://zany-plum-bear.cyclic.cloud/'; // Replace with your API endpoint

const sendRequestnoto = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrl + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};


function Inscription() {
    try {
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phonea').value;
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm').value;

        if (fname != "" && lname != "" && email != "" && password != "") {
            if (password === confirm) {
                const person = {
                    prenom: fname,
                    nom: lname,
                    motdepass: password,
                    email: email,
                    phone: phone
                };

                const createItem = async () => {
                    try {
                        const response = await sendRequestnoto('POST', 'people', person);
                        sessionStorage.setItem('tibule', response.token);
                        const splo = response.token.split("°");
                        const admin = splo[5];
                        window.location.href = admin == "GIFV" ? "./admin/admindasdboard.html" : "./checkout.html"

                    } catch (error) {
                        console.error('Error creating item:', error.message);
                    }
                };

                createItem();


            } else {
                alert("mot de passe n'est conform a la confirmation")
            }
        }
    } catch (error) {
        console.log(error)
    }
};


function loGin() {
    try {
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        if (phone != "" && password != "") {
            const person = {
                phone: phone,
                motdepass: password,
            };

            const createItem = async () => {
                try {
                    const response = await sendRequestnoto('POST', 'people/login', person);
                    sessionStorage.setItem('tibule', response.token);
                    const splo = response.token.split("°");
                    /*const _id = splo[0];
                    const name = splo[1];
                    const lastname = splo[2];
                    const phone = splo[3];
                    const mail = splo[4];*/
                    const admin = splo[5];
                    //const mynam = thisiswhat(`${_id}â${name}â${lastname}â${phone}â${mail}â${admin}`)
                    window.location.href = admin == "GIFV" ? "./admin/admindasdboard.html" : "./checkout.html"
                } catch (error) {
                    console.error('Error creating item:', error.message);
                }
            };

            createItem();
        }
    } catch (error) {
        console.log(error)
    }
}