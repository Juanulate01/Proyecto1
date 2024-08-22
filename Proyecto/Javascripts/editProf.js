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
function getActiveUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const activeStatus = 'Activo'; 
    return users.find(user => user.usStatus === activeStatus) || null;
}

document.addEventListener('DOMContentLoaded', function() {
    const user = getActiveUser();
    if (user) {
        document.getElementById('email').value = user.email;
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('address').value = user.address;
        document.getElementById('country').value = user.country;
        document.getElementById('state').value = user.state;
        document.getElementById('city').value = user.city;
        document.getElementById('phoneNumber').value = user.phoneNumber;

        document.getElementById('password').value = "";
        document.getElementById('repeatPassword').value = "";
    } else {
        alert("No active user found.");
    }
});
document.getElementById('cancelBtn').addEventListener('click', function(event) {
    event.preventDefault();
    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', () => {
        window.location.href = '/Proyecto/searchRides.html';
    });

});
// edicion del usuario
document.getElementById('editBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const oldPassword = document.getElementById('password').value.trim();
    const newPassword = document.getElementById('repeatPassword').value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        const user = users[userIndex];

        if (user.password === oldPassword) {
            users[userIndex] = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: email,
                password: newPassword || oldPassword,
                address: document.getElementById('address').value.trim(),
                country: document.getElementById('country').value.trim(),
                state: document.getElementById('state').value.trim(),
                city: document.getElementById('city').value.trim(),
                phoneNumber: document.getElementById('phoneNumber').value.trim(),
                userType: user.userType, 
                usStatus: 'activo' 
            };

            localStorage.setItem('users', JSON.stringify(users));

            // Actualiza el usuario activo
            localStorage.setItem('activeUser', JSON.stringify(users[userIndex]));

            alert("User updated successfully!");
            window.location.href = '/Proyecto/index.html';
        } else {
            alert("The old password is incorrect.");
        }
    } else {
        alert("User not found");
    }
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
  
        // Si se encuentra un usuario activo
        if (activeUserIndex !== -1) {
            // se obtiene el tipo de usuario
            let userType = users[activeUserIndex].userType;
  
            // Redirige el usuario según su tipo
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


