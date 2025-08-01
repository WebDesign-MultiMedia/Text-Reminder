const form = document.getElementById('textReminderForm');
const reminderCard = document.getElementById('reminderCards');

//  Format date as MM/DD/YYYY
function formatDate(inputDate) {
    if (!inputDate) return '';
    const [year, month, day] = inputDate.split('-');
    return `${month}/${day}/${year}`;
}

// Format Time as !2-Hour
function formatTimeTo12Hour(timeStr) {
    if(!timeStr) return '';
    let [hour, minute] = timeStr.split(':');
    hour = parseInt(hour);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    if (hour === 0) {
        hour = 12;
    }
            return `${hour}:${minute} ${ampm}`;

}

// Load reminders from localStorage and display them
function loadReminderForm() {
    const reminderInfo = JSON.parse(localStorage.getItem('reminderInfo')) || [];
    reminderCard.innerHTML = '';

    reminderInfo.forEach((reminderForm, index) => {
        const card = document.createElement('div');
        card.className = "flex border-2 border-green-300 m-2 p-2 ml-20 mr-20 flex-col rounded-xl shadow-xl items-center";
        card.innerHTML = `
            <p class="w-40 pl-5 rounded-t-md text-s"><strong class="text-white text-xl">Date:</strong> ${reminderForm.date}</p>
            <p class="w-40 text-left pl-5"><strong class="text-white text-xl">Time:</strong> ${reminderForm.time}</p>
            <p class="w-40 pl-5"><strong class="text-white text-xl">Cell:</strong> ${reminderForm.textReminder}</p>
            <p class="w-40 text-center rounded-b-md border-2 border-gray-300 mt-3 "><strong class="text-white text-2xl">Reason:</strong><br> ${reminderForm.reasoning}</p>
            <button onclick="deleteReminder(${index})" class="mt-3 mb-2 border-2 border-red-600 rounded-md w-20 text-red-300">Delete</button>
        `;
        reminderCard.appendChild(card);
    });
}

// Delete reminder
function deleteReminder(index) {
    const reminderInfo = JSON.parse(localStorage.getItem('reminderInfo')) || [];
    reminderInfo.splice(index, 1);
    localStorage.setItem('reminderInfo', JSON.stringify(reminderInfo));
    loadReminderForm();
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dateInput = document.getElementById('date').value;
    const formattedDate = formatDate(dateInput);
    const rawTime = document.getElementById('time').value;
    const formmattedTime = formatTimeTo12Hour(rawTime);

    const reminderForm = {
        date: formattedDate,
        time: formmattedTime,
        textReminder: document.getElementById('textReminder').value,
        reasoning: document.getElementById('reason').value,
    };

    const inputs = document.querySelectorAll('input');
    const reasonTextarea = document.querySelectorAll('textarea');
    const btn = document.getElementById('btn');

    // Simple validation
    if (!reminderForm.date || !reminderForm.time || !reminderForm.textReminder || !reminderForm.reasoning) {
        alert('Please fill in all fields');
        inputs.forEach(input => {
            input.style.backgroundColor = 'lightcoral';
            input.style.color = 'white';
            input.style.border = '1px solid white';
            form.style.border = '2px solid red';
        });
        reasonTextarea.forEach(reasonTextareas => {
            reasonTextareas.style.backgroundColor = 'lightcoral';
            reasonTextareas.style.border = '1px solid white';
        });
        btn.style.backgroundColor = 'lightcoral';
        btn.style.border = '1px solid white';
        btn.style.color = 'white';
        return;
     }else{
    alert('success')
}

    // Save to localStorage
    const reminderInfo = JSON.parse(localStorage.getItem('reminderInfo')) || [];
    reminderInfo.push(reminderForm);
    localStorage.setItem('reminderInfo', JSON.stringify(reminderInfo));

    location.reload();
    loadReminderForm();
});

// Load reminders on page load
document.addEventListener('DOMContentLoaded', loadReminderForm);
