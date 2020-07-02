const firebase = require('firebase')
require('firebase/storage')
var firebaseConfig = {
    apiKey: "AIzaSyDwIn793TMYM35nvylLL0AChBmMEPDAEcA",
    authDomain: "classroompdfstorage.firebaseapp.com",
    databaseURL: "https://classroompdfstorage.firebaseio.com",
    projectId: "classroompdfstorage",
    storageBucket: "classroompdfstorage.appspot.com",
    messagingSenderId: "353363977162",
    appId: "1:353363977162:web:26f7262f3077574cf4a533",
    measurementId: "G-YXRFJC3DTF"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

module.exports = storage