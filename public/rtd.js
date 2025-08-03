 
 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getDatabase, set, get, ref, onValue, push, remove, update, child  } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCJhvwNtyLjq9iegy8FFKDdV0jnS48MAuE",
    authDomain: "mytextreminder.firebaseapp.com",
    projectId: "mytextreminder",
    storageBucket: "mytextreminder.firebasestorage.app",
    messagingSenderId: "876407036608",
    appId: "1:876407036608:web:f7f4e452fc6bd8dab36b25"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

 const db = getDatabase(app)
 
 console.log(db);

    // Format date as MM/DD/YYYY
    function formatDate(inputDate) {
        if(!inputDate) return '';
        const [year, month, day] = inputDate.split('-');
        return `${month}/${day}/${year}`;
    }

    // Format Time as 12 Hours
    function formatTimeTo12Hour(timeStr) {
        if(!timeStr) return '';
        let [h, m] = timeStr.split(':');
        h = parseInt(h);
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        if(h === 0){
            h = 12;
        }
        return `${h}:${m} ${ampm}`;
    }

    // Form validation, 

 document.getElementById('textReminderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
        // Fomatted Date
    const dateInput = document.getElementById('date').value;
    const formattedDate = formatDate(dateInput);
        // Formmated Time
    const rawTime = document.getElementById('time').value;
    const formmattedTime = formatTimeTo12Hour(rawTime);

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const phone = document.getElementById('textReminder').value;
    const reason = document.getElementById('reason').value;
     
    // // Get the current counter value
    // const counterRef = ref(db, 'reminderCounter');
    // let counterSnapshot = await get(counterRef);
    // let newID = 1;
    // if (counterSnapshot.exists()) {
    //     newID = counterSnapshot.val() + 1;
    // }


    const inputs = document.querySelectorAll('input');
    const form = document.getElementById('textReminderForm');
    const reasonTextarea = document.querySelectorAll('textarea');
    let submitBtn = document.getElementById('btn')

    if (!date || !time || !phone || !reason) {

        Swal.fire({
        position: 'top-center',
        title: 'Fill in red',
        showDenyButton: false,
        showConfirmButton: false,
        icon: 'error',
        denyButtonText: 'OKay',
        theme: 'dark',
        position: 'center',
        backdrop: `
    rgba(9, 8, 9, 0.87)
    left top
    no-repeat
  `,
        timer: 1500
        })

        submitBtn.style.backgroundColor = 'transparent';
        submitBtn.style.border = '2px solid lightcoral';
        inputs.forEach(input =>{
             input.style.backgroundColor = 'transparent';
            input.style.color = 'white';
            input.style.border = '2px solid lightcoral';
        })
          reasonTextarea.forEach(reasonTextareas => {
            reasonTextareas.style.backgroundColor = 'transparent';
            reasonTextareas.style.border = '2px solid lightcoral';
        });
            return;
    } else {
        Swal.fire({
  title: 'Successfu!',
  icon: 'success',
  confirmButtonText: 'Okay',
  showConfirmButton: false,
  theme: 'dark',
    position: 'center',
    backdrop: `
    rgba(9, 8, 9)
    left top
    no-repeat
  `,
  timer: 1500
  
})

    const reloadPage = setTimeout(reloadPg, 1300);

    function reloadPg() {
        location.reload();
    }
}
    

    const newReminderRef = ref(db, `date/${date}`);

   await set(newReminderRef, {
        date:formattedDate,
        time:formmattedTime,
        textReminder: phone,
        reasoning: reason
    });
    // .then(() => {
    //   document.getElementById('reminderForm'.reset());  
    // });

    // document.getElementById('reminderForm').reset();
    // location.reload();
 });



    // Display Data
 function displayReminder() {
    const remindersCard = document.getElementById('reminderCards');
    const remindersRef = ref(db, 'date');

    onValue(remindersRef, (snapshot) => {
        remindersCard.innerHTML = '';
        snapshot.forEach(childSnapShot => {
            const reminder = childSnapShot.val();
            const reminderKey = childSnapShot.key; // <-- this is your Firebase key, e.g. the date string
            const reminderEl = document.createElement('div');
            reminderEl.className = 'reminder';
        reminderEl.innerHTML = `
    <div class='w-56 bg-green-800 rounded-2xl text-center mb-10'>
        <div class='rounded-2xl pb-3 pt-3'>
            <p class='relative text-left pl-5'><strong class='text-yellow-300 '>Date:</strong> <span class='reminder-date text-xs text-white'>${reminder.date}</span></p>
            <p class='relative text-left pl-5'><strong class='text-yellow-300'>Time:</strong> <span class='reminder-time text-xs text-white'>${reminder.time}</span></p>
            <p class='relative text-left pl-5'><strong class='text-yellow-300'>Cell:</strong> <span class='reminder-phone text-xs text-white'>${reminder.textReminder}</span></p>
            <p><strong class='text-yellow-300'>Reason:</strong><br><span class='reminder-reason text-xs text-white'>${reminder.reasoning}</span></p>
        </div>
        <p class='bg-gray-800'>
            <i class="fa-duotone fa-regular fa-clipboard-check text-green-400 text-3xl p-3"></i>
            <i class="fa-duotone fa-regular fa-trash text-red-400 text-3xl p-3 deleteBtn" data-key="${reminderKey}"></i>
            <i class="fa-duotone fa-regular fa-pen-to-square text-yellow-400 text-3xl p-3 updateBtn" data-key="${reminderKey}"></i>
        </p>
    </div>`;
            remindersCard.appendChild(reminderEl);
        });
     
document.querySelectorAll('.updateBtn').forEach(btn => {
    btn.addEventListener('click', function() {
        const key = this.getAttribute('data-key');
        const card = this.closest('.reminder');
        const date = card.querySelector('.reminder-date').innerText;
        const time = card.querySelector('.reminder-time').innerText;
        const phone = card.querySelector('.reminder-phone').innerText;
        const reason = card.querySelector('.reminder-reason').innerText;
        
        document.getElementById('editKey').value = key;
        document.getElementById('editDate').value = formatDateForInput(date);
        document.getElementById('editTime').value = formatTimeForInput(time);
        document.getElementById('editPhone').value = phone;
        document.getElementById('editReason').value = reason;
        document.getElementById('editModal').classList.remove('hidden');
    });
});

// Delete Button
document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', function() {
        const key = this.getAttribute('data-key');
        deleteData(key);
    });
});

