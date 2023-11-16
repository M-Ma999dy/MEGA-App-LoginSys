"use strict";

/* ----------------------------------------------------------------------------- */
/* Loader ---------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

window.addEventListener("load",function(){
        
  $("#loaderDiv").fadeOut(1000,function(){

    $("#myLoading").remove()

    $("body").css("overflow-y","auto")

  })

}) 

/* ----------------------------------------------------------------------------- */
/* Sharding -------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

function openLink(url){

  return   window.open(`https://${url}`,"_blank")
  
}

/* ----------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */


/* ----------------------------------------------------------------------------- */
/* Login Sys ------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

let singUpBTN = document.getElementById("singUpBTN")
let SingInForm = document.getElementById("SingInForm")

let singInBTN = document.getElementById("singInBTN")
let singUpForm = document.getElementById("singUpForm")
let forgotPassForm = document.getElementById("forgotPassForm")

let forgotPassBTN = document.getElementById('forgotPassBTN')

let singUpName = document.querySelector("#singUpName")
let singUpPhone = document.querySelector("#singUpPhone")
let singUpMail = document.querySelector("#singUpMail")
let singUpPass = document.querySelector("#singUpPass")

let singInMail = document.querySelector("#singInMail")
let singInPass = document.querySelector("#singInPass")

let forgotPassMail = document.getElementById('forgotPassMail')
let forgotPassPhone = document.getElementById('forgotPassPhone')
let forgotPassPass = document.getElementById('forgotPassPass')

let validName  = false
let validPhone = false
let validMail  = false
let validPass  = false


let logInDiv = document.getElementById("megaLogIn")
let singUpDiv = document.getElementById("sysSingUp")
let homeDiv = document.getElementById("megaHome")
let logOutBTN = document.getElementById("navLogOutBTN")
let singOutOutBTN = document.getElementById("singOutOutBTN")

let allMembers = []
let loginUser  = {}






let pLSuccess = document.querySelector("#logSuccess")
let pLMNotSuccess = document.querySelector("#logMNotSuccess")
let pLPNotSuccess = document.querySelector("#logPNotSuccess")

let pSuccess = document.querySelector("#success")
let pNotSuccess = document.querySelector("#notSuccess")


let allSections = document.querySelectorAll('.displayHidden')
let allPages = document.querySelectorAll('.displayHome')

var allMail=[]
var allPass=[]



// -------------------------------------------------------------------------------
// Init --------------------------------------------------------------------------
// -------------------------------------------------------------------------------

if(localStorage.getItem('LoginSystem-loginUser') != null){
    loginUser = JSON.parse(localStorage.getItem('LoginSystem-loginUser'));
    document.getElementById('homeUserName').innerHTML = loginUser.name
    openClosePage()
    openCloseHome('home_Page')
    loginLogoutBTN('navLogOutBTN')
}else{
    loginUser = {};
    openClosePage('sysSingIn')
    loginLogoutBTN('navSingUpBTN')
}


if(localStorage.getItem('LoginSystem-AllUsers') != null){
    allMembers = JSON.parse(localStorage.getItem('LoginSystem-AllUsers'));
}else{
    allMembers = [];
}

// -------------------------------------------------------------------------------
// BTN OpenClose -----------------------------------------------------------------
// -------------------------------------------------------------------------------

function loginLogoutBTN(flag){

    
    document.getElementById('navLogOutBTN').classList.add('d-none')

    document.getElementById('navSingInBTN').classList.add('d-none')

    document.getElementById('navSingUpBTN').classList.add('d-none')



    document.getElementById(`${flag}`).classList.remove('d-none')


}
function openClosePage(page){

    openCloseHome("singIn_Up_Page")

    for (let i = 0; i < allSections.length; i++) {

        allSections[i].classList.add('d-none')
    }
    
    if (page) return document.getElementById(page).classList.remove("d-none")
}

function openCloseHome(page){

    for (let i = 0; i < allPages.length; i++) {

        allPages[i].classList.add('d-none')

    }

    document.getElementById(page).classList.remove("d-none")
}

singUpForm.addEventListener("click",function(){
    loginLogoutBTN('navSingInBTN')
    openClosePage('sysSingUp')
    clearForm()
})
document.getElementById('navSingUpBTN').addEventListener("click",function(){
    loginLogoutBTN('navSingInBTN')
    openClosePage('sysSingUp')
    clearForm()
})
function openSingInForm(){
    loginLogoutBTN('navSingUpBTN')
    openClosePage('sysSingIn')
    clearForm()
}
forgotPassForm.addEventListener("click",function(){
    loginLogoutBTN('navSingInBTN')
    openClosePage('sysForgotPass')
    clearForm()
})
// -------------------------------------------------------------------------------
// Sing In/Up --------------------------------------------------------------------
// -------------------------------------------------------------------------------

function clearForm(){
    singUpName.value =""
    singUpPhone.value =""
    singUpMail.value =""
    singUpPass.value =""
    singInMail.value =""
    singInPass.value =""
    forgotPassMail.value=''
    forgotPassPhone.value=''
    forgotPassPass.value=''

    let allInvalidInputs = document.querySelectorAll('.invalidError')
    let allPassError = document.querySelectorAll('.passError')
    let allPassErrorCheck = document.querySelectorAll('.passErrorCheck')

    for (let i = 0; i < allInvalidInputs.length; i++) {
        allInvalidInputs[i].classList.add('d-none');
    }
    for (let i = 0; i < allPassError.length; i++) {
        allPassError[i].classList.replace('text-light','text-danger')
    }
    for (let i = 0; i < allPassErrorCheck.length; i++) {
        allPassErrorCheck[i].classList.replace('fa-check','fa-xmark')
    }

    document.getElementById('eyeSingUp').classList.replace('text-white','text-info')
    document.getElementById('eyeSingIn').classList.replace('text-white','text-info')
    document.getElementById('eyeForgotPass').classList.replace('text-white','text-info')

    document.getElementById('singUpBTN').classList.replace('btn-success','btn-outline-info')
    document.getElementById('singUpBTN').classList.replace('btn-danger','btn-outline-info')
    document.getElementById('singUpNotSuccess').classList.add('d-none')

    document.getElementById('wrongPass').classList.replace('d-block','d-none')
    document.getElementById('singInBTN').classList.replace('btn-danger','btn-outline-info')
    document.getElementById('singInBTN').classList.replace('btn-success','btn-outline-info')
    document.getElementById('notFound').classList.replace('d-block','d-none')
    document.getElementById('eyeSingUp').classList.replace('fa-eye','fa-eye-slash')
    document.getElementById('eyeSingIn').classList.replace('fa-eye','fa-eye-slash')
    document.getElementById('eyeForgotPass').classList.replace('fa-eye','fa-eye-slash')

    document.getElementById('forgotPassBTN').classList.add('disabled')
    document.getElementById('enterNewPass').classList.add('d-none')

    document.getElementById('forgotPassBTN').classList.replace('btn-danger','btn-outline-info')
    document.getElementById('forgotPassBTN').classList.replace('btn-success','btn-outline-info')

    document.getElementById('forgotPassNotFound').classList.add('d-none')
    document.getElementById('forgotPassIncorrectPhone').classList.add('d-none')

    document.getElementById('forgotPassBTN').innerHTML = 'Check Info'
    document.getElementById('singUpBTN').innerHTML='Registration'
    document.getElementById('singInBTN').innerHTML='Login'


}

// -------------------------------------------------------------------------------
// SingUp ------------------------------------------------------------------------
// -------------------------------------------------------------------------------

function singUpValidateName(){
    let regex =/^[a-zA-Z\s]{3,15}$/img;
    if (regex.test(singUpName.value)){
        document.getElementById('invalidSingUpName').classList.add('d-none')
        validName = true
        enableSingUpBTN()
    }else{
        document.getElementById('invalidSingUpName').classList.remove('d-none')
        validName = false
        enableSingUpBTN()
    }
}
singUpName.addEventListener("keyup",function(){
    singUpValidateName()
})
singUpName.addEventListener("focus",function(){
    document.getElementById('invalidSingUpName').classList.add('d-none')
})

// -------------------------------------------------------------

function singUpValidatePhone(){
    let regex =/^(\+2)?01[0125][0-9]{8}$/img;
    if (regex.test(singUpPhone.value)){
        document.getElementById('invalidSingUpPhone').classList.add('d-none')
        validPhone = true
        enableSingUpBTN()
    }else{
        document.getElementById('invalidSingUpPhone').classList.remove('d-none')
        validPhone = false
        enableSingUpBTN()
    }
}
singUpPhone.addEventListener("keyup",function(){
    singUpValidatePhone()
})
singUpPhone.addEventListener("focus",function(){

    document.getElementById('invalidSingUpPhone').classList.add('d-none')
})

// -------------------------------------------------------------

function singUpValidateMail(){
    let regex =/^([0-9A-Z]){1,}([\.\-\_])?([0-9A-Z]){0,}([\.\-\_])?([0-9A-Z]){0,}([\.\-\_])?([0-9A-Z]){0,}\@(yahoo|gmail|outlook)\.com$/img;
    if (regex.test(singUpMail.value)){
        document.getElementById('invalidSingUpMail').classList.add('d-none')
        validMail = true
        enableSingUpBTN()
    }else{
        document.getElementById('invalidSingUpMail').classList.remove('d-none')
        validMail = false
        enableSingUpBTN()
    }
}
singUpMail.addEventListener("keyup",function(){
    singUpValidateMail()
})
singUpMail.addEventListener("focus",function(){
    document.getElementById('invalidSingUpMail').classList.add('d-none')
    document.getElementById('singUpNotSuccess').classList.add('d-none')
    document.getElementById('singUpBTN').classList.replace('btn-danger','btn-outline-info')
})

// -------------------------------------------------------------

function singUpValidatePass(){

    let pass   = singUpPass;

    let passRegexCapital =/^[A-Z]+/m;
    let passCapital;

    let passRegexSmall =/[a-z]+/m;
    let passSmall;

    let passRegexSpatial =/[\~\!\@\#\$\%\^\&\*\(\)\_\-\=\+\|\\\/\.]/m;
    let passSpatial;

    let passRegexCharacters =/(.){8,}/m;
    let passCharacters;

    let passRegexNumber =/[0-9]$/m;
    let passNumber;

    if (passRegexCapital.test(pass.value)){

        document.getElementById('capitalLetter').classList.replace('text-danger','text-light')     
        document.getElementById('capitalLetterX').classList.replace('fa-xmark','fa-check')
        passCapital = true

    }else{

        document.getElementById('capitalLetter').classList.replace('text-light','text-danger')
        document.getElementById('capitalLetterX').classList.replace('fa-check','fa-xmark')
        passCapital = false
    }
    
    //-----------------

    if (passRegexSmall.test(pass.value)){

        document.getElementById('smallLetter').classList.replace('text-danger','text-light')
        document.getElementById('smallLetterX').classList.replace('fa-xmark','fa-check')
        passSmall = true

    }else{

        document.getElementById('smallLetter').classList.replace('text-light','text-danger')
        document.getElementById('smallLetterX').classList.replace('fa-check','fa-xmark')
        passSmall = false
    }

    //-----------------

    if (passRegexSpatial.test(pass.value)){

        document.getElementById('spatial').classList.replace('text-danger','text-light')
        document.getElementById('spatialX').classList.replace('fa-xmark','fa-check')
        passSpatial = true

    }else{

        document.getElementById('spatial').classList.replace('text-light','text-danger')
        document.getElementById('spatialX').classList.replace('fa-check','fa-xmark')
        passSpatial = false
    }

    //----------------------

    if (passRegexCharacters.test(pass.value)){

        document.getElementById('characters').classList.replace('text-danger','text-light')
        document.getElementById('charactersX').classList.replace('fa-xmark','fa-check')
        passCharacters = true

    }else{

        document.getElementById('characters').classList.replace('text-light','text-danger')
        document.getElementById('charactersX').classList.replace('fa-check','fa-xmark')
        passCharacters = false
    }

    //----------------------

    if (passRegexNumber.test(pass.value)){

        document.getElementById('passNumber').classList.replace('text-danger','text-light')
        document.getElementById('passNumberX').classList.replace('fa-xmark','fa-check')
        passNumber = true

    }else{

        document.getElementById('passNumber').classList.replace('text-light','text-danger')
        document.getElementById('passNumberX').classList.replace('fa-check','fa-xmark')
        passNumber = false
    }

    //------------------------

    if (
        passCapital === true 
        && 
        passSmall === true 
        && 
        passSpatial === true 
        && 
        passCharacters === true 
        && 
        passNumber === true ){

        validPass = true

        enableSingUpBTN()

    }else{

        validPass = false
        enableSingUpBTN()
    }

}
function showSingUpPass(){
    if (singUpPass.getAttribute('type') == 'password'){
        singUpPass.setAttribute('type','text')
        document.getElementById('eyeSingUp').classList.replace('fa-eye-slash','fa-eye')
        document.getElementById('eyeSingUp').classList.replace('text-info','text-white')
    }else{
        singUpPass.setAttribute('type','password')
        document.getElementById('eyeSingUp').classList.replace('fa-eye','fa-eye-slash')
        document.getElementById('eyeSingUp').classList.replace('text-white','text-info')

    }
}
singUpPass.addEventListener("keyup",function(){
    singUpValidatePass()
})

// -------------------------------------------------------------

function enableSingUpBTN(){

    if( 
        validName == true
        &&
        validPhone == true
        &&
        validMail == true
        &&
        validPass == true
    ){
        
        singUpBTN.classList.remove('disabled')
    }else{
        singUpBTN.classList.add('disabled')

    }

}

// -------------------------------------------------------------

function addUser(){

    let userPhone

    if (singUpPhone.value.startsWith('0')) {
        userPhone = singUpPhone.value.replace('0','+20')
    }else{
        userPhone = singUpPhone.value
    }

    let foundedUser = allMembers.find((ele) => ele.mail == singUpMail.value.toLowerCase())

    if (foundedUser) {
        document.getElementById('singUpBTN').classList.replace('btn-outline-info','btn-danger')
        document.getElementById('singUpNotSuccess').classList.remove('d-none')
        return false
    }

    let newUser={
        name: singUpName.value.toUpperCase(),
        phone: userPhone,
        mail: singUpMail.value.toLowerCase(),
        pass: singUpPass.value,
    }

    allMembers.push(newUser)

    localStorage.setItem('LoginSystem-AllUsers',JSON.stringify(allMembers))

    document.getElementById('singUpBTN').classList.replace('btn-outline-info','btn-success')
    document.getElementById('singUpBTN').classList.add('disabled')
    document.getElementById('singUpBTN').innerHTML=`<div class="d-flex justify-content-center align-items-center"><div class="spinner-border text-white me-1" role="status"><span class="sr-only">Loading...</span></div><p class="text-white mb-0 ms-1">Success</p></div>`

    setTimeout(function(){
        clearForm()
        openClosePage('sysSingIn')
        loginLogoutBTN('navSingUpBTN')

    },1500)

}



// -------------------------------------------------------------------------------
// SingUp ------------------------------------------------------------------------
// -------------------------------------------------------------------------------


// -------------------------------------------------------------------------------
// SingIn ------------------------------------------------------------------------
// -------------------------------------------------------------------------------

function singInValidateMail(){
    let regex =/^([0-9A-Z]){1,}([\.\-\_])?([0-9A-Z]){0,}([\.\-\_])?([0-9A-Z]){0,}([\.\-\_])?([0-9A-Z]){0,}\@(yahoo|gmail|outlook)\.com$/img;
    if (regex.test(singInMail.value)){
        document.getElementById('invalidSingInMail').classList.add('d-none')
        validMail = true
        enableSingInBTN()
    }else{
        document.getElementById('invalidSingInMail').classList.remove('d-none')
        validMail = false
        enableSingInBTN()
    }
}
singInMail.addEventListener("keyup",function(){
    singInValidateMail()
})
singInMail.addEventListener("focus",function(){
    document.getElementById('invalidSingInMail').classList.add('d-none')
    document.getElementById('notFound').classList.replace('d-block','d-none')
    document.getElementById('singInBTN').classList.replace('btn-danger','btn-outline-info')
    document.getElementById('singInBTN').classList.replace('btn-success','btn-outline-info')
})

// -------------------------------------------------------------

function singInValidatePass(){

    let pass = singInPass;

    let passRegexCapital =/^[A-Z]+/m;
    let passCapital;

    let passRegexSmall =/[a-z]+/m;
    let passSmall;

    let passRegexSpatial =/[\~\!\@\#\$\%\^\&\*\(\)\_\-\=\+\|\\\/\.]/m;
    let passSpatial;

    let passRegexCharacters =/(.){8,}/m;
    let passCharacters;

    let passRegexNumber =/[0-9]$/m;
    let passNumber;

    if (passRegexCapital.test(pass.value)){

        passCapital = true

    }else{

        passCapital = false
    }

    
    //-----------------

    if (passRegexSmall.test(pass.value)){

        passSmall = true

    }else{

        passSmall = false
    }

    //-----------------

    if (passRegexSpatial.test(pass.value)){

        passSpatial = true

    }else{

        passSpatial = false
    }

    //----------------------

    if (passRegexCharacters.test(pass.value)){

        passCharacters = true

    }else{

        passCharacters = false
    }

    //----------------------

    if (passRegexNumber.test(pass.value)){

        passNumber = true

    }else{

        passNumber = false
    }

    //------------------------

    if (
        passCapital === true 
        && 
        passSmall === true 
        && 
        passSpatial === true 
        && 
        passCharacters === true 
        && 
        passNumber === true 
        
        ){

        document.getElementById('invalidSingInPass').classList.add('d-none')     

        validPass = true

        enableSingInBTN()

    }else{

        document.getElementById('invalidSingInPass').classList.remove('d-none')     

        validPass = false

        enableSingInBTN()
    }

}
function showSingInPass(){
    if (singInPass.getAttribute('type') == 'password'){
        singInPass.setAttribute('type','text')
        document.getElementById('eyeSingIn').classList.replace('fa-eye-slash','fa-eye')
        document.getElementById('eyeSingIn').classList.replace('text-info','text-white')

    }else{
        singInPass.setAttribute('type','password')
        document.getElementById('eyeSingIn').classList.replace('fa-eye','fa-eye-slash')
        document.getElementById('eyeSingIn').classList.replace('text-white','text-info')

    }
}
singInPass.addEventListener("keyup",function(){
    singInValidatePass()
})
singInPass.addEventListener("focus",function(){
    document.getElementById('invalidSingInPass').classList.add('d-none')
    document.getElementById('wrongPass').classList.replace('d-block','d-none')
    document.getElementById('singInBTN').classList.replace('btn-danger','btn-outline-info')
    document.getElementById('singInBTN').classList.replace('btn-success','btn-outline-info')

})

// -------------------------------------------------------------

function enableSingInBTN(){

    if( 
        validMail == true
        &&
        validPass == true
    ){
        
        singInBTN.classList.remove('disabled')
    }else{
        singInBTN.classList.add('disabled')

    }

}

// -------------------------------------------------------------

function login(){

    let foundedUser = allMembers.find((ele) => ele.mail == singInMail.value.toLowerCase())
    
    if (!foundedUser) {
        document.getElementById('notFound').classList.replace('d-none','d-block')
        document.getElementById('singInBTN').classList.replace('btn-outline-info','btn-danger')
        return false
    }else if (foundedUser.pass != singInPass.value) {
        document.getElementById('notFound').classList.replace('d-block','d-none')
        document.getElementById('wrongPass').classList.replace('d-none','d-block')
        document.getElementById('singInBTN').classList.replace('btn-outline-info','btn-danger')
        return false
    }else{
        localStorage.setItem('LoginSystem-loginUser',JSON.stringify(foundedUser))
        loginUser = foundedUser
        document.getElementById('homeUserName').innerHTML = foundedUser.name

        document.getElementById('notFound').classList.replace('d-block','d-none')
        document.getElementById('wrongPass').classList.replace('d-block','d-none')

        document.getElementById('singInBTN').classList.replace('btn-outline-info','btn-success')
        document.getElementById('singInBTN').classList.add('disabled')

        document.getElementById('singInBTN').innerHTML=`<div class="d-flex justify-content-center align-items-center"><div class="spinner-border text-white me-1" role="status"><span class="sr-only">Loading...</span></div><p class="text-white mb-0 ms-1">Success</p></div>`
            
        setTimeout(function(){
            document.getElementById('singInBTN').classList.replace('btn-success','btn-outline-info')
            document.getElementById('singInBTN').innerHTML='Login'    
            clearForm()
            openClosePage()
            openCloseHome('home_Page')
            loginLogoutBTN('navLogOutBTN')
        },1500)
    }
}

// -------------------------------------------------------------------------------
// SingIn ------------------------------------------------------------------------
// -------------------------------------------------------------------------------




// -------------------------------------------------------------------------------
// ForgotPass --------------------------------------------------------------------
// -------------------------------------------------------------------------------

function forgotPassValidateMail(){
    let regex =/^([0-9A-Z]){1,}([\.\-\_])?([0-9A-Z]){0,}([\.\-\_])?([0-9A-Z]){0,}([\.\-\_])?([0-9A-Z]){0,}\@(yahoo|gmail|outlook)\.com$/img;
    if (regex.test(forgotPassMail.value)){
        document.getElementById('invalidForgotPassMail').classList.add('d-none')
        validMail = true
        enableForgotPassBTN()
    }else{
        document.getElementById('invalidForgotPassMail').classList.remove('d-none')
        validMail = false
        enableForgotPassBTN()
    }
}
forgotPassMail.addEventListener("keyup",function(){
    forgotPassValidateMail()
})
forgotPassMail.addEventListener("focus",function(){
    document.getElementById('invalidForgotPassMail').classList.add('d-none')
    document.getElementById('forgotPassNotFound').classList.replace('d-block','d-none')
    document.getElementById('forgotPassBTN').classList.replace('btn-danger','btn-outline-info')
    document.getElementById('forgotPassBTN').classList.replace('btn-success','btn-outline-info')
})

// -------------------------------------------------------------

function forgotPassValidatePhone(){
    let regex =/^(\+2)?01[0125][0-9]{8}$/img;
    if (regex.test(forgotPassPhone.value)){
        document.getElementById('invalidForgotPassPhone').classList.add('d-none')
        validPhone = true
        enableForgotPassBTN()
    }else{
        document.getElementById('invalidForgotPassPhone').classList.remove('d-none')
        validPhone = false
        enableForgotPassBTN()
    }
}
forgotPassPhone.addEventListener("keyup",function(){
    forgotPassValidatePhone()
})
forgotPassPhone.addEventListener("focus",function(){
    document.getElementById('invalidForgotPassPhone').classList.add('d-none')
    document.getElementById('forgotPassIncorrectPhone').classList.add('d-none')
    document.getElementById('forgotPassBTN').classList.replace('btn-danger','btn-outline-info')
    document.getElementById('forgotPassBTN').classList.replace('btn-success','btn-outline-info')

})













function forgotPassValidatePass(){

    let pass   = forgotPassPass;

    let passRegexCapital =/^[A-Z]+/m;
    let passCapital;

    let passRegexSmall =/[a-z]+/m;
    let passSmall;

    let passRegexSpatial =/[\~\!\@\#\$\%\^\&\*\(\)\_\-\=\+\|\\\/\.]/m;
    let passSpatial;

    let passRegexCharacters =/(.){8,}/m;
    let passCharacters;

    let passRegexNumber =/[0-9]$/m;
    let passNumber;

    if (passRegexCapital.test(pass.value)){

        document.getElementById('capitalLetterForgotPass').classList.replace('text-danger','text-light')     
        document.getElementById('capitalLetterXForgotPass').classList.replace('fa-xmark','fa-check')
        passCapital = true

    }else{

        document.getElementById('capitalLetterForgotPass').classList.replace('text-light','text-danger')
        document.getElementById('capitalLetterXForgotPass').classList.replace('fa-check','fa-xmark')
        passCapital = false
    }
    
    //-----------------

    if (passRegexSmall.test(pass.value)){

        document.getElementById('smallLetterForgotPass').classList.replace('text-danger','text-light')
        document.getElementById('smallLetterXForgotPass').classList.replace('fa-xmark','fa-check')
        passSmall = true

    }else{

        document.getElementById('smallLetterForgotPass').classList.replace('text-light','text-danger')
        document.getElementById('smallLetterXForgotPass').classList.replace('fa-check','fa-xmark')
        passSmall = false
    }

    //-----------------

    if (passRegexSpatial.test(pass.value)){

        document.getElementById('spatialForgotPass').classList.replace('text-danger','text-light')
        document.getElementById('spatialXForgotPass').classList.replace('fa-xmark','fa-check')
        passSpatial = true

    }else{

        document.getElementById('spatialForgotPass').classList.replace('text-light','text-danger')
        document.getElementById('spatialXForgotPass').classList.replace('fa-check','fa-xmark')
        passSpatial = false
    }

    //----------------------

    if (passRegexCharacters.test(pass.value)){

        document.getElementById('charactersForgotPass').classList.replace('text-danger','text-light')
        document.getElementById('charactersXForgotPass').classList.replace('fa-xmark','fa-check')
        passCharacters = true

    }else{

        document.getElementById('charactersForgotPass').classList.replace('text-light','text-danger')
        document.getElementById('charactersXForgotPass').classList.replace('fa-check','fa-xmark')
        passCharacters = false
    }

    //----------------------

    if (passRegexNumber.test(pass.value)){

        document.getElementById('passNumberForgotPass').classList.replace('text-danger','text-light')
        document.getElementById('passNumberXForgotPass').classList.replace('fa-xmark','fa-check')
        passNumber = true

    }else{

        document.getElementById('passNumberForgotPass').classList.replace('text-light','text-danger')
        document.getElementById('passNumberXForgotPass').classList.replace('fa-check','fa-xmark')
        passNumber = false
    }

    //------------------------

    if (
        passCapital === true 
        && 
        passSmall === true 
        && 
        passSpatial === true 
        && 
        passCharacters === true 
        && 
        passNumber === true ){

        validPass = true
        enableForgotPassBTNForChangePass()

    }else{

        validPass = false
        enableForgotPassBTNForChangePass()
    }

}

function enableForgotPassBTNForChangePass(){

    if( 
        validPass == true
    ){
        forgotPassBTN.classList.remove('disabled')
    }else{

        forgotPassBTN.classList.add('disabled')

    }

}

function showForgotPassPass(){
    if (forgotPassPass.getAttribute('type') == 'password'){
        forgotPassPass.setAttribute('type','text')
        document.getElementById('eyeForgotPass').classList.replace('fa-eye-slash','fa-eye')
        document.getElementById('eyeForgotPass').classList.replace('text-info','text-white')
    }else{
        forgotPassPass.setAttribute('type','password')
        document.getElementById('eyeForgotPass').classList.replace('fa-eye','fa-eye-slash')
        document.getElementById('eyeForgotPass').classList.replace('text-white','text-info')

    }
}

forgotPassPass.addEventListener("keyup",function(){
    forgotPassValidatePass()
})
// -------------------------------------------------------------

function enableForgotPassBTN(){

    if( 
        validMail == true
        &&
        validPhone == true
    ){
        
        forgotPassBTN.classList.remove('disabled')
    }else{
        forgotPassBTN.classList.add('disabled')

    }

}

// -------------------------------------------------------------

function checkInfo(){

    let foundedUser = allMembers.find((ele) => ele.mail == forgotPassMail.value.toLowerCase())
    
    let userPhone

    if (forgotPassPhone.value.startsWith('0')) {
        userPhone = forgotPassPhone.value.replace('0','+20')
    }else{
        userPhone = forgotPassPhone.value
    }

    if (!foundedUser) {
        document.getElementById('forgotPassNotFound').classList.replace('d-none','d-block')
        document.getElementById('forgotPassBTN').classList.replace('btn-outline-info','btn-danger')
        return false
    }else if (foundedUser.phone != userPhone) {
        document.getElementById('forgotPassNotFound').classList.replace('d-block','d-none')
        document.getElementById('forgotPassIncorrectPhone').classList.replace('d-none','d-block')
        document.getElementById('forgotPassBTN').classList.replace('btn-outline-info','btn-danger')
        return false
    }else{

        document.getElementById('forgotPassBTN').classList.replace('btn-outline-info','btn-success')
        document.getElementById('forgotPassBTN').classList.add('disabled')

        document.getElementById('forgotPassBTN').innerHTML=`<div class="d-flex justify-content-center align-items-center"><div class="spinner-border text-white me-1" role="status"><span class="sr-only">Loading...</span></div><p class="text-white mb-0 ms-1">Success</p></div>`
    
        setTimeout(function(){
            document.getElementById('forgotPassNotFound').classList.replace('d-block','d-none')
            document.getElementById('forgotPassIncorrectPhone').classList.replace('d-block','d-none')
    
            forgotPassMail.setAttribute('disabled','')
            forgotPassPhone.setAttribute('disabled','')
    
            document.getElementById('forgotPassBTN').classList.replace('btn-success','btn-outline-info')
            document.getElementById('forgotPassBTN').innerHTML = "Change Password"
            document.getElementById('forgotPassBTN').setAttribute('onclick',`changePass('${foundedUser.mail}')`)
            document.getElementById('enterNewPass').classList.remove('d-none')
    
            document.getElementById('forgotPassBTN').classList.add('disabled')
    
        },1500)

    }
}

function changePass(user){

    document.getElementById('forgotPassBTN').classList.replace('btn-outline-info','btn-success')
    document.getElementById('forgotPassBTN').classList.add('disabled')

    document.getElementById('forgotPassBTN').innerHTML=`<div class="d-flex justify-content-center align-items-center"><div class="spinner-border text-white me-1" role="status"><span class="sr-only">Loading...</span></div><p class="text-white mb-0 ms-1">Success</p></div>`

    let indexOfUser = allMembers.indexOf(user)

    if (indexOfUser < 0) {
        indexOfUser = indexOfUser + allMembers.length
    }

    allMembers[indexOfUser].pass = forgotPassPass.value

    localStorage.setItem('LoginSystem-AllUsers',JSON.stringify(allMembers))

    setTimeout(function(){
        clearForm()
        openClosePage('sysSingIn')
        loginLogoutBTN('navSingUpBTN')
    },1500)
 
}


// -------------------------------------------------------------------------------
// ForgotPass --------------------------------------------------------------------
// -------------------------------------------------------------------------------







// -------------------------------------------------------------------------------
// User_Profile ------------------------------------------------------------------
// -------------------------------------------------------------------------------

function openProfileInfo(){

    openCloseHome('profile_Page')

    document.getElementById("profileName").innerHTML    = loginUser.name
    document.getElementById("profilePhone").innerHTML   = loginUser.phone
    document.getElementById("profileMail").innerHTML    = loginUser.mail
    document.getElementById("profilePass").innerHTML    = loginUser.pass


}



// -------------------------------------------------------------------------------
// User_Profile ------------------------------------------------------------------
// -------------------------------------------------------------------------------



















// -------------------------------------------------------------------------------
// LogOut ------------------------------------------------------------------------
// -------------------------------------------------------------------------------

singOutOutBTN.addEventListener('click',function(){

    localStorage.removeItem('LoginSystem-loginUser')

    loginUser = {};

    singInBTN.classList.add('disabled')

    loginLogoutBTN('navSingUpBTN')

    openClosePage('sysSingIn')
})


// -------------------------------------------------------------------------------
// LogOut --------------------------------------------------------------------
// -------------------------------------------------------------------------------








/* SingUp ------------------------------------------------------------------------- */
/* SingUp ------------------------------------------------------------------------- */
/* SingUp ------------------------------------------------------------------------- */



