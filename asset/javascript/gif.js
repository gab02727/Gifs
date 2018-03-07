var animals = ["Tiger", "Monkey", "Lion", "zebra"];

function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";
   // console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
      console.log(response);

      

      
        
        for(var i = 0; i < response.data.length; i++){
    

        var animalDiv = $("<div>").addClass("animal");

         // Storing the rating data
         var rating = response.data[i].rating;

         // Creating an element to have the rating displayed
         var pOne = $("<p>").text("Rating: " + rating);

         // Displaying the rating
         animalDiv.prepend(pOne);

         // Retrieving the URL for the image
         var imgURL = response.data[i].images.downsized.url;

         // Creating an element to hold the image
         var image = $("<img>").attr("src", imgURL);
      

         // Appending the image
         animalDiv.append(image);

          // Putting the entire animal above the previous movies
          $("#Animals-view").prepend(animalDiv);
        }

      

    });
    }

 // Function for displaying animal data
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of animal-btn to our button
            a.addClass("animal-btn");

             // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
    }

    // This function handles events where an animal button is clicked
    $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();


        // Adding animal from the textbox to our array
        animals.push(animal);
        //console.log(animals);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "animal-btn"
      $(document).on("click", ".animal-btn", displayAnimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      

   
