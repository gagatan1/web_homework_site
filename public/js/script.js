const tweetText = document.getElementById("tweet-text");
const tweetButton = document.getElementById("tweet-button");
const tweetsContainer = document.getElementById("tweets");

tweetButton.addEventListener("click", () => {
  const tweetContent = tweetText.value.trim();
  if (tweetContent !== "") {
    const newTweet = document.createElement("div");
    newTweet.classList.add("tweet");
    newTweet.textContent = tweetContent;
    tweetsContainer.appendChild(newTweet);
    tweetText.value = "";
  }
});
