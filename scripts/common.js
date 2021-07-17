let loginStatus = 0;
let headerTemplate = `<header>
<img src="G:/Hotel Booking Website/assests/images/logo.png" alt="logo" id="logo">
<div>
    <div id="login"><button class="btn btn-light" data-target="#loginModal"
            data-toggle="modal" id="loginText" style="display:block">Login</button>
            <button class="btn btn-light"
             id="logoutText" style="display:none">Logout</button>
            </div>
            </header>
    <div class="modal " id="loginModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="text-primary">Login</h3>
                    <button type="button" class="close" data-dismiss="modal"> &times;</button>
                </div>
                <div class="modal-body">
                    <form name="loginform" action="#" accept-charset="UTF-8" id="loginFormId">
                        <label for="username">Username:</label>
                        <input type="text" id="username" placeholder="Enter Username" name="username"
                            autocomplete="off" required><br>
                        <label for="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter Password" name="passwd"
                            required><br>
                        <input type="submit" id="loginSubmit" value="submit"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>`;

let footerTemplate = `<footer>
            
<div id="contact">
    <div><button type="button" class="btn btn-primary" data-target="#contactModal"
            data-toggle="modal">Contact Us</button>
    </div>
</div>

<div id="copyright"><span>&#169;</span> 2020 ROOM SEARCH PVT LTD</div>
<div id="socialLogos">
    <a href="http://facebook.in/" target="_blank"><img
            src="G:/Hotel Booking Website/assests/images/facebook.png" alt="" class="socialLogo"></a>
    <a href="https://www.instagram.com/" target="_blank"><img
            src="G:/Hotel Booking Website/assests/images/instagram.png" alt="" class="socialLogo"></a>
    <a href="https://twitter.com/" target="_blank"><img
            src="G:/Hotel Booking Website/assests/images/twitter.png" alt="" class="socialLogo"></a>
</div>

</footer>`;



document.getElementById("headerTemplate").innerHTML = headerTemplate;
document.getElementById("footerTemplate").innerHTML = footerTemplate;

window.localStorage.setItem('username', "admin");
window.localStorage.setItem('passwd', "admin");



let btn = document.getElementById("loginSubmit");
// btn.addEventListener("click", function () {
    
//         if (window.localStorage.getItem('username') == document.loginform.username.value &&
//             window.localStorage.getItem('passwd') == document.loginform.passwd.value) {

//             loginStatus = 1;

//             alert("You are successfully logged in!");
           
//             document.getElementById("loginText").style.display="none";
//             document.getElementById("logoutText").style.display="block";
//         }
//         else alert("Oops Incorrect credentials!")
    
   
// });

document.getElementById("loginFormId").addEventListener("submit", (event)  => {
    event.preventDefault();
    if (window.localStorage.getItem('username') == document.loginform.username.value &&
    window.localStorage.getItem('passwd') == document.loginform.passwd.value) {

    loginStatus = 1;

    alert("You are successfully logged in!");
   
    document.getElementById("loginText").style.display="none";
    document.getElementById("logoutText").style.display="block";
}
else alert("Oops Incorrect credentials!")

})





let btn2= document.getElementById("logoutText");

btn2.addEventListener("click", function(){
    console.log("logout");
    window.localStorage.clear();
    loginStatus = 0;
    document.getElementById("loginText").style.display="block";
    document.getElementById("logoutText").style.display="none";

});







