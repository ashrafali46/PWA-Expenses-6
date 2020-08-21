//may have to look at putting "startDate"  into local storage for persistance: This is good for epoch
//local storage for date'
//https://www.youtube.com/watch?v=GihQAC1I39Q
// NOTE: epoch time (x 1000) in MILLISECONDS 



let startDay = 0;
if (localStorage.getItem("localStart") === null) {
  startDay = 1596240000001;
} else {
  startDay = localStorage.getItem("localStart");
};



// Initialize Firebase
var config = {
  // put your FIREBASE FIRTESTORE CONFIG DATA HERE
  // apiKey: ",
  // authDomain:
  //   databaseURL: "
  // projectId:
  // storageBucket:
  //   messagingSenderId:
  // appId: 

};
firebase.initializeApp(config);
const db = firebase.firestore();



// enable offline data
db.enablePersistence()
  .catch(function (err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

const dbe = db.collection('expenses');
const dbf = db.collection('forecasts');



//THIS RENDERS SUMS of all EXPENSES to top of page  1598918400 startDay
dbe.where("date", ">", startDay).orderBy('date', 'asc').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    renderExpensex(change.doc.data());
  });
});

//THIS RENDERS SUMS of all CURRENT FORECASTS to top of page
dbf.where("current", "==", "true").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    renderForecastx(change.doc.data());
  });
});



//THIS renders Forecasts to PAGE
dbf.where("current", "==", "true").where("paid", "==", "false").orderBy('order', 'asc').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    renderForecast(change.doc.data(), change.doc.id);
  });
});

//THIS renders Expenses to top of page & deletes an expense item too
// real-time listener   nOte epoch time in MILLISECONDS (x 1000) startDay
dbe.where("date", ">", startDay).orderBy('date', 'desc').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      renderExpense(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      removeExpense('change'.doc.id);
    }
  });
});

// add new expense
const form = document.querySelector('.add-expense');
form.addEventListener('submit', evt => {
  evt.preventDefault()

  const expense = {
    sum: form.sum.value,
    shop: form.shop.value,
    category: form.category.value,
    account: form.account.value,
    billable: form.billable.value,
    comment: form.comment.value,
    date: Date.now(),
  };


  dbe.add(expense).catch(err => console.log(err));
  form.sum.value = '';
  form.shop.value = '';
  form.category.value = '';
  form.account.value = '';
  form.billable.value = '';
  form.comment.value = '';

});

// remove a expense
const expenseContainer = document.querySelector('.expenses');
expenseContainer.addEventListener('click', evt => {
  if (evt.target.tagName === 'I') {

    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    dbe.doc(id).delete();
  }
});