/* SingUp ------------------------------------------------------------------------- */
/* SingUp ------------------------------------------------------------------------- */
/* SingUp ------------------------------------------------------------------------- */



// SingInForm.addEventListener("click",function(){
//     let orderToLogin = setTimeout(function(){
//         redirectionToLogin()
//     },250)
// })


// function redirectionToHome(){
//     logInDiv.classList.replace("d-block","d-none")
//     singUpDiv.classList.replace("d-block","d-none")
//     homeDiv.classList.replace("d-none","d-block")
// }






// // ----------------------------------------------------------------

// function addAllMail() {
//     console.log(singUpMail.value.toLowerCase())
    
//     for (var i = 0; i < allMembers.length; i++) {
//         allMail.push(allMembers[i].mail.toLowerCase())
//     }
// }

// function addAllPass() {
//     console.log(singUpPass.value.toLowerCase())
    
//     for (var i = 0; i < allMembers.length; i++) {
//         allPass.push(allMembers[i].pass)
//     }
// }

// // ---------------------------------------------------------------
// singInBTN.addEventListener("click",function(){
    
//     addAllMail()


//     if (allMail.includes(singInMail.value.toLowerCase()) == false){
//         console.log("Mail false")
//         pLMNotSuccess.classList.replace("d-none","d-block")
//         pLPNotSuccess.classList.replace("d-block","d-none")
//         pLSuccess.classList.replace("d-block","d-none")

