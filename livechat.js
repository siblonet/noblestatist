function generateUUID() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
let myLiv = localStorage.getItem('myLive');

if (!myLiv) {
  localStorage.setItem('myLive', generateUUID());
}



/*
        socket.on('disconnect', () => {
            sessionStorage.removeItem('socid');
        });


        socket.on('reconnect_attempt', () => {
            sessionStorage.removeItem('socid');

            console.log('Tentative de reconnexion...');
        });

        socket.on('reconnect', (attemptNumber) => {
            sessionStorage.removeItem('socid');

            console.log(`Rétabli la connexion après ${attemptNumber} tentatives.`);
        });




        const socketWithOptions = io(tunalS, {
            reconnection: true, // Activer la reconnexion automatique
            reconnectionAttempts: 3, // Nombre maximal de tentatives de reconnexion
            reconnectionDelay: 1000, // Délai initial avant la première tentative de reconnexion (en millisecondes)
            reconnectionDelayMax: 5000, // Délai maximal entre les tentatives de reconnexion (en millisecondes)
            randomizationFactor: 0.5, // Facteur de randomisation pour les délais de reconnexion
        });

        socketWithOptions.connect();

        socket.on('reconnect_error', (error) => {
            sessionStorage.removeItem('socid');

            console.error('Erreur de reconnexion:', error);
            setTimeout(() => {
                socket.connect();

            }, 99990);
        });*/