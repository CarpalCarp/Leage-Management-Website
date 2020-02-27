//javascript object holding the player table and team table data
var data = {
  // array holding the header
  playerHeader: ["ID", "First Name", "Player Email", "Birth", "Phone Number", "League", "Age Group", "Parent Name", "Parent Phone", "Actions"],
  teamHeader: ["ID", "Team Name", "League", "Coach Name", "Coach Licen.", "Admin Name", "Coach #", "Admin #", "Coach Email", "Admin Email", "Actions"],
  //variables holding icons
  playerIcons: '<td><a href="player-edit.html" target="_blank"><i id="icon" class="fa fa-arrow-right" title="Go to Edit Page" ></i></a><i id="icon" class="far fa-trash-alt" title="Delete" ></i><a href="players.html" target="_blank"><i class="fa fa-eye" id="icon" aria-hidden="true" title="Read-only view"></i></a></td>',
  teamIcons: '<td><a href="team-edit.html" target="_blank"><i id="icon" class="fa fa-arrow-right" title="Go to Edit Page" ></i></a><i class="far fa-trash-alt" id="icon" title="Delete" ></i><a href="teams.html" target="_blank"><i class="fa fa-eye" id="icon" aria-hidden="true" title="Read-only view"></i></a></td>',
  // 2d arrays holding player and team info
  playerData: [
    [1, "Ignacio Scocco", "ignacio@gmail.com", "11/23/1983", "(457) 465-7894", "Superliga", "U17", "Yoshi", "(457) 423-7195"],
    [2, "Franco Armani", "franco@gmail.com", "11/23/1983", "(457) 465-7894", "Superliga", "U16", "Bowser", "(457) 423-7195"],
    [3, "Lucas Pratto", "lucas@gmail.com", "11/23/1983", "(457) 465-7894", "Superliga", "U15", "Yoshi", "(457) 423-7195"],
    [4, "Enzo Perez", "enzo@gmail.com", "11/23/1983", "(457) 465-7894", "Superliga", "U17", "Peach", "(457) 423-7195"],
    [5, "Javier Pinola", "javier@gmail.com", "11/23/1983", "(457) 465-7894", "Superliga", "U16", "Yoshi", "(457) 423-7195"]
  ],
  teamData: [
    ["River", "Superliga", "Mario", "X", "Yoshi", "(255) 255-2555", "(255) 255-2555", "coach@gmail.com", "admin@gmail.com"],
    ["Barcelona", "La Liga", "Luigi", "X", "Toad", "(255) 255-3555", "(255) 255-2555", "coach@gmail.com", "admin@gmail.com"],
    ["FC Bayern", "Bundesliga", "Bowser", "X", "Bowser Jr.", "(255) 255-5948", "(255) 255-2555", "coach@gmail.com", "admin@gmail.com"],
    ["Juventus", "Serie A", "Peach", "X", "Peachette", "(255) 246-4652", "(255) 255-2555", "coach@gmail.com", "admin@gmail.com"],
    ["Boca Jrs.", "Superliga", "Kamek", "X", "Dr. Mario", "(255) 246-4876", "(255) 255-2555", "coach@gmail.com", "admin@gmail.com"]
  ]
}

function rendTableHdr(table, name){
  table.append("<thead>");
  table.append("<tr>");

  if(name == "player"){
    for(var head of data.playerHeader){ // loop through header array and append to html the headers
      table.append("<th>" + head + "</th>");
    }
  }else if(name == "team"){
    for(var head of data.teamHeader){ // loop through header array and append to html the headers
      table.append("<th>" + head + "</th>");
    }
  }

  table.append("</tr>");
  table.append("</thead>");
}

function jsForEach(table){
  // implementation using a regular javascript foreach()
  data.playerData.forEach(function(innerArray){// innerArray is a reference to the arrays within playerData
    var row = $("<tr/>");
    innerArray.forEach(function(col){ // loop through the inner array
      row.append($("<td/>").text(col)); // append the column info into row
    });
    row.append(data.playerIcons); // append the icons
    table.append(row); //append row info to the table
  });

  table.append("<tbody>"); // add last tbody tag
}

function jQueryEach(table){
  var id = 0; // id is used when generating id's for the table
  // implementation using the jquery .each()
  $.each(data.teamData, function(rowIndex, r){ // takes care of rows
    var row = $("<tr/>"); // create <tr> and </tr> and store in variable
    $.each(r, function(colIndex, c){ // takes care of columns, c is the value from teamData within each array

      if(colIndex == 0){ // if first column add an id then increment
        row.append($("<td/>").text(id));
        id++;
      }

      row.append($("<td/>").text(c)); //.text(c)); // add <td> + c + </td>

    });
    row.append(data.teamIcons); // add the icons to the actions column
    table.append(row); //row has columns to add so add to append to table
  });
  table.append("</tbody>"); // add last tbody tag
}

function getFromStorage(data){
  var storage;
  if(data === 'player'){ // get player data from storage
    if(localStorage.getItem('playerData') !== null){
      storage = localStorage.getItem('playerData'); // you can also say JSON.parse(localStorage['playerData']);
      storage = JSON.parse(storage);
      return storage;
    }else {
      return "empty";
    }
  }else if(data === 'team'){ // get team data from storage
    if(localStorage.getItem('teamData') !== null){
      storage = localStorage.getItem('teamData');
      storage = JSON.parse(storage);
      return storage;
    }else {
      return "empty";
    }
  }
}

function rendTable(table, name){
  rendTableHdr(table, name);

  table.append("<tbody>"); //start table body

  if(name == "player"){ // render player table if user wants player
    if(getFromStorage('player') !== "empty"){ // check if table data is saved in storage, if so then render table from data from storage
      data.playerData = getFromStorage('player');
    }

    // jsForEach has the implementation using a regular javascript foreach() to render table
    jsForEach(table);

    // after table is rendered, store the array with the data in local storage
    localStorage.setItem('playerData', JSON.stringify(data.playerData));

  }else if(name == "team"){ // render team table if user wants team

    if(getFromStorage('team') !== "empty"){ // check if storage has data, if so then retrieve data from local storage
      data.teamData = getFromStorage('team');
    }

    // jQueryEach has implementation using the jquery .each() to render table
    jQueryEach(table);

    // makes team table interactive by being able to click on a given team and it takes user to player page, etc.
    mkInteractive();

    // after table is rendered, store the array with the data in local storage
    localStorage.setItem('teamData', JSON.stringify(data.teamData));
  }
}

function mkInteractive(){
  $("tr td:nth-child(2)").addClass("clickable-row");
  $("tr td:nth-child(2)").attr("data-href", "players.html");
  $("tr td:nth-child(2)").css("cursor", "pointer");
  $("tr td:nth-child(2)").hover(function(){
    $(this).addClass("team-highlight");
    },function(){
      $(this).removeClass("team-highlight");
  });
}
