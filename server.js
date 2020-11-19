const express = require("express");
const app = express();
const quotes = require("./quotes.json");
const fs = require('fs');
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//exercise for GET request with id//..................................

app.get("/quotes/:id", function(request, response){
  const id = parseInt(request.params.id);
  console.log(id);
  const quote = quotes.find((quote)=>{
    return quote.id ==id;
  })
  console.log(quote);
    response.json(quote);
  });

//For POSTExercise//.............................................

const postQuoteFunction = (request, response) => { 

  //Using Node.JS, how do I read a JSON file into (server) memory?
  const allQuotes = JSON.parse(fs.readFileSync('quotes.json')); 
  // // retrieve the quote from the req body 
  let newQuote = request.body; 
  console.log(newQuote);
  //  assign a new id
  newQuote.id = allQuotes.length
  //  // add the new quote to the array 
  allQuotes.push(newQuote); 
  //  // save the whole array to the quotes.json file 
  response.json(allQuotes);
}; 

app.post("/newquote", postQuoteFunction);


// Delete Exercise///..................................................

const deleteQuoteFunction = (request, response)=>{
  //look for the id with same name
  let id = parseInt(request.params.id);
  const deleteQuotes = allQuotes. filter((quote) => {
    return quote.id == id; 
  }); 
  //delete the quote from the array
 let index = allQuotes.indexOf(quoteToDelete);
  allQuotes.splice(index, 1);
  // save the array back to the json file.
  saveQuotes(allQuotes);
  response.send(deleteQuotes);
}
const saveQuotes = quotes => {
  let data = JSON.stringify(quotes);
  fs.writeFileSync('quotes.json', data);
};

app.delete("/delete/:id", deleteQuoteFunction);


  const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
  });
