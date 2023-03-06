const table = document.querySelector('#interviews-table');

// Fetch the interview data from the server using the Fetch API
fetch('/interviews')
  .then((response) => response.json())
  .then((interviews) => {
    // Loop through each interview and create a new row in the table
    interviews.forEach((interview) => {
      const row = table.insertRow(-1);
      row.insertCell(0).textContent = interview.name;
      row.insertCell(1).textContent = interview.email;
      row.insertCell(2).textContent = interview.company.join(", ");
      row.insertCell(3).textContent = interview.status;
      row.insertCell(4).textContent = interview.phone;
    });
  })
  .catch((error) => {
    console.log('Error fetching interview details:', error);
  });