document.querySelector('.buttonLogin').addEventListener('click', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];

  let validUser = users.find(user => user.email === username && user.password === password);

  if (validUser) {
    alert("Login exitoso!");
    // Validar el tipo de usuario
    if (validUser.userType === 'pasajero') {
      window.location.href = '/Proyecto/searchRides.html';
    } else if (validUser.userType === 'chofer') {
      window.location.href = '/Proyecto/bookings.html';
    }
  } else {
    alert("Nombre de usuario o contraseña incorrectos.");
  }
});