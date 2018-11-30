var date = new Date();
var currentYear = date.getFullYear();
var labelId = 0;
var tdId = 0;
$(document).ready(function() {
  var currentMonthAndYear = getCurrentMonth().concat(" " + currentYear);
  createMonthYear(getCurrentMonth(), currentYear);
  $("#buttonLeft").click(changeLeft);
  $("#buttonRight").click(changeRight);
  $("#button2").click(getFirstDay);
  createTable(date.getMonth());
  var newLabelid = $("#addEvent").click(addEvent);
  labelId++;
  getCurrentDay();

  $("td").click(function() {
    var myClass = $(this).attr("class");
    alert(myClass);
  });
});

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function createMonthYear(month, year) {
  var monthYear = month + " " + year;
  $("#calendarMonth").append("<h3>" + monthYear + "</h3>");
}

function getCurrentMonth() {
  return monthNames[date.getMonth()];
}

function getMonthId() {
  var name;
  name = $("#calendarMonth")
    .text()
    .split(" ")[0];
  var word = name.substr(0, name.indexOf(" "));
  console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
  console.log(word);
  console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
  var monthId = monthNames.indexOf(name);
  console.log("The name is: " + name + " and the id is: " + monthId);
  return monthId;
}

function getMonthIdWithName(name) {
  var monthId = monthNames.indexOf(name);
  return monthId;
}

function changeLeft() {
  var monthId = getMonthId();
  if (monthId == 0) {
    monthId = 12;
    currentYear--;
  }
  var newMonth = monthNames[monthId - 1];
  var newMonthId = getMonthIdWithName(newMonth);
  var monthYear = newMonth.concat(" " + currentYear);
  $("#calendarMonth").empty();
  $("#calendarMonth").html("<h3>" + monthYear + "</h3>");
  $("#box").empty();
  createTable(newMonthId);
}

function changeRight() {
  var monthId = getMonthId();
  if (monthId == 11) {
    monthId = -1;
    currentYear++;
  }
  var newMonth = monthNames[monthId + 1];
  var newMonthId = getMonthIdWithName(newMonth);
  var monthYear = newMonth.concat(" " + currentYear);
  $("#calendarMonth").empty();
  $("#calendarMonth").html("<h3>" + monthYear + "</h3>");
  $("#box").empty();
  createTable(newMonthId);
}

function getFirstDay(year, month) {
  var firstDay = new Date(year, month, 1);
  first = firstDay.getDay();
  return first;
}

function getCurrentDay() {
  var currentDay = date.getDate();
  return currentDay;
}

function createTable(currentMonth) {
  var first = getFirstDay(currentYear, currentMonth);
  //Append table to div
  $("#box").append("<table id= 'table1'></table>");
  var table = $("#box").children();
  //Append Days of week to header of table
  table.append(days.map(day => "<th>" + day + "</th>"));
  //Row
  table.append("<tr></tr>");
  //Number of spaces not filled according first day of month
  for (let j = 1; j <= first; j++) {
    console.log("blank space!!!!");
    table.append("<td>&nbsp;</td>");
  }
  //Numbers of days
  var numberOfDays = daysInMonth(currentYear, getMonthId() + 1);
  //Build month table
  for (let i = 1; i <= numberOfDays; i++) {
    if (i == getCurrentDay()) {
      table.append(
        "<td id='today' class='droptarget " +
          tdId +
          "' ondrop='drop(event)' ondragover='allowDrop(event)'>" +
          i +
          "</td>"
      );
    } else {
      table.append(
        "<td id= " +
          tdId +
          " class='droptarget " +
          tdId +
          "' ondrop='drop(event)' ondragover='allowDrop(event)'>" +
          i +
          "</td>"
      );
    }
    var numberTd = $("td").length;
    tdId++;
    var remainder = numberTd % 7;
    if (numberTd == 7 || remainder == 0) {
      table.append("<tr></tr>");
    }
  }
  return $("#box").get(0);
}

function daysInMonth(year, month) {
  var numberofDaysInMonth = new Date(year, month, 0).getDate();
  return numberofDaysInMonth;
}

function addEvent() {
  var newEvent = prompt("Add new Event");
  if (!(newEvent === "")) {
    $("#newEvent").append(
      "<label class = 'events' id = " +
        labelId +
        "  ondragstart='dragStart(event)' ondrag='dragging(event)' draggable='true'>" +
        newEvent +
        "</label></br>"
    );
    labelId++;
  }
  return labelId;
}

function dragStart(event) {
  event.dataTransfer.setData("Text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("Text");
  event.target.appendChild(document.getElementById(data));
  document.getElementById("demo").innerHTML = "The p element was dropped";
}
