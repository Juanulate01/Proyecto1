document.getElementById('signUpBtn').addEventListener('click', function(event) {
    event.preventDefault();
  
    const firstName = document.getElementById('firstName').value.trim();;
    const lastName = document.getElementById('lastName').value.trim();;
    const email = document.getElementById('email').value.trim();;
    const password = document.getElementById('password').value.trim();;
    const repeatPassword = document.getElementById('repeatPassword').value.trim();;
    const address = document.getElementById('address').value.trim();;
    const country = document.getElementById('country').value.trim();;
    const state = document.getElementById('state').value.trim();;
    const city = document.getElementById('city').value.trim();;
    const phoneNumber = document.getElementById('phoneNumber').value.trim();;
  
    if (!firstName || !lastName || !email || !password || !repeatPassword || !address || !country || !state || !city || !phoneNumber) {
      alert('Por favor llene todos los campos');
      return;
    }
  
    if (password !== repeatPassword) {
      alert('Las contraseñas no coinciden');
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
      userType: 'chofer' //Agrega el chofer automaticamente
    };
  
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  
    alert("Registration successful!");
    window.location.href = '/Proyecto/index.html';
  });