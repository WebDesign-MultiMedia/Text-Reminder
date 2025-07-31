const form = document.getElementById('textReminderForm');
const reminderCard = document.getElementById('reminderCards')

// LocalStroage Saved
function loadReminderForm() {
    const reminderInfo = JSON.parse(localStorage.getItem('reminderInfo')) || [];
    reminderCard.innerHTML = '';

    reminderInfo.forEach((reminderForm, index) =>{
        const card = document.createElement('div');
      card.className = "flex flex-col ml-80 rounded-md mr-80 m-5 shadow-xl/60 items-center";
        card.innerHTML = `
            <p  class="bg-gray-500 w-40 pl-5 rounded-t-md text-s"><strong class="text-white">Date:</strong> ${reminderForm.date}</p>
            <p class="bg-gray-500 w-40 text-left pl-5"><strong class="text-white">Time:</strong> ${reminderForm.time}</p>
            <p class="bg-gray-500 w-40 pl-5"><strong class="text-white">Cell:</strong> ${reminderForm.textReminder}</p>
            <p class="bg-gray-500 w-40 text-center  rounded-b-md"><strong>Reason:</strong> <br> ${reminderForm.reasoning}</p>
            <button onclick="deleteReminder(${index})" class=" mt-3 border-2 border-red-600 rounded-md w-20 text-red-300 ">Delete</button>
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
