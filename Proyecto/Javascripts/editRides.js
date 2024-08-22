document.addEventListener('DOMContentLoaded', () => {
  const rideToEdit = JSON.parse(localStorage.getItem('rideToEdit'));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const activeUser = users.find(user => user.usStatus === 'Activo');
  
    if (!activeUser) {
      window.location.href = '/Proyecto/index.html';
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

  // Verifica si hay un viaje a editar
  if (rideToEdit) {
    // Carga la información en los campos
    document.getElementById('departure').value = rideToEdit.departure;
    document.getElementById('arrival').value = rideToEdit.arrival;
    document.getElementById('time').value = rideToEdit.time;
    document.getElementById('seats').value = rideToEdit.seats;
    document.getElementById('fee').value = rideToEdit.fee;
    document.getElementById('make').value = rideToEdit.make;
    document.getElementById('model').value = rideToEdit.model;
    document.getElementById('year').value = rideToEdit.year;

    // Carga los días seleccionados
    const daysCheckboxes = document.querySelectorAll('.days input');
    daysCheckboxes.forEach(checkbox => {
      checkbox.checked = rideToEdit.days.includes(checkbox.value);
    });
  }

  // Guarda los cambios
  document.querySelector('.create-button').addEventListener('click', function(e) {
    e.preventDefault();

    const rides = JSON.parse(localStorage.getItem('newrides')) || [];
    
    // busca el viaje original
    const rideIndex = rides.findIndex(ride => ride.departure === rideToEdit.departure && ride.arrival === rideToEdit.arrival && ride.time === rideToEdit.time);

    // Actualiza la información
    rides[rideIndex] = {
      departure: document.getElementById('departure').value,
      arrival: document.getElementById('arrival').value,
      time: document.getElementById('time').value,
      seats: parseInt(document.getElementById('seats').value, 10),
      fee: document.getElementById('fee').value,
      make: document.getElementById('make').value,
      model: document.getElementById('model').value,
      year: document.getElementById('year').value,
      days: Array.from(document.querySelectorAll('.days input:checked')).map(input => input.value),
      userName: rideToEdit.userName
    };

    localStorage.setItem('newrides', JSON.stringify(rides));
    localStorage.removeItem('rideToEdit');
    window.location.href = '/Proyecto/myRides.html';
  });

  document.getElementById('cancel-button').addEventListener('click', () => {
    localStorage.removeItem('rideToEdit');
    window.location.href = '/Proyecto/myRides.html';
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
