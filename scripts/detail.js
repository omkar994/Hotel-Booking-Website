window.addEventListener('load', () => {
    document.getElementById('fromDate').value = moment().format('YYYY-MM-DD');
    document.getElementById('toDate').value = moment().add(1, 'days').format('YYYY-MM-DD');  
});

const calculateNumberOfDays = (startDate, EndDate) => {
    const a = moment(startDate);
    const b = moment(EndDate);
    return b.diff(a, 'days');
}

const calcaulateTotalprice = () => {
    document.getElementById('total').value =  calculateNumberOfDays(document.getElementById('fromDate').value, document.getElementById('toDate').value) * document.getElementById('adult').value * 1000; 
}; 

document.getElementById('adult').addEventListener('change', () => {
    calcaulateTotalprice();
});

document.getElementById('fromDate').addEventListener('change', () => {
    calcaulateTotalprice();
});

document.getElementById('toDate').addEventListener('change', () => {
    calcaulateTotalprice();
});

function getHotelFromURL() {
    let url = location.href;
    let params = (new URL(url)).searchParams;
    return params.get('id');
  }

let hotelID = getHotelFromURL();
document.querySelector('input[name="hotelID"]').value = hotelID;

// API call
async function getDescription(url) {
     //let url = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelID}`;
    try {
      let res = await fetch(url, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "87c2ab0d1amshabba7682f804239p1af88fjsnd38259b4ea12",
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
        }
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  let descriptionObj;
  let imagesObj;
  async function renderDescription() {
    let hotelImages = await getDescription(`https://travel-advisor.p.rapidapi.com/photos/list?location_id=${hotelID}`);
    let hotelDescription = await getDescription(`https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelID}`);
    displayLoader(false);
    descriptionObj = hotelDescription.data[0];
    imagesObj = hotelImages.data;
  
    // Adding carousel images
    let carouselImages = document.querySelectorAll(".hotelImg");
    
    for (let i=0; i<5; i++){
      carouselImages[i].src = imagesObj[i].images.large.url;
    }
    // Adding description HTML
    let descriptionDiv = document.querySelector('#hotelDescription');
    let descriptionDetails = `
      <h2>${descriptionObj.name}</h2>
      <p class="cursive"><b>RATING</b></p>
      <p id="rating">
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </p>
      <p class="cursive"><b>AMENITIES</b></p>
      <ul id="amenities">
  
      </ul>
      <h5 class="cursive">DESCRIPTION</h5>
      <p>${descriptionObj.description}</p>`
  
    descriptionDiv.innerHTML = descriptionDetails;
    // appending amenities list
    let amenitiesArr = descriptionObj.amenities;
    let ulObj = document.querySelector('#amenities')
    let numOfAmenitiesDisplayed = Math.min(10, amenitiesArr.length)
    for (let i=0; i<numOfAmenitiesDisplayed; i++){
      let liObj = document.createElement('li');
      liObj.innerText = amenitiesArr[i].name;
      ulObj.appendChild(liObj)
    }
    // Updating the star rating
    let ratingObj = document.querySelectorAll('.fa-star');
    let hotelRating = Math.min(5, Math.round(Number(descriptionObj.rating)));
    for (let i=0; i<hotelRating; i++){
      ratingObj[i].classList.add("checked");
    }
  }
  
  renderDescription();
  
  



