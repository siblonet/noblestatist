let sockectState = false;
const socket = io(tunalS);

function generateUUID() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

let myLive = generateUUID();

socket.connect();

socket.on('connect', () => {
        sockectState = true;

});


socket.on('disconnect', () => {
    sockectState = false;
});


socket.on('reconnect_attempt', () => {
    sockectState = true;

  console.log('Tentative de reconnexion...');
});

socket.on('reconnect', (attemptNumber) => {
    sockectState = true;

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
    sockectState = false;

  console.error('Erreur de reconnexion:', error);
  setTimeout(() => {
    socket.connect();
    socket.on('connect', () => {
        sockectState = true;

});
  }, 99990);
});
