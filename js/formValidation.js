// player input field names for player-edit page
var playerName, playerLast, playerEmail, playerPhone, league, ageGroup, parFirstName, parLastName, parPhone;
// team input field names for team-edit page
var teamName, cFirstName, cLastName, cEmailAddress, cPhoneNum, licence, league, aFirstname, aLastName, aEmailAddress, aPhoneNum;
var passed = true;

function passTest(){
  passed = true;
}

function failTest(){
  passed = false;
}

function resetErr(inputDiv, errDiv){
  passTest();
  inputDiv.css("border", "2px solid green"); // remove border
  errDiv.empty(); // clear div of error messages
}

function getPlayerInput(){
  //get values entered by user
  playerName = $("#playerName").val();
  playerLast = $("#playerLast").val();
  playerEmail = $("#playerEmail").val();
  playerPhone = $("#playerPhone").val();
  league = $("#league option:selected").val();
  ageGroup = $("#ageGroup option:selected").val();
  parFirstName = $("#parFirstName").val();
  parLastName = $("#parLastName").val();
  parPhone = $("#parPhone").val();
}

function getTeamInput(){
  //get values entered by user from team-edit form
  teamName = $("#teamName").val();
  cFirstName = $("#coachFirstName").val();
  cLastName = $("#coachLastName").val();
  cEmailAddress = $("#coachAddress").val();
  cPhoneNum = $("#coachPhone").val();
  licence = $("#license option:selected").val();
  league = $("#league option:selected").val();
  aFirstName = $("#adminFirstName").val();
  aLastName = $("#adminLastName").val();
  aEmailAddress = $("#adminAddress").val();
  aPhoneNum = $("#adminPhone").val();
}

function stop(){
  event.stopPropagation();
  event.preventDefault();
}

function displayErr(inputId, divErrId, message){
  failTest(); // test failed
  $(inputId).css("border","2px solid red");
  $(divErrId).html(message);
  $(divErrId).css("color", "red");
}

function checkPlayerForm(){

  getPlayerInput(); // get the input entered by user

  // begin validatin
  if(playerName.length == 0){
    failTest(); // test failed
    displayErr("#playerName", "#playerNameErr", "Required field*");
  }

  if(playerLast.length == 0){
    failTest(); // test failed
    displayErr("#playerLast", "#playerLastErr", "Required field*");
  }

  if(parFirstName.length == 0){
    failTest(); // test failed
    displayErr("#parFirstName", "#parNameErr", "Required field*");
  }

  if(parLastName.length == 0){
    failTest(); // test failed
    displayErr("#parLastName", "#parLastNameErr", "Required field*");
  }

  if(playerEmail.length == 0){
    failTest(); // test failed
    displayErr("#playerEmail", "#playerEmailErr", "Required field*");
  }

  if(playerPhone.length == 0){
    displayErr("#playerPhone", "#playerPhoneErr", "Required field*");
  }

  if(parPhone.length == 0){
    displayErr("#parPhone", "#parPhoneErr", "Required field*");
  }

  if(!passed){ // validation failed stop propagating and prevent default action
    stop();
    $("#submitErr").html("Fill out remaining required fields.");
    $("#submitErr").css("color", "red");
  }
}

function playerBlurValidation(){
  // declare regex
  var onlyLetters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/; // used for validating names, allows spaces
  var numberLength = 14; // phone number length field (000) 000-0000

  $("#playerName").blur(function(){
    if(!onlyLetters.test($("#playerName").val())){
      failTest();
      displayErr("#playerName", "#playerNameErr", "Enter valid name");
    }else{
      resetErr($("#playerName"), $("#playerNameErr"));
    }
  });

  $("#playerLast").blur(function(){
    if(!onlyLetters.test($("#playerLast").val())){
      failTest();
      displayErr("#playerLast", "#playerLastErr", "Enter valid name");
    }else{
      resetErr($("#playerLast"), $("#playerLastErr"));
    }
  });

  $("#playerEmail").blur(function(){
    if($("#playerEmail").val().length > 0)
      resetErr($("#playerEmail"), $("#playerEmailErr"));
  });

  $("#parFirstName").blur(function(){
    if(!onlyLetters.test($("#parFirstName").val())){
      failTest();
      displayErr("#parFirstName", "#parNameErr", "Enter valid name");
    }else{
      resetErr($("#parFirstName"), $("#parNameErr"));
    }
  });

  $("#parLastName").blur(function(){
    if(!onlyLetters.test($("#parLastName").val())){
      failTest();
      displayErr("#parLastName", "#parLastNameErr", "Enter valid name");
    }else{
      resetErr($("#parLastName"), $("#parLastNameErr"));
    }
  });

  $("#playerPhone").blur(function(){
    if($("#playerPhone").val().length != numberLength){
      displayErr("#playerPhone", "#playerPhoneErr", "Enter full phone number");
    }else{
      resetErr($("#playerPhone"), $("#playerPhoneErr"));
    }
  });

  $("#parPhone").blur(function(){
    if($("#parPhone").val().length != numberLength){
      displayErr("#parPhone", "#parPhoneErr", "Enter full phone number");
    }else{
      resetErr($("#parPhone"), $("#parPhoneErr"));
    }
  });
}

