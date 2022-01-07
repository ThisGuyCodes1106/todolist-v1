const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js");

const app = express();

const items = []
const workItems = []


app.set("view engine", "ejs")
//tells our app, which is generated using express
//to use ejs as its view engine
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))


app.get("/", function(req, res) {

let day = date.getDate() // calling the function that is bound to the constant "date"
//and activate getDate() function

  res.render("list", {listTitle: day, newListItems: items, route: "/"}) //summary: 268-22:20
  //creating our response by rendering a file called list, which has to exist in the views folder and has to have the extension .ejs
  //into that list file, we are passing in a single variable, that has the name of kindOfDay, and the value we are giving it is the value of var "day"
});

app.post("/", function(req, res) {
  let item = req.body.newItem
  items.push(item)
  res.redirect("/")
})

app.post("/work", function(req, res) {
  let item = req.body.newItem
    workItems.push(item)          //then add to work list and render work route
    res.redirect("/work")
})

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems, route: "/work"})
})

app.get("/about", function(req, res) {
  res.render("about")
})



app.listen(3000, function() {
  console.log("Server started on port 3000.");
});


// ARRAY METHOD
// app.get("/", function(req, res){
//   var today = new Date()
//   var currentDay = today.getDay()
//   var day = ""
//   const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//   var day = dayList[currentDay]

//SWITCH METHOD
// switch (currentDay) {
//   case 0:
//     day = "Sunday";
//     break;
//   case 1:
//     day = "Monday";
//     break;
//   case 2:
//     day = "Tuesday";
//     break;
//   case 3:
//     day = "Wednesday";
//     break;
//   case 4:
//     day = "Thursday";
//     break;
//   case 5:
//     day = "Friday";
//     break;
//   case 6:
//     day = "Saturday";
//     break;
//   default:
// }


//LOGIC BREAKDOWN
// Lets say you enter "Drink Water" and hit Submit:
//
// the first block of code executed is
//
// app.post("/", function(req, res) {
//
//   let item = req.body.newItem; //stores user input in variable 'item'
//   items.push(item);
//   res.redirect("/")
// });
// The app.post catches your request because thats what the form action is supposed to do (we set it to home or "/")
//
// <form action="/" method="post">
//   <input type="text" name="newItem">
//
// 1. First, what is does is take the input from the user  "Drink water" and assigns it to the variable "item".
// 2. Now we ask our array called "items" that we create earlier in app.js, and use the .push() method to add the user-Input(item) into that array.
// 3. We then send a response with the method .redirect() and tell the code to send us back to home("/") or root.
//
// Next it executes this block of code, because this is the code that is pushed when the server "get"s a request in this case, the redirect  :
//
// app.get("/", function(req, res) {
//
//   let today = new Date();
//   let options = {
//     weekday: 'long',
//     day: 'numeric',
//     month: 'long'
//
//   };
//
//   let day = today.toLocaleDateString("en-US", options)
//
//   res.render("list", {
//     kindOfDay: day,
//     newListItems: items
//   });
//
// });
//
// now pay attention to the res.render portion. We are asking it to render the contents of our list.ejs file with certain conditions:
// first one is kindOfDay with the value of the variable  "day" and NewListItems with the value of the array  "Items". Keep this in mind.
//
// Now lets see whats happening in list.ejs
//
// <h1> <%= kindOfDay %> </h1>
// here we are asking it to display kindOfDay which has the value of 'day'.
// in app.js we had assigned the following data to be stored inside
//
// let day = today.toLocaleDateString("en-US", options)
//
// So what we are asking the browser to do is render the "day" value from app.js whose key is kindOfDay.
//
// simply put day(app.js) = kindOfDay(list.ejs) =  today.toLocaleDateString("en-US", options)
//
// Hope its clear so far.
//
// Now lets talk about the loop without the html and ejs
//
// for (var i=0; i<newListItems.length; i++){
//     <li> newListItems[i]</li>
// }
// Lets first ask ourselves what is newListItems?
// Look in app.js and you will remember, it is the key that contains the value of 'items' and we know that items is an array of our to-do list entries.
//
// So the first thing to understand is we need to display all the elements in the list.
// So we go over them one by one.
//
// with var i = 0 we initiate i at 0
// then we say if i is less than the number of items in the array (newListItems.length) i.e 4.
// then create a  list item and render the current position of i .
//
// So lets work this out now, we know i  is 0
// currently, our list is
// let items = ["buy food", "cook food", "eat food" , "drink water"];
//
// so newListItems.length is nothing but the items.length which is 4.
// 0 is less than 4
// so we add a list item <li></li> we then output the position of i into newListItems
// which is written as <li> newListItems[i] </li>
//
// since we initiated i at 0  we have  newListItems[0] (or items[0] is "buy food").. if this confuses, go through the list and arrays lesson for a refresher.
//
// so what we have done is is rendered the following
// <li>buy food</li> which is nothing but <i> newListItems[0] </li>
//
// because newListItem[0] is the same as items[0] which is "buy food"
//
// So the browser renders
// - buy food.
//
// now since 0 was less than 4 and we incremented it by 1(i++), the loop repeats with i = 1
// we know that newListItems[1] is "cook food"
// so it renders <li>cook food </li>
//
// and so on till it i becomes 4 which is not more than 4 so the loop ends.
// so what the loop is doing under the hood is outputting :
// <li>newListItems[0] </li>
// <li>newListItems[1] </li>
// <li>newListItems[2] </li>
// <li>newListItems[3] </li>
//
// which the browser renders as
//
// - buy food
//
// - cook food
//
// - eat food
//
// - Drink Water
//
//
// Now every time you push(add) an item to the list newListItem.length is updated so no matter how many times you add entries , the array gets larger and intelligently displays the exact number of items thanks to the loop.
//
// The confusing part for me  is instancing the variables
//
// On app.js  we use the variables "day" and "items"
// and on the list.ejs we use an instance of "day" as kindOfDay and "items" as newListItem.
//
// and we connect app.js to list.js and the variables through this block of code
//
//
//   res.render("list", {
//     kindOfDay: day,
//     newListItems: items
//   });
// it was easier to follow once i got this part.
