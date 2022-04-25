const images = document.getElementById("images");
const statusDisplay = document.getElementById("status");
const bgColor = document.getElementById("main");

function setColor() {
  bgColor.classList.add("online");
}

async function connectionStatus() {
  try {
    const fetchResult = await fetch(
      "//upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Hapalemur_alaotrensis_JJLM.JPG/100px-Hapalemur_alaotrensis_JJLM.JPG?time=" +
        new Date().getTime()
    );

    return (fetchResult.status >= 200) & (fetchResult.status < 300);
  } catch (error) {
    console.log(error);

    statusDisplay.textContent = "OOPS!!! Your internet connection is down";
    images.src = "../images/offline.png";
    bgColor.classList.remove("online");
  }
}

setInterval(async () => {
  const result = await connectionStatus();

  if (result) {
    statusDisplay.textContent = "You are ONLINE, CONNECTION LOOKS GOOD";
    images.src = "../images/online.png";
    setColor();
  }
}, 5000);

window.addEventListener("load", async (event) => {
  if (connectionStatus) {
    statusDisplay.textContent = "You are ONLINE";
  } else {
    statusDisplay.textContent = "You are OFFLINE";
  }
});
