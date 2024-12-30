// Function to handle form submission
function submitValue() {
    const firstName = document.getElementById('first-input').value;
    const lastName = document.getElementById('last-input').value;
    const dob = document.getElementById('date-input').value;
    const gender = document.getElementById('male-input').checked ? 'Male' : document.getElementById('female-input').checked ? 'Female' : '';
    const fatherName = document.getElementById('father-input').value;
    const motherName = document.getElementById('mother-input').value;
    const contact = document.getElementById('contact-input').value;
    const address = document.getElementById('address-input').value;
    const className = document.getElementById('class-input').value;
    const rollNo = document.getElementById('roll-input').value;

    // Validate inputs
    if (!firstName || !lastName || !dob || !gender || !fatherName || !motherName || !contact || !address || !className || !rollNo) {
        alert('Please fill out all fields.');
        return;
    }

    // Retrieve existing students from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Check if we're editing an existing student
    const studentIndex = students.findIndex(student => student.rollNo === rollNo);

    if (studentIndex !== -1) {
        // Update existing student
        students[studentIndex] = {
            firstName,
            lastName,
            dob,
            gender,
            fatherName,
            motherName,
            contact,
            address,
            className,
            rollNo
        };
    } else {
        // Add new student if not found
        students.push({
            firstName,
            lastName,
            dob,
            gender,
            fatherName,
            motherName,
            contact,
            address,
            className,
            rollNo
        });
    }

    // Save updated data back to localStorage
    localStorage.setItem('students', JSON.stringify(students));

    // Update the UI
    displayTable();

    // Clear form inputs
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
}

// Function to display all data from localStorage to the table
function displayTable() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tableSection = document.getElementById('table-section');
    const table = document.getElementById('data-table');

    // Clear any existing rows
    table.innerHTML = "";

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border border-gray-400 px-4 py-2">${student.firstName}</td>
            <td class="border border-gray-400 px-4 py-2">${student.lastName}</td>
            <td class="border border-gray-400 px-4 py-2">${student.dob}</td>
            <td class="border border-gray-400 px-4 py-2">${student.gender}</td>
            <td class="border border-gray-400 px-4 py-2">${student.fatherName}</td>
            <td class="border border-gray-400 px-4 py-2">${student.motherName}</td>
            <td class="border border-gray-400 px-4 py-2">${student.contact}</td>
            <td class="border border-gray-400 px-4 py-2">${student.address}</td>
            <td class="border border-gray-400 px-4 py-2">${student.className}</td>
            <td class="border border-gray-400 px-4 py-2">${student.rollNo}</td>
            <td class="border border-gray-400 px-4 py-2 flex">
                <button class="border-2 border-black px-2 py-2 mr-2 rounded-lg" onclick="fetchStudentData(${student.rollNo})">edit</button>
            </td>
        `;
        table.appendChild(row);
    });

    // Show or hide table section based on data
    if (students.length > 0) {
        tableSection.classList.remove('hidden');
    } else {
        tableSection.classList.add('hidden');
    }
}

// Initial call to populate table on page load
window.onload = displayTable;


// Function to fetch student data by roll number and populate the form for editing
function fetchStudentData(rollNo) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    
     // Ensure rollNo is treated as a string to match data stored in localStorage
    rollNo = rollNo.toString();

    // Find the student by roll number
    const student = students.find(student => student.rollNo.toString() === rollNo);
    
    // If the student is found, pre-fill the form with their data
    if (student) {
        document.getElementById('first-input').value = student.firstName;
        document.getElementById('last-input').value = student.lastName;
        document.getElementById('date-input').value = student.dob;
        document.getElementById('male-input').checked = student.gender === 'Male';
        document.getElementById('female-input').checked = student.gender === 'Female';
        document.getElementById('father-input').value = student.fatherName;
        document.getElementById('mother-input').value = student.motherName;
        document.getElementById('contact-input').value = student.contact;
        document.getElementById('address-input').value = student.address;
        document.getElementById('class-input').value = student.className;
        document.getElementById('roll-input').value = student.rollNo;
    }
}


// Function to search data
function searchData() {
    const searchQuery = document.getElementById('search').value.toLowerCase();  // Get the search query from the input field 
    const students = JSON.parse(localStorage.getItem('students')) || [];  // Retrieve students data from localStorage, or initialize as an empty array if no data is found
    const table = document.getElementById('data-table');

    table.innerHTML = ""; // Clear existing table rows

    const filteredStudents = students.filter(student => (
        student.firstName.toLowerCase().includes(searchQuery) ||
        student.lastName.toLowerCase().includes(searchQuery) ||
        student.dob.toLowerCase().includes(searchQuery) ||
        student.gender.toLowerCase().includes(searchQuery) ||
        student.fatherName.toLowerCase().includes(searchQuery) ||
        student.motherName.toLowerCase().includes(searchQuery) ||
        student.contact.toLowerCase().includes(searchQuery) ||
        student.address.toLowerCase().includes(searchQuery) ||
        student.className.toLowerCase().includes(searchQuery) ||
        student.rollNo.toLowerCase().includes(searchQuery)
    ));
    
     // Check if any students match the search query
    if (filteredStudents.length > 0) {
        filteredStudents.forEach(student => {            // If results are found, loop through the filtered students and display them in the table
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border border-gray-400 px-4 py-2">${student.firstName}</td>
                <td class="border border-gray-400 px-4 py-2">${student.lastName}</td>
                <td class="border border-gray-400 px-4 py-2">${student.dob}</td>
                <td class="border border-gray-400 px-4 py-2">${student.gender}</td>
                <td class="border border-gray-400 px-4 py-2">${student.fatherName}</td>
                <td class="border border-gray-400 px-4 py-2">${student.motherName}</td>
                <td class="border border-gray-400 px-4 py-2">${student.contact}</td>
                <td class="border border-gray-400 px-4 py-2">${student.address}</td>
                <td class="border border-gray-400 px-4 py-2">${student.className}</td>
                <td class="border border-gray-400 px-4 py-2">${student.rollNo}</td>
            `;
            table.appendChild(row);
        });
    } else {              // If no results are found, show a message indicating no matching data
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="10" class="text-center text-red-500 font-bold py-2">No results found</td>`;
        table.appendChild(row);
    }
}
// adding debounce function  for delay time
let debounceTimer; // To store the timer reference

// Debounce function to delay searchData call
function debounce(func, delay) {
    clearTimeout(debounceTimer); // Clear the previous timer if there is one
    debounceTimer = setTimeout(func, delay); // Set a new timer
}
// The search input field will now call the debounce function
document.getElementById('search').addEventListener('input', function () {
    debounce(searchData, 500); // Call the debounce function with 500ms delay
});
