var breed = "african";

const likeButton = document.getElementById("likeButton");
const randButton = document.getElementById("randButton");

//make long, reused links into variables
const heartEmpty = ("https://toppng.com/uploads/preview/black-love-heart-outline-11563250728brya8dxczz.png")
const heartFilled = ("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png")

//get initial image when page is loaded
randDog(breed);

//fetches an updated list of breeds from the api
fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(parsed => populateList(parsed["message"]));


//when like button is pressed it checks if the image has been liked yet and changes the image accordingly
likeButton.addEventListener("click", function(){
    
    if(likeButton.src == heartFilled){
        likeButton.src= heartEmpty;
    }else{
        likeButton.src= heartFilled;
    }
})
randButton.addEventListener("click", function(){
    randDog(breed);
})

//displays main dog image
function displayDog(image){
    document.getElementById("mainDog").src=image;
}
//fetch random dog image based on breed selection
function randDog(breed){

    if(breed == "Select Breed"){
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(response => response.json())
            .then(function(parsed){
            displayDog(parsed["message"]);
        })
    } else{
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(response => response.json())
            .then(function(parsed){
            displayDog(parsed["message"]);
        })
    
    }
}
//populates the breed selection dropdown
function populateList(options){
    var keys = Object.keys(options);

    for(var i = 0; i < keys.length; i++){
        
        var x = document.getElementById("selectBreed");
        var option = new Option(keys[i]);
        x.appendChild(option);

    }
}