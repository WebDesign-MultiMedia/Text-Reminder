
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getDatabase, set, get, ref, onValue, push } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
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
     
    // Get the current counter value
    const counterRef = ref(db, 'reminderCounter');
    let counterSnapshot = await get(counterRef);
    let newID = 1;
    if (counterSnapshot.exists()) {
        newID = counterSnapshot.val() + 1;
    }


    const inputs = document.querySelectorAll('input');
    const form = document.getElementById('textReminderForm');
    const reasonTextarea = document.querySelectorAll('textarea');

    if (!date || !time || !phone || !reason) {
        alert('Fill in red');
        inputs.forEach(input =>{
             input.style.backgroundColor = 'lightcoral';
            input.style.color = 'white';
            input.style.border = '1px solid white';
            form.style.border = '2px solid red';
        })
          reasonTextarea.forEach(reasonTextareas => {
            reasonTextareas.style.backgroundColor = 'lightcoral';
            reasonTextareas.style.border = '1px solid white';
        });
            return;
    } else {
        alert('It was a success !!!')
    }
    

    const newReminderRef = ref(db, `reminderId/${newID}`);

   await set(newReminderRef, {
        id:newID,
        date:formattedDate,
        time:formmattedTime,
        textReminder: phone,
        reasoning: reason
    });
    // .then(() => {
    //   document.getElementById('reminderForm'.reset());  
    // });

    await set(counterRef, newID);
    document.getElementById('reminderForm').reset();
    location.reload();
 });

 function deleteReminder() {
    
 }

    // Display Data
 function displayReminder() {
    const remindersCard = document.getElementById('reminderCards');
    const remindersRef = ref(db, 'reminderId');

    onValue(remindersRef, (snapshot) =>{
        remindersCard.innerHTML = '';
        snapshot.forEach(childSnapShot => {
            const reminder = childSnapShot.val();
            const reminderEl = document.createElement('div');
            reminderEl.className = 'reminder rounded-xl border-4 border-indigo-200 border-t-indigo-500 border-b-transparent border-l-transparent';
            reminderEl.innerHTML = `
            <div class='flex flex-row text-red-400 flex-wrap p-5 items-center >
                <p class=''><strong class='text-white text-2xl'>Date:</strong> <p class='text-yellow-400 pl-10'>${reminder.date}</p></p>
                <p class='mr-10'><strong class='text-white text-2xl'>Time:</strong> <p class='text-yellow-400 pl-12'>${reminder.time}</p></p>
                <p class=''><strong class='text-white text-2xl'>Cell:</strong> <p class='text-yellow-400 pl-10'>${reminder.textReminder}</p></p>
                <p class='text-center p-5'><strong class='text-white text-2xl'>Reason:</strong> <br> <p class='text-yellow-400 '>${reminder.reasoning}</p></p>
            </div>
                `;
            remindersCard.appendChild(reminderEl);
        });
    })
 }
 displayReminder();

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
 