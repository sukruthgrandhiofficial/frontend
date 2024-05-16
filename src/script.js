(function (window) {
    window.__env = window.__env || {};
    window.__env.backendBaseURL = 'http://localhost:8001/backend1/'; // Modify this with your actual base URL
}(this));

document.addEventListener('DOMContentLoaded', function() {
    readAllItems(); // Call the function when the DOM content is loaded
});

const addItemBtn = document.getElementById('addItemBtn');
addItemBtn.addEventListener('click', addItem);

function greet() {
    console.log("calling greet");
    fetch(`${__env.backendBaseURL}hello_world`)
        .then(response => response.text())
        .then(data => {
            // Display response data in the HTML page
            console.log(data);
            document.getElementById('responseData').value = data;
        })
        .catch(error => {
            // Display error message in the HTML page
            document.getElementById('responseData').innerText = 'Error: ' + error;
        });
}

function readAllItems() {
    fetch(`${__env.backendBaseURL}items/all`)
        .then(response => response.text())
        .then(data => {
            console.log('Response data:', data);
            const parsedData = JSON.parse(data); // Parse the JSON string
            console.log(parsedData);
            renderItemsTable(parsedData); // Call the function to render the HTML table
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function renderItemsTable(data) {
    console.log(data);
    const tbody = document.querySelector('#itemList tbody');
    tbody.innerHTML = ''; // Clear existing rows

    data.forEach(rowData => {
        const tr = document.createElement('tr');
        console.log(rowData);
        // Add cells for ID, Name, and Description

        const td_id = document.createElement('td');
        td_id.textContent = rowData.id;
        tr.appendChild(td_id);

        const td_name = document.createElement('td');
        td_name.textContent = rowData.name;
        tr.appendChild(td_name);

        const td_description = document.createElement('td');
        td_description.textContent = rowData.description;
        tr.appendChild(td_description);


        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.addEventListener('click', function() {
            // Define the logic to delete the item here
            // You can call a deleteItem function passing the item ID or any other necessary data
            // For example: deleteItem(rowData[0]);
            console.log('Delete button clicked for item:', rowData);
            deleteItem(rowData.id);
        });
        const td_delete = document.createElement('td');
        td_delete.appendChild(deleteBtn);
        tr.appendChild(td_delete);


        tbody.appendChild(tr);
    });
}

function deleteItem(index) {
    console.log(index)
    fetch(`${__env.backendBaseURL}items/${index}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getCookie('access_token')}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        readAllItems();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function addItem() {
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;

    const data = {
        name: name,
        description: description
    };

    fetch(`${__env.backendBaseURL}items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('access_token')}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        readAllItems();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

let popup = document.getElementById('LoginContainer');
let main = document.getElementById('main');
let loginContainerBtn = document.getElementById('loginContianerBtn');
loginContainerBtn.addEventListener('click', popUpLoginContainer);

function popUpLoginContainer(){
    if (loginContainerBtn.innerHTML == "Login"){
    popup.classList.add("Open-LoginContainer");
    main.classList.add("main-hide");

    console.log("Open Login")
    }
    else{
        console.log('Logout');
        setAccessTokenCookie('');
        loginContainerBtn.innerHTML= "Login";
    }
}

function closeLoginContainer(){
    popup.classList.remove("Open-LoginContainer")
    main.classList.remove("main-hide")
}