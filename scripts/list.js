function getCityFromURL() {
  let url = location.href;
  let params = (new URL(url)).searchParams;
  return params.get('city');
}

let city = getCityFromURL();


async function getHotels() {
  let url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${city}`;
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


let hotels;
async function renderHotels() {
  let response = await getHotels();
  displayLoader(false);
  hotels = response.data;
  //let map = initMap();
  let noOfHotels = hotels.length;
  let listViewDiv = document.querySelector('#list-view');
  for (let i = 0; i < noOfHotels; i++) {
    if (hotels[i].result_type === 'lodging') {
      let divElement = document.createElement('div');
      let hotelDetails = `
      <div class="image">
        <a href="detail.html?id=${hotels[i].result_object.location_id}" style="color: black;">
        <img src=${hotels[i].result_object.photo.images.large.url} alt="" class="hotelImg">
        </div> 
            <div class="details">
            <h3>${hotels[i].result_object.name}</h3>
            <p>
              <span>${hotels[i].result_object.rating}</span>
              <span class="fa fa-star checked"></span>
            </p>
            <p>${hotels[i].result_object.address}</p>
            
        </a>
      </div>`
      divElement.innerHTML = hotelDetails;
      listViewDiv.appendChild(divElement);
      //placeMarker(map, hotels[i].result_object);
    }
  }
}

/*<div class="hotelListImage">
                <a href="detail.html" style="color: black;">
                    <img src="https://media-cdn.tripadvisor.com/media/photo-w/17/b3/09/b4/by-the-poolside.jpg" alt=""
                        class="hotelImg"></a>
                <span style="margin:5%">
                    <h3>Radisson Blu Hotel</h3><br>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span><br>
                    <span>New Delhi</span>
                </span>
            </div>*/



renderHotels();