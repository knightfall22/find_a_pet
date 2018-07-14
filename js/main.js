import fetchJsonp from "fetch-jsonp";
import {isValidZip,showAlert} from "./validator";

const petForm = document.getElementById('pet-form');

petForm.addEventListener('submit',fetchAnimals);

//Fetch animal from api
function fetchAnimals(e) {
   e.preventDefault();
   
   //GET USER INPUT
   const animal = document.getElementById('animal').value;
   const zip = document.getElementById('zip').value;

   //validate zip
   if (!isValidZip(zip)) {
       showAlert('Please enter a valid zip','danger')
       return;
   }

   //FETCH PETS
    fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=415aa00cac67b336e046bae8a49d40ce&animal=${animal}&location=${zip}&callback=callback`,{
        jsonpCallbackFunction:'callback'
    })
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .catch(err => console.log(err))
}

//SHOW LISTINGS OF PETS
function showAnimals(pets) {
    const results = document.getElementById('results');

    //Clear First
    results.innerHTML = '';

    //Loop through pets
    pets.forEach(pet => {
        const div = document.createElement('div');
        div.classList.add('card','card-body','md-3');
        div.innerHTML = `
        <div class="row">
            <div class="col-sm-6">
                <h4>${pet.name.$t} (${pet.age.$t})</h4>
                <p class="text-secondary">${pet.breeds.breed.$t}</p>
                <p>${pet.contact.address1.$t} ${pet.contact.city.$t} ${pet.contact.state.$t} ${pet.contact.zip.$t}</p>
                <ul class ="list-group">
                    ${pet.contact.phone.$t ? ` <li class="list-group-item">Phone: ${pet.contact.phone.$t}</li>` : ``}
                    ${pet.contact.email.$t ? ` <li class="list-group-item">Email: ${pet.contact.email.$t}</li>` : ``}
                    <li class="list-group-item">Shelter Id: ${pet.shelterId.$t}</li>
                </ul>
            </div>

            <div class="col-sm-6 text-center">
            <img class="img-fluid rounded-circle mt-2" src ="${pet.media.photos.photo[3].$t}">
            </div>
        </div>
        `
        results.appendChild(div);
    });
}