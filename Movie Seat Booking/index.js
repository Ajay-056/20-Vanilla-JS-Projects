"use strict";

const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const seatContainer = document.querySelector(".seat-container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let selectedCount = 0;

populateUI();

setMovieData(movieSelect.selectedIndex, movieSelect.value);

function populateUI() {
  let selectedSeatsLS = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeatsLS) {
    seats.forEach((seat, index) => {
      selectedSeatsLS.forEach((seatls) => {
        if (index === seatls) {
          seat.classList.add("selected");
        }
      });
    });
  }

  movieSelect.selectedIndex = localStorage.getItem("selectedMovieIndex");

  count.innerText = selectedSeatsLS.length;

  total.innerText =
    selectedSeatsLS.length * +localStorage.getItem("selectedMoviePrice");
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCountAndPrice() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = selectedSeats.length;
  const selectedPrice = +selectedSeats.length * +movieSelect.value;
  total.innerText = selectedPrice;
}

seatContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCountAndPrice();
  }
});

movieSelect.addEventListener("change", (e) => {
  updateSelectedCountAndPrice();
  console.log(e.target.selectedIndex, e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
});
