// Get data from API
const getPhones = async (searchText = '11',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    showPhones(phones,isShowAll)
}
// Display Phones 
const showPhones = (phones,isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';
    //product not found section
    const productNotFound = document.getElementById('product-not-found')
    if (phones.length < 1){
        productNotFound.classList.remove('hidden')
    } else{
        productNotFound.classList.add('hidden')
    }
    //show more button
    const showMore = document.getElementById('show-more');
    if(phones.length > 12 && !isShowAll){
        showMore.classList.remove('hidden')
    } else{
        showMore.classList.add('hidden')
    }

    // Slice items when show all button clicked
    if (!isShowAll){
        phones = phones.slice(0,12)
    }
    //get phone one by one 
    phones.forEach( (phone) => {
        // create div for append innerHtml
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = "card bg-base-100 shadow-xl";
        phoneDiv.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.brand}</p>
            <div class="card-actions">
                <button onclick="getPhonesDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        //append child in parent node
        phoneContainer.appendChild(phoneDiv)

    });
    loadingSpinner(false)
}
// Search button handeler 
const showAll = (isShowAll) =>{
    loadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchResult = searchField.value;
    getPhones(searchResult,isShowAll);
}

// Load spinner function 

const loadingSpinner = (isloading) =>{
    const spinnerDiv = document.getElementById('loading-spinner');
    if(isloading){
        spinnerDiv.classList.remove('hidden');
    } else{
        spinnerDiv.classList.add('hidden');
    }
}

document.getElementById('show-more').addEventListener('click',() =>{
    showAll(true)
})


//Model section added for show mobile details

const getPhonesDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const phoneDetails = await res.json();
    const details = phoneDetails.data;
    showPhonesDetails(details)
}

const showPhonesDetails = (details) =>{
    console.log(details)
    //show modal call function
    show_details_modal.showModal();

    //set phone details view
    const showModelContainer = document.getElementById('show-modal-container');
    showModelContainer.innerHTML = `
    <img class = "mx-auto" src="${details.image}">
    <h2 class = "text-center text-2xl">${details.name}</h2>
    <h4>Storage : ${details.mainFeatures?.storage || 'Storage is undefiend'}</h4>
    <h4>Display-Size : ${details.mainFeatures?.displaySize || 'Display Size is undefiend'}</h4>
    <h4>Chipset : ${details.mainFeatures?.chipSet || 'Chipset is undefiend'}</h4>
    <h4>Memory : ${details.mainFeatures?.memory || 'Memory is undefiend'}</h4>
    <h4>Bluetooth : ${details.others?.Bluetooth || 'Bluetooth is undefiend'}</h4>
    <h4>Sensors : ${details.mainFeatures?.sensors || 'Sensors is undefiend'}</h4>
    <h4>GPS : ${details.others?.GPS || 'GPS is undefiend'}</h4>
    <h4>NFC : ${details.others?.NFC || 'NFC is undefiend'}</h4>
    <h4>USB : ${details.others?.USB || 'USB is undefiend'}</h4>
    <h4>WLAN : ${details.others?.WLAN || 'WLAN is undefiend'}</h4>
    `
}


//call get phones
getPhones()