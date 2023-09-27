function totalManager() {
    TotalAll('all2', "")
};
totalManager();

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
                let person = {
                    prenom: prenomValue,
                    nom: nomValue,
                    ville: villeValue,
                    commune: communeValue,
                    adresse: adresseValue,
                    motdepass: motValue,
                    email: emailValue,
                    phone: telephoneValue,
                    note: notesValue
                };
                
            } else {
                alert("mot de passe n'est conform a la confirmation")
            }
        }
    } catch (error) {
        console.log(error)
    }
}