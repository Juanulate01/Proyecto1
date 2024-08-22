document.getElementById('signUpBtn').addEventListener('click', function(event) {
  event.preventDefault();
  //Extrae la info de los campos
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const repeatPassword = document.getElementById('repeatPassword').value.trim();
  const address = document.getElementById('address').value.trim();
  const country = document.getElementById('country').value.trim();
  const state = document.getElementById('state').value.trim();
  const city = document.getElementById('city').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();

  //Valida que los todos los campos esten llenos
  if (!firstName || !lastName || !email || !password || !repeatPassword || !address || !country || !state || !city || !phoneNumber) {
    alert('Please fill in all fields');
    return;
  }
  //Valida que los password sean iguales
  if (password !== repeatPassword) {
    alert('Passwords do not match');
    return;
  }
  let users = JSON.parse(localStorage.getItem('users')) || [];
  
  // valida si el correo no existe
  const existingUser = users.find(user => user.email === email);
  
  if (existingUser) {
    alert('This email is already registered.');
    return;
  }

  const user = {
    firstName,
    lastName,
    email,
    password,
    address,
    country,
    state,
    city,
    phoneNumber,
    userType: 'pasajero',
    usStatus: 'inactivo' 
  };

  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  alert("Registration successful!");
  window.location.href = '/Proyecto/index.html';
});