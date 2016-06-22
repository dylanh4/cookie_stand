'use strict';

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var stands = [];
var cookieTable = document.getElementById('cookieTable');

//changed the symbols to properly work with function
function CookieStand(locationName, minCust, maxCust, avgCookies, address, phoneNum) {
  this.locationName = locationName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.address = address;
  this.phoneNum = phoneNum;
  this.hourlyCust = [];
  this.hourlyCookieSales = [];
  this.totalSales = 0;
  stands.push(this);
};

//we have to make a data group for each cart
var pike = new CookieStand('First and Pike', 23, 65, 6.3, 'addressFirstAndPike', '206-xxx-xxxx');
var seaTac = new CookieStand('SeaTac Airport', 3, 24, 1.2, 'addressSeaTac', '206-2xx-xxxx');
var seaCent = new CookieStand('Seattle Center', 11, 38, 3.7, 'addressSeaCent', '206-3xx-xxxx');
var capHill = new CookieStand('Capitol Hill', 20, 38, 2.3, 'addressCapHill', '206-4xx-xxxx');
var alki = new CookieStand('Alki', 2, 16, 4.6, 'addressAlki', '206-5xx-xxxx');

CookieStand.prototype.calcHourlyCust = function() {
  for(var i = 0; i < hours.length; i++){
    this.hourlyCust[i] = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  }
};
CookieStand.prototype.calcHourlyCookies = function() {
  this.calcHourlyCust(); //separated it out so that it was easier to read and I could call it
  for(var i = 0; i < hours.length; i++){
    this.hourlyCookieSales[i] = Math.floor(this.hourlyCust[i] * this.avgCookies);
    this.totalSales += this.hourlyCookieSales[i];
  }
};

function makeHeaderCells() {
  var trEl = document.createElement('tr');//make table row
  var thEl = document.createElement('th');//first header
  thEl.textContent = ' ';//make blank
  trEl.appendChild(thEl);//add to row
  var thEl = document.createElement('th');//create
  thEl.textContent = 'Daily Location Total';//add data
  trEl.appendChild(thEl);//add to row
  for(var i = 0; i < hours.length; i++){//adding hours to the header
    var thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  cookieTable.appendChild(trEl);//add row to table
};

CookieStand.prototype.cookieStandTableCells = function() {
  this.calcHourlyCookies();
  var trEl = document.createElement('tr'); //make the row
  var tdEl = document.createElement('td'); //make the cell
  tdEl.textContent = this.locationName; //find the data (name)
  trEl.appendChild(tdEl); //add the cell to the row
  var tdEl = document.createElement('td'); //make another cell
  tdEl.textContent = this.totalSales;
  trEl.appendChild(tdEl);
  for(var i = 0; i < hours.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = this.hourlyCookieSales[i];
    trEl.appendChild(tdEl);
  }
  cookieTable.appendChild(trEl);
};

var render = function() {
  makeHeaderCells();
  for(var i = 0; i < stands.length; i++) {
    stands[i].cookieStandTableCells();
  }
};

render();

var cookieForm = document.getElementById('cookie_form');
// var cookieFormArray = [];

// event handler
function handleCookieForm(event) {
  event.preventDefault();
  console.log('I heard a click');

// pulling data from form
  var locationName = document.getElementById('location_name');
  var minCust = document.getElementById('min_cust');
  var maxCust = document.getElementById('max_cust');
  var avgCookies = document.getElementById('avg_cookies');
  var address = document.getElementById('add_address');
  var phoneNum = document.getElementById('phone_num');

// creating new instance of a cookie stand
  var newCookieStand = new CookieStand(locationName.value, minCust.value, maxCust.value, avgCookies.value, address.value, phoneNum.value);

  newCookieStand.cookieStandTableCells();
  // console.log('location name is', locationName.value);
  // console.log('min cust is', minCust.value);
  // console.log('max cust is', maxCust.value);
  // console.log('avg Cookies is', avgCookies.value);
  // console.log('address is', address.value);
  // console.log('phone number is', phoneNum.value);
  // console.log(event.target.location_name.value);

  console.log(stands);

  // function() {
  //   chatList.innerHTML = '';
  //   console.log('You just cleared the chat list!');
  //   allComments = [];
  // });
  // cookieTable = null;
// render forming a new table;
};

// listening for click and handling click with handler above
cookieForm.addEventListener('submit', handleCookieForm, false);
