const container = document.querySelector('.container');
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const movieSelect = document.getElementById("movie")
const total = document.getElementById("total")

const index = document.getElementById("index");

let totalPrice = +movieSelect.value;
const movieTitle = document.querySelector(".movie-title");


//get item from localStorage and poppulate UI

function getStoredItemToPopulateUI(){
let selectedSeats= JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected")
            }
        })
    }
    let selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}
getStoredItemToPopulateUI()

//set movie data to local storage
let setMovieDataInStorage = (movieIndex, moviePrice )=>{
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setItem("selectedMoviePrice", moviePrice)

}


//update index and total
let updateSelectedCount =()=>{
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    index.innerText = selectedSeats.length
    total.innerText = totalPrice * selectedSeats.length;
    const seatIndex = [...selectedSeats].map(seat =>[...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
    
}

//movie change event
movieSelect.addEventListener("change", e=>{
    let movieIndex = e.target.selectedIndex
    totalPrice = +e.target.value
    movieTitle.innerText = e.target[movieIndex].text
     
    updateSelectedCount();
    setMovieDataInStorage(e.target.selectedIndex, e.target.value)
})

// seat select event
container.addEventListener("click", e =>{
   if(e.target.classList.contains("seat") &&
   !e.target.classList.contains('occupied')){
       e.target.classList.toggle("selected");
       updateSelectedCount()
   }
})
updateSelectedCount()