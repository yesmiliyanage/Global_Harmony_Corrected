// Nav bar
window.addEventListener("scroll", function(){
    var navbar = document.querySelector(".nav-bar");
    navbar.classList.toggle("onScroll", window.scrollY > 0);
})

// Show the page where the user in
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


// Submit all the questions and answers into the input box and move to the first question of the next prompt
function moveToNextPrompt(currentFormId, currentPromptId, nextFormId) {
    const currentForm = document.getElementById(currentFormId);
    const currentInputs = currentForm.querySelectorAll('input, select');
    let answers = [];

    let allAnswered = true;
    currentInputs.forEach(input => {
        if (input.value === '') {
            allAnswered = false;
        } else {
            let label = input.previousElementSibling.innerText.replace(':', '');
            let value = input.value;

            if (input.tagName === 'SELECT') {
                const selectedOption = input.options[input.selectedIndex].text;
                answers.push(`${label}: ${selectedOption}`);
            } else {
                answers.push(`${label}: ${value}`);
            }
        }
    });

    if (allAnswered) {
        document.getElementById(currentPromptId).value = answers.join('\n');

        if (nextFormId) {
            const nextForm = document.getElementById(nextFormId);
            const firstInputField = nextForm.querySelector('input, select');
            if (firstInputField) {
                firstInputField.focus();
            }
        } else {
            alert('Submission is successful!!');
        }
    } else {
        alert('Please answer all questions before proceeding.');
    }
}




// Check if all prompts are filled
function checkAllPromptsFilled() {
    var prompt1Filled = document.getElementById('username').value.trim() !== '' &&
                        document.getElementById('password').value.trim() !== '' &&
                        document.getElementById('confirmation').value.trim() !== '';

    var prompt2Filled = document.getElementById('fullname').value.trim() !== '' &&
                        document.getElementById('halfname').value.trim() !== '' &&
                        document.getElementById('address').value.trim() !== '' &&
                        document.getElementById('phone').value.trim() !== '' &&
                        document.getElementById('email').value.trim() !== '';

    var prompt3Filled = document.getElementById('getinfo').value.trim() !== '' &&
                        document.getElementById('job').value.trim() !== '' &&
                        document.getElementById('workplace').value.trim() !== '' &&
                        document.getElementById('workplace-number').value.trim() !== '';

    if (prompt1Filled && prompt2Filled && prompt3Filled) {
        moveToNextPrompt('form3', 'prompt3', null);
    } else {
        alert('Please fill in all prompts before proceeding.');
    }
}



//Move to next question
function skipQuestion(formId, questionId) {
    const currentForm = document.getElementById(formId);
    const questionElement = currentForm.querySelector(`#question-${questionId}`);
    const nextElement = questionElement.nextElementSibling;
    const inputField = nextElement ? nextElement.querySelector('input, select') : null;

    if (inputField) {
        inputField.focus();
    } else {
        const firstInputField = currentForm.querySelector('input, select');
        if (firstInputField) {
            firstInputField.focus();
        }
    }
}


//Move to first question of previous prompt
function moveToPreviousPrompt(currentFormId, previousFormId) {
    const currentForm = document.getElementById(currentFormId);
    const previousForm = document.getElementById(previousFormId);
    const firstInputField = previousForm.querySelector('input, select');

    if (firstInputField) {
        firstInputField.focus();
    }
}

document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseover', () => {
        member.querySelector('.member-details').style.opacity = '1';
        member.querySelector('.member-details').style.transform = 'translateY(0)';
    });
    member.addEventListener('mouseout', () => {
        member.querySelector('.member-details').style.opacity = '0';
        member.querySelector('.member-details').style.transform = 'translateY(100%)';
    });
    member.addEventListener('focus', () => {
        member.querySelector('.member-details').style.opacity = '1';
        member.querySelector('.member-details').style.transform = 'translateY(0)';
    });
    member.addEventListener('blur', () => {
        member.querySelector('.member-details').style.opacity = '0';
        member.querySelector('.member-details').style.transform = 'translateY(100%)';
    });
});


// Progress Bar
function updateProgressBar() {
    const totalQuestions = document.querySelectorAll('.question-item').length;
    const answeredQuestions = document.querySelectorAll('.question-item input:valid').length;
    const progress = (answeredQuestions / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}


// Call this function whenever an input is changed or a question is skipped
document.querySelectorAll('.question-item input').forEach(input => {
    input.addEventListener('input', updateProgressBar);
});

function skipQuestion(questionId) {
    const question = document.getElementById(`question-${questionId}`);
    question.style.display = 'none';
    updateProgressBar();
}

function fillProgressBar() {
    document.getElementById('progress-bar').style.width = '100%';
}

document.querySelector('.submit-btn').addEventListener('click', fillProgressBar);


