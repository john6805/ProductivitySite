
var globalId = 0;
var interval;
function openModal(imageId) 
{
    document.getElementById('gallery-modal').style.display = "block";
    showImages(imageId);
    globalId = imageId;
}
  
function closeModal() 
{
    document.getElementById('gallery-modal').style.display = "none";
    globalId = 0;
}

function changeImage(nextPrev)
{
    globalId = globalId + nextPrev;
    showImages(globalId);
}

function play()
{
    interval = setInterval(function(){
        changeImage(1);
    }, 10000);
    document.getElementById("play").style.display = "none";
    document.getElementById("stop").style.display = "block";
}

function stop()
{
    clearInterval(interval);
    document.getElementById("play").style.display = "block";
    document.getElementById("stop").style.display = "none";
}

function showImages(imageId)
{
    var i;
    var images = document.getElementsByClassName("slide-container");
    if(imageId > images.length) {imageId = 1}
    if(imageId < 1){imageId = images.length}
    for(i = 0; i < images.length; i++)
    {
        images[i].style.display = "none";
    }
    globalId = imageId;
    images[imageId-1].style.display = "block";
}

document.addEventListener('keydown', (event) => {
    if(globalId != 0)
    {
        switch(event.key)
        {
            case "ArrowLeft":
                changeImage(-1);
                break;
            case "ArrowRight":
                changeImage(1);
                break;
            case "Escape":
                closeModal();
                break;
        }
    }
    
});