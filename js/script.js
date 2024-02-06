/* Obtener valores del formulario */

const form = document.getElementById("form");
const formUser = document.getElementById("username");
const formName = document.getElementById("nombre");
const formFoto = document.getElementById("imagen");
const formPet = document.getElementById("mascota");

/* Variables y funciones que voy a necesitar */

const usuarios = [];
let puede = false;
const erase = document.getElementById("clean");

class Usuario {
  constructor(username, nombre, imagen) {
    this.username = username;
    this.nombre = nombre;
    this.imagen = imagen;
    this.mascotas = []; // Inicializa el arreglo de mascotas como un arreglo vacío
  }

  agregarMascota(mascota) {
    this.mascotas.push(mascota); // Agrega una nueva mascota al arreglo de mascotas
  }
}

function verificarExiste(username) {
  for (const usuario of usuarios) {
    if (usuario.username === username) {
      return true; // El nombre de usuario ya existe
    }
  }
  return false; // El nombre de usuario está disponible
}

function actualizarTabla() {
  //Vuelve a mostrar la tabla
  const show = document.querySelector(".hide").style.display = "block";

  const tabla = document.querySelector(".datosAlmacenados tbody");

  tabla.innerHTML = ""; // Limpia la tabla para agregar todo nuevo

  for (const usuario of usuarios) {
    const fila = tabla.insertRow();

    const userTd = document.createElement("td"); //crea un td con la info y en el formato que me gusta
    const userP = document.createElement("p");
    userP.textContent = usuario.username;
    userP.classList.add("tablaUsers");
    userTd.classList.add("celdaOtras");
    userTd.appendChild(userP);

    const nombreTd = document.createElement("td"); //crea un td con la info y en el formato que me gusta
    const nombreP = document.createElement("p");
    nombreP.textContent = usuario.nombre;
    nombreP.classList.add("tablaUsers");
    nombreTd.classList.add("celdaOtras");
    nombreTd.appendChild(nombreP);

    const imgTd = document.createElement("td"); //crea un td con la info y en el formato que me gusta
    const imagen = document.createElement("a");
    imagen.href = usuario.imagen;
    imagen.target = "_blank";
    imagen.textContent = usuario.imagen;
    imagen.classList.add("tablaUsers");
    imgTd.appendChild(imagen);

    const petTd = document.createElement("td"); //crea un td con la info y en el formato que me gusta
    const petButton = document.createElement("button");
    petButton.textContent = "Ver mascotas";
    petButton.id = "id" + usuario.username;
    petButton.classList.add("tablaUsers");
    petTd.classList.add("celdaBoton");
    petButton.addEventListener("click", () => {
      showPets(usuario.username);
    });
    petTd.classList.add("centrarBoton");
    petTd.appendChild(petButton);

    //agregar los td a la fila
    fila.appendChild(userTd);
    fila.appendChild(nombreTd);
    fila.appendChild(imgTd);
    fila.appendChild(petTd);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const regex = /.*\..*/gm; //regex que haya al menos un punto

  puede = false;

  if (regex.test(formUser.value)) {
    //verifica el regex
    console.log("Buen usuario");
    puede = true;
  } else {
    alert("El nombre de usuario no es válido");
  }

  if (puede == true) {
    //si el usuario es válido, entonces se puede agregar
    let newUser = new Usuario(formUser.value, formName.value, formFoto.value);
    let existe = verificarExiste(newUser.username);

    if (existe == true) {
      //busca al usuario para agregar mascotas
      const oldUser = usuarios.find(
        (usuario) => usuario.username === newUser.username
      );

      //Aqui revisar si la mascota ya existe
      if (oldUser.mascotas.includes(formPet.value)) {
        alert("Esta mascota ya estaba registrada para este usuario");
      } else {
        oldUser.agregarMascota(formPet.value);
        alert("Mascota agregada al usuario existente");
        form.reset();
      }
    } else {
      //agrega un usuario nuevo
      newUser.agregarMascota(formPet.value);
      usuarios.push(newUser);
      alert("Usuario creado");
      form.reset();
    }
  }

  actualizarTabla();

  console.log(usuarios);
});

function showPets(duenio) {
  //Buscamos el usuario en la lista
  const oldUser = usuarios.find((usuario) => usuario.username === duenio);

  //Agregamos el titulo
  const title = document.getElementById("tituloPets");
  title.innerHTML = "";
  title.innerHTML = "Mascotas";

  //Cambiamos el nombre del dueño
  const ownerName = document.getElementById("ownerUser");
  ownerName.innerHTML = "";
  ownerName.innerHTML = "Dueño: " + oldUser.username;

  //Cambiamos la lista de mascotas
  const lista = document.getElementById("petsUser");
  lista.innerHTML = "";
  for (const pet of oldUser.mascotas) {
    const item = document.createElement("li");
    item.textContent = pet;
    lista.appendChild(item);
  }
}

erase.addEventListener("click", () => {
  const title = document.getElementById("tituloPets");
  title.innerHTML = "";

  const ownerName = document.getElementById("ownerUser");
  ownerName.innerHTML = "";

  const lista = document.getElementById("petsUser");
  lista.innerHTML = "";
});
