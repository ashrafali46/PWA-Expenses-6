


// defines expenses and forecasts nodes

const expenses = document.querySelector('.expenses');
const forecasts = document.querySelector('.forecasts');

//defines empty arrays for doing sums on category's 

const sumArrayTot = [];
const sumArrayFood = [];
const sumArrayHouse = [];
const sumArrayTech = [];
const sumArrayHealth = [];
const sumArrayVehicle = [];
const sumArrayOther = [];
const sumArrayWhat = [];

const forecastArrayTot = [];
const forecastArrayFood = [];
const forecastArrayHouse = [];
const forecastArrayTech = [];
const forecastArrayHealth = [];
const forecastArrayVehicle = [];
const forecastArrayOther = [];
const forecastArrayWhat = [];

//setting initial values for sums to zero, also outside function so accessible for other functions
let i = 0;
let sumTot = 0;
let sumTot1 = 0;
let sumFood = 0;
let sumHouse = 0;
let sumTech = 0;
let sumHealth = 0;
let sumVehicle = 0;
let sumOther = 0;

let forecastTot = 0;
let forecastTot1 = 0;
let forecastFood = 0;
let forecastHouse = 0;
let forecastTech = 0;
let forecastHealth = 0;
let forecastVehicle = 0;
let forecastOther = 0;


//after dom loaded then INITIALISES SIDE MENU'S FROM MATERIALIZE 
document.addEventListener('DOMContentLoaded', function () {

  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
  // add expense form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
  // update expense form
  const forms1 = document.querySelectorAll('.side-form1');
  M.Sidenav.init(forms1, { edge: 'left' });

  // add Forecast ITEMS AT BEGINNING OF MONTH side form
  const formsF1 = document.querySelectorAll('.side-form-F1');
  M.Sidenav.init(formsF1, { edge: 'left' });
  // New Forecast form
  const formsF2 = document.querySelectorAll('.side-form-F2');
  M.Sidenav.init(formsF2, { edge: 'left' });
  // New Forecast form
  const formsF3 = document.querySelectorAll('.side-form-F3');
  M.Sidenav.init(formsF3, { edge: 'left' });

});

//This renders current in FORECASTS to false -RESETS ALL FORECASTS TO EMPTY 
const resetForecast = (data, id) => {
  console.log(id);
  data.set({ current: "false" });
};



//This renders sum EXPENSE  totals 
const renderExpensex = (data) => {

  //this takes sum(string), converts to number & then makes an array of all sums & then iterates through to get sumTotal
  const y = parseInt(data.sum);
  sumArrayTot.push(y);
  for (i = 0, sumTot1 = 0; i < sumArrayTot.length; sumTot1 += sumArrayTot[i++]);
  //iterate through transactions to find categories to get each category sum.
  if (data.category == 'Food-🍲') {
    sumArrayFood.push(y);
    for (i = 0, sumFood = 0; i < sumArrayFood.length; sumFood += sumArrayFood[i++]);
  } else if (data.category == 'House-🏠') {
    sumArrayHouse.push(y);
    for (i = 0, sumHouse = 0; i < sumArrayHouse.length; sumHouse += sumArrayHouse[i++]);
  } else if (data.category == "Tech-💾") {
    sumArrayTech.push(y);
    for (i = 0, sumTech = 0; i < sumArrayTech.length; sumTech += sumArrayTech[i++]);
  } else if (data.category == "Vehicle-🚙") {
    sumArrayVehicle.push(y);
    for (i = 0, sumVehicle = 0; i < sumArrayVehicle.length; sumVehicle += sumArrayVehicle[i++]);
  } else if (data.category == "Health-⚕️") {
    sumArrayHealth.push(y);
    for (i = 0, sumHealth = 0; i < sumArrayHealth.length; sumHealth += sumArrayHealth[i++]);
  }
  else if (data.category == "Other-🏺") {
    sumArrayOther.push(y);
    for (i = 0, sumOther = 0; i < sumArrayOther.length; sumOther += sumArrayOther[i++]);
  };

};

