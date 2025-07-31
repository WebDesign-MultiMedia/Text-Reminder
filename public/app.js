const form = document.getElementById('textReminderForm');
const reminderCard = document.getElementById('reminderCards')

// LocalStroage Saved
function loadReminderForm() {
    const reminderInfo = JSON.parse(localStorage.getItem('reminderInfo')) || [];
    reminderCard.innerHTML = '';

    reminderInfo.forEach((reminderForm, index) =>{
        const card = document.createElement('div');
        // card.className = 'text-white bg-green-200 rounded shadow-xl text-center';
        card.className = 'text-white bg-green-200 rounded shadow-xl text-center';

        card.innerHTML = `
            <p ><strong>Date:</strong> ${reminderForm.date}</p>
            <p ><strong>Time:</strong> ${reminderForm.time}</p>
            <p ><strong>Cell:</strong> ${reminderForm.textReminder}</p>
            <p ><strong>Reason:</strong> ${reminderForm.reasoning}</p>
            <button onclick="deleteReminder(${index})" class=" bg-red-400 rounded-md w-20 text-black ">Delete</button>
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
 reasoning : document.getElementById('reason').value,
};

const inputs = document.querySelectorAll('input');
const reasonTextarea = document.querySelectorAll('textarea');
const placeholderinput = document.getElementById('reason')
const btn =  document.getElementById('btn');
// const head = document.getElementById('header');

if(!reminderForm.date || !reminderForm.time || !reminderForm.textReminder || !reminderForm.reasoning){
    alert('ERRRRR')
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

document.addEventListener('DOMContentLoaded', loadReminderForm);
