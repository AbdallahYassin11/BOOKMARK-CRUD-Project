var bookMarkName = document.getElementById("bookMarkNameInput");
var websiteURL = document.getElementById("websiteURLInput");
var websiteInformation = []
var currentIndex = 0;

// Open Data When Open Browser

if (localStorage.getItem('website') != null) {
    websiteInformation = JSON.parse(localStorage.getItem('website'));
    displayWebsite();
}

// Add

function addWebsite() {
    if (validateWebsiteURL() == true) {
        var website = {
            websiteName: bookMarkName.value,
            websiteURL: websiteURL.value,
        }
        websiteInformation.push(website);
        localStorage.setItem('website', JSON.stringify(websiteInformation))
        console.log(websiteInformation);
        displayWebsite()
        clearForm();
    }
    else {
        window.alert('Invalid WebsiteURL Name');
    }
}

// Clear

function clearForm() {
    bookMarkName.value = "";
    websiteURL.value = "";
}

// Display

function displayWebsite() {
    var cartoona = ``;
    for (i = 0; i < websiteInformation.length; i++) {
        cartoona += `<tr>
        <td>${i}</td>
        <td>${websiteInformation[i].websiteName}</td>
        <td id="URL">${websiteInformation[i].websiteURL}</td>
        
        <td><button onclick="deleteWebsite(${i})"class="btn btn-sm btn-danger">Delete</button></td>
        <td><a class="btn btn-sm btn-primary" target="_blank" href="${websiteInformation[i].websiteURL}">Visit</a></td>
        <td><button class="btn btn-sm btn-info" onclick="getWebsiteInfo(${i})" >Update</button></td>
        </tr>`;
    }
    document.getElementById(`tableBody`).innerHTML = cartoona;
}

// Delete

function deleteWebsite(deletedIndex) {
    websiteInformation.splice(deletedIndex, 1);
    localStorage.setItem('website', JSON.stringify(websiteInformation))
    displayWebsite();
}

// Validate WebsiteURL

function validateWebsiteURL() {
    var regex = /[A-Z][a-z]/;
    var regex2 = /^(ftp|http|https):(\/\/)/;
    if (regex.test(bookMarkNameInput.value) == true && (regex2.test(websiteURLInput.value) == true)) {
        return true;
    }
    else {
        return false;
    }
}

// Search

function searchProduct(term) {
    var cartoona = ``;
    for (i = 0; i < websiteInformation.length; i++) {
        if (websiteInformation[i].websiteURL.toLowerCase().includes(term.toLowerCase()) == true)
        cartoona += `<tr>
            <td>${i}</td>
            <td>${websiteInformation[i].websiteName}</td>
            <td id="URL">${websiteInformation[i].websiteURL}</td>

            <td><button onclick="deleteWebsite(${i})"class="btn btn-sm btn-danger">Delete</button></td>
            <td><a class="btn btn-sm btn-primary" target="_blank" href="${websiteInformation[i].websiteURL}">Visit</a></td>
            <td><button class="btn btn-sm btn-info">Update</button></td>
            </tr>`;
    }
    document.getElementById(`tableBody`).innerHTML = cartoona;
}

// Update

function getWebsiteInfo(Index) {
    currentIndex = Index;
    var currentSite = websiteInformation[Index];
    bookMarkNameInput.value = currentSite.websiteName;
    websiteURLInput.value = currentSite.websiteURL;
    submit.innerHTML = "Save";
}


function updateWebsite() {
    var website = {
        websiteName: bookMarkName.value,
        websiteURL: websiteURL.value,
    }
    websiteInformation[currentIndex] = website;
    localStorage.setItem('website', JSON.stringify(websiteInformation))
    console.log(website);
    displayWebsite()
    clearForm();
    submit.innerHTML = "Submit";
}

// BTN

submit.onclick = function () {
    if (submit.innerHTML == "Submit") {
        addWebsite();
    }
    else {
        updateWebsite();
    }
}