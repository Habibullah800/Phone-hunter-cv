const allMobiles = () => {
    const searchfield = document.getElementById('search-box');
    const searchText = searchfield.value;
    searchfield.value = '';
    document.getElementById('spinner').style.display = 'block';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.status == false) {
                const detailsContainer = document.getElementById('details-container')
                detailsContainer.innerHTML = '';
                const searchResult = document.getElementById('search-result');
                searchResult.innerHTML = `
                
                <div class="card text-center w-50 mx-auto">
        <div class="card-header m-2" style="background-color:#ffeaa7">
            <h3 style="text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;">Wrong Phone name</h3>
        </div>
        <div class="card-body">
            <h5 class="card-title">
                Instructions</h5>
            <p class="card-text">Use the correct mobile name to find the mobile of your choice.</p>

        </div>
        <div class="card-footer text-muted">
            Thanks for being with us.
        </div>
    </div>`
                document.getElementById('see-more').style.display = 'none'
                document.getElementById('footer').style.display = 'none'

            }
            else {
                showMobileDetails(data.data.slice(0, 21))
                document.getElementById('see-more').style.display = 'block'
                document.getElementById('footer').style.display = 'block'



            }
            document.getElementById('spinner').style.display = 'none';

        });

}























//showMobileDetails(data.data)
const showMobileDetails = (data) => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = '';

    // document.getElementById('see-more').innerText = '';


    data.forEach(mobile => {

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        
        <div class="card my-4 ">
               <img class="rounded mx-auto d-block my-3" src="${mobile.image}" height="340px" width="260px" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title text-center ">Brand: ${mobile.brand} </h5>
                <h4 class="text-center">Model: ${mobile.phone_name}</h4>

                <p class="card-text">If you are interested in this phone then click on Details below for more information, Thank you.</p>
                
                <a href="#" onclick="details('${mobile.slug}')" class="btn btn-primary d-flex justify-content-center w-100">Details</a>

               
             </div>
        </div> `;
        searchResult.appendChild(div)
    })
}

const details = (info) => {
    const url = `https://openapi.programming-hero.com/api/phone/${info} `;
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.data))
};

const setDetails = (info) => {

    document.getElementById('details-container').innerHTML = `
    <div class="card mx-auto" style="width: 60rem; background-color:#f1f2f6">
    
    <img class="rounded mx-auto d-block my-4" src="${info.image}" height="400px" width="320px" alt="Card image cap">

    <div class="card-body">
        <h5 class="card-title text-center">
        Brand: ${info.brand} <br><br>

        Name of Phone: ${info.name} 
        
        
        </h5>

       
        <p class="card-text text-center">
        Released On: ${info.releaseDate}
            </p>
        
    </div>
    <li class="text-center my-2" style="background-color: bisque;" class="list-group-item"> Sensor info: ${info.mainFeatures.sensors[0]} ${info.mainFeatures.sensors[1]}, ${info.mainFeatures.sensors[2]}, ${info.mainFeatures.sensors[3]}, ${info.mainFeatures.sensors[4]}, ${info.mainFeatures.sensors[5]}</li>
    <div  class="row">
        <div class="col-6">
            <ul class="list-group list-group-flush">
                <li style="background-color:aquamarine" class="list-group-item"> Storage: ${info.mainFeatures.storage} </li>
                <li style="background-color:azure" class="list-group-item"> Chipset: ${info.mainFeatures.chipSet} </li>
                <li style="background-color: bisque;" class="list-group-item"> USB:${info.others.USB} </li>
                <li style="background-color:azure" class="list-group-item"> WLAN: ${info.others.WLAN} </li>
                <li style="background-color:aquamarine" class="list-group-item"> Radio:${info.others.Radio} </li>
            </ul>
        </div>
        <div class="col-6">
            <ul class="list-group list-group-flush">
                <li style="background-color:aquamarine" class="list-group-item"> Display Size: ${info.mainFeatures.displaySize} </li>
                <li style="background-color:azure" class="list-group-item"> Memory: ${info.mainFeatures.memory} </li>
                <li style="background-color: bisque;" class="list-group-item"> GPS: ${info.others.GPS} </li>
                <li style="background-color:azure" class="list-group-item"> Bluetooth: ${info.others.Bluetooth}  </li>
                <li style="background-color:aquamarine" class="list-group-item"> NFC: ${info.others.NFC} </li>
            </ul>
        </div>
        
    </div>
    
</div>


`



}
