/* get id by clicking button */
let idNo
function loadId(id,bool,sortedArray) {
   idNo = id;
  loadData(idNo,bool,sortedArray);
}
let gainArrayFromLoadData
function functionForGainArrayFromLoadData(arr) {
  gainArrayFromLoadData = arr
}
/* videos sorting */
function sorting(dataArray) {
 let sortedArray = gainArrayFromLoadData.toSorted(function(a,b) {
  return (parseFloat(b.others.views) - parseFloat(a.others.views))
})
display(sortedArray)
}

/* set default parameter */
async function loadData(idNo = 1000,bool,sortedArray) {
  let jsonData = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${idNo}`
  );
  /* here fetch a array with 4 object */
  let jsonObj = await jsonData.json();
  let dataArray = jsonObj.data;
  functionForGainArrayFromLoadData(dataArray)
    display(dataArray)
}
/* show initial data before search by calling loadData */
loadData();

/* data displayer function */
function display(dataArray) {
  let cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
  /* dataArray represent 12 array items from api response */
  let arr = dataArray;
  /* this variable use for accessing timeContainers nodeList and this variable declare outside 'for loop' for preserve increment value of i from 'for loop' */
  let i = 0;
  for (let item of arr) {
    /* calculating posting time */
    let getTime = parseFloat(item.others.posted_date); // return number and NaN.return NaN when posted_date is empty string
    let date = new Date(getTime); //count time form 1970 00:00:00
    let hour = date.getHours();
    let min = date.getMinutes();
    for (let authorItem of item.authors) {
      cardContainer.innerHTML += `
             <div class="card">
             <!-- image and time container -->
              <figure class="!justify-end !items-end ">

              <!-- time showing container -->
              <div class="w-28 m-3 px-1 py-1 bg-[#171717] rounded text-white text-xs absolute timeContainer">
              <p>${hour}hrs ${min} min ago</p>
              </div>

                <img
                  class="rounded-lg w-[300px] h-[200px]"
                  src="${item.thumbnail}"
                  alt="Shoes"
                />
              </figure>

              <!-- author img and details container -->
              <div class="card-body flex-row ml-2 pt-3 md:pt-5 pr-0 pb-0 pl-0">
                <!-- author img -->
                <img
                  class="w-10 h-10 rounded-full"
                  src="${authorItem.profile_picture}"
                  alt=""
                />
                <!-- card details container -->
                <div>
                  <!-- title -->
                  <h4 class="text-[#171717] text-sm md:text-base font-bold">
                    ${item.title}
                  </h4>
                  <!-- author name and verified -->
                  <div class="flex gap-2">
                  <p class="flex-[0_0_auto] text-[rgba(23,23,23,0.70)] text-xs md:text-sm">
                  ${authorItem.profile_name}
                </p>
                  <div id='verified' class='text-xs md:text-sm'></div>
                  </div>
                  <!-- view -->
                  <p class="text-[rgba(23,23,23,0.70)] text-xs md:text-sm">${item.others.views}</p>
                </div>
              </div>
            </div>`;
      /* show verified .this condition write here for accessing the variable of authorItem*/
      let verified = document.querySelectorAll("#verified");
      if (authorItem.verified === true) {
        verified[i].innerHTML += '<i class="fa-solid fa-circle-check"></i>';
      }
      /* select timeContainer by for looping and if condition is true hide this timeContainer */
      let timeContainers = document.querySelectorAll(".timeContainer");
      for (; i < timeContainers.length; i++) {
        if (isNaN(getTime)) {
          timeContainers[i].classList.add("hidden");
        }
      }
    }
  } //end of for loop
  /* if dataArray has empty show a message.This dataArray will be empty when we click the drawing button */
  if (arr.length === 0) {
    cardContainer.innerHTML = `
    <div class="w-[90vw] m-auto">
    <img class='m-auto' src='./images/Icon.png'>
    <h1 class="text-[#171717] text-2xl md:text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
    </div>
    `;
  }
} //end of display function

// Add event listener to each filter button for background color changing when clicked.
let filterBnts = document.querySelectorAll("#filterButtonCon button");
filterBnts.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    //change background color and font color when click that button
    event.target.style.backgroundColor = "red";
    //this loop use for remove red background color and white text of the button
    filterBnts.forEach((otherbtns) => {
      if (otherbtns != btn) {
        otherbtns.style.backgroundColor = "rgba(37,37,37,0.15)";
        otherbtns.style.color = "rgba(37,37,37,0.70)";
      }
    });
  });
});
