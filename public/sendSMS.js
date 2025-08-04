// const fetch = require('node-fetch');

// const sendSMs = async () => {
//    fetch('https://textbelt.com/text', {
//   method: 'post',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     phone: '+13474905546',
//     message: 'Test message from Julio. Did you get this?',
//     key: 'e1e71bb9f01373088a45942ac9a20017247fc4c8Dn0evoFkRr8RsDaDgkTfL2J7M',
//   }),
// }).then(response => {
//   return response.json();
// }).then(data => {
//   console.log(data);
// }); 
// }

// sendSMs();

const fetch = require('node-fetch'); // or use axios if you like

const sendSMs = async () => {
  const response = await fetch('https://textbelt.com/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: '3474905546',  // Your 10-digit US number
      message: 'hi',
      key: 'e1e71bb9f01373088a45942ac9a20017247fc4c8Dn0evoFkRr8RsDaDgkTfL2J7M', // 'textbelt' for demo, your key for paid
    }),
  });
  const data = await response.json();
  console.log(data);
};

sendSMs();
