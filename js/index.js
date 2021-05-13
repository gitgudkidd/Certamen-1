

tinymce.init({
    selector: '#descripcion-txt',
    height: 150,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });
  
  const cargarTabla = ()=>{
    
    //1-Obtener una referencia a la tabla
    let tbody = document.querySelector("#tabla-tbody");
    
    //Eliminar todos los elementos que tenga el tbody
    tbody.innerHTML =""

    //2-Recorrer la lista
    for(let i=0; i < pokemones.length; ++i){
      let p = pokemones[i];
      
      //3-Por cada pokemon generar una fila (tr)
      let tr = document.createElement("tr")
      
      //4-Por cada atributo, generar celdas (td)
      let tdNRO = document.createElement("td");
      tdNRO.innerText = (i+1)
      let tdNombre = document.createElement("td");
      if(p.legendario){
        tdNombre.classList.add("text-warning");

      }
      tdNombre.innerText = p.nombre;
      let tdTipo = document.createElement("td");
      
      let icono = document.createElement("i");
      if(p.tipo == "fuego"){
        //<i class="fas fa-fire"></i>
        //Agregar clases a un elemento
        icono.classList.add("fas","fa-fire","text-danger","fa-3x")
      }else if(p.tipo == "planta"){
        //<i class="fas fa-leaf"></i>
        icono.classList.add("fas","fa-leaf","text-success","fa-3x")
      }else if(p.tipo == "electrico"){
        //<i class="fas fa-bolt"></i>
        icono.classList.add("fas","fa-bolt","text-warning","fa-3x")
      }else if(p.tipo == "agua"){
        //<i class="fas fa-tint"></i>
        icono.classList.add("fas","fa-tint","text-primary","fa-3x")
      }else if(p.tipo == "normal"){
        //<i class="fas fa-star"></i>
        icono.classList.add("fas","fa-star","text-info","fa-3x")
      }
      tdTipo.classList.add("text-center");
      tdTipo.appendChild(icono);
      
      let tdDescripcion = document.createElement("td");
      tdDescripcion.innerHTML = p.descripcion;
      let tdAcciones = document.createElement("td");
      tdAcciones.classList.add("text-center");
      //Agregar un boton al td de acciones
      let boton = document.createElement("button");//crear elementos
      boton.classList.add("btn","btn-danger");//cambiar clases de los elementos
      boton.innerText = "Enviar al profeson oak";//cambiar texto de un elemento
      boton.nro = i;
      boton.addEventListener("click",eliminarpokemon);
      tdAcciones.appendChild(boton); // agregar un elemento dentro de otro

      //5-Agregar las celdas al tr
      tr.appendChild(tdNRO);
      tr.appendChild(tdNombre);
      tr.appendChild(tdTipo);
      tr.appendChild(tdDescripcion);
      tr.appendChild(tdAcciones);
      
      //6-Agregar el tr a la tabla
      tbody.appendChild(tr);
    }

  };
  
  document.querySelector("#registrar-btn").addEventListener("click", () =>{
    //value es para obtener el valor de los input de texto
    let nombre = document.querySelector("#nombre-txt").value;
    //esto lo saque de la pagina de tinymce, es para obtener lo escrito
    let descripcion = tinymce.get("descripcion-txt").getContent();
    //checked indica si el radiobutton esta seleccionado
    let legendario = document.querySelector("#legendario-si").checked;
    //el tipo se obtiene igual que los input
    let tipo = document.querySelector("#tipo-select").value;

    //Como crear un objeto
    let pokemon = {};
    pokemon.nombre = nombre;
    pokemon.descripcion = descripcion;
    pokemon.legendario = legendario;
    pokemon.tipo = tipo;

    //Como guardar en una lista de elementos
    pokemones.push(pokemon); // append
    cargarTabla();
    Swal.fire("Registro de Menu realizado","success");
} );

document.querySelector("#limpiar-btn").addEventListener("click",()=>{
    document.querySelector("#nombre-txt").value="";
    tinymce.get("descripcion-txt").setContent("");
    document.querySelector("#tipo-select").value = "desayuno";
  });
  