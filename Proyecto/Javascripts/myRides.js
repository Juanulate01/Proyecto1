document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('table tbody');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  const activeUser = users.find(user => user.usStatus === 'Activo');

  if (!activeUser) {
    window.location.href = '/Proyecto/index.html';
    return;
  }
  if (activeUser) {
    const userType = activeUser.userType;
  
    const myRidesLink = document.querySelector('.navBtn a[href="/Proyecto/myRides.html"]');
    const homeLink = document.querySelector('.navBtn a[href="/Proyecto/searchRides.html"]');
  
    if (userType === 'pasajero') {
      myRidesLink.removeAttribute('href');
      myRidesLink.style.cursor = 'default';
    } else if (userType === 'chofer') {
      homeLink.removeAttribute('href');
      homeLink.style.cursor = 'default';
    }
  }

  const activeUsername = `${activeUser.firstName} ${activeUser.lastName}`;
  
  const rides = JSON.parse(localStorage.getItem('newrides')) || [];
  tableBody.innerHTML = '';

  // Filtrar los viajes que corresponden al usuario activo
  const filteredRides = rides.map((ride, index) => ({ ...ride, originalIndex: index }))
                            .filter(ride => ride.userName === activeUsername);

  // Agrega cada viaje a la tabla
  filteredRides.forEach((ride) => {
    const row = document.createElement('tr');
    
    // Crea celdas
    const fromCell = document.createElement('td');
    fromCell.innerHTML = `<a>${ride.departure}</a>`;
    
    const toCell = document.createElement('td');
    toCell.textContent = ride.arrival;
    
    const seatsCell = document.createElement('td');
    seatsCell.textContent = ride.seats;
    
    const carCell = document.createElement('td');
    carCell.textContent = `${ride.make} ${ride.model} ${ride.year}`;
    
    const feeCell = document.createElement('td');
    feeCell.textContent = `$${ride.fee}`;
    
    const actionsCell = document.createElement('td');
    actionsCell.innerHTML = `
      <a href="#" class="edit-link" data-index="${ride.originalIndex}">Edit</a> |
      <a href="#" class="delete-link" data-index="${ride.originalIndex}">Delete</a>
    `;
    
    // Agrega las celdas a la fila
    row.appendChild(fromCell);
    row.appendChild(toCell);
    row.appendChild(seatsCell);
    row.appendChild(carCell);
    row.appendChild(feeCell);
    row.appendChild(actionsCell);
    
    // Agrega la fila a la tabla
    tableBody.appendChild(row);
  });

  // Evento de clic a los enlaces de edición
  document.querySelectorAll('.edit-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const rideIndex = this.dataset.index;
      
      // Guarda la información del viaje a editar
      const rideToEdit = rides[rideIndex];
      localStorage.setItem('rideToEdit', JSON.stringify(rideToEdit));
      window.location.href = '/Proyecto/editRides.html';
    });
  });

  // Añadir evento de clic a los enlaces de eliminación
  document.querySelectorAll('.delete-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const rideIndex = this.dataset.index;

      const confirmed = confirm("Are you sure you want to delete this ride?");
      if (confirmed) {
        // Elimina el viaje del array
        rides.splice(rideIndex, 1);
        localStorage.setItem('newrides', JSON.stringify(rides));

        // Recarga la página para reflejar los cambios
        window.location.reload();
      }
    });
  });
});
document.getElementById('logout').addEventListener('click', function() {
  let users = JSON.parse(localStorage.getItem('users'));

  if (users && users.length > 0) {
      let activeUserIndex = users.findIndex(user => user.usStatus === 'Activo');

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
