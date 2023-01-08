document.getElementById("btn-enviar").addEventListener("click", function (event) {
  event.preventDefault();
  const userName = document.getElementById("userName").value;
  const textEmail = document.getElementById("textEmail").value;
  const userComment = document.getElementById("userComment").value;

  if (userName.length < 5 || userName === "" || textEmail.length < 1 || userComment.length < 1) {
    Swal.fire({
      icon: 'error',
      text: 'Hay errores en el formulario'
    }).then(function() {
      // Limpia el formulario 
      document.getElementById("userName").value = "";
      document.getElementById("textEmail").value = "";
      document.getElementById("userComment").value = "";
    });
    return;
  }
  
  // Muestra los valores en una alerta
  Swal.fire({
    title: "Datos del formulario enviado",
    text: "Gracias " + userName + " por realizar la consulta, en breve nos comunicaremos a " + textEmail + " para responder su consulta",
    icon: "success"
  }).then(function() {
    // Limpia el formulario 
    document.getElementById("userName").value = "";
    document.getElementById("textEmail").value = "";
    document.getElementById("userComment").value = "";
  });
  
});
