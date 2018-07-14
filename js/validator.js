export function isValidZip(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip);
}

export function showAlert(message,className) {
    //Create a div
    const div = document.createElement('div');
    //add classes
    div.className = `alert alert-${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get container 
    const container = document.querySelector('.container');
    //get form
    const petForm = document.getElementById('pet-form');
    //insert the alert
    
    container.insertBefore(div,petForm);
    setTimeout(() => document.querySelector('.alert').remove(), 3500);
}