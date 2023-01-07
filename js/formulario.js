document
  .getElementById("btn-enviar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const textEmail = document.getElementById("textEmail").value;
    const userComment = document.getElementById("userComment").value;

     // Valida los campos del formulario
     if (userName.length < 5 || userName === "" || textEmail.length < 1 || userComment.length < 1) {
        Swal.fire({
          icon: 'error',
          text: 'Hay errores en el formulario'
        });
        return;
      }
      
      
      // Muestra los valores en una alerta
  Swal.fire({
    title: "Datos del formulario enviado",
    text: "Nombre y Apellido: " + userName + ", Consulta: " + userComment +  ", Mail: " + textEmail,
    icon: "success"
  });
  });
