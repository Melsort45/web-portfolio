console.log("Running the script");

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("activity-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      //q no se recargue la pagina al enviar el formulario 
      event.preventDefault();

      //obtener todos los valores...
      var date = document.getElementById("date").value;
      var timeStart = document.getElementById("time_start").value;
      var timeEnd = document.getElementById("time_end").value;
      var activity = document.getElementById("activity").value;
      var place = document.getElementById("place").value;
      var typeSelect = document.getElementById("type");
      var type = typeSelect.options[typeSelect.selectedIndex].text;
      var notes = document.getElementById("notes").value;
      var isBusy = document.getElementById("busy").checked;

      // Definir la columna de estado con la imagen de 'Busy' o 'Free'
      var statusHTML = isBusy
        ? '<img src="images/busy.png" alt="Busy" width="20"> Busy'
        : '<img src="images/free.png" alt="Free" width="20"> Free';

      // Obtener el tbody de la tabla
      var tableBody = document.querySelector("#schedule-table tbody");

      if (tableBody) {
        //crea nueva fila tr
        var newRow = document.createElement("tr");

        //insertar el contenido html en las celdas td
        newRow.innerHTML =
          "<td>" + date + "</td>" +
          "<td>" + timeStart + "</td>" +
          "<td>" + timeEnd + "</td>" +
          "<td>" + activity + "</td>" +
          "<td>" + place + "</td>" +
          "<td>" + type + "</td>" +
          "<td>" + notes + "</td>" +
          "<td>" + statusHTML + "</td>";

        //agregar la nueva fila a la tabla
        tableBody.appendChild(newRow);

        //limpiar el formulario después de enviar
        form.reset();
      }
    });
  }
});