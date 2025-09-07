const CategoryContainer = document.getElementById("CategoryContainer")
const plantsByCategory = document.getElementById("main-card")
const YourCartContainer = document.getElementById("YourCartContainer")
const btn = document.getElementById("btn")
let YourCart = [];


const loadCategory = () => {
    
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
        const categories = data.categories
        
        
        categories.forEach((cat) => {
            CategoryContainer.innerHTML += `<li id="${cat.id}" class="hover:bg-green-200 rounded-xl cursor-pointer">${cat.category_name}</li>`
        });
    

    });
    CategoryContainer.addEventListener("click", (e) =>{
        const allLi = document.querySelectorAll("li")
        allLi.forEach(li =>{
            li.classList.remove('bg-green-200')
        })
         if(e.target.localName === "li") {
            
            e.target.classList.add("bg-green-200")
            plantsByCategories(e.target.id)
         }
    })
    
}
loadCategory()

const plantsByCategories = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) =>{
        showPlantsByCategories(data.plants)
    })


}



const showPlantsByCategories = (articles) => {
    plantsByCategory.innerHTML = ""  
    articles.forEach(article => {
        plantsByCategory.innerHTML += `<div class="bg-white p-4 rounded-lg shadow">
          <div class="bg-gray-200   rounded mb-4"><img src="${article.image}" alt=""></div>
          <h3 class="font-semibold">${article.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${article.description}</p>
          <div class="flex justify-between items-center">
          <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">${article.category}</span>
            <span class="font-semibold">${article.price}</span>
        </div>
        <button id="click-btn" class="w-full bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Add to Cart</button>
        </div>`
    });
}

plantsByCategory.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
        const card = e.target.closest("div.bg-white");
        const title = card.querySelector(".plant-name").innerText;
        const id = card.getAttribute("data-id");

        YourCart.push({ title, id });
        console.log("Cart Items:", YourCart);

        // Optionally show cart item in the UI
        YourCartContainer.innerHTML += `<p>${title}</p>`;
    }
});
plantsByCategories("1");

// plantsByCategory.addEventListener("click", (e) => {
//     console.log(e.target)
//     if(e.target.innertext === "btn") {
//         const title = e.target.parentNode.children[0].innertext
//         const id = e.target.parentNode.id
//         YourCart.push({
//             title: title,
//             id: id
//         })
//         console.log(YourCart)
//     }
// })




