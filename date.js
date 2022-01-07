exports.getDate = function() {
  let today = new Date()

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  return today.toLocaleDateString("en-us", options)
}

exports.getDay = function() {
  let today = new Date()

  let options = {
    weekday: "long",
  }
  return today.toLocaleDateString("en-us", options)
}



//EXTENDED
// module.exports.getDate = getDate
//
// function getDate() {
//   let today = new Date()
//
//   let options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   }
//   let day = today.toLocaleDateString("en-us", options)
//
// return day
// }
//
// module.exports.getDay = getDay
//
// function getDay() {
//   let today = new Date()
//
//   let options = {
//     weekday: "long",
//   }
//   let day = today.toLocaleDateString("en-us", options)
//
// return day
// }