//     }else{
//         console.log("Mail true")
//         pLMNotSuccess.classList.replace("d-block","d-none")
//         pLPNotSuccess.classList.replace("d-block","d-none")
//         pLSuccess.classList.replace("d-block","d-none")
//         addAllPass()

//         if (allPass.includes(singInPass.value) == false){
//             console.log("Pass false")
//             pLMNotSuccess.classList.replace("d-block","d-none")
//             pLPNotSuccess.classList.replace("d-none","d-block")
//             pLSuccess.classList.replace("d-block","d-none")
            
//         }else{
//             console.log("Pass true")
//             pLMNotSuccess.classList.replace("d-block","d-none")
//             pLPNotSuccess.classList.replace("d-block","d-none")
//             pLSuccess.classList.replace("d-none","d-block")

//             let orderToHome = setTimeout(function(){
//                 redirectionToHome()
//             },750)
//         }
//     }
// })






// // ----------------------------------------------------------------



// // ---------------------------------------------------------------


// btnLogOut.addEventListener("click",function(){
//     let orderLogout = setTimeout(function(){
//         homeDiv.classList.replace("d-block","d-none")
//         singUpDiv.classList.replace("d-block","d-none")
//         logInDiv.classList.replace("d-none","d-block")

//         pLMNotSuccess.classList.replace("d-block","d-none")
//         pLPNotSuccess.classList.replace("d-block","d-none")
//         pLSuccess.classList.replace("d-block","d-none")
//         clearForm()
//     },500)
// })











