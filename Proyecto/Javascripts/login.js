document.querySelector('.buttonLogin').addEventListener('click', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  let users = JSON.parse(localStorage.getItem('users')) || [];

  let validUserIndex = users.findIndex(user => user.email === username && user.password === password);

  if (validUserIndex !== -1) {
    // Cambia el usStatus a "Activo"
    users[validUserIndex].usStatus = 'Activo';
    localStorage.setItem('users', JSON.stringify(users));

    alert("Login successful!");

    // Validar el tipo de usuario
    if (users[validUserIndex].userType === 'pasajero') {
      window.location.href = '/Proyecto/searchRides.html';
    } else if (users[validUserIndex].userType === 'chofer') {
      window.location.href = '/Proyecto/myRides.html';
    }
  } else {
    alert("Incorrect username or password.");
  }
});
