//global variables
var breed = "";
var likeCount = 0;
var currLiked = 0;
var likedImages = []
var currentImage = ""

//variables for referenced html elements
const likeButton = document.getElementById("likeButton");
const randButton = document.getElementById("randButton");
const liked = document.getElementById("liked");
const left = document.getElementById("leftArrow");
const right = document.getElementById("rightArrow");

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

    tracklikes();
})
//when the random button is pressed starts the process of getting an appropriate image
randButton.addEventListener("click", function(){
    randDog(breed);
})
//displays the first image in the likedImages array
liked.addEventListener("click", function(){
    displayDog(likedImages[0]);
    currLiked = 0;
    likeButton.src= heartFilled;
})
//displays the previous liked image in likedImages array
left.addEventListener("click", function(){
    if(currLiked > 0){
        currLiked = currLiked - 1;
    }else{
        currLiked = likedImages.length - 1;
    }
    displayDog(likedImages[currLiked]);
    likeButton.src= heartFilled;
})
//displays the next image in the likedImages array
right.addEventListener("click", function(){
    if(currLiked < likedImages.length - 1){
        currLiked = currLiked + 1;
    }else{
        currLiked = 0;
    }
    displayDog(likedImages[currLiked]);
    likeButton.src=heartFilled;
})

//displays main dog image
function displayDog(image){
    document.getElementById("mainDog").src=image;
}
//fetch random dog image based on breed selection
function randDog(breed){

    var x = document.getElementById("selectBreed");
    breed = x.options[x.selectedIndex].value;

    if(breed == "Select Breed"){
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(response => response.json())
            .then(function(parsed){
                displayDog(parsed["message"]);
                currentImage = parsed["message"];
        })
    } else{
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(response => response.json())
            .then(function(parsed){
                displayDog(parsed["message"]);
                currentImage = parsed["message"];
        })
    
    }
    
    likeButton.src= heartEmpty;
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
//sets the breed variable to the currently selected breed
function setBreed(newBreed){
    breed = `${newBreed}`;
}
//adds or removes likes from the counter
function tracklikes(){
    if(likeButton.src == heartFilled){
        likeCount = likeCount + 1;
        likedImages.push(currentImage);
    }else{
        likeCount = likeCount - 1;
        likedImages.splice((likedImages.indexOf(currentImage)), 1);
    }
    document.getElementById("likeCounter").textContent = "You've liked " + likeCount + " Dogs";
}