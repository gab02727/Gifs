var topics = ["Travel", "Animals", "Cars", "Buildings"];

function displayTopic() {

    var topic = $(this).attr("data-name");
    

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10";
   // console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
      console.log(response);

      

      
        
        for(var i = 0; i < response.data.length; i++){
    

        var topicDiv = $("<div>").addClass("animal");
        

         // Storing the rating data
         var rating = response.data[i].rating;

         // Creating an element to have the rating displayed
         var pOne = $("<p>").text("Rating: " + rating);

         // Displaying the rating
         topicDiv.prepend(pOne);

         // Retrieving the URL for the image
         var animatedURL = response.data[i].images.fixed_height.url;
         var staticURL = response.data[i].images.fixed_height_still.url;
         var showImage = $("<img>");

         // Creating an element to hold the image
         showImage.attr("src", staticURL);
         showImage.addClass("showGiphy");
         showImage.attr("data-state", "still");
         showImage.attr("data-state", staticURL);
         showImage.attr("data-animate", animatedURL);
         
      

         // Appending the image
         topicDiv.append(showImage);

          // Putting the entire topic above the previous movies
          $("#Topics-view").prepend(topicDiv);
        }

      

    });
    }

 // Function for displaying topic data
    function renderButtons() {

        // Deleting the topics prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each topic in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of topic-btn to our button
            a.addClass("topic-btn");

             // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
    }

    // This function handles events where an animal button is clicked
    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#topic-input").val().trim();


        // Adding topics from the textbox to our array
        topics.push(animal);
        //console.log(animals);

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
    });

      // Adding a click event listener to all elements with a class of "topic-btn"
      $(document).on("click", ".topic-btn", displayTopic);

      renderButtons();
              //Click event on gifs with class of "showGiphy" executes pausePlayGifs function
              
        $(document).on("click", ".showGiphy", pausePlayGifs);
    
     
  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

        

    }
};




  
    


      // Calling the renderButtons function to display the intial buttons
      

  


    

      

   
