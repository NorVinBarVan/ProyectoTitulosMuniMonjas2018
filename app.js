    // Initialize Firebase
    var config = {
      apiKey: "xx",
      authDomain: "xx",
      databaseURL: "x",
      projectId: "xx",
      storageBucket: "xx",
      messagingSenderId: "xx"
      };
      firebase.initializeApp(config);



//Declaración de Variables y Listeners
var boton = document.getElementById('boton');
boton.addEventListener("onclick", guardar);

//VARIABLES BASE DE DATOS DE FIREBASE
var db = firebase.firestore();
var database = firebase.database();

//CRUD en Firebase
//Agregar documentos
function guardar(){
  confirm('Press a button');
var no_titulo = document.getElementById('no_titulo').value;
var nombre_contribuyente = document.getElementById('nombre_contribuyente').value;
var direccion = document.getElementById('direccion').value;
var fecha = document.getElementById('fecha').value;
var observaciones = document.getElementById('observaciones').value;

db.collection("titulodeagua").add({

    no_titulo: no_titulo,
    nombre_contribuyente: nombre_contribuyente,
    direccion: direccion,
    fecha: fecha,
    observaciones: observaciones
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('no_titulo').value = '';
    document.getElementById('nombre_contribuyente').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('observaciones').value = '';
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

//Leer documentos
var tabla = document.getElementById('tabla');
var first = db.collection("titulodeagua").orderBy("nombre_contribuyente", "asc").onSnapshot((querySnapshot) => {

tabla.innerHTML = '';
querySnapshot.forEach((doc) => {

    tabla.innerHTML += `
    <tr>
    <th scope="row">${doc.id}</th>
    <td>${doc.data().no_titulo}</td>
    <td>${doc.data().nombre_contribuyente}</td>
    <td>${doc.data().direccion}</td>
    <td>${doc.data().fecha}</td>
    <td>${doc.data().observaciones}</td>
    </tr>
    `
});
});
