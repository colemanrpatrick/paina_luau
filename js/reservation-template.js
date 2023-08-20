//_____________________________________________________________
//___________________| Reservation UI V2|______________________
//_____________________________________________________________

const reservationWindow = document.getElementById("reservation-window");
reservationWindow.className = "hidden";

//________________________________________________________
//________________________________________________________
//create reservation book
//________________________________________________________
//________________________________________________________

let createReservationTemplate = () => {

  reservationWindow.className = "active";

  let reservationContainer = document.createElement("div");
  let reservationBook = document.createElement("div");
  let reservationBookControls = document.createElement("div");
  let clearReservationWindowBtn = document.createElement("button");

  clearReservationWindowBtn.setAttribute("type","button");
  clearReservationWindowBtn.setAttribute("id","close-reservation");
  clearReservationWindowBtn.innerHTML = "<span class='material-symbols-outlined'>close</span>";
  clearReservationWindowBtn.addEventListener("click",clearReservationTemplate,false);

  reservationBook.setAttribute("id", "reservation-book");
  reservationBookControls.setAttribute("id", "reservation-controls");
  reservationContainer.setAttribute("id","reservation-container");

  reservationWindow.appendChild(reservationContainer);
  reservationContainer.appendChild(clearReservationWindowBtn);
  reservationContainer.appendChild(reservationBook);
  reservationContainer.appendChild(reservationBookControls);

};

let clearReservationTemplate = () => {
  reservationWindow.innerHTML = '';
  reservationWindow.className = "hidden";
};

let createReservationPage = (id) => {
  let reservationPage = document.createElement("div");
  reservationPage.setAttribute("class", "reservation-page");
  reservationPage.setAttribute("id", id);
  document.getElementById("reservation-book").appendChild(reservationPage);
};

let hideReservationPages = (pageClass,pageId) => {
  let reservationPage = document.getElementsByClassName(pageClass);
  for (let i = 0; i < reservationPage.length; i++) {
    reservationPage[i].className = pageClass + " hidden";
  }
  document.getElementById(pageId).className = pageClass + " active";
  document.getElementById("reservation-controls").innerHTML = " ";
};

let createButton = ($id,$text,$class) => {
  let $button = document.createElement("Button");
  $button.innerHTML = $text;
  $button.setAttribute("id", $id);
  $button.setAttribute("class",$class);
  return $button;
};


//________________________________________________________
//________________________________________________________
//create Title
//________________________________________________________
//________________________________________________________

let createTitle = (page,$package) =>{
  let packageTitle = document.createElement("h2");
  packageTitle.className = "package-title";
  packageTitle.innerHTML = $package;
  document.getElementById(page).appendChild(packageTitle);
}

//________________________________________________________
//________________________________________________________
//create calendar
//________________________________________________________
//________________________________________________________

const getTime = (_timezone) => {
  let datetime_str = new Date().toLocaleString(
    "en-GB",
    { timeZone: _timezone },
    { hour12: false }
  );
  dateArr = datetime_str.split(",", 2);
  dateArr.shift();
  datetime_str = dateArr[0].slice(1);
  datetime_str = parseInt(datetime_str);
  return datetime_str;
};

const getTodaysDate = () => {
  let currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return currentDate;
};

let createCalendar = (page) => {
  let dateInput = document.createElement("input");
  let datePicker = document.createElement("div");

  dateInput.setAttribute("type", "text");
  dateInput.setAttribute("id", "dateInput");
  //   dateInput.setAttribute("name", cartData.Collectors[0].ControlName);
  //   dateInput.setAttribute("value", cartData.Collectors[0].Value);
  datePicker.setAttribute("id", "datepicker");

  document.getElementById(page).appendChild(dateInput);
  document.getElementById(page).appendChild(datePicker);
};

//________________________________________________________
//________________________________________________________
//show calendar
//________________________________________________________
//________________________________________________________

