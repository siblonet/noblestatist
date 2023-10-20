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
    try {
        const response = await fetch(apiUrlfine + endpoint, options);
        const responseData = await response.json();

        if (!response.ok) {
            return { id: "erro", er: "erro" }
        }

        if (responseData.ee) {
            return { id: "erro", er: "erro" }
        } 

        return { id: responseData, er: responseData }
    } catch (e) {
        
    }

};


function Inscription() {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    try {
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phonea').value;
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm').value;

        if (fname != "" && lname != "" && email != "" && password != "") {
            if (password === confirm) {
                tohia.classList.add("tohi");
                load.classList.remove("tohi");
                load.classList.add("load28");

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
                        if (response.er == "erro" && response.id == "erro") {
                            load.classList.remove("load28")
                            load.classList.add("tohi")
                            tohia.classList.remove("tohi");
                            errer.classList.add("rejected");
                            document.getElementById('nointer').innerText = `Le ${phone} est déjà associé un compte`;

                            setTimeout(() => {
                                errer.classList.remove("rejected");
                            }, 1000);

                        } else if (response.er !== "erro" && response.id !== "erro") {
                            sessionStorage.setItem('tibule', response.id.token);
                            const splo = response.id.token.split("°");
                            const admin = splo[5];
                            window.location.href = admin == "GIFV" ? "./admin/admindasdboard.html" : "./track-order.html"
                            load.classList.remove("load28")
                            load.classList.add("tohi")
                            tohia.classList.remove("tohi");
                        }

                    } catch (e) {
                        setTimeout(() => {
                            load.classList.remove("load28")
                            load.classList.add("tohi")
                            tohia.classList.remove("tohi");
                            errer.classList.add("rejected");
                            document.getElementById('nointer').innerText = "Vérifiez que vous avez access a l'internet";
                        }, 1500);

                        setTimeout(() => {
                            errer.classList.remove("rejected");
                        }, 4500);

                    }
                };

                createItem();


            } else {
                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");
                errer.classList.add("rejected");
                document.getElementById('nointer').innerText = "Mot de passe n'est pas conform a la confirmation";
                setTimeout(() => {
                    errer.classList.remove("rejected");
                }, 3500);
            }
        }
    } catch (error) {
        console.log(error)
    }
};


function loGin() {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    try {
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        if (phone != "" && password != "") {
            tohia.classList.add("tohi");
            load.classList.remove("tohi");
            load.classList.add("load28");

            const person = {
                phone: phone,
                motdepass: password,
            };

            const createItem = async () => {
                try {
                    const response = await sendRequestnoto('POST', 'people/login', person);

                    if (response.er == "erro" && response.id == "erro") {
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");


                        setTimeout(() => {
                            errer.classList.remove("rejected");
                        }, 1500);

                    } else if (response.er !== "erro" && response.id !== "erro") {
                        sessionStorage.setItem('tibule', response.id.token);
                        const splo = response.id.token.split("°");
                        const admin = splo[5];
                        window.location.href = admin == "GIFV" ? "./admin/admindasdboard.html" : "./track-order.html"
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                    }

                } catch (e) {
                    console.log(e);
                    setTimeout(() => {
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");
                        document.getElementById('nointer').innerText = "Vérifiez que vous avez access a l'internet";
                    }, 1500);

                    setTimeout(() => {
                        errer.classList.remove("rejected");
                    }, 4500);


                }
            };

            createItem();
        }
    } catch (error) {
        console.log(error)
    }
}


function loginCommage() {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    try {
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        if (phone != "" && password != "") {
            tohia.classList.add("tohi");
            load.classList.remove("tohi");
            load.classList.add("load28");

            const person = {
                phone: phone,
                motdepass: password,
            };

            const createItem = async () => {
                try {
                    const response = await sendRequestnoto('POST', 'people/login', person);

                    if (response && response.er == "erro" && response.id == "erro") {
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");
                        document.getElementById('nointer').innerText = "Vérifiez que vous avez access a l'internet";


                        setTimeout(() => {
                            errer.classList.remove("rejected");
                        }, 1500);

                    } else if (response && response.er !== "erro" && response.id !== "erro") {
                        sessionStorage.setItem('tibule', response.id.token);
                        const splo = response.id.token.split("°");
                        const name = splo[1];
                        const lastname = splo[2];
                        const mail = splo[4];
                        const mynam = thisiswhat(`${name}â${lastname}â${mail}`)
                        const myspl = mynam.split(" ");


                        document.getElementById('prenomValue').value = myspl[0];
                        document.getElementById('prenomValue').disabled = true;

                        document.getElementById('nomValue').value = myspl[1];
                        document.getElementById('nomValue').disabled = true;

                        document.getElementById('motValue').value = password;
                        document.getElementById('motValue').disabled = true;

                        document.getElementById('confirmezValue').value = password;
                        document.getElementById('confirmezValue').disabled = true;

                        document.getElementById('emailValue').value = myspl[2];
                        document.getElementById('emailValue').disabled = true;

                        document.getElementById('telephoneValue').value = phone;
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                    }else{
                        setTimeout(() => {
                            load.classList.remove("load28")
                            load.classList.add("tohi")
                            tohia.classList.remove("tohi");
                            errer.classList.add("rejected");
                            document.getElementById('nointer').innerText = "Vérifiez que vous avez access a l'internet";
                        }, 1500);
    
                        setTimeout(() => {
                            errer.classList.remove("rejected");
                        }, 4500);
                    }

                } catch (e) {
                    setTimeout(() => {
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");
                        document.getElementById('nointer').innerText = "Vérifiez que vous avez access a l'internet";
                    }, 1500);

                    setTimeout(() => {
                        errer.classList.remove("rejected");
                    }, 4500);
                }
            };

            createItem();
        }
    } catch (error) {
        console.log(error)
    }
}