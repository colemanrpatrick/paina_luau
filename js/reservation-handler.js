//________________________________________________________
//________________________________________________________
//create Pages
//________________________________________________________
//________________________________________________________
let createShowOnlyPage1 = () => {
    createReservationPage("page1");
    createTitle("page1",cartData.Groupings[1].Name);
    showCalendar("page1",cartData.Availabilities[0].ClosedDates);
}
let createShowOnlyPage2 = () => {
    createReservationPage("page2");
    createTitle("page2",cartData.Groupings[1].Name);
    showPrices("page2",cartData.Prices,"show only");
    showPrices("page2",cartData.Prices,null);
 }
 let createShowOnlyPage3 = () => {
    createReservationPage("page3");
    createTitle("page3",cartData.Groupings[1].Name);
    showCollectors("page3",cartData.Collectors);
    showEmailPhoneTemplate("page3");
 }


 let createGeneralAdmissionPage1 = () => {
    createReservationPage("page1");
    createTitle("page1",cartData.Groupings[2].Name);
    showCalendar("page1",cartData.Availabilities[0].ClosedDates);
}
let createGeneralAdmissionPage2 = () => {
    createReservationPage("page2");
    createTitle("page2",cartData.Groupings[2].Name);
    showPrices("page2",cartData.Prices,"general admission");
    showPrices("page2",cartData.Prices,null);
 }
 let createGeneralAdmissionPage3 = () => {
    createReservationPage("page3");
    createTitle("page3",cartData.Groupings[2].Name);
    showCollectors("page3",cartData.Collectors);
    showEmailPhoneTemplate("page3");
 }

 let createVipAdmissionPage1 = () => {
    createReservationPage("page1");
    createTitle("page1",cartData.Groupings[0].Name);
    showCalendar("page1",cartData.Availabilities[0].ClosedDates);
}
let createVipAdmissionPage2 = () => {
    createReservationPage("page2");
    createTitle("page2",cartData.Groupings[0].Name);
    showPrices("page2",cartData.Prices,"VIP admission");
    showPrices("page2",cartData.Prices,null);
 }
 let createVipAdmissionPage3 = () => {
    createReservationPage("page3");
    createTitle("page3",cartData.Groupings[0].Name);
    showCollectors("page3",cartData.Collectors);
    showEmailPhoneTemplate("page3");
 }
//________________________________________________________
//________________________________________________________
//display Pages
//________________________________________________________
//________________________________________________________
let displayPage1 = () => {
    hideReservationPages("reservation-page","page1");
    
    document.getElementById("reservation-controls").appendChild(createButton("next-1","continue","next-btn"));

    document.getElementById("next-1").addEventListener("click",function(){
        displayPage2();
    },false);
};
let displayPage2 = () => {
    hideReservationPages("reservation-page","page2");

    $spinnerEvents();

    document.getElementById("reservation-controls").appendChild(createButton("prev-2","back","prev-btn"));
    document.getElementById("prev-2").addEventListener("click",function(){
        displayPage1();
    },false);
    document.getElementById("reservation-controls").appendChild(createButton("next-2","continue","next-btn"));
    document.getElementById("next-2").addEventListener("click",function(){
        if(multiInputValidate("price-control")){
            displayPage3();
        }else{
            alert("please select a package");
        };
    },false);
};
let displayPage3 = () => {
    hideReservationPages("reservation-page","page3");
    document.getElementById("reservation-controls").appendChild(createButton("prev-3","back","prev-btn"));
    document.getElementById("prev-3").addEventListener("click",function(){
        displayPage2();
    },false);
};
//________________________________________________________
//________________________________________________________
//Do things!!!
//________________________________________________________
//________________________________________________________

let showOnly = document.getElementById("show-only-reservation");
let generalAdmission = document.getElementById("general-admission-reservation");
let vIPadmission = document.getElementById("VIP-reservation");

showOnly.addEventListener("click",() => {
    createReservationTemplate();
    createShowOnlyPage1();
    createShowOnlyPage2();
    createShowOnlyPage3();
    displayPage1();
}); 

generalAdmission.addEventListener("click",() => {
    createReservationTemplate();
    createGeneralAdmissionPage1();
    createGeneralAdmissionPage2();
    createGeneralAdmissionPage3();
    displayPage1();
}); 

vIPadmission.addEventListener("click",() => {
    createReservationTemplate();
    createVipAdmissionPage1();
    createVipAdmissionPage2();
    createVipAdmissionPage3();
    displayPage1();
}); 
//________________________________________________________
//________________________________________________________
