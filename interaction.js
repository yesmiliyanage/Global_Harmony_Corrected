// Nav bar behavior when scrolling

window.addEventListener("scroll", solidNavbar)
function solidNavbar(){
    var navbar = document.querySelector(".nav-bar");
    navbar.classList.toggle("onScroll", window.scrollY > 0);
}

const navLinks = document.querySelectorAll('.nav-item');
const userLink = document.querySelector('#user a');
const user = document.getElementById('user-tag');
const currentPage = window.location.href;
navLinks.forEach(navLink => {
    if(navLink.href === currentPage){
        navLink.classList.add('active');
    }
    
});

if(userLink.href === currentPage){
    user.classList.add('userActive');
}

// Reveal content when scrolling

window.addEventListener('scroll', reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal');
    for(var i = 0; i< reveals.length;i++){
        var windowHeight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 50;

        if(revealtop < windowHeight - revealPoint){
            reveals[i].classList.add('reveal-active');
        }
        else{
            reveals[i].classList.remove('reveal-active');
        }
    }
}


// Indicate selected rating options
// First rating question

let ratingNumbers1 = document.querySelectorAll('.rating-number1');
let easeNavigation = document.getElementById('ease-navigation');
ratingNumbers1.forEach(number => {
    number.addEventListener('click', () => {
        ratingNumbers1.forEach(num => num.classList.remove('selected-number'));
        number.classList.add('selected-number');
        easeNavigation.value = number.getAttribute('data-value');
    })
})

// Second rating question

let ratingNumbers2 = document.querySelectorAll('.rating-number2');
let productQuality = document.getElementById('product-quality');
ratingNumbers2.forEach(number => {
    number.addEventListener('click', () => {
        ratingNumbers2.forEach(num => num.classList.remove('selected-number'));
        number.classList.add('selected-number');
        productQuality.value = number.getAttribute('data-value');
    })
})

// Third rating question

let ratingNumbers3 = document.querySelectorAll('.rating-number3');
let overallRating = document.getElementById('overall-rating');
ratingNumbers3.forEach(number => {
    number.addEventListener('click', () => {
        ratingNumbers3.forEach(num => num.classList.remove('selected-number'));
        number.classList.add('selected-number');
        overallRating.value = number.getAttribute('data-value');
    })
})


//Email Validation

function emailValidation(){
    const userEmail = document.getElementById('feedback-email').value;
    const validEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(validEmailPattern.test(userEmail)){
        return true;
    }
    return false;
}

function phoneNumberValidation(){
    const userPhoneNumber = document.getElementById('feedback-phone-number').value;
    const validPhoneNumber = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if(validPhoneNumber.test(userPhoneNumber)){
        return true;
    }
    return false;
}



// For previewing the form

