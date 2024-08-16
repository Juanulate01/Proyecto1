document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.getElementById('createBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    createBtn.addEventListener('click', () => {
      const departure = document.getElementById('departure').value;
      const arrival = document.getElementById('arrival').value;
      const time = document.getElementById('time').value;
      const seats = document.getElementById('seats').value;
      const fee = document.getElementById('fee').value;
      const make = document.getElementById('make').value;
      const model = document.getElementById('model').value;
      const year = document.getElementById('year').value;
  
      // Pone los dias en un array
      const days = Array.from(document.querySelectorAll('.days input:checked'))
        .map(input => input.value);
  
      // crea el Json
      const newrides = {
        departure,
        arrival,
        time,
        seats,
        fee,
        make,
        model,
        year,
        days
      };
  
      localStorage.setItem('newrides', JSON.stringify(newrides));
      window.location.href = '/Proyecto/searchRides.html';
    });
  
    cancelBtn.addEventListener('click', () => {
      document.querySelector('form').reset();
      window.location.href = '/Proyecto/searchRides.html';
    });
  });