document.addEventListener("DOMContentLoaded", loadReadingList);
document.getElementById("addButton").addEventListener("click", addToWishlist);
document.getElementById("saveToFile").addEventListener("click", saveToPDF);

let wishlist = document.getElementById("wishlist");
let currentlyReading = document.getElementById("currentlyReading");
let read = document.getElementById("read");

function addToWishlist() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !author) {
        showAlert("Title and author are required!");
        return;
    }

    const listItem = createListItem(title, author, description, "wishlist");
    wishlist.appendChild(listItem);
    saveReadingList();
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("description").value = "";
}

function createListItem(title, author, description, section = "wishlist") {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <div>
            <strong>${title}</strong> by ${author}
            <p>${description || "No description provided."}</p>
        </div>
        <div>
            ${section === "wishlist" ? `
                <button onclick="moveToSection(this, 'currentlyReading')">Move to Currently Reading</button>
                <button onclick="moveToSection(this, 'read')">Mark as Read</button>
            ` : section === "currentlyReading" ? `
                <button onclick="moveToSection(this, 'wishlist')">Move to Wishlist</button>
                <button onclick="moveToSection(this, 'read')">Mark as Read</button>
            ` : `
                <button onclick="moveToSection(this, 'currentlyReading')">Move to Currently Reading</button>
                <button onclick="moveToSection(this, 'wishlist')">Move to Wishlist</button>
            `}
            <button onclick="deleteEntry(this)">Delete</button>
        </div>
    `;
    listItem.dataset.title = title;
    listItem.dataset.author = author;
    listItem.dataset.description = description;
    listItem.dataset.section = section;

    return listItem;
}

function moveToSection(button, targetSection) {
    const listItem = button.parentElement.parentElement;

    listItem.querySelector("div:last-child").innerHTML = `
        ${targetSection === "wishlist" ? `
            <button onclick="moveToSection(this, 'currentlyReading')">Move to Currently Reading</button>
            <button onclick="moveToSection(this, 'read')">Mark as Read</button>
        ` : targetSection === "currentlyReading" ? `
            <button onclick="moveToSection(this, 'wishlist')">Move to Wishlist</button>
            <button onclick="moveToSection(this, 'read')">Mark as Read</button>
        ` : `
            <button onclick="moveToSection(this, 'currentlyReading')">Move to Currently Reading</button>
            <button onclick="moveToSection(this, 'wishlist')">Move to Wishlist</button>
        `}
        <button id="delete-btn" onclick="deleteEntry(this)">Delete</button>
    `;

    if (targetSection === "wishlist") {
        wishlist.appendChild(listItem);
    } else if (targetSection === "currentlyReading") {
        currentlyReading.appendChild(listItem);
    } else if (targetSection === "read") {
        read.appendChild(listItem);
    }

    saveReadingList();
}

function deleteEntry(button) {
    button.parentElement.parentElement.remove();
    saveReadingList();
}

function saveReadingList() {
    const data = {
        wishlist: extractSectionData(wishlist),
        currentlyReading: extractSectionData(currentlyReading),
        read: extractSectionData(read),
    };
    localStorage.setItem("readingList", JSON.stringify(data));
}

function extractSectionData(section) {
    return Array.from(section.children).map(item => ({
        title: item.dataset.title,
        author: item.dataset.author,
        description: item.dataset.description,
        section: item.dataset.section
    }));
}

function loadReadingList() {
    const data = JSON.parse(localStorage.getItem("readingList") || "{}");

    if (data.wishlist) populateSection(data.wishlist, wishlist, "wishlist");
    if (data.currentlyReading) populateSection(data.currentlyReading, currentlyReading, "currentlyReading");
    if (data.read) populateSection(data.read, read, "read");
}

function populateSection(data, sectionElement, sectionType) {
    data.forEach(item => {
        const listItem = createListItem(item.title, item.author, item.description, sectionType);
        sectionElement.appendChild(listItem);
    });
}

function showAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.style.position = "fixed";
    alertBox.style.top = "50%";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translate(-50%, -50%)";
    alertBox.style.padding = "20px";
    alertBox.style.backgroundColor = "#f44336";
    alertBox.style.color = "#fff";
    alertBox.style.borderRadius = "8px";
    alertBox.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
    alertBox.style.fontSize = "16px";
    alertBox.style.zIndex = "1000";
    alertBox.style.textAlign = "center";

    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

function saveToPDF() {
    const data = {
        wishlist: extractSectionData(wishlist),
        currentlyReading: extractSectionData(currentlyReading),
        read: extractSectionData(read),
    };

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reading List", 20, 20); 

    const lineHeight = 10;
    let y = 30; 

    const tableOptions = {
        margin: { top: 30 },
        styles: { fontSize: 10, cellWidth: 'auto', halign: 'center' },
        headerStyles: { fontStyle: 'bold' },
        theme: 'grid', 
        tableWidth: 'auto'
    };

    doc.text("Wishlist:", 20, y);
    y += lineHeight;

    if (data.wishlist.length) {
        const wishlistData = data.wishlist.map(item => [item.title, item.author, item.description]);
        doc.autoTable({
            head: [['Title', 'Author', 'Description']],
            body: wishlistData,
            startY: y,
            ...tableOptions,
        });
        y = doc.lastAutoTable.finalY + 10;
    }

    doc.text("Currently Reading:", 20, y);
    y += lineHeight;

    if (data.currentlyReading.length) {
        const currentlyReadingData = data.currentlyReading.map(item => [item.title, item.author, item.description]);
        doc.autoTable({
            head: [['Title', 'Author', 'Description']],
            body: currentlyReadingData,
            startY: y,
            ...tableOptions,
        });
        y = doc.lastAutoTable.finalY + 10;
    }

    doc.text("Read:", 20, y);
    y += lineHeight;

    if (data.read.length) {
        const readData = data.read.map(item => [item.title, item.author, item.description]);
        doc.autoTable({
            head: [['Title', 'Author', 'Description']],
            body: readData,
            startY: y,
            ...tableOptions,
        });
        y = doc.lastAutoTable.finalY + 10;
    }

    doc.save("readingList.pdf");
}

document.getElementById("searchInput").addEventListener("input", filterBooks);

function filterBooks() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    
    filterSection(wishlist, query);
    filterSection(currentlyReading, query);
    filterSection(read, query);
}

function filterSection(section, query) {
    const items = section.getElementsByTagName("li");
    for (const item of items) {
        const title = item.dataset.title.toLowerCase();
        const author = item.dataset.author.toLowerCase();

        if (title.includes(query) || author.includes(query)) {
            item.style.display = ""; 
        } else {
            item.style.display = "none"; 
        }
    }
}