// function singUpValidatePass(){
//     let character8 =/[\w\\\|\/\+\-\&\%\$\#\@\!\~\:\s]{8,30}/mg;
//     let uppercase =/[A-Z]{1,}/m;
//     let lowercase =/[a-z]{1,}/m;
//     let symbol =/[\_\\\|\/\*\+\-\=\&\^\%\$\#\@\!\~\?\"\'\:\;]{1,}/m;
//     let number =/[0-9]{1,}/m


//     console.log("assdasdasd");

    // function ch8 (){
    //     if (character8.test(singUpPass.value)){
    //         console.log(letter8);

    //         letter8.classList.add("d-none")
    //         return true
    
    //     }else{
    //         letter8.classList.remove("d-none")
    //         return false
    //     }
    // }
    // ch8()
// --------------------------------------------------

// function chL8_30 (){
//     if (uppercase.test(singUpPass.value)){
//         letter8.classList.add("d-none")

//         return true

//     }else{
//         letter8.classList.remove("d-none")
//         return false
//     }
// }
// ss ()

//     function chU (){
//         if (uppercase.test(singUpPass.value)){
//             letterU.classList.add("d-none")

//             return true
    
//         }else{
//             letterU.classList.remove("d-none")
//             return false
//         }
//     }
//     chU ()
// // --------------------------------------------------

