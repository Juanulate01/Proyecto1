document.getElementById('signUpBtn').addEventListener('click', function(event) {
  event.preventDefault();
  //Hace exatamente lo mismo que UserReg
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const idNumber = document.getElementById('idNumber').value.trim();
  const password = document.getElementById('Password').value.trim();
  const repeatPassword = document.getElementById('repeatPassword').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const dateBirth = document.getElementById('dateBirth').value.trim();
  const email = document.getElementById('email').value.trim();
  const vehicleMake = document.getElementById('vehicleMake').value.trim();
  const vehicleModel = document.getElementById('vehicleModel').value.trim();
  const vehicleYear = document.getElementById('vehicleYear').value.trim();
  const idVehicle = document.getElementById('idVehicle').value.trim();

  if (!firstName || !lastName || !idNumber || !password || !repeatPassword || !phoneNumber || !dateBirth || !email || !vehicleMake || !vehicleModel || !vehicleYear || !idVehicle) {
    alert('Please fill in all fields');
    return;
  }

  if (password !== repeatPassword) {
    alert('Passwords do not match');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];

  // revisa si el correo ya está registrado
  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    alert('This email is already registered.');
    return;
  }

  const user = {
    firstName,
    lastName,
    idNumber,
    password,
    phoneNumber,
    dateBirth,
    email,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    idVehicle,
    userType: 'chofer', 
    usStatus: 'inactivo' 
  };

  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  alert("Registration successful!");
  window.location.href = '/Proyecto/index.html';
});