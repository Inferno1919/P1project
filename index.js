fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(function(parsed){
        displayDog(parsed["message"]);
    })

function displayDog(image){
    document.getElementById("mainDog").src=image;
}