document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const activeUser = users.find(user => user.usStatus === 'Activo');
  
    if (!activeUser) {
      window.location.href = '/Proyecto/index.html';
    }
    if (activeUser) {
        const userType = activeUser.userType;
      
        // Selecciona los enlaces
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
  
    const rides = JSON.parse(localStorage.getItem('newrides')) || [];
  
    function displayRides(filteredRides) {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';

        filteredRides.forEach((ride, index) => {
            // Filtra rides con seats igual a 0
            if (ride.seats === 0) {
                return;
            }

            const driver = users.find(user => `${user.firstName} ${user.lastName}` === ride.userName) || { firstName: "Unknown", lastName: "" };
            const driverName = `${driver.firstName} ${driver.lastName}`;
            const driverImg = "/Proyecto/Imagenes/persona.png";

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${driverImg}" alt="User Icon"> ${driverName}</td>
                <td>${ride.departure}</td>
                <td>${ride.arrival}</td>
                <td>${ride.seats}</td>
                <td>${ride.make} ${ride.model} ${ride.year}</td>
                <td>$${ride.fee || '--'}</td>
                <td><a href="/Proyecto/reqRides.html" class="request-link" data-index="${index}">Request</a></td>
            `;
            row.querySelector('.request-link').addEventListener('click', () => {
                localStorage.setItem('selectedRide', JSON.stringify(ride));
            });
            tbody.appendChild(row);
        });

        document.querySelectorAll('.request-link').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const rideIndex = this.getAttribute('data-index');
                localStorage.setItem('selectedRide', JSON.stringify(filteredRides[rideIndex]));
                window.location.href = this.getAttribute('href');
            });
        });
    }

    function populateSelectBoxes() {
        const fromSelect = document.getElementById('selectFrom');
        const toSelect = document.getElementById('selectTo');

        const uniqueDepartures = new Set();
        const uniqueArrivals = new Set();

        rides.forEach(ride => {
            uniqueDepartures.add(ride.departure);
            uniqueArrivals.add(ride.arrival);
        });

        uniqueDepartures.forEach(departure => {
            const option = document.createElement('option');
            option.value = departure;
            option.textContent = departure;
            fromSelect.appendChild(option);
        });

        uniqueArrivals.forEach(arrival => {
            const option = document.createElement('option');
            option.value = arrival;
            option.textContent = arrival;
            toSelect.appendChild(option);
        });
    }

    function filterRides() {
        const from = document.getElementById('selectFrom').value;
        const to = document.getElementById('selectTo').value;
        const selectedDays = Array.from(document.querySelectorAll('#selecDays input:checked')).map(input => input.nextSibling.textContent.trim());
        const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();

        const filteredRides = rides.filter(ride => {
            const matchFrom = ride.departure === from;
            const matchTo = ride.arrival === to;
            const matchDays = selectedDays.length === 0 || selectedDays.some(day => ride.days.includes(day));
            const matchSearchTerm = ride.userName.toLowerCase().includes(searchTerm) || ride.make.toLowerCase().includes(searchTerm) || ride.model.toLowerCase().includes(searchTerm);

            return matchFrom && matchTo && matchDays && matchSearchTerm;
        });

        displayRides(filteredRides);
        document.getElementById('showFrom').textContent = from;
        document.getElementById('showTo').textContent = to;
    }

    function setupFindRidesButton() {
        document.getElementById('fndRides').addEventListener('click', (event) => {
            event.preventDefault();
            filterRides();
        });
    }

    populateSelectBoxes();
    setupFindRidesButton();
    displayRides(rides);
});

document.getElementById('logout').addEventListener('click', function() {
    let users = JSON.parse(localStorage.getItem('users'));
  
    if (users && users.length > 0) {
        // Encontrar el usuario activo
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
        // Encontrar el usuario activo
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






