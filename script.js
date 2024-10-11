

function editContact(id, name, email, phone, address) { 
    document.getElementById('name').value = name; 
    document.getElementById('email').value = email; 
    document.getElementById('phone').value = phone; 
    document.getElementById('address').value = address; 
    document.getElementById('contactId').value = id; 
    document.getElementById('submitBtn').innerText = "Update Contact"; 
    document.getElementById('submitBtn').disabled = false; 
} 

document.getElementById('contactForm').addEventListener('submit', function(e) { 
    e.preventDefault(); 
    const email = document.getElementById('email').value; 
    const phone = document.getElementById('phone').value; 

    // Validasi email 
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
    if (!emailPattern.test(email)) { 
        alert('Please enter a valid email address.'); 
        return; 
    } 

    // Validasi nomor telepon (hanya angka) 
    const phonePattern = /^[0-9]+$/; 
    if (!phonePattern.test(phone)) { 
        alert('Phone number should contain only numbers.'); 
        return; 
    } 

    const formData = new FormData(this); 
    if(document.getElementById('contactId').value){ 
        fetch('php/update_contact.php', { 
            method: 'POST', 
            body: formData 
        }) 
        .then(response => response.text()) 
        .then(data => { 
            alert(data); 
            loadContacts(); 
            this.reset(); 
            document.getElementById('submitBtn').innerText = "Add Contact"; 
            document.getElementById('submitBtn').disabled = false; 
        }); 
    } else { 
        fetch('php/add_contact.php', { 
            method: 'POST', 
            body: formData 
        }) 
        .then(response => response.text()) 
        .then(data => { 
            alert(data); 
            loadContacts(); 
            this.reset(); 
            document.getElementById('submitBtn').innerText = "Add Contact"; 
            document.getElementById('submitBtn').disabled = false; 
        }); 
    } 
}); 

function loadContacts() { 
    fetch('php/load_contacts.php') 
    .then(response => response.json()) 
    .then(data => { 
        const contactList = document.getElementById('contactList'); 
        contactList.innerHTML = ''; 
        data.forEach(contact => { 
            const row = document.createElement('tr'); 
            row.innerHTML = ` 
                <td>${contact.name}</td> 
                <td>${contact.email}</td> 
                <td>${contact.phone}</td> 
                <td>${contact.address}</td> 
                <td> 
                    <button class="btn btn-primary" onclick="editContact(${contact.id}, '${contact.name}', '${contact.email}', '${contact.phone}', '${contact.address}')">Edit</button> 
                    <button class="btn btn-danger" onclick="deleteContact(${contact.id})">Delete</button> 
                </td> 
            `; 
            contactList.appendChild(row); 
        }); 
    }); 
} 

function deleteContact(id) { 
    fetch(`php/delete_contact.php?id=${id}`, { 
        method: 'GET' 
    }) 
    .then(response => response.text()) 
    .then(data => { 
        alert(data); 
        loadContacts(); 
    }); 
}


function editContact(id, name, email, phone, address) { 
    document.getElementById('name').value = name; 
    document.getElementById('email').value = email; 
    document.getElementById('phone').value = phone; 
    document.getElementById('address').value = address; 
    document.getElementById('contactId').value = id; 
    document.getElementById('submitBtn').innerText = "Update Contact"; 
    document.getElementById('submitBtn').disabled = false; 
} 

document.getElementById('contactForm').addEventListener('submit', function(e) { 
    e.preventDefault(); 
    const email = document.getElementById('email').value; 
    const phone = document.getElementById('phone').value; 

    // Validasi email 
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
    if (!emailPattern.test(email)) { 
        alert('Please enter a valid email address.'); 
        return; 
    } 

    // Validasi nomor telepon (hanya angka) 
    const phonePattern = /^[0-9]+$/; 
    if (!phonePattern.test(phone)) { 
        alert('Phone number should contain only numbers.'); 
        return; 
    } 

    const formData = new FormData(this); 
    if(document.getElementById('contactId').value){ 
        fetch('php/update_contact.php', { 
            method: 'POST', 
            body: formData 
        }) 
        .then(response => response.text()) 
        .then(data => { 
            alert(data); 
            loadContacts(); 
            this.reset(); 
            document.getElementById('submitBtn').innerText = "Add Contact"; 
            document.getElementById('submitBtn').disabled = false; 
        }); 
    } else { 
        fetch('php/add_contact.php', { 
            method: 'POST', 
            body: formData 
        }) 
        .then(response => response.text()) 
        .then(data => { 
            alert(data); 
            loadContacts(); 
            this.reset(); 
            document.getElementById('submitBtn').innerText = "Add Contact"; 
            document.getElementById('submitBtn').disabled = false; 
        }); 
    } 
}); 

function loadContacts() { 
    fetch('php/load_contacts.php') 
    .then(response => response.json()) 
    .then(data => { 
        const contactList = document.getElementById('contactList'); 
        contactList.innerHTML = ''; 
        data.forEach(contact => { 
            const row = document.createElement('tr'); 
            row.innerHTML = ` 
                <td>${contact.name}</td> 
                <td>${contact.email}</td> 
                <td>${contact.phone}</td> 
                <td>${contact.address}</td> 
                <td> 
                    <button class="btn btn-primary" onclick="editContact(${contact.id}, '${contact.name}', '${contact.email}', '${contact.phone}', '${contact.address}')">Edit</button> 
                    <button class="btn btn-danger" onclick="deleteContact(${contact.id})">Delete</button> 
                </td> 
            `; 
            contactList.appendChild(row); 
        }); 
    }); 
} 

function deleteContact(id) { 
    fetch(`php/delete_contact.php?id=${id}`, { 
        method: 'GET' 
    }) 
    .then(response => response.text()) 
    .then(data => { 
        alert(data); 
        loadContacts(); 
    }); 
}