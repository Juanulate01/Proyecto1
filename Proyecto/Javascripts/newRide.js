document.addEventListener('DOMContentLoaded', () => {
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
});

document.addEventListener('DOMContentLoaded', () => {
  const createBtn = document.getElementById('createBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const activeUser = users.find(user => user.usStatus === 'Activo');

  createBtn.addEventListener('click', () => {
      const departure = document.getElementById('departure').value;
      const arrival = document.getElementById('arrival').value;
      const time = document.getElementById('time').value;
      const seats = parseInt(document.getElementById('seats').value, 10);
      const fee = document.getElementById('fee').value;
      const make = document.getElementById('make').value;
      const model = document.getElementById('model').value;
      const year = document.getElementById('year').value;

      const days = Array.from(document.querySelectorAll('.days input:checked'))
          .map(input => input.value);

      const userName = activeUser ? `${activeUser.firstName} ${activeUser.lastName}` : 'Unknown User';

      const newrides = {
          departure,
          arrival,
          time,
          seats,
          fee,
          make,
          model,
          year,
          days,
          userName  
      };

      // Guarda el nuevo ride 
      let currentRides = JSON.parse(localStorage.getItem('newrides')) || [];
      currentRides.push(newrides);
      localStorage.setItem('newrides', JSON.stringify(currentRides));

      alert("Ride creation successful!");
      window.location.href = '/Proyecto/myRides.html';
  });

  cancelBtn.addEventListener('click', () => {
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