function checkTeamForm(){
  // validation on submit checks if required fields were filled

  getTeamInput(); // get user input

  // begin validating
  if(teamName.length == 0){
    failTest(); // test failed
    displayErr("#teamName", "#teamNameErr", "Team name required*");
  }

  if(cFirstName.length == 0){
    failTest(); // test failed
    displayErr("#coachFirstName", "#cFirstNameErr", "Required field*");
  }

  if(cLastName.length == 0){
    failTest(); // test failed
    displayErr("#coachLastName", "#cLastNameErr", "Required field*");
  }

  if(aFirstName.length == 0){
    failTest(); // test failed
    displayErr("#adminFirstName", "#aFirstNameErr", "Required field*");
  }

  if(aLastName.length == 0){
    failTest(); // test failed
    displayErr("#adminLastName", "#aLastNameErr", "Required field*");
  }

  if(cEmailAddress.length == 0){
    failTest(); // test failed
    displayErr("#coachAddress", "#cAddressErr", "Address required*");
  }

  if(aEmailAddress.length == 0){
    failTest(); // test failed
    displayErr("#adminAddress", "#aAddressErr", "Address required*");
  }

  if(cPhoneNum.length == 0){
    failTest(); // test failed
    displayErr("#coachPhone", "#cPhoneErr", "Phone number required*");
  }

  if(aPhoneNum.length == 0){
    failTest(); // test failed
    displayErr("#adminPhone", "#aPhoneErr", "Phone number required*");
  }

  if(!passed){ // validation failed stop propagating and prevent default action
    stop();
    $("#submitErr").html("Fill out remaining required fields.");
    $("#submitErr").css("color", "red");
  }
}

function teamBlurValidation(){
  // declare regex
  var onlyLetters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/; // used for validating names, allows spaces
  var numberLength = 14; // phone number length field (000) 000-0000

  $("#teamName").blur(function(){
    if(!onlyLetters.test($("#teamName").val())){
      failTest();
      displayErr("#teamName", "#teamNameErr", "Enter valid name");
    }else{
      resetErr($("#teamName"), $("#teamNameErr"));
    }
  });

  $("#coachFirstName").blur(function(){
    if(!onlyLetters.test($("#coachFirstName").val())){
      failTest();
      displayErr("#coachFirstName", "#cFirstNameErr", "Enter valid name");
    }else{
      resetErr($("#coachFirstName"), $("#cFirstNameErr"));
    }
  });

  $("#coachLastName").blur(function(){
    if(!onlyLetters.test($("#coachLastName").val())){
      failTest();
      displayErr("#coachLastName", "#cLastNameErr", "Enter valid name");
    }else{
      resetErr($("#coachLastName"), $("#cLastNameErr"));
    }
  });

  $("#coachAddress").blur(function(){
    if($("#coachAddress").val().length > 0)
      resetErr($("#coachAddress"), $("#cAddressErr"));
  });

  $("#coachPhone").blur(function(){
    if($("#coachPhone").val().length != numberLength){
      failTest();
      displayErr("#coachPhone", "#cPhoneErr", "Enter full phone number");
    }else{
      resetErr($("#coachPhone"), $("#cPhoneErr"));
    }
  });

  $("#adminFirstName").blur(function(){
    if(!onlyLetters.test($("#adminFirstName").val())){
      failTest();
      displayErr("#adminFirstName", "#aFirstNameErr", "Enter valid name");
    }else{
      resetErr($("#adminFirstName"), $("#aFirstNameErr"));
    }
  });

  $("#adminLastName").blur(function(){
    if(!onlyLetters.test($("#adminLastName").val())){
      failTest();
      displayErr("#adminLastName", "#aLastNameErr", "Enter valid name");
    }else{
      resetErr($("#adminLastName"), $("#aLastNameErr"));
    }
  });

  $("#adminAddress").blur(function(){
    if($("#adminAddress").val().length > 0)
      resetErr($("#adminAddress"), $("#aAddressErr"));
  });

  $("#adminPhone").blur(function(){
    if($("#adminPhone").val().length != numberLength){
      failTest();
      displayErr("#adminPhone", "#aPhoneErr", "Enter full phone number");
    }else{
      resetErr($("#adminPhone"), $("#aPhoneErr"));
    }
  });
}
