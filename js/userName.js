const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      sayHello = document.querySelector(".js-sayHello"),
      todo = document.querySelector(".js-toDoForm"); 


const USER_LS = "currentUser",
      SHOWING_CN = "showing";

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintName(currentValue);
    saveName(currentValue);
}
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function askForName(){
    sayHello.classList.remove(SHOWING_CN);
    todo.classList.remove(SHOWING_CN);
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintName(text){
    form.classList.remove(SHOWING_CN);
    sayHello.classList.add(SHOWING_CN);
    todo.classList.add(SHOWING_CN);
    sayHello.innerText = `Hello, ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser===null){
        askForName();
    }else{
        paintName(currentUser);
    }
}

function init(){
    loadName();
}   
init();