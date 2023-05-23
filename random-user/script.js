const resultsUl = document.querySelector("#result");
const filterInput = document.querySelector("#filter");
const ekleArkadas = document.querySelector(".ekle_1")
const arkadas = document.querySelector(".arkadas")
const btn_sil = document.querySelector(".sil");

const listItem = [];

filterInput.addEventListener("input", function(e){
    filterData(e.target.value);
})

getData()

async function getData(){
    const res = await fetch("https://randomuser.me/api?results=1000");
    const response = await res.json()
    const results = response.results;
    
    resultsUl.innerHTML = "";
    
    results.forEach((user)=>{
        // console.log(user)
        // if(user.gender == "female"){
        const li = document.createElement("li");
        li.classList.add("bir")
        listItem.push(li);
        
            li.innerHTML = `
            <img src = "${user.picture.large}">
            <div class = "user-info">
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
            </div>
            <button class="btn">+</button>
            `;
            resultsUl.appendChild(li);
    
            let btn = li.querySelector(".btn");
    
            btn.addEventListener("click", function(e){
                e.preventDefault()
                const clickUser = e.target.parentNode;
                
                const name = clickUser.querySelector("h4").textContent;
                const src = clickUser.querySelector("img").src;
                const country = clickUser.querySelector("p").textContent;
                const yeni = document.createElement("div")
                yeni.classList.add("liste");
    
                yeni.innerHTML = `
                <div class="liste">
                    <img src="${src}" alt="">
                    <div class="bilgi">
                        <h4>${name}</h4>
                        <p>${country}</p>
                        </div>
                        </div>
                        <button class="btn_1">-</button>
                `;
    
                btn_sil.addEventListener("click", function(){
                    arkadas.style.display = "none";
                })
    
                ekleArkadas.appendChild(yeni);
                let yeni_btn = yeni.querySelector(".btn_1");
                yeni_btn.addEventListener("click", function(){
                   yeni.remove()
                   if(!ekleArkadas.querySelector(".liste")){
                    arkadas.style.display = "none";
                   }
                })
                arkadas.style.display = "block";
            })
        // }
      
    })
}

function filterData(searchData){
    listItem.forEach((item)=>{
        if(item.innerText.toLowerCase().includes(searchData.toLowerCase())){
            item.classList.remove("hide");
        }
        else{
            item.classList.add("hide");
        }
    })
}