function formatDateForInput(date) {
    const [mm, dd, yyyy] = date.split('/');
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
}
function formatTimeForInput(time) {
    let [h, minampm] = time.split(':');
    let [m, ampm] = [minampm.slice(0, 2), minampm.slice(3)];
    h = parseInt(h);
    if (ampm.toUpperCase() === 'PM' && h !== 12) h += 12;
    if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${m}`;
}


    });
}
displayReminder();

// Close Modal
document.getElementById('closeEditModal').addEventListener('click', function() {
    document.getElementById('editModal').classList.add('hidden');
});

// Submit Modal (update data)
document.getElementById('editForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const key = document.getElementById('editKey').value;
    const date = document.getElementById('editDate').value;
    const time = document.getElementById('editTime').value;
    const phone = document.getElementById('editPhone').value;
    const reason = document.getElementById('editReason').value;

    const formattedDate = formatDate(date);
    const formattedTime = formatTimeTo12Hour(time);

    await update(ref(db, 'date/' + key), {
        date: formattedDate,
        time: formattedTime,
        textReminder: phone,
        reasoning: reason
    });

    document.getElementById('editModal').classList.add('hidden');
    Swal.fire({
        title: 'Updated!',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
    });
});


 function deleteData(key) {
    remove(ref(db, 'date/' + key))
        .then(() => {
           
        Swal.fire({
        title: 'Successfullyy Deleted',
        showDenyButton: true,
        showConfirmButton: false,
        icon: 'success',
        denyButtonText: 'Delete',
        theme: 'dark',
        backdrop: `
    rgba(9, 8, 9, 0.87)
    left top
    no-repeat
  `
        })
        })
        .catch((err) => {
            
        Swal.fire({
        title: 'Unsuccesfull',
        showDenyButton: true,
        showConfirmButton: false,
        icon: 'error',
        denyButtonText: 'Okay',
        theme: 'dark',
        backdrop: `
    rgba(9, 8, 9, 0.87)
    left top
    no-repeat
  `
        })
            console.log(err); 
        });
}

function updateData(key) {
    update(ref(db, 'date/' + key))
        .then(() => {
           
        Swal.fire({
        title: 'Updated Successfullyy',
        showDenyButton: false,
        showConfirmButton: false,
        icon: 'success',
        theme: 'dark',
        backdrop: `
    rgba(9, 8, 9, 0.87)
    left top
    no-repeat
  `
        })
        })
        .catch((err) => {
            
        Swal.fire({
        title: 'Data not saved',
        showDenyButton: false,
        showConfirmButton: false,
        icon: 'error',
        denyButtonText: 'Okay',
        theme: 'dark',
        backdrop: `
    rgba(9, 8, 9, 0.87)
    left top
    no-repeat
  `
        })
            console.log(err); 
        });
}

    





//  function writeUserData(reminderId ,date, time, textReminder, reasoning) {
//     set(ref(db, 'reminderId/' + reminderId),{
//         date:date,
//         time:time,
//         textReminder:textReminder,
//         reasoning:reasoning
//     })
//  }
//  console.log('GOOD');
 
//  function readData() {
//     const userRef = ref(db,'reminderId');
//     get(userRef).then((snapshot)=>{
//         const remindersDiv = document.getElementById('reminderCards');
//         remindersDiv.innerHTML = '';

//         snapshot.forEach(childsnapShot => {
//             const reminder = childsnapShot.val();

//             const reminderEl = document.createElement('div');
//             reminderEl.className = 'reminder bg-gray-200 rounded p-3 m-2';

//             reminderEl.innerHTML = `
//                 <p><strong>Date: </strong> ${reminder.date}</p>
//                 <p><strong>Time: </strong> ${reminder.time}</p>
//                 <p><strong>Cell: </strong> ${reminder.textReminder}</p>
//                 <p><strong>Reason: </strong> ${reminder.reasoning}</p>
//             `;
//             remindersDiv.appendChild(reminderEl);
//         });
//     })
//  }
//   writeUserData(10,'02/23/1995', '12:00pm', '3474905546', 'homework is due')
//  readData();
 