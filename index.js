document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  let burgers = []
  const burgerMenu = document.querySelector('#burger-menu')
  const orderList = document.querySelector('#order-list')
  const burgerForm = document.querySelector('#custom-burger')

  function mainEventListener(){
    document.addEventListener('click', function(e){
      if (e.target.id === 'add') {
        let burger = burgers.find(burger => {
          return burger.id == e.target.dataset.id
        })
        renderBurgerToOrder(burger)
      }
    })
  }

  function newBurgerForm(){
    burgerForm.addEventListener('submit', fetchBurgerForPostToOrder)
  }

  function fetchBurgerForPostToOrder(e){
    e.preventDefault()
    let name = document.querySelector('#burger-name').value
    let description = document.querySelector('#burger-description').value
    let img = document.querySelector('#burger-image')
    fetch('http://localhost:3000/burgers', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        description: description,
        image: img
      })
    })
    .then(response => response.json())
    .then(post =>{
      burger = post
      burgers.push(burger)
      renderBurgers(burgers)
    })

  }

  function renderBurgerToOrder(burger){
    orderList.innerHTML += `<li>${burger.name}</li>`
  }

  // const addBtn = document.querySelector('#add')
  // console.log(addBtn)

  function fetchBurgers(){
    fetch('http://localhost:3000/burgers')
    .then(response => response.json())
    .then(data => {
      burgers = data
      renderBurgers(burgers)
    })
  }
  function renderBurgers(burgers){
    burgers.forEach(burger => renderSingleBurger(burger))
  }
  function renderSingleBurger(burger){
    burgerMenu.innerHTML += `
    <div class="burger">
      <h3 class="burger_title">${burger.name}</h3>
        <img src=${burger.image}>
        <p class="burger_description">
          ${burger.description}
        </p>
        <button id="add" data-id="${burger.id}"class="button">Add to Order</button>
    </div>`
  }
  fetchBurgers()
  mainEventListener()
  newBurgerForm()
})
