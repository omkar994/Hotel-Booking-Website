let hotelID;
let totalPrice;
function paymentSuccess(){
    alert("Payment Successfull !");
}

function getParametersFromURL(){
    let url = location.href;
    let params = (new URL(url)).searchParams;
    let noOfAdults = params.get('adult');
    let bookingName = params.get('name');
    let fromDate = params.get('fromDate');
    let toDate = params.get('toDate');
    totalPrice = params.get('total');
    hotelID = params.get('hotelID');

    let noOfNights = totalPrice/1000/noOfAdults;
    let paymentDetailsDiv=document.getElementById('paymentDetails');
    let bottomDiv = document.createElement('div');
    bottomDiv.classList.add("bottom");

    let bookingDetailsObj=`
    <div class="customer">
    <p><b>Name:</b> ${bookingName}</p>
    <p><b>Number of Adults:</b> ${noOfAdults}</p>
    <p><b>Check-in Date:</b> ${fromDate}</p>
    <p><b>Check-out Date:</b> ${toDate}</p>
  </div>
  <div class="payment">
    <p><b>Tariff Breakdown:</b> Rs. 1000 x ${noOfAdults} Adults x ${noOfNights} nights</p>
    <p><b>Total Amount:</b> Rs. ${totalPrice}</p>
  </div>
  <div class="payNow">
    <button type="button" class="btn btn-success" id="payNow">Pay Now</button>
  </div>`;
  //let dummyDiv =`<h1>hello</>`

  bottomDiv.innerHTML = bookingDetailsObj;
  paymentDetailsDiv.appendChild(bottomDiv);
  
}

getParametersFromURL();

async function getHotelDetails(){
    let url = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelID}`;
    try {
          let res = await fetch(url,{
            "method": "GET",
            "headers": {
            "x-rapidapi-key": "87c2ab0d1amshabba7682f804239p1af88fjsnd38259b4ea12",
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
            }
          });
          return await res.json();
    } catch (error){
            console.log(error);
    }
    
}

let descriptionObj;
async function renderPaymentDetails(){
  let hotelDescription = await getHotelDetails();
  descriptionObj = hotelDescription.data[0];
  displayLoader(false);
  // change hotel image and description
  document.querySelector('.image img').src = descriptionObj.photo.images.medium.url;
  let topObj = document.querySelector('.top')
  let detailDiv = document.createElement('div');
  detailDiv.classList.add("details");
  let hotelDetails = `
  <div class="details">
    <h2>${descriptionObj.name}</h2>
    <p>${descriptionObj.ranking}</p>
    <p>${descriptionObj.address}</p>
  </div>`
  detailDiv.innerHTML = hotelDetails;
  topObj.appendChild(detailDiv);
}

renderPaymentDetails();

document.getElementById('payNow').addEventListener("click", (event) =>{
    alert(`Payment Successfully. Amount received ${totalPrice}`)
} )