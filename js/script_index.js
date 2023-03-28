// Script para ingreso y registro de usuario del index (En este Script se usa JSON  / Librería SweetAlert / API de clima)

let arreglo_usuarios = [];

//Función que ingresa al nuevo usuario
function usuario_registrado() {
  let nombre_usuario = document.getElementById("correo");
  let pass_usuario = document.getElementById("pass");

  //Objeto de usuario

  let usuario = { nombre: nombre_usuario.value, password: pass_usuario.value };

  console.log(usuario);

  arreglo_usuarios.push(usuario);

  //Arreglo para ingreso a JSON
  let arreglo_json = JSON.stringify(arreglo_usuarios);
  localStorage.setItem("arreglo_usuarios", arreglo_json);

  Swal.fire({
    title: "Bienvenido",
    text: "Usuario Registrado",
    icon: "success",
    color: "white",
    background: "orange",
    showClass: {
      popup: "animate__animated animate__backInDown",
    },
  });
}

//Función para buscar usuario para permitirle ingresar a la sección de compras
function bucar_usuario(usuario) {
  let nombre_usuario = document.getElementById("correo").value;
  let pass_usuario = document.getElementById("pass").value;

  return nombre_usuario == usuario.nombre && pass_usuario == usuario.password;
}

//Función que realiza el ingreso a los usuarios ya registrados y Librería.
function login_usuario() {
  let arr = localStorage.getItem("arreglo_usuarios");

  if (arr != null) {
    arr = JSON.parse(arr);
    // console.log(arr);

    let resultado_find = arr.find(bucar_usuario);

    if (resultado_find != null) {
      window.location.assign("carrito.html");
    } else {
      Swal.fire({
        title: "Usuario NO encontrado",
        text: "Usted aún no se ha registrado",
        icon: "error",
        color: "white",
        background: "orange",
        showClass: {
          popup: "animate__animated animate__backInDown",
        },
      });
    }
  }
}

//Botones Registro / Login
let btn_registro = document.getElementById("btn_registro");
btn_registro.addEventListener("click", usuario_registrado);

let btn_login = document.getElementById("btn_login");
btn_login.addEventListener("click", login_usuario);

//API DE CLIMA

function mostrar_posicion(posicion) {
  let latitud = posicion.coords.latitude;
  let longitud = posicion.coords.longitude;
  let key = "e5a04d52fb011d815b62f9b3302fdfd4";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${key}&units=metric&lang=es`
  )
    .then((response) => response.json())
    .then((data) => {
      var texto = document.getElementById("info_clima");
      var clima = document.createElement("h2");
      clima.innerHTML = `${data.weather[0].description} - ${data.main.temp}°`;
      texto.appendChild(clima);
    });
}

navigator.geolocation.getCurrentPosition(mostrar_posicion);
