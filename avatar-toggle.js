const image = document.getElementById("avatar");
const quoteText = document.getElementById("quote-text");

// List of avatars and corresponding quotes
const avatars = [
  {
    name: "santa",
    src: "./assets/santa.png",
    quote: "🎅 Santa is ready to party!",
  },
  {
    name: "reindeer",
    src: "./assets/reindeer.png",
    quote: "🦌 Reindeer dashing through the sky!",
  },
  { name: "bear", src: "./assets/bear.png", quote: "🐻 Bear hugs incoming!" },
  {
    name: "cookies",
    src: "./assets/cookie.png",
    quote: "🍪 Cookies for everyone!",
  },
  {
    name: "snowman",
    src: "./assets/snowman.png",
    quote: "☃️ Snowman brings chill vibes!",
  },
];

let currentIndex = 0;

image.addEventListener("click", function () {
  // Move to next avatar
  currentIndex = (currentIndex + 1) % avatars.length;

  // Set avatar image and quote
  image.src = avatars[currentIndex].src;
  quoteText.innerText = avatars[currentIndex].quote;
});
