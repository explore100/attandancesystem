// Ensure this code is included in view.html inside a <script> tag or external JS file
document.addEventListener('DOMContentLoaded', function() {
    const studentData = JSON.parse(sessionStorage.getItem('selectedStudent'));
    const detailsContainer = document.getElementById('studentDetails');

    if (studentData) {
        const details = `
            <div class="grid grid-cols-2 gap-4">
                <p class="font-semibold">First Name:</p>
                <p>${studentData.firstName}</p>
                
                <p class="font-semibold">Last Name:</p>
                <p>${studentData.lastName}</p>
                
                <p class="font-semibold">Date of Birth:</p>
                <p>${studentData.dob}</p>
                
                <p class="font-semibold">Gender:</p>
                <p>${studentData.gender}</p>
                
                <p class="font-semibold">Father's Name:</p>
                <p>${studentData.fatherName}</p>
                
                <p class="font-semibold">Mother's Name:</p>
                <p>${studentData.motherName}</p>
                
                <p class="font-semibold">Contact:</p>
                <p>${studentData.contact}</p>
                
                <p class="font-semibold">Address:</p>
                <p>${studentData.address}</p>
                
                <p class="font-semibold">Class:</p>
                <p>${studentData.className}</p>
                
                <p class="font-semibold">Roll No:</p>
                <p>${studentData.rollNo}</p>
            </div>
        `;
        detailsContainer.innerHTML = details;
    } else {
        detailsContainer.innerHTML = '<p class="text-red-500 text-center">No student data found</p>';
    }
});
const students = [
    { Subject: "1", physics: 90, chemistry: 85, math: 88, bio: 80, english: 89 },
    { Subject: "2", physics: 85, chemistry: 88, math: 95, bio: 84, english: 90 }
];

function displayTable() {
    const tableSection = document.getElementById('table-section');
    const table = document.getElementById('data-table');

    table.innerHTML = "";

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border border-gray-400 px-4 py-2">${student.Subject}</td>
            <td class="border border-gray-400 px-4 py-2">${student.physics}</td>
            <td class="border border-gray-400 px-4 py-2">${student.chemistry}</td>
            <td class="border border-gray-400 px-4 py-2">${student.math}</td>
            <td class="border border-gray-400 px-4 py-2">${student.bio}</td>
            <td class="border border-gray-400 px-4 py-2">${student.english}</td>
        `;
        table.appendChild(row);
    });

    if (students.length > 0) {
        tableSection.classList.remove('hidden');
    } else {
        tableSection.classList.add('hidden');
    }
}

document.getElementById('show-marksheet-btn').addEventListener('click', displayTable);