let showCalendar = (page, disabledDates) => {
  createCalendar(page);

  let dateToday = new Date();
  disabledDates = JSON.parse(disabledDates);
  for (var i = 0; i < disabledDates.length; i++) {
    disabledDates[i] = disabledDates[i].replace(/\//g, "-");
  }
  $("#datepicker").datepicker({
    minDate: dateToday,
    beforeShowDay: function (date) {
      var disabledDatesString = jQuery.datepicker.formatDate("mm-dd-yy", date);
      return [disabledDates.indexOf(disabledDatesString) == -1];
    },
  });
  if (dateInput.value == null || dateInput.value == undefined) {
    dateInput.value = "";
  }

  /*====== datepicker / date input events ======*/

  $("#dateInput").change(function () {
    $("#datepicker").datepicker("setDate", $(this).val()).trigger("change");
  });
  $("#datepicker").change(function (disabledDates) {
    if ($("#dateInput").val() !== disabledDates) {
      $("#dateInput").prop("value", $(this).val());
    }
  });

  /*========== jQuery UI datepicker functions ==========*/

  if (
    typeof $("#dateInput") !== undefined &&
    typeof $("#datepicker") !== undefined
  ) {
    if ($("#dateInput").val().length > 0) {
      $("#datepicker").datepicker("setDate", $("#dateInput").val());
    } else {
      $(".ui-datepicker-current-day").removeClass("ui-datepicker-current-day");
      $("#datepicker").val("");
    }
  }
};

//________________________________________________________
//________________________________________________________
//create Prices
//________________________________________________________
//________________________________________________________

var $createNewLiElement = ($parentElement,$elem) => {
  let $li = document.createElement("LI");
  $parentElement.appendChild($li);
  $li.appendChild($elem);
};

function numIncrement(numberInput, increase) {

  var myInputObject = document.getElementById(numberInput);
  console.log(myInputObject);

  if (increase) {
      myInputObject.value++;
  } else {
      myInputObject.value--;
  };

  if (myInputObject.value > 999) {
      myInputObject.value = 999;
  };
  if (myInputObject.value <= 0) {
      myInputObject.value = 0;
  };

};

let spinnerFunction = (elem) => {
  console.log(this.id);
};

let createSpinners = (controlName) =>{
  let $priceInput = document.createElement("input");
  $priceInput.setAttribute("type","text"); 
  $priceInput.setAttribute("id",controlName);
  $priceInput.setAttribute("name",controlName);
  $priceInput.setAttribute("class","price-control");
  $priceInput.value = 0;

  let $spinnerTemplate = document.createElement("div");
  $spinnerTemplate.setAttribute("class","spinner-container");

  $spinner = document.createElement("input");
  $spinner.setAttribute("type","text");
  $spinner.setAttribute("class","spinner");
  $spinner.setAttribute("id","spinner-"+controlName)
  $spinner.setAttribute("placeholder","0");
  $spinner.setAttribute("readonly","true");

  $minusButton = createButton("spinner-minus-"+controlName,"<span class='material-symbols-outlined'>remove</span>","minus-button");
  $plusButton = createButton("spinner-plus-"+controlName,"<span class='material-symbols-outlined'>add</span>","plus-button"); 

  $spinnerTemplate.appendChild($priceInput);
  $spinnerTemplate.appendChild($minusButton);
  $spinnerTemplate.appendChild($spinner);
  $spinnerTemplate.appendChild($plusButton);

  return $spinnerTemplate;

}; 

let createPrices = (page,priceGroupArg) => {

  let controlName = priceGroupArg[0];
  let priceDescription = priceGroupArg[1];
  let listPrice = priceGroupArg[2];
  let salePrice = priceGroupArg[3];

  let $priceContainer = document.createElement("UL");
  $priceContainer.setAttribute("class","price-container");

  let $description = document.createElement("P");
  $description.setAttribute("class","price-description");
  $description.innerHTML = " " + priceDescription + " ";

  let $priceList = document.createElement("DIV");
  $priceList.setAttribute("class","price-list");
  
  let _listPrice = document.createElement("P");
  _listPrice.setAttribute("class","list-price");
  _listPrice.innerHTML = "$" + listPrice;

  $priceList.appendChild(_listPrice);

  if(salePrice !== 0){
    let _salePrice = document.createElement("P");
    _salePrice.setAttribute("class","sale-price");
    _salePrice.innerHTML = "$" + salePrice;
    $priceList.appendChild(_salePrice);
  }

  document.getElementById("" + page + "").appendChild($priceContainer);

  $createNewLiElement($priceContainer,createSpinners(controlName));
  $createNewLiElement($priceContainer,$description);
  $createNewLiElement($priceContainer,$priceList);
  
};

//________________________________________________________
//________________________________________________________
//show Prices
//________________________________________________________
//________________________________________________________

// $minusButton.addEventListener("click",() => {
//   numIncrement( $minusButton.nextElementSibling.getAttribute("id"), false);
// });
// $plusButton.addEventListener("click",() => {
//   console.log($plusButton.prevElementSibling.getAttribute("id"));
//   numIncrement($plusButton.prevElementSibling.getAttribute("id"), true);
// });

let showPrices = (page,dataPrices,priceGroup) => {
  Object.entries(dataPrices).forEach(entry => {
    const [key, value] = entry;
    let priceGroupArg = [ 
    value.ControlName,
    value.Description,
    value.ListPrice,
    value.Saleprice
    ];
    if(value.Grouping == priceGroup){
      createPrices(page,priceGroupArg);
    }
  });
};
//________________________________________________________
//________________________________________________________
//Prices Events
//________________________________________________________
//________________________________________________________

let $spinnerEvents = () => {
  $plusButton = document.getElementsByClassName("plus-button");
  $minusButton = document.getElementsByClassName("minus-button");

    for (let i = 0; i < $plusButton.length; i++) {
      $plusButton[i].addEventListener("click",({target}) => {
        let $spinner = target.parentElement.previousElementSibling;
        let $input = $spinner.parentElement.firstElementChild;
        numIncrement( $spinner.getAttribute("id"), true);
        $input.value = $spinner.value;
      });
    };


    for (let i = 0; i < $minusButton.length; i++) {
      $minusButton[i].addEventListener("click",({target}) => {
        let $spinner = target.parentElement.nextElementSibling;
        let $input = $spinner.parentElement.firstElementChild;
        numIncrement( $spinner.getAttribute("id"), false);
        $input.value = $spinner.value;
      });
    };
};


//________________________________________________________
//________________________________________________________
//create collectors
//________________________________________________________
//________________________________________________________

let createCollectors = (page,$collector) => {

    let $dataType = $collector.ApplicationDataType;
    
    let $collectorContainer = document.createElement("DIV");
    $collectorContainer.setAttribute("class","collector-container");

    switch ($dataType) {

      case 0:
        //console.log("input type text : ", $collector);

        let $textLabel = document.createElement("label");
        let $textInput = document.createElement("input");

        $textLabel.innerHTML = $collector.Name;
        $textLabel.setAttribute("for",$collector.ControlName);
        $textInput.setAttribute("type","text");
        $textInput.setAttribute("id",$collector.ControlName);
        $textInput.setAttribute("name",$collector.ControlName);
        $textInput.setAttribute("placeholder",$collector.Name);

        $collectorContainer.appendChild($textLabel);
        $collectorContainer.appendChild($textInput);

        document.getElementById("" + page + "").appendChild($collectorContainer);
        break;

      case 1:

        //console.log("input type bit", $collector);

        let $bitLabel = document.createElement("label");
        $bitLabel.innerHTML = $collector.Name;

        let $bitInput = document.createElement("input");
        $bitInput.setAttribute("type", "checkbox");
        $bitInput.setAttribute("name", $collector.ControlName);
        $bitInput.setAttribute("Id", $collector.ControlName);

        $collectorContainer.appendChild($bitLabel);
        $collectorContainer.appendChild($bitInput);

        document.getElementById("" + page + "").appendChild($collectorContainer);

        break;

      case 7:

        //console.log("select", $collector);

        let $selectCollector = document.createElement("SELECT");
        let $selectLabel = document.createElement("Label");

        $selectLabel.setAttribute("for",$collector.ControlName);
        $selectLabel.innerHTML = $collector.Name; 

        $selectCollector.setAttribute("ID", $collector.ControlName);

        let $selectCollectorList = $collector.ListMember.ListMembers;

        Array.prototype.forEach.call(

          $selectCollectorList,
          function (element, elementIndex) {
            let $selectCollectorOption = document.createElement("option");
            $selectCollectorOption.setAttribute("id",element.ID);
            $selectCollectorOption.innerHTML = element.Shortcode;
            $selectCollectorOption.setAttribute("value", "" + element.ID + "");
            $selectCollector.appendChild($selectCollectorOption);

        });

        $collectorContainer.appendChild($selectLabel);
        $collectorContainer.appendChild($selectCollector);
        document.getElementById("" + page + "").appendChild($collectorContainer);

        break;

      default:

        console.log("no collectors to return", $collector);

        break;

    };

};

//________________________________________________________
//________________________________________________________
//show collectors
//________________________________________________________
//________________________________________________________

let showCollectors = (page,$collectors) => {
  $collectors = $collectors.slice(1);
  Object.entries($collectors).forEach(entry => {
    const [key,value] = entry;
    createCollectors(page,value);
  });

};

//________________________________________________________
//________________________________________________________
//collector events
//________________________________________________________
//________________________________________________________

let addCollectorEvent = (id) => {

  let $element = document.getElementById(id);

  let $dataType = $element.ApplicationDataType;

  switch ($dataType) {

    case 0:

      break;

    case 1:

      break;

    case 7:

      break;

    default:

      break;

  };

};
//________________________________________________________
//________________________________________________________
//create email/phone collector
//________________________________________________________
//________________________________________________________
let createEmailPhoneCollectors = (page) => {

  //=========== create email ===========//
  let emailCollector = document.createElement("DIV");
  emailCollector.setAttribute("id", "email-collector");

  let email = document.createElement("INPUT");
  email.setAttribute("type", "email");
  email.setAttribute("id", "email");
  email.setAttribute("placeholder", "email");

  let emailLabel = document.createElement("LABEL");
  emailLabel.innerHTML = "E-Mail";


  let phoneCollector = document.createElement("DIV");
  phoneCollector.setAttribute("id", "phone-collector");

  let phone = document.createElement("INPUT");
  phone.setAttribute("type", "phone");
  phone.setAttribute("id", "phone");
  phone.setAttribute("placeholder", "phone");
  phone.setAttribute("name", "phone");

  let phoneLabel = document.createElement("LABEL");
  phoneLabel.innerHTML = "Phone";

  emailCollector.appendChild(emailLabel);
  emailCollector.appendChild(email);

  phoneCollector.appendChild(phoneLabel);
  phoneCollector.appendChild(phone);

  
};

//________________________________________________________
//________________________________________________________
//helper functions
//________________________________________________________
//________________________________________________________

