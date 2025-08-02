 
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
    rgba(9, 8, 9, 0.87)
    left top
    no-repeat
  `,
  timer: 1500
  
})

    const reloadPage = setTimeout(reloadPg, 1500);

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
            const completeKey = childSnapShot.key
            const reminderEl = document.createElement('div');
            reminderEl.className = 'reminder';
            reminderEl.innerHTML = `
                <div class='w-56 bg-green-800 rounded-2xl text-center mb-10'>
                    <div class=' rounded-2xl pb-3 pt-3'>
                        <p class='relative text-left pl-5'><strong class='text-white text-xs '>Date:</strong> <span class='italic text-yellow-400 text-xs'>${reminder.date}</span></p>
                        <p class='relative text-left pl-5'><strong class='text-white text-xs '>Time:</strong> <span class='italic text-yellow-400 text-xs'>${reminder.time}</span></p>
                        <p class='relative text-left pl-5'><strong class='text-white text-xs '>Cell:</strong> <span class='italic text-yellow-400 text-xs'>${reminder.textReminder}</span></p>
                        <p><strong class='text-white text-xs underline underline-offset-4'>Reason:</strong> <p class='text-lg italic text-yellow-400 '>${reminder.reasoning}</p></p>
                    </div>
                    <p class='bg-gray-800'>
                    <i class="fa-duotone fa-regular fa-clipboard-check text-green-400 text-3xl p-3"></i>
                    <i class="fa-duotone fa-regular fa-trash text-red-400 text-3xl p-3 deleteBtn" data-key="${reminderKey}"></i>
                    <i class="fa-duotone fa-regular fa-pen-to-square text-yellow-400 text-3xl p-3 updateBtn" data-key=${reminderKey}></i>
                    </p>
                </div>
            `;
            remindersCard.appendChild(reminderEl);
        });
            // Complete Reminder
    const updateBtn = document.querySelectorAll('.updateBtn');
    updateBtn.forEach((btn =>{
        btn.addEventListener('click', ()=>{
            const editMode = document.getElementById('editModal');
            const closeEditMode = document.getElementById('closeEditModal');
            editMode.style.display = 'flex';
            editMode.style.flex = 'justify-center';
            closeEditMode.addEventListener('click', ()=>{
                editMode.style.display = 'none';
            })
        })
    }))

        // Attach delete event listeners (after the reminders have rendered!)
        const deleteBtns = document.querySelectorAll('.deleteBtn');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const key = this.getAttribute('data-key');
                deleteData(key);
            });
        });
    });
}
displayReminder();

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
 