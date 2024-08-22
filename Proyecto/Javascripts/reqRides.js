document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const activeUser = users.find(user => user.usStatus === 'Activo');
  
    if (!activeUser) {
      window.location.href = '/Proyecto/index.html';
      return;
    }
  
    const selectedRide = JSON.parse(localStorage.getItem('selectedRide'));
  
    if (!selectedRide) {
      alert("No ride selected.");
      window.location.href = '/Proyecto/searchRides.html';
      return;
    }
  
    const driver = users.find(user => `${user.firstName} ${user.lastName}` === selectedRide.userName) || { firstName: "Unknown", lastName: "" };
    const driverName = `${driver.firstName} ${driver.lastName}`;
  
    // Rellena los campos con los datos del viaje 
    document.querySelector('h1.header').textContent = `${selectedRide.departure} - ${selectedRide.arrival}`;
    document.getElementById('Driver').textContent = driverName;
    document.getElementById('departure').value = selectedRide.departure;
    document.getElementById('arrival').value = selectedRide.arrival;
    document.getElementById('time').value = selectedRide.time;
    document.getElementById('seats').value = selectedRide.seats;
    document.getElementById('fee').value = selectedRide.fee;
    document.getElementById('make').value = selectedRide.make;
    document.getElementById('model').value = selectedRide.model;
    document.getElementById('year').value = selectedRide.year;
  
    // Deshabilita todos los campos menos 'seats'
    document.getElementById('departure').disabled = true;
    document.getElementById('arrival').disabled = true;
    document.getElementById('time').disabled = true;
    document.getElementById('fee').disabled = true;
    document.getElementById('make').disabled = true;
    document.getElementById('model').disabled = true;
    document.getElementById('year').disabled = true;
  
    // Mostrar solo los días seleccionado
    const dayCheckboxes = document.querySelectorAll('.form-group.days input[type="checkbox"]');
    dayCheckboxes.forEach(checkbox => {
      checkbox.checked = selectedRide.days.includes(checkbox.value);
      checkbox.disabled = true; 
    });
  
    //Guarda la nueva información
    document.getElementById('Request-button').addEventListener('click', () => {
      const seatsValue = document.getElementById('seats').value;
      const seats = parseInt(seatsValue, 10);
  
      // Validar el valor de seats
      if (isNaN(seats) || seats < 0 || seats > selectedRide.seats) {
        alert("Invalid number of seats. Must be a positive number and not greater than the number available.");
        return;
      }
  
      const newReq = {
        departure: selectedRide.departure,
        arrival: selectedRide.arrival,
        time: selectedRide.time,
        seats: seats,
        fee: selectedRide.fee,
        make: selectedRide.make,
        model: selectedRide.model,
        year: selectedRide.year,
        days: selectedRide.days,
        reqstatus: 'On hold',
        driver: driverName,
        userName: activeUser ? `${activeUser.firstName} ${activeUser.lastName}` : "Unknown",
      };
  
      // Obtiene las solicitudes existentes
      let requests = JSON.parse(localStorage.getItem('newreq')) || [];
  
      requests.push(newReq);

      localStorage.setItem('newreq', JSON.stringify(requests));
  
      alert("Request saved successfully.");
      window.location.href = '/Proyecto/searchRides.html';
    });
  
    document.getElementById('cancel-button').addEventListener('click', () => {
      window.location.href = '/Proyecto/searchRides.html';
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
  

