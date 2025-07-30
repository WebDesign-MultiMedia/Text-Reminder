const form = document.getElementById('textReminderForm');

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

if(!reminderForm.date || reminderForm.time || !reminderForm.textReminder || !reminderForm.reasoning){
    alert('ERRRRR')
    inputs.forEach(input => {
        input.style.backgroundColor = 'lightcoral';
        input.style.color = 'white';
    })
    reasonTextarea.forEach(reasonTextareas =>{
        reasonTextareas.style.backgroundColor = 'lightcoral';
    })
    placeholderinput.classList.add('blue-placeholder');
    return;
} else{
    alert('success')
}
});