//     function chL (){
//         if (lowercase.test(singUpPass.value)){
//             letterL.classList.add("d-none")

//             return true
    
//         }else {
//             letterL.classList.remove("d-none")
//             return false
//         }
//     }
//     chL ()
// // --------------------------------------------------
//     function chS (){
//         if (symbol.test(singUpPass.value)){
//             letterS.classList.add("d-none")

//             return true
    
//         }else {
//             letterS.classList.remove("d-none")
//             return false
//         }
//     }
//     chS ()
// // --------------------------------------------------
//     function chN (){
//         if (number.test(singUpPass.value)){
//             letterN.classList.add("d-none")

//             return true
//         }else{
//             letterN.classList.remove("d-none")
//             return false
//         }
//     }
//     chN ()
// // --------------------------------------------------

//     if (ch8() == true &&  chU () == true && chL () == true && chS () == true && chN () == true) {
//         console.log("Pass Done");
//         console.log("----------------");
//         return true
//     }else{
//         return false
//     }
 
// }
// singUpPass.addEventListener("focusout",function(){
//     console.log("assdasdasd");
//     singUpValidatePass()
// })

// singUpPass.addEventListener("focus",function(){
//     let passPCheck = document.querySelectorAll('.passPCheck')
//     for (let i = 0; i < passPCheck.length; i++) {
//         passPCheck[i].classList.add('d-none');
        
//     }
//     iMail.classList.add('d-none')
// })






// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------













// singUpPass.addEventListener("focus",function(){
//     letterN.classList.remove("d-none")
//     letterL.classList.remove("d-none")
//     letterU.classList.remove("d-none")
//     letterS.classList.remove("d-none")
//     letter8.classList.remove("d-none")
// })




















// -------------------------------------------------------------



// -------------------------------------------------------------


/* ----------------------------------------------------------------------------- */
/* Login Sys ------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */


