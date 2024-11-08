document.addEventListener('DOMContentLoaded', loadContacts);

document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (!phone.match(/^\d{3,}[0-9]+$/)) {
        alert('Nomor telepon harus berupa angka dan minimal 3 digit.');
        return;
    }

    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        alert('Alamat email yang anda masukan tidak valid');
    }

    const response = await fetch('contact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'add', name, email, phone, address
        })
    });
    if (response.ok) {
        document.getElementById('contactForm').reset();
        loadContacts();
    }
});

async function loadContacts() {
    const response = await fetch('contact.php?action=list');
    const contacts = await response.json();

    const contactTable = document.getElementById('contactTable');
    contactTable.innerHTML = '';

    contacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>${contact.address}</td>
            <td>
                <button onclick="editContact(${contact.id})">Edit</button>
                <button onclick="deleteContact(${contact.id})">Delete</button>
            </td>
        `;
        contactTable.appendChild(row);
    });
}

async function deleteContact(id) {
    if (confirm('Apakah Anda yakin ingin menghapus kontak ini?')) {
        await fetch('contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'delete', id
            })
        });
        loadContacts();
    }
}

async function editContact(id) {
    const response = await fetch('contact.php?action=get&id=' + id);
    const contact = await response.json();

    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('address').value = contact.address;

    document.getElementById('contactForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        if (!phone.match(/^\d{3,}[0-9]+$/)) {
            alert('Nomor telepon harus berupa angka dan minimal 3 digit.');
            return;
        }
    
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            alert('Alamat email yang anda masukan tidak valid');
        }

        const response = await fetch('contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'update', id, name, email, phone, address
            })
        });
        if (response.ok) {
            document.getElementById('contactForm').reset();
            loadContacts();
        }
    });
}