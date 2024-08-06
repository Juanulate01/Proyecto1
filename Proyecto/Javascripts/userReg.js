document.getElementById('signUpBtn').addEventListener('click', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const repeatPassword = document.getElementById('repeatPassword').value;
  const address = document.getElementById('address').value;
  const country = document.getElementById('country').value;
  const state = document.getElementById('state').value;
  const city = document.getElementById('city').value;
  const phoneNumber = document.getElementById('phoneNumber').value;

  if (password !== repeatPassword) {
    alert('Passwords do not match');
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
    phoneNumber
  };

  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  alert("Registration successful!");
  window.location.href = '/Proyecto/index.html';
});