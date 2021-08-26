let btn1=document.getElementById("viewMoreBtn");
console.log
let state=0;
btn1.addEventListener("click", function(){
    if(state==0){
    document.getElementById("viewHide").style.display="block";
    document.getElementById("viewMoreBtn").textContent="View Less";
    state=1;
    }
    else if(state==1){
        document.getElementById("viewHide").style.display="none";
        document.getElementById("viewMoreBtn").textContent="View More";
        state=0;
    }
    
});


function modifyCardLinks(){
    let cityLinks = document.querySelectorAll('.container a');
    let cityNames = document.querySelectorAll('.text');
    for (let i=0; i<cityLinks.length; i++){
      let attribute = cityLinks[i].href;
      cityLinks[i].setAttribute('href', `${attribute}?city=${cityNames[i].textContent}`)
    }
  }
  
  modifyCardLinks();
  
