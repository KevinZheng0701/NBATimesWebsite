let themeButton = document.getElementById("theme-button")
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener('click', toggleDarkMode)

let submitNowbutton = document.getElementById("submit-now-button")
const addSupport = (person) => {
    const text = document.createElement('p');
    text.innerText = person.fname + ' ' + person.lname + ' supports the ' + person.team + '.';
    const div = document.querySelector('.Support')
    div.append(text)
}
const validateForm = () => {
  let containsErrors = false;
  let Inputs = document.getElementById("predictions").elements;
  let person = {
    fname: Inputs[0].value,
    lname: Inputs[1].value,
    team: Inputs[2].value,
  }
  for (let i = 0; i < Inputs.length; i++) {
    if (Inputs[i].value.length < 2) {
      containsErrors = true;
      Inputs[i].classList.add('error');
    }
    else {
      Inputs[i].classList.remove('error');
    }
  }
  if(containsErrors == false){
    addSupport(person);
    toggleModal(person);
    for (let i = 0; i < Inputs.length; i++) {
      Inputs[i].value = "";
    }
    containsErrors = false;
  }
}
submitNowbutton.addEventListener('click', validateForm)

let animation = {
  revealDistance : 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
}
let revealableContainers = document.querySelectorAll(".revealable")
const reveal = () => {
  for(let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active")
    }
    else {
      revealableContainers[i].classList.remove("active")
    }
  }
}
window.addEventListener('scroll', reveal)
let toggleModal = (person) =>  {
  let modal = document.querySelector("#thanks-modal")
  let modalContent = document.querySelector("#thanks-modal-content")
  let intervalId = setInterval(scaleImage, 500)
  modal.style.display = "flex";
  modalContent.textContent = `Thank you so much ${person.fname} ${person.lname} for supporting the ${person.team}. Here is the playoff bracket for 2023. Good luck for your team!`
  setTimeout(()=>{
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 6500);
}

let scalefactor = 1;
let modalImage = document.getElementById("modal-image")
let scaleImage = () =>  {
  if(scalefactor == 1)  {
    scalefactor = 0.9;
  }
  else  {
    scalefactor = 1;
  }
  modalImage.style.transform = `scale(${scalefactor})`;
}