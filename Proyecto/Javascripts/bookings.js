document.addEventListener('DOMContentLoaded', () => {
    // Extrae los usuarios y los usuarios activos
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const activeUser = users.find(user => user.usStatus === 'Activo');
  
    // valida si hay alguno activo
    if (!activeUser) {
        window.location.href = '/Proyecto/index.html';
        return;
    }
    if (activeUser) {
        // valida el tipo de usuario
        const userType = activeUser.userType;
      
        // Selecciona los enlaces
        const myRidesLink = document.querySelector('.navBtn a[href="/Proyecto/myRides.html"]');
        const homeLink = document.querySelector('.navBtn a[href="/Proyecto/searchRides.html"]');
      
        // Deshabilita el enlace segun el usuario
        if (userType === 'pasajero') {
          myRidesLink.removeAttribute('href');
          myRidesLink.style.cursor = 'default'; 
        } else if (userType === 'chofer') {
          homeLink.removeAttribute('href');
          homeLink.style.cursor = 'default';
        }
      }
    
  
    // Saca las req del localstorage
    const requests = JSON.parse(localStorage.getItem('newreq')) || [];
    const tableBody = document.querySelector('tbody');
  
    // Limpia la tabla
    tableBody.innerHTML = '';
  
    // Recorre las solicitudes de viajes y validarlas
    requests.forEach((request, index) => {
        const isPassenger = activeUser.userType === 'pasajero' && request.userName === `${activeUser.firstName} ${activeUser.lastName}`;
        const isDriver = activeUser.userType === 'chofer' && request.driver === `${activeUser.firstName} ${activeUser.lastName}`;
  
        // Muestra la solicitud si el usuario es el pasajero o el conductor asociado al viaje
        if (isPassenger || isDriver) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="/Proyecto/Imagenes/persona.png" alt="User Icon">
                    ${request.userName}
                </td>
                <td>${request.departure} - ${request.arrival}</td>
                <td class="status-cell">
                    ${isPassenger ? request.reqstatus : request.reqstatus === 'On hold' ? 
                    `<a href="#" class="accept" data-index="${index}">Accept</a> | <a href="#" class="reject" data-index="${index}">Reject</a>` 
                    : request.reqstatus}
                </td>
            `;
            tableBody.appendChild(row);
        }
    });
  
    //  Eventos a los enlaces de Accept y Reject
    document.querySelectorAll('.accept').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const index = event.target.getAttribute('data-index');
            const acceptedRequest = requests[index];

            // Pone el estado
            acceptedRequest.reqstatus = 'Accepted';
            localStorage.setItem('newreq', JSON.stringify(requests));

            // Saca los viajes disponibles
            const rides = JSON.parse(localStorage.getItem('newrides')) || [];

            // Resta los campos
            const rideIndex = rides.findIndex(ride =>
                ride.departure === acceptedRequest.departure &&
                ride.arrival === acceptedRequest.arrival &&
                ride.time === acceptedRequest.time &&
                ride.userName === acceptedRequest.driver
            );

            if (rideIndex !== -1) {
                const selectedRide = rides[rideIndex];
                selectedRide.seats -= acceptedRequest.seats;

                // Borra el ride si no tiene asientos disponibles
                if (selectedRide.seats <= 0) {
                    rides.splice(rideIndex, 1);
                } else {
                    rides[rideIndex] = selectedRide;
                }

                localStorage.setItem('newrides', JSON.stringify(rides));
            }

            // Pone aceptado
            event.target.closest('.status-cell').innerHTML = 'Accepted';
        });
    });

    document.querySelectorAll('.reject').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const index = event.target.getAttribute('data-index');
            requests[index].reqstatus = 'Rejected';
            localStorage.setItem('newreq', JSON.stringify(requests));

            // Pone rechazado
            event.target.closest('.status-cell').innerHTML = 'Rejected';
        });
    });
});
document.getElementById('logout').addEventListener('click', function() {
    let users = JSON.parse(localStorage.getItem('users'));
  
    // compara usuarios
    if (users && users.length > 0) {
        // busca el que esta activo
        let activeUserIndex = users.findIndex(user => user.usStatus === 'Activo');
  
        // Cambia a inactivo 
        if (activeUserIndex !== -1) {
            users[activeUserIndex].usStatus = 'Inactivo';
  
            localStorage.setItem('users', JSON.stringify(users));
  

            alert("Logout successful!");
            window.location.href = "/Proyecto/index.html";
        }
    }
});
  
document.getElementById('settings').addEventListener('click', function() {
    let users = JSON.parse(localStorage.getItem('users'));
    if (users && users.length > 0) {
        let activeUserIndex = users.findIndex(user => user.usStatus === 'Activo');
  
        if (activeUserIndex !== -1) {
            let userType = users[activeUserIndex].userType;
  
            // Lo manda a una pagina distinta segun su tipo
            if (userType === 'pasajero') {
                window.location.href = '/Proyecto/editProf.html';
            } else if (userType === 'chofer') {
                window.location.href = '/Proyecto/editDriver.html';
            }
        } else {
            alert("There are no active users.");
            window.location.href = '/Proyecto/index.html';
        }
    } else {
        alert("There are no registered users.");
        window.location.href = '/Proyecto/index.html';
    }
});


  
  
  