//Declaring variables
const thumbnail = document.querySelector(".playerimage")
var pause = document.querySelector('.pause')
var latestTitle = document.querySelector('.latesttitle')
var playbutton = document.querySelector(".play")
var fastforward = document.querySelector(".fastforward")
var rewind = document.querySelector(".rewind")
let playing = false;
const single = document.querySelectorAll(".single")
var progressBar = document.querySelector('#progress-bar');
var openButton = document.querySelector(".playfirst");
const song = document.querySelector('#song');   
var MusicUrl = 'https://4ambounce.com/music/';
var ArtworkUrl = 'https://4ambounce.com/Album%20Artwork/';
var playcount = 0;
var latestSingle = document.querySelector(".thumbnail");
var main;

class Single{
    constructor(name, artwork, link)
    {
        this.name = name
        this.artwork = ArtworkUrl + artwork
        this.link = MusicUrl + link
        //this.theme = theme
    }
}
const everybody = new Single("Everybody", "BodieCalifornia-2560x1920.jpg", "Everybody-final-20201011.1739.mp3")

const walking = new Single("You Walking?", "Walking.jpg", "Walking-final-20200826.1810.mp3")

const urhere = new Single("::1", '__1.jpg', '::1-final-20200702.1747.mp3', "dark")

const darkmatter = new Single("Dark Matter", "DarkMatter-Jupiter.jpg","DarkMatter-master-20200611.1310.mp3", "dark")

const slightdeparture = new Single("Slight Departure", "departure.jpg","SlightDeparture-master-20200428.mp3", "sunburn")

const battersea = new Single("Battersea", "Battersea-CC-pic.jpg", 'Battersea-master-20200428.mp3', "underwater")

const demands = new Single("Demands", "4AM.jpg", 'Demands-master-20200309.1858.mp3', "sunburn")

const deepseas = new Single("Deep Seas", "deepseas.jpg", 'DeepSeas-master-20200223.1736.mp3', "underwater")

const elevenseconds = new Single("Eleven Seconds", "11-seconds.jpg", '11-Seconds.mp3', "normal")

var Singles = [everybody, walking, urhere, darkmatter, slightdeparture, battersea, demands, deepseas, elevenseconds];



if(latestSingle) {
    window.onload = function latestSingleArtwork() {
        latestSingle.style.backgroundImage = "url(" + Singles[0].artwork + ")";
        latestTitle.innerHTML = Singles[0].name;
    }
}

else {
    window.onload = function defaultPlayerArtwork() {
        thumbnail.src = Singles[0].artwork
        createSingles()
    }
    
    //Open the player
    
    function revealButtons() {
        openButton.style.display = "none"
        pause.style.display = "initial"
        fastforward.style.display = "initial"
        rewind.style.display = "initial";
        if (thumbnail.src == Singles[0].artwork)
        {
            rewind.style.opacity = "0"
        } 
        else {
            rewind.style.opacity = "100"
        }
        if (thumbnail.src == Singles[(Singles.length - 1)].artwork)
        {
            fastforward.style.opacity = "0"
        } 
        else {
            fastforward.style.opacity = "100"
        }
    }
    
    function openPlayer(e) {
        console.log("The player has been opened")
        revealButtons()
        song.src = Singles[0].link
        pauseSong()
        console.log("The song should be playing")
    }
    
    openButton.addEventListener('click', openPlayer)
    
    //Play - pause function
    
    function pauseSong() {
        if (playing == false)
        {
            pause.classList.add("pause")
            pause.classList.remove("play")
            progressBar.style.transform = "scale(1.10)";
            song.play();
            thumbnail.style.animation = "bgShadowPulsate 1s infinite";
            console.log("The song is playing")
            playing = true;
        } 
        else 
        {
            pause.classList.remove("pause")
            pause.classList.add("play")
            progressBar.style.transform = "scale(1.05)";
            song.pause();
            thumbnail.style.animation = "none";
            console.log("The song should be paused")
            playing = false;
        }
    }
    
    pause.addEventListener('click', pauseSong);
    
    //Progress bar scroll
    
    function updateProgressValue() {
        progressBar.max = song.duration;
        progressBar.value = song.currentTime;
    };
    
    function changeProgressBar() {
        song.currentTime = progressBar.value;
    };
    
    setInterval(updateProgressValue, 500);
    
    const collection = document.querySelector(".collection")
    
    //Display all the current singles avaiable
    
    
    function switchSingles(myChoice) {
        for (var n = 0; n < Singles.length; n++) {
                    //song.pause()
                    console.log("Option " + myChoice)
                    pauseSong()
                    thumbnail.src = Singles[myChoice].artwork
                    song.src = Singles[myChoice].link
                    revealButtons()
                    playing = false;
                    pauseSong()
                    playcount++;
            }
        }
    
    
    
    function createSingles() 
    {
    
    for (var i = 0; i < Singles.length; i++) 
        {
            const newSingle = document.createElement("button")
            newSingle.classList.add("single")
            newSingle.value = i
            newSingle.style.backgroundImage = "url(" + Singles[i].artwork + ")";
            collection.appendChild(newSingle)
            var numValue = 0;
            rewind.onclick = function() { 
            numValue = numValue - parseInt(1);
            switchSingles(parseInt(numValue)); }
            fastforward.onclick = function() { 
            numValue = parseInt(numValue) + parseInt(1);
            switchSingles(parseInt(numValue)); }  
        }
    
        collection.onclick = (e) => {
            var clickedItem = e.target
            console.log(clickedItem.value)
            numValue = clickedItem.value;
            playing = false;
            switchSingles(parseInt(numValue))
        } 
}
}
