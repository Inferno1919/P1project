//make long, reused links into variables
const heartEmpty = ("https://toppng.com/uploads/preview/black-love-heart-outline-11563250728brya8dxczz.png")
const heartFilled = ("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png")

//fetches the random dog image
fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(function(parsed){
        displayDog(parsed["message"]);
    })

//when like button is pressed it checks if the image has been liked yet and changes the image accordingly
document.getElementById("likeButton").addEventListener("click", function(){
    
    if(likeButton.src == heartFilled){
        likeButton.src= heartEmpty;
    }else{
        likeButton.src= heartFilled
    }
})

//displays main dog image
function displayDog(image){
    document.getElementById("mainDog").src=image;
}