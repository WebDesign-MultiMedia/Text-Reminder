const form = document.getElementById('textReminderForm');
const reminderCard = document.getElementById('reminderCards')

// LocalStroage Saved
function loadReminderForm() {
    const reminderInfo = JSON.parse(localStorage.getItem('reminderInfo')) || [];
    reminderCard.innerHTML = '';

    reminderInfo.forEach((reminderForm, index) =>{
        const card = document.createElement('div');
        card.className = 'bg-gray-300 rounded shadow-xl/60 text-center';

        card.innerHTML = `
            <p class="text-white text-left">Date: ${reminderForm.date}</p>
            <p class="text-white text-left">Time: ${reminderForm.time}</p>
            <p class="text-white text-left">Cell: ${reminderForm.textReminder}</p>
            <p class="text-white flex flex-col">Reason: ${reminderForm.reasoning}</p>
            <button onclick="deleteReminder(${index})" class="mt-2 mb-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
        `;
        reminderCard.appendChild(card);
    });
}

// Delete Reminder
function deleteReminder(index) {
    const reminderInfo = JSON.parse(localStorage.getItem('reminderInfo')) || [];
    reminderInfo.splice(index, 1);
    localStorage.setItem('reminderInfo', JSON.stringify(reminderInfo));
    loadReminderForm();
}

//  From validation, value
form.addEventListener('submit',(e) =>{
    
    e.preventDefault();

const reminderForm = {
 date : document.getElementById('date').value,
 time : document.getElementById('time').value,
 textReminder : document.getElementById('textReminder').value,
 reasoning : document.getElementById('reason').value
};

const inputs = document.querySelectorAll('input');
const reasonTextarea = document.querySelectorAll('textarea');
const placeholderinput = document.getElementById('reason')
const btn =  document.getElementById('btn');
// const head = document.getElementById('header');

if(!reminderForm.date || !reminderForm.time || !reminderForm.textReminder || !reminderForm.reasoning){
    // alert('ERRRRR')
    inputs.forEach(input => {
        input.style.backgroundColor = 'lightcoral';
        input.style.color = 'white';
        input.style.border = '1px solid white';
    })
    reasonTextarea.forEach(reasonTextareas =>{
        reasonTextareas.style.backgroundColor = 'lightcoral';
        reasonTextareas.style.border = '1px solid white';
    })
    btn.style.backgroundColor = 'lightcoral';
    btn.style.border = '1px solid white';
    btn.style.color = 'white';

    placeholderinput.classList.add('blue-placeholder');
    return;
} else{
    alert('success')
}

const reminderInfo = JSON.parse(localStorage.getItem('reminderInfo')) || [];
reminderInfo.push(reminderForm);
localStorage.setItem('reminderInfo', JSON.stringify(reminderInfo));

form.reset();
loadReminderForm();
});