// UPDATE AN EXPENSE
//first click in the expense area- if it clicks on the edit icon then we want to open the edit form  
//after getting the doc details from the database, to display in the form for editing
const expenseContainer1 = document.querySelector('.expenses');
expenseContainer1.addEventListener('click', evt => {
  if (evt.target.tagName === 'DFN') {
    //if it clicks on the edit iconwithin the "dfn" tags 
    // then we want to open the edit form and populate it with existing data 
    const id = evt.target.getAttribute('data-id');
    console.log(id);

    dbe.doc(id).get().then(function (doc) {
      if (doc.exists) {
        sum1.value = doc.data().sum;
        shop1.value = doc.data().shop;
        category1.value = doc.data().category;
        account1.value = doc.data().account;
        billable1.value = doc.data().billable;
        comment1.value = doc.data().comment;
        //date1.value = doc.data().date;

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    // update expense
    const form1 = document.querySelector('.update-expense');
    form1.addEventListener('submit', evt => {
      evt.preventDefault()

      const expense1 = {
        sum: document.forms[1].sum1.value,
        shop: shop1.value,
        category: category1.value,
        account: account1.value,
        billable: billable1.value,
        comment: comment1.value,
      };

      dbe.doc(id).update(expense1).catch(err => console.log(err));
      form1.sum1.value = '';
      form1.shop1.value = '';
      form1.category1.value = '';
      form1.account1.value = '';
      form1.billable1.value = '';
      form1.comment1.value = '';
    });
  }
});

//FORECASTING DATABASE- 

// add new forecast amount
const formf2 = document.querySelector('.add-forecast2');
formf2.addEventListener('submit', evt => {
  evt.preventDefault()

  const forecast = {
    sum: formf2.fsum.value,
    category: formf2.category.value,
    name: formf2.name.value,
    month: formf2.month.value,
    current: formf2.current.value,
    paid: formf2.paid.value,
    order: formf2.order.value,
  };

  dbf.add(forecast)
    .catch(err => console.log(err));
  formf2.fsum.value = '';
  formf2.name.value = '';
  formf2.category.value = '';
  formf2.month.value = '';
  formf2.current.value = '';
  formf2.paid.value = '';
  formf2.order.value = '';
});


// SWITCH FORECAST ITEM TO PAID
//first click in the expense area- if it clicks on the edit icon then we want to open the edit form  
//after getting the doc details from the database, to display in the form for editing
const forecastContainer = document.querySelector('.expenses');
forecastContainer.addEventListener('click', evt => {
  if (evt.target.tagName === 'CITE') {
    evt.preventDefault()
    //if it clicks on the edit icon within the "cite" tags 
    // then we want to open the edit form and populate it with existing data 
    const id = evt.target.getAttribute('data-id');

    dbf.doc(id).get().then(function (doc) {
      if (doc.exists) {
        const forecastTrue = {
          paid: paid.value = "true",
        }
        dbf.doc(id).update(forecastTrue).catch(err => console.log(err));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
});

//THIS TAKES MULTIPLE SELECTIONS FROM FORECAST SELECT FORM & PUTS THEM IN ARRAY 
//this is planned to be collection doc iD's to allow an iteration throufgh that array to set current="true"
//so they are for current month. 

//Prototype for localStorage to accept arrays
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}


//JS from form for multiple selections for forecast Items
// var optionsToSelect = ['One', 'three'];
// var select1 = document.getElementById('allMonth');

// for (var j = 0, l = select1.options.length, o; j < l; j++) {
//   o = select1.options[j];
//   if (optionsToSelect.indexOf(o.text) != -1) {
//     o.selected = true;
//   }
// }


//MONTHLY REPEATS
let arr1 = [];
//showSelOps1  gets selection from form
const showSelOps1 = options => {
  arr1 = (
    [...options].filter(o => o.selected).map(o => o.value)

  );
  //this sets arr1a to arr1 so when out of function stops array reset back to 0 & pushes data into local storage
  //need prototype Storage above as localStorage does not like Arrays, so need to make it accept arrays. 
  if (arr1 != []) {
    var arr1a = arr1;
    localStorage.setObj('arr1Ids', arr1a);
  };
  //get array
  var x = localStorage.getObj('arr1Ids');
  //iterate through it to get each document
  for (var j = 0, l = x.length, doc1; j < l; j++) {
    doc1 = x[j];
    //in database set current & paid to values required
    dbf.doc(doc1).get().then(function (doc) {
      if (doc.exists) {
        const forecastSet = {
          current: current.value = "true",
          paid: paid.value = "false"

        }
        dbf.doc(doc1).update(forecastSet).catch(err => console.log(err));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    // console.log(current.value);
    // console.log(paid.value);
  };
};
//VARIABLE REPEATS
let arr2 = [];
const showSelOps2 = options => {
  arr2 = (
    [...options].filter(o => o.selected).map(o => o.value)
  );
  if (arr2 !== []) {
    var arr2a = arr2;
    localStorage.setObj('arr2Ids', arr2a);
  };
  var y = localStorage.getObj('arr2Ids');
  for (var j = 0, l = y.length, doc1; j < l; j++) {
    doc2 = y[j];
    dbf.doc(doc2).get().then(function (doc) {
      if (doc.exists) {
        const forecastSet = {
          current: current.value = "true",
          paid: paid.value = "false",
        }
        dbf.doc(doc2).update(forecastSet).catch(err => console.log(err));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  };

};




//THIS ITERATES THROUGH  ALL FORECASTS (current =TRUE) & MAKES THEM FALSE
// finds sets current = false
function resetForecastx() {
  //This sets startday from form & pushes to local storage
  var d = document.getElementById("monthEpoch");
  localStorage.setItem('localStart', d.options[d.selectedIndex].value);
  startDay = localStorage.getItem('localStart');

  //console.log(startDay);
  // Iterate DB"forecast" & Set all current & paid items to false
  dbf.orderBy('current', 'asc').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      let idx = change.doc.id;

      dbf.doc(idx).get().then(function (doc) {
        if (doc.exists) {
          let forecastSetFalse = {
            current: current.value = "false",
            paid: paid.value = "false"
          };
          dbf.doc(idx).update(forecastSetFalse).catch(err => console.log(err));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        };

      });

    });
  });

};

//THIS ITERATES THROUGH  ALL FORECASTS (current =FALSE) & MAKES THEM TRUE
// finds sets current = TRUE
function resetFcstCurrentTrue() {
  dbf.orderBy('current', 'asc').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      let idx = change.doc.id;

      dbf.doc(idx).get().then(function (doc) {
        if (doc.exists) {
          const forecastCurrentTrue = {
            current: current.value = "true",
          }
          dbf.doc(idx).update(forecastCurrentTrue).catch(err => console.log(err));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

      });

    });
  });
};
//THIS ITERATES THROUGH  ALL FORECASTS (current =TRUE) & MAKES THEM FALSE
function resetFcstCurrentFalse() {
  dbf.orderBy('current', 'asc').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      let idx = change.doc.id;

      dbf.doc(idx).get().then(function (doc) {
        if (doc.exists) {
          const forecastCurrentFalse = {
            current: current.value = "false",
          }
          dbf.doc(idx).update(forecastCurrentFalse).catch(err => console.log(err));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

      });

    });
  });
};


//THIS ITERATES THROUGH  ALL FORECASTS (Paid =TRUE) & MAKES THEM FALSE
// finds sets current = false
function resetFcstPaidFalse() {
  dbf.orderBy('current', 'asc').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      let idx = change.doc.id;

      dbf.doc(idx).get().then(function (doc) {
        if (doc.exists) {
          const forecastPaidFalse = {
            paid: paid.value = "false"
          }
          dbf.doc(idx).update(forecastPaidFalse).catch(err => console.log(err));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    });
  });
};

//THIS ITERATES THROUGH  ALL FORECASTS (Paid =FALSE) & MAKES THEM TRUE
// finds sets current = false
function resetFcstPaidTrue() {
  dbf.orderBy('current', 'asc').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      let idx = change.doc.id;
      dbf.doc(idx).get().then(function (doc) {
        if (doc.exists) {
          const forecastPaidTrue = {
            paid: paid.value = "true",
          }
          dbf.doc(idx).update(forecastPaidTrue).catch(err => console.log(err));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    });
  });
};


