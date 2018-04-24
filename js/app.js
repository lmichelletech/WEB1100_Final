const dog_api = 'https://dog.ceo/api/breeds/list/all';
const selectBreed = document.querySelector('#selectBreed');
const view = document.querySelector('#viewDog');
const breed = document.querySelector('#breedImage')
let dogList = [];
let count = 0;
let dog1 = "";
breed.style.visibility = 'hidden';
function getDog(){
  $.ajax({
    url: dog_api,
    dataType: 'json',
    success: (data)=>{
      console.log(data)
      $.each(data.message,function(dog){
        dog1 = data.message;
        dogList.push(dog);
        count = Object.keys(dog1).length;
        // console.log("Object " + count)
      })
      // console.log("DogList " + dogList)
      // console.log("COUNT " + count)
      for(let i = 0; i < count; i++){
        // console.log("hello")
        // console.log("i " + i)
        // console.log("hello count " + count)
        // console.log("list " + dogList[i])
        selectBreed.innerHTML +=`
        <option value="${dogList[i]}">${dogList[i]}</option>
        `
      }
    },
    error: (error)=>{
      console.log('Sorry. An error fetching the dog breeds has occurred.')
    }
  })
}

function getImage(dogImage){
  $.ajax({
    url: "https://dog.ceo/api/breed/" + `${dogImage}` + "/images",
    dataType: 'json',
    success: (data)=>{
      let y = Math.random(0,count) * count;
      // console.log(y)
      let dogUrl = data.message[1];
      console.log("URL " + dogUrl)
      breed.src = dogUrl;
      breed.style.visibility = "visible";
    },
    error: (error)=>{
      console.log("Sorry. An error occurred fetching the breed image.")
    }
  })
}

view.addEventListener('click', function(e){
  let choice = selectBreed.value;
  // console.log("breed " + choice)
  getImage(choice)
  // console.log(dogImage)
})

getDog()



