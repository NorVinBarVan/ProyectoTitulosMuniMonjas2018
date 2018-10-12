// INICIALIZACION FIREBASE
    var config = {
      apiKey: "xx",
      authDomain: "xx",
      databaseURL: "x",
      projectId: "xx",
      storageBucket: "xx",
      messagingSenderId: "xx"
      };
      firebase.initializeApp(config);

//ESTADO DE AUTORIZACIÓN USUARIO      
firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    //USUARIO HA INICIADO SESIÓN

    $('#login_div').css("display", "none") && $('#user_div').css("display", "block");

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;

    }

  } else {
    //USUARIO NO HA INICIADO SESIÓN

    $('#user_div').css("display", "none") && $('#login_div').css("display", "block");

  }
});

//LOGIN USER AND PASSWORD
function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // AL CERRAR LA VENTANA CERRARA CUALQUIER SESION, INCLUSO SI NO HAYA SELECCIONADO SALIR

  return firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("POR FAVOR REVISE SU CORREO ELECTRÓNICO/CONTRASEÑA");

  });
  });
}

//FUNCION DE SALIDA
function logout(){

  firebase.auth().signOut();
  email = "";
  password = "";

}

//DECLARACIÓN DE VARIABLES Y LISTENERS
var boton = document.getElementById('boton');
boton.addEventListener("onclick", guardar);

//VARIABLES BASE DE DATOS DE FIREBASE
var db = firebase.firestore();

//CRUD EN FIREBASE

//AGREGAR DOCUMENTOS
function guardar(){

var no_titulo = document.getElementById('no_titulo').value;
var nombre_contribuyente = document.getElementById('nombre_contribuyente').value;
var direccion = document.getElementById('direccion').value;
var fecha = document.getElementById('fecha').value;
var observaciones = document.getElementById('observaciones').value;

if( document.getElementById('no_titulo').value === '' ){
  submitOK = "false";
  alert('NO HA INGRESADO NINGÚN TÍTULO DE AGUA POTABLE');
}

if( document.getElementById('nombre_contribuyente').value === '' ){
  submitOK = "false";
  alert('NO HA INGRESADO NINGÚN NOMBRE DEL CONTRIBUYENTE');
}

db.collection("titulodeagua").add({
    no_titulo: no_titulo,
    nombre_contribuyente: nombre_contribuyente,
    direccion: direccion,
    fecha: fecha,
    observaciones: observaciones
})
.then(function(docRef) {
    console.log("DOCUMENTO ESCRITO CON ID: ", docRef.id);
    document.getElementById('no_titulo').value = '';
    document.getElementById('nombre_contribuyente').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('observaciones').value = '';
})
.catch(function(error) {
    console.error("ERROR AL AGREGAR DOCUMENTO: ", error);
});
}

//LEER DOCUMENTOS
var tabla = document.getElementById('tabla');
var datos = [];
db.collection("titulodeagua").orderBy("no_titulo", "desc").onSnapshot((querySnapshot) => {
datos = [];
querySnapshot.forEach((doc) => {
    datos.push([
      doc.data().no_titulo || '',
      doc.data().nombre_contribuyente || '',
      doc.data().direccion || '',
      doc.data().fecha || '',
      doc.data().observaciones,
      doc.id
    ])
});

//LEER DATOS DESDE LA DATATABLE
if ($.fn.dataTable.isDataTable('#dataTable'))
{
  $('#dataTable').DataTable().destroy();
}

$('#dataTable').DataTable(
  {
    data : datos,
    columns : [   
      {title: 'No. Título'},
      {title: 'Nombre Contribuyente'},
      {title: 'Dirección'},
      {title: 'Fecha Inscripción'},
      {title: 'Observaciones'},
      {title: 'ID'}
    ]
  });
});

//CAMBIAR CONTRASEÑA
function resetPass()
{
    var email = document.getElementById('email_field').value;
    firebase.auth().sendPasswordResetEmail(email).then(function()
    {
      alert ('EMAIL ENVIADO');
    }).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
      }
      alert('EL CORREO ELECTRÓNICO BRINDADO NO EXISTE EN LA BASE DE DATOS');
      });
}
