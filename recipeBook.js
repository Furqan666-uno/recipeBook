const api_key = '9f79176eb6314fefa9d0f08d685cda60';
const recipeList= document.querySelector('#recipe-list');

function displayRecipes(recipes)
{
    recipeList.innerHTML='';
    recipes.forEach((recipe) => {
        //creating a main list tag, within which we will have img, h2, p, and a tags 
        const recipeItem= document.createElement('li');//recipeItem is not a list tag
        recipeItem.classList.add('recipe-item');//list tag given class here


        //now creating img tag to insert img in list
        recipeImage= document.createElement('img');// img tag created inside list
        recipeImage.src= recipe.image;// img src is given from fetched data
        recipeImage.alt= 'recipe-image';
        

        //creating a h2 tag for the list
        const recipeTitle= document.createElement('h2');// h2 tag is created
        recipeTitle.innerText= recipe.title


        //creating a p tag for the list
        const recipeIngredient= document.createElement('p');
        recipeIngredient.innerText= `
            <strong> Ingredients: </strong> ${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(', ')};
        `//since ligredients are in array, that is why we need to get all of the ingredients and join them with a comma using join(', ')


        //creating an a tag for the list 
        const recipeLink= document.createElement('a');
        recipeLink.href= recipe.sourceUrl;
        recipeLink.innerText= 'View Recipe';

        
        //finally appending the img, h2, p, and a tag into the main list tag 
        recipeItem.appendChild(recipeImage);// img is added to the list tag we created
        recipeItem.appendChild(recipeTitle);// title is also added to the list 
        recipeItem.appendChild(recipeIngredient);// ingredients are added to list tag
        recipeItem.appendChild(recipeLink);
        recipeList.appendChild(recipeItem);
    })
}

async function getRecipes() 
{
    try 
    {
        const response= await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${api_key}`);
        
        // Check if the response was successful
        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); 
        
        // Check if 'recipes' field exists in the response
        if (!data.recipes) 
        {
            throw new Error('No recipes found in the response');
        }

        return data.recipes; // This should return the recipes array
    } 
    catch (error) 
    {
        console.error('Error fetching recipes:', error);
    }
}

async function init() 
{
    const recipes= await getRecipes();
    displayRecipes(recipes);
}

init();
