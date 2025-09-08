const CategoryContainer = document.getElementById("CategoryContainer");
const plantsByCategory = document.getElementById("main-card");
const YourCartContainer = document.getElementById("YourCartContainer");
const myModal = document.getElementById("my_modal_5")
const loading = document.getElementById("loading")
let YourCart = [];


const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
      const categories = data.categories;

     
      CategoryContainer.innerHTML += `
        <li id="all" class="hover:bg-green-200 rounded-xl cursor-pointer px-2 py-1 bg-green-200">All Trees</li>
      `;

      categories.forEach(cat => {
        CategoryContainer.innerHTML += `
          <li id="${cat.id}" class="hover:bg-green-200 rounded-xl cursor-pointer px-2 py-1">${cat.category_name}</li>`;
      });

      attachCategoryClickEvent();
    });
};

const attachCategoryClickEvent = () => {
  CategoryContainer.addEventListener("click", (e) => {
    if (e.target.localName === "li") {
     
      document.querySelectorAll("#CategoryContainer li").forEach(li => li.classList.remove("bg-green-200"));

      
      e.target.classList.add("bg-green-200");

      const selectedId = e.target.id;
      if (selectedId === "all") {
        loadAllPlants();
      } else {
        loadPlantsByCategory(selectedId);
      }
    }
    loadingCatagory(true)
  });
};


const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => showPlantsByCategories(data.plants))
    .catch(err => console.error("Failed to load all plants:", err));
};


const loadPlantsByCategory = (categoryId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => showPlantsByCategories(data.plants)) 
    .catch(err => console.error("Failed to load category:", err));
};


const showPlantsByCategories = (plants) => {
  if (!Array.isArray(plants)) {
    plantsByCategory.innerHTML = "<p class='text-center text-gray-500'>No plants available in this category.</p>";
    return;
  }

  plantsByCategory.innerHTML = "";
loadingCatagory(false)
  plants.forEach(plant => {
    plantsByCategory.innerHTML += `
      <div class="bg-white p-4 rounded-lg shadow" data-id="${plant.id}" data-title="${plant.name}" data-price="${plant.price}">
        <div class=" rounded-lg mb-4  flex justify-center items-center">
          <img src="${plant.image}" alt="${plant.name}" class="h-40 w-full rounded-xl w-full object-cover rounded-lg" />
        </div>
        <h3 onclick="openMordel(${plant.id})" class="font-semibold">${plant.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${plant.description}</p>
        <div class="flex justify-between items-center">
          <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">${plant.category}</span>
          <span class="font-semibold">৳${plant.price}</span>
        </div>
        <button class="w-full mt-4 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 add-to-cart-btn">Add to Cart</button>
      </div>`;
  });
};


plantsByCategory.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const card = e.target.closest("div.bg-white");
    const title = card.getAttribute("data-title");
    const id = card.getAttribute("data-id");
    const price = parseFloat(card.getAttribute("data-price"));

    YourCart.push({ title, id, price });
    alert(`"${title}"has been added to your cart.`)
    updateCartUI();
  }
});

const updateCartUI = () => {
  YourCartContainer.innerHTML = "";
  let total = 0;

  YourCart.forEach((item, index) => {
    YourCartContainer.innerHTML += `
      <div class="flex justify-between bg-[#DCFCE7] rounded-xl items-center my-2 p-2 mb-2">
        <span>${item.title}</span>
        <span>৳${item.price}</span>
        <button onclick="removeFromCart(${index})" class="text-red-500 text-bold text-xl ml-2">×</button>
      </div>`;
    total += item.price;
  });

  YourCartContainer.innerHTML += `<hr class="my-2">
    <p class="font-semibold">Total: ৳${total.toFixed(2)}</p>`;
};

const removeFromCart = (index) => {
  YourCart.splice(index, 1);
  updateCartUI();
};
const openMordel = (id) => {
const modalContainer = document.getElementById("modalContainer")
modalContainer.innerHTML= ""
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    const div = document.createElement("div")
    div.innerHTML=`<h2 class="font-bold text-xl">${data.plants.name}</h2>
<div class="flex justify-center rounded-xl mb-5"><img class="h-[250px] object-cover rounded-xl w-full" src="${data.plants.image}" alt=""></div>
<h3 class="text-gray-600 mt-3 ">${data.plants.description}</h3>
<p class="inline-block bg-green-100 text-green-800 text-xs mt-2 px-2 py-1 rounded-full mb-2">${data.plants.category}</p>`
 modalContainer.appendChild(div)
  })
 
  myModal.showModal()
}
const loadingCatagory = (statas) => {
  console.log(loading)
  if(statas){
    loading.classList.remove("hidden")

  }
  else{
    loading.classList.add("hidden")
  }
}
// loadCategory(true);

loadCategory();
loadAllPlants();