//This renders sum FORECAST  totals 
const renderForecastx = (data) => {

  //this takes forecast(string), converts to number & then makes an array of all forecasts & then iterates through to get forecastTotal
  const y = parseInt(data.sum);
  forecastArrayTot.push(y);
  for (i = 0, forecastTot1 = 0; i < forecastArrayTot.length; forecastTot1 += forecastArrayTot[i++]);
  //iterate through transactions to find categories to get each category forecast.
  if (data.category == 'Food-🍲') {
    forecastArrayFood.push(y);
    for (i = 0, forecastFood = 0; i < forecastArrayFood.length; forecastFood += forecastArrayFood[i++]);
  } else if (data.category == 'House-🏠') {
    forecastArrayHouse.push(y);
    for (i = 0, forecastHouse = 0; i < forecastArrayHouse.length; forecastHouse += forecastArrayHouse[i++]);
  } else if (data.category == "Tech-💾") {
    forecastArrayTech.push(y);
    for (i = 0, forecastTech = 0; i < forecastArrayTech.length; forecastTech += forecastArrayTech[i++]);
  } else if (data.category == "Vehicle-🚙") {
    forecastArrayVehicle.push(y);
    for (i = 0, forecastVehicle = 0; i < forecastArrayVehicle.length; forecastVehicle += forecastArrayVehicle[i++]);
  } else if (data.category == "Health-⚕️") {
    forecastArrayHealth.push(y);
    for (i = 0, forecastHealth = 0; i < forecastArrayHealth.length; forecastHealth += forecastArrayHealth[i++]);
  }
  else if (data.category == "Other-🏺") {
    forecastArrayOther.push(y);
    for (i = 0, forecastOther = 0; i < forecastArrayOther.length; forecastOther += forecastArrayOther[i++]);

  };
  let forecastTotAll = forecastFood + forecastHouse + forecastTech + forecastVehicle + forecastHealth + forecastOther;
  //string literal output from collected forecast data above
  const htmly = `
  
          <div class="expense-details">
                
          <meter id="barTot" value="${sumTot1}" min=".1" max="${forecastTotAll}" low="${(forecastTotAll) / 2}" high="${((forecastTotAll) * 3 / 4) - 1}"  optimum ="${((forecastTotAll) / 3) - 1}">Tot Spend/budget</meter>
        <label for="barTot">TOTAL $${sumTot1} ($${forecastTotAll}) ${Math.round(100 * sumTot1 / forecastTotAll)}% </label>
        <br>
        
        <meter id="barFood" value="${sumFood}" min=".1" max="${forecastFood}" low="${(forecastFood) / 2}" high="${((forecastFood) * 3 / 4) - 1}"  optimum ="${((forecastFood) / 3) - 1}">Tot Spend/budget</meter>
        <label for="barFood">Food-$${sumFood} ($${forecastFood}) ${Math.round(100 * sumFood / forecastFood)}% </label>
        <br>
                <meter id="barHouse" value="${sumHouse}" min=".1" max="${forecastHouse}" low="${(forecastHouse) / 2}" high="${((forecastHouse) * 3 / 4) - 1}"  optimum ="${((forecastHouse) / 3) - 1}">Tot Spend/budget</meter>
        <label for="barHouse">House-$${sumHouse} ($${forecastHouse}) ${Math.round(100 * sumHouse / forecastHouse)}%  </label>
        <br>
        <meter id="barTech" value="${sumTech}" min=".1" max="${forecastTech}" low="${(forecastTech) / 2}" high="${((forecastTech) * 3 / 4) - 1}"  optimum ="${((forecastTech) / 3) - 1}">Tot Spend/budget</meter>
        <label for="barTech">Tech-$${sumTech} ($${forecastTech}) ${Math.round(100 * sumTech / forecastTech)}%  </label>
        <br>
        <meter id="barVehicle" value="${sumVehicle}" min=".1" max="${forecastVehicle}" low="${(forecastVehicle) / 2}" high="${((forecastVehicle) * 3 / 4) - 1}"  optimum ="${((forecastVehicle) / 3) - 1}">Tot Spend/budget</meter>
        <label for="barVehicle">Vehicle-$${sumVehicle} ($${forecastVehicle}) ${Math.round(100 * sumVehicle / forecastVehicle)}% </label>
        <br>
        <meter id="barHealth" value="${sumHealth}" min=".1" max="${forecastHealth}" low="${(forecastHealth) / 2}" high="${((forecastHealth) * 3 / 4) - 1}"  optimum ="${((forecastHealth) / 3) - 1}">Tot Spend/budget</meter>
        <label for="barHealth">Health-$${sumHealth} ($${forecastHealth}) ${Math.round(100 * sumHealth / forecastHealth)}%  </label>
        <br>
        <meter id="barOther" value="${sumOther}" min=".1" max="${forecastOther}" low="${(forecastOther) / 2}" high="${((forecastOther) * 3 / 4) - 1}"  optimum ="${((forecastOther) / 3) - 1}">Tot Spend/budget</meter>
        <label for="barOther">Other-$${sumOther} ($${forecastOther}) ${Math.round(100 * sumOther / forecastOther)}% </label>
        <br>
        <hr>
         `;

  expenses.innerHTML = htmly;

};

// render expense data
const renderExpense = (data, id) => {
  //this takes number object and converts to a string date to display.
  const x = data.date;
  const date1 = new Date(x).toLocaleDateString('en-GB');

  const html = `
    <div class="card-panel expense white row" data-id="${id}">

      <div class="expense-add">
      <dfn class="material-icons sidenav-trigger" data-target="side-form1" data-id="${id}">E</dfn>
       </div>
      
      <div class="expense-details">
        <div class="expense-sum">$${data.sum}</div>
          <div class="expense-other">${data.shop} / ${data.category} / ${data.billable}/ ${data.account}</br>
            ${data.comment}</br>
            ${date1}</br>
          </div>
            <div class="expense-delete">
             <i class="material-icons" data-id="${id}">delete_outline</i>
            </div>
       </div>
    </div>
  `;


  expenses.innerHTML += html;

};

// remove expense
const removeExpense = (id) => {
  const expense = document.querySelector(`.expense[data-id=${id}]`);
  expense.remove();

};

//FORECAST DATA- RENDERS FORECAST CARDS

const renderForecast = (data, id) => {
  //Template for rendering to cards
  const htmlz = `
    <div class="card-panel expense orange lighten-5 row" data-id="${id}">
      <div class="forecast-add">
      <cite  data-id="${id}">P</cite>
       </div>
      <div class="forecast-details">
        <div class="forecast-sum"> $${data.sum}   / ${data.name} </div>
          <div class="forecast-other">${data.category} / ${data.month} / ${data.current}/ ${data.paid}</br>
    </div>
  `;
  expenses.innerHTML += htmlz;
};