function previewFeedbackForm(){
    let filled = true;
    const feedbackName = document.getElementById('feedback-name').value.trim();
    const feedbackEmail = document.getElementById('feedback-email').value.trim();
    const feedbackPhone = document.getElementById('feedback-phone-number').value.trim();
    const feedbackAddress = document.getElementById('feedback-address').value.trim();
    const section1Question1 = document.querySelector('input[name="feedbackSection1Q1"]:checked');
    const section1Question3 = document.querySelector('input[name="feedbackSection1Q3"]:checked');
    const section2Rating1 = document.getElementById('ease-navigation').value;
    const section2Rating2 = document.getElementById('product-quality').value;
    const section2Rating3 = document.getElementById('overall-rating').value;
    const emailValidationResult = emailValidation();
    const phoneNumberValidationResult = phoneNumberValidation();

    if(!feedbackName){
        document.getElementById('feedback-name-required').style.visibility = 'visible';
        filled = false;
    }
    else{
        document.getElementById('feedback-name-required').style.visibility = 'hidden';
    }
    if(!feedbackEmail){
        document.getElementById('feedback-email-required').style.visibility = 'visible';
        filled = false;
    }
    else{
        if(emailValidationResult){
            document.getElementById('feedback-email-required').style.visibility = 'hidden';
        }
        else{
            document.getElementById('feedback-email-required').style.visibility = 'visible';
            document.getElementById('feedback-email-required').innerText = "Please enter a valid email";
        }
    }
    if(!feedbackPhone){
        document.getElementById('feedback-phone-required').style.visibility = 'visible';
        filled = false;
    }
    else{
        if(phoneNumberValidationResult){
            document.getElementById('feedback-phone-required').style.visibility = 'hidden';
        }
        else{
            document.getElementById('feedback-phone-required').style.visibility = 'visible';
            document.getElementById('feedback-phone-required').innerText = "Please enter a valid phone number";
        }
    }
    if(!feedbackAddress){
        document.getElementById('feedback-address-required').style.visibility = 'visible';
        filled = false;
    }
    else{
        document.getElementById('feedback-address-required').style.visibility = 'hidden';
        
    }
    if(section1Question1){
        document.getElementById('feedback-radio1-required').style.visibility = 'hidden';
    }
    else{
        document.getElementById('feedback-radio1-required').style.visibility = 'visible';
        filled = false;
    }
    if(section1Question3){
        document.getElementById('feedback-radio2-required').style.visibility = 'hidden';
    }
    else{
        document.getElementById('feedback-radio2-required').style.visibility = 'visible';
        filled = false;
    }

    
    if(!section2Rating1){
        document.getElementById('rating-q1-required').style.visibility = 'visible';
        filled = false;
    }
    else{
        document.getElementById('rating-q1-required').style.visibility = 'hidden';
    }
    if(!section2Rating2){
        document.getElementById('rating-q2-required').style.visibility = 'visible';
        filled = false;
    }
    else{
        document.getElementById('rating-q2-required').style.visibility = 'hidden';
    }
    if(!section2Rating3){
        document.getElementById('rating-q3-required').style.visibility = 'visible';
        filled = false;
    }
    else{
        document.getElementById('rating-q3-required').style.visibility = 'hidden';
    }

    if(!filled){
        alert('Please fill out all the required fields to preview the form');
        window.scrollTo(0,0);
        return;
    }
    else if(!emailValidationResult || !phoneNumberValidationResult){
        window.scrollTo(0,0);
        return;
    }


    document.getElementById('feedback-maintitle').innerText = "Preview Feedback";
    document.getElementById('feedback-subtitle').innerText = "";
    document.getElementById('feedback-preview-button').style.visibility = 'hidden';
    document.getElementById('feedback-edit-button').style.visibility = 'visible';
    document.getElementById('feedback-submit-button').style.visibility = 'visible';

    const feedbackPreviewDivs = document.querySelectorAll('.feedback-preview');
    feedbackPreviewDivs.forEach(div => {
        div.style.pointerEvents = 'none';
    })
    
    window.scrollTo(0,0);

    

}

function editFeedbackForm(){
    document.getElementById('feedback-maintitle').innerText = "Feedback";
    document.getElementById('feedback-subtitle').innerText = "Give Us Your Feedback...";
    document.getElementById('feedback-preview-button').style.visibility = 'visible';
    document.getElementById('feedback-edit-button').style.visibility = 'hidden';
    document.getElementById('feedback-submit-button').style.visibility = 'hidden';

    const feedbackPreviewDivs = document.querySelectorAll('.feedback-preview');
    feedbackPreviewDivs.forEach(div => {
        div.style.pointerEvents = 'auto';
    })

    window.scrollTo(0,0);
}
//Function for displaying the modal after submitting the form
function feedbackModalControl(){
    let feedbackModal = document.getElementById('feedback-modal-container');
    let closeIcon = document.getElementById('feedback-close-icon');

    closeIcon.onclick = function(){
        feedbackModal.style.display = 'none';
    }

    window.onclick = function(event){
        if(event.target == feedbackModal){
            feedbackModal.style.display = 'none';
        }
    }

}
// Function for submitting the form as an email

function submitFeedbackForm(){

    console.log('hello1');
    const section1Question1 = document.querySelector('input[name="feedbackSection1Q1"]:checked');
    const section1Question3 = document.querySelector('input[name="feedbackSection1Q3"]:checked');
    const feedbackAgreementResult = document.querySelector('input[name=feedbackAgreement]:checked');
    let result;
    if(feedbackAgreementResult){
        result = 'Yes';
    }
    else{
        result = 'No';
    }

    let content = {
        feedbackName : document.getElementById('feedback-name').value,
        feedbackPhone : document.getElementById('feedback-phone-number').value,
        feedbackEmail : document.getElementById('feedback-email').value,
        feedbackAddress : document.getElementById('feedback-address').value,
        feedbackSection1Q1 : section1Question1.value,
        feedbackSection1Q2 : document.getElementById('feedback-section1-q2').value,
        feedbackSection1Q3 : section1Question3.value,
        feedbackSection1Q4 : document.getElementById('feedback-section1-q4-textarea').value,
        feedbackEaseNavigation : document.getElementById('ease-navigation').value,
        feedbackProductQuality : document.getElementById('product-quality').value,
        feedbackOverallRating : document.getElementById('overall-rating').value,
        feedbackSuggestions : document.getElementById('suggestions').value,
        feedbackAgreement : result
    }


    emailjs.send("service_wrjz00k", "template_3tdox2l", content)
    .then(function(response) {
        console.log('Email sent successfully:', response);
        document.getElementById('feedback-modal-container').style.display = 'flex';
        feedbackModalControl();
    })
    .catch(function(error) {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again later.');
    });
}







    
