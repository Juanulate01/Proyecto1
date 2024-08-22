document.addEventListener('DOMContentLoaded', () => {
    // saca la lista de usuarios del localStorage
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
    const activeStatus = 'Activo'; // Define el estado activo
    return users.find(user => user.usStatus === activeStatus) || null;
}

// Carga los datos del usuario activo
document.addEventListener('DOMContentLoaded', function() {
    const user = getActiveUser();
    if (user) {
        document.getElementById('email').value = user.email;
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('idNumber').value = user.idNumber;
        document.getElementById('phoneNumber').value = user.phoneNumber;
        document.getElementById('dateBirth').value = user.dateBirth;
        document.getElementById('vehicleMake').value = user.vehicleMake;
        document.getElementById('vehicleModel').value = user.vehicleModel;
        document.getElementById('vehicleYear').value = user.vehicleYear;
        document.getElementById('idVehicle').value = user.idVehicle;

        //Deja el password vacio para cambiarlo
        document.getElementById('Password').value = "";
        document.getElementById('repeatPassword').value = "";
    } else {
        alert("No active user found.");
    }
});

// Maneja la edición del usuario
document.getElementById('editBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const oldPassword = document.getElementById('Password').value.trim();
    const newPassword = document.getElementById('repeatPassword').value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        const user = users[userIndex];

        // compara la contraseña antigua
        if (user.password === oldPassword) {
            users[userIndex] = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: email,
                password: newPassword || oldPassword,
                idNumber: document.getElementById('idNumber').value.trim(),
                phoneNumber: document.getElementById('phoneNumber').value.trim(),
                dateBirth: document.getElementById('dateBirth').value.trim(),
                vehicleMake: document.getElementById('vehicleMake').value.trim(),
                vehicleModel: document.getElementById('vehicleModel').value.trim(),
                vehicleYear: document.getElementById('vehicleYear').value.trim(),
                idVehicle: document.getElementById('idVehicle').value.trim(),
                userType: user.userType, 
                usStatus: 'Activo'
            };

            localStorage.setItem('users', JSON.stringify(users));


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
