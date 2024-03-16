/* this function create four filter buttons */
async function createFilterBtns() {
  let jsonData= await fetch('https://openapi.programming-hero.com/api/videos/categories')
  let jsonObj = await jsonData.json()
  let dataArray = jsonObj.data
  console.log(dataArray);
  for (const item of dataArray) {
    let filterBtnsCon = document.getElementById('filterButtonCon')
    filterBtnsCon.innerHTML += 
    `
    <button class="bg-[rgba(37,37,37,0.15)] rounded text-[rgba(37,37,37,0.70)] text-sm md:text-base font-medium py-[5px] md:py-2 px-3 md:px-5" onclick='loadId(${item.category_id})'>${item.category}</button>
    `
  }
  //select all buttons and Add event listener to each filter button for changing background color when clicked.
let filterBnts = document.querySelectorAll("#filterButtonCon button");
for (const btn of filterBnts) {
btn.addEventListener('click',function(event) {
    event.target.style.backgroundColor = '#FF1F3D';
    event.target.style.color = '#FFF';
    for (let otherbtn of filterBnts) {
      /* select non clicked button and style it. */
      if (otherbtn != btn) {
        otherbtn.style.backgroundColor = "rgba(37,37,37,0.15)";
        otherbtn.style.color = "rgba(37,37,37,0.70)";
      }
    }
  })
}

}
 createFilterBtns()


/* get id by clicking filter button */
let idNo
function loadId(id) {
   idNo = id;
  loadData(idNo);
}
/* retrieve data like array from 'loadData()' function.this array use for data sorting. */
let gainArrayFromLoadData
function functionForGainArrayFromLoadData(dataArray) {
  gainArrayFromLoadData = dataArray
}
/* videos sorting */
function sorting() {
 let sortedArray = gainArrayFromLoadData.toSorted(function(a,b) {
  return (parseFloat(b.others.views) - parseFloat(a.others.views))
})
display(sortedArray)
}

/* load data by api by id.If can not get any id set default id is 1000. */
async function loadData(idNo = 1000) {
  let jsonData = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${idNo}`
  );
  /* here fetch a array with 4 object */
  let jsonObj = await jsonData.json();
  let dataArray = jsonObj.data;
  functionForGainArrayFromLoadData(dataArray)
    display(dataArray)
}
/* here call the 'loadData()' function for showing initial data of 'id 1000' before search. */
loadData();

/* data displayer function */
function display(dataArray) {
  let cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
  /* dataArray represent 12 array items from api response */
  let dataArrayFromResponse = dataArray;
  /* this variable use for accessing timeContainers nodeList and this variable 'i' declare outside 'for loop' for preserve increment value from 'for loop'. */
  let i = 0;
  for (let item of dataArrayFromResponse) {
    /* calculating posting time */
    let getTime = parseFloat(item.others.posted_date); // return number and NaN.Return NaN when posted_date is empty string
    let date = new Date(getTime); //count time form 1970 00:00:00
    let hour = date.getHours();
    let min = date.getMinutes();
    /* showing card by for of loop */
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
      /* show verified .this condition write inside 'for of' loop for accessing the variable of authorItem*/
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
  if (dataArrayFromResponse.length === 0) {
    cardContainer.innerHTML = `
    <div class="w-[90vw] m-auto">
    <img class='m-auto' src='./images/Icon.png'>
    <h1 class="text-[#171717] text-2xl md:text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
    </div>
    `;
  }
} //end of display function

/* the function of loading blog html */
function loadBlogHtml() {
  window.location.href = 'blog.html'
}


