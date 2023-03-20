// linkk to api https://www.thecocktaildb.com/api/json/v1/1/search.php?s=
// name of drink... strDrink
// instructions of drink... strInstructions
// image of drink... strDrinkThumb

const inputVal = document.querySelector('input')
const nameVal = document.querySelector('.nameEl')
const instructionsVal = document.querySelector('h3')
const imgVal = document.querySelector('img')
const errorVal = document.querySelector('.errorMsg')
const numOfDrinks = document.querySelector('h4')
const numOfDrinksVal = document.querySelector('span')
const showAll = document.querySelector('.showAll')
const listOfDrinks = document.querySelector('ul')
let arrOfDrinks = []

document.querySelector('.getCocktail').addEventListener('click', getDrink)
document.querySelector('.showAll').addEventListener('click', showDrinkList)


function getDrink(){
    const drinkName = inputVal.value
    if( inputVal.value === ''){
        return
    }
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
        .then( res => res.json())
        .then( data => {
            const drinks = data.drinks
            if ( drinks === null ){
                errorVal.innerHTML = `${drinkName} is not a cocktail`
                return
            }
            nameVal.innerHTML = drinks[0].strDrink
            instructionsVal.innerHTML = drinks[0].strInstructions
            imgVal.src = drinks[0].strDrinkThumb
            numOfDrinks.innerHTML = 'Number of cocktails found:'
            numOfDrinksVal.innerText = `${drinks.length}`
            showAll.classList.remove('hidden')
            listOfDrinks.innerHTML = ''
            listOfDrinks.classList.add('hidden')
            arrOfDrinks = []
            data.drinks.forEach( drink => {
                const drinkName = `${drink.strDrink}`
                const node = document.createElement("li");
                const textnode = document.createTextNode(`${drinkName}`);
                node.appendChild(textnode);
                document.querySelector("ul").appendChild(node);
                arrOfDrinks.push(drink)})
        })
        .catch( err => console.log(`error is: ${err}`))
}
function showDrinkList(){
    listOfDrinks.classList.remove('hidden')
    document.querySelectorAll('li').forEach( x => x.addEventListener('click', getNewDrink))
}
function getNewDrink() {
    arrOfDrinks.forEach( drink => {
        if( drink.strDrink === this.textContent){
            nameVal.innerHTML = drink.strDrink
            instructionsVal.innerHTML = drink.strInstructions
            imgVal.src = drink.strDrinkThumb
        }
    })

}


