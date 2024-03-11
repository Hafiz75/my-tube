function loadId(id) {
    let idNo = id
    loadData(idNo)
}

async function loadData(idNo) {
    let jsonData = await fetch(`https://openapi.programming-hero.com/api/videos/category/${idNo}`)
    /* here fetch a array with 4 object */
    let jsonObj = await jsonData.json()
    let dataArray = jsonObj.data
    console.log(dataArray);
    display(dataArray)
}


 function display(dataArray) {
    let cardContainer = document.getElementById('cardContainer')
    cardContainer.innerHTML = '';
    /* dataArray represent 12 array items from api response */
    let arr = dataArray
    for (let item of arr) {
        for (let authorItem of item.authors) {
            cardContainer.innerHTML += 
            `<div class="card">
              <figure>
                <img
                  class="rounded-lg w-[300px] h-[200px]"
                  src="${item.thumbnail}"
                  alt="Shoes"
                />
              </figure>
              <!-- author img and details container -->
              <div class="card-body flex-row pt-3 md:pt-5 pr-0 pb-0 pl-0">
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
                  <!-- author name -->
                  <p class="text-[rgba(23,23,23,0.70)] text-xs md:text-sm">
                    ${authorItem.profile_name}
                  </p>
                  <!-- view -->
                  <p class="text-[rgba(23,23,23,0.70)] text-xs md:text-sm">${item.others.views}</p>
                </div>
              </div>
            </div>`
        }
    }//end of for loop
/* if dataArray has empty show an message.this dataArray empty when we click the drawing button */
if (arr.length === 0) {
    cardContainer.innerHTML = 
    `
    <div class="w-[90vw] flex flex-col items-center justify-center">
    <img class='' src='/images/Icon.png'>
  
    <h1 class="text-[#171717] text-[22px] md:text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
    </div>
    `
}
}
https://github.com/Hafiz75/my-tube/blob/main/images/Icon.png