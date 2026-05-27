// main.js

// CONSTANTS
const RECIPE_URLS = [
    'https://adarsh249.github.io/Lab8-Starter/recipes/1_50-thanksgiving-side-dishes.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/3_moms-cornbread-stuffing.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/6_one-pot-thanksgiving-dinner.json',
];

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
async function init() {
    // initialize ServiceWorker
    initializeServiceWorker();
    // Get the recipes from localStorage
    let recipes;
    try {
        recipes = await getRecipes();
    } catch (err) {
        console.error(err);
    }
    // Add each recipe to the <main> element
    addRecipesToDocument(recipes);
}

/**
 * Detects if there's a service worker, then loads it and begins the process
 * of installing it and getting it running
 */
function initializeServiceWorker() {
    // EXPLORE - START (All explore numbers start with B)
    /*******************/
    // ServiceWorkers have many uses, the most common of which is to manage
    // local caches, intercept network requests, and conditionally serve from
    // those local caches. This increases performance since users aren't
    // re-downloading the same resources every single page visit. This also allows
    // websites to have some (if not all) functionality offline! I highly
    // recommend reading up on ServiceWorkers on MDN before continuing.
    /*******************/
    // We first must register our ServiceWorker here before any of the code in
    // sw.js is executed.
    // B1. TODO - Check if 'serviceWorker' is supported in the current browser
    // B2. TODO - Listen for the 'load' event on the window object.
    // Steps B3-B6 will be *inside* the event listener's function created in B2
    // B3. TODO - Register './sw.js' as a service worker (The MDN article
    //            "Using Service Workers" will help you here)
    // B4. TODO - Once the service worker has been successfully registered, console
    //            log that it was successful.
    // B5. TODO - In the event that the service worker registration fails, console
    //            log that it has failed.
    // STEPS B6 ONWARDS WILL BE IN /sw.js

    // B1: Check if serviceWorker is supported
    if ('serviceWorker' in navigator) {
        // B2: Listen for the 'load' event on window
        window.addEventListener('load', async () => {
            try {
                // B3: Register './sw.js' as a service worker
                const registration = await navigator.serviceWorker.register('./sw.js');
                // B4: Log successful registration
                console.log('Service Worker registered successfully:', registration);
            } catch (err) {
                // B5: Log failed registration
                console.error('Service Worker registration failed:', err);
            }
        });
    }
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage, network requests are made to all
 * of the URLs in RECIPE_URLs, an array is made from those recipes, that
 * array is saved to localStorage, and then the array is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
async function getRecipes() {
    // EXPOSE - START (All expose numbers start with A)
    // A1. TODO - Check local storage to see if there are any recipes.
    //            If there are recipes, return them.
    
    // Check if recipes exist in localStorage
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        // Return parsed recipes from localStorage
        return JSON.parse(storedRecipes);
    }

    /**************************/
    // The rest of this method will be concerned with requesting the recipes
    // from the network
    // A2. TODO - Create an empty array to hold the recipes that you will fetch
    // A3. TODO - Return a new Promise. If you are unfamiliar with promises, MDN
    //            has a great article on them. A promise takes one parameter - A
    //            function (we call these callback functions). That function will
    //            take two parameters - resolve, and reject. These are functions
    //            you can call to either resolve the Promise or Reject it.
    /**************************/

    // A2: Create empty array for recipes
    let recipes = [];

    // A3: Return a new Promise
    return new Promise(async (resolve, reject) => {
        // A4-A11 will be inside this Promise callback
        
        // A4: Loop through each URL in RECIPE_URLS
        for (let i = 0; i < RECIPE_URLS.length; i++) {
            try {
                // A5: Create try/catch block
                // A6: Fetch the URL (using await since we're in async function)
                const response = await fetch(RECIPE_URLS[i]);
                
                // A7: Get JSON from response
                const recipeData = await response.json();
                
                // A8: Add recipe to the recipes array
                recipes.push(recipeData);
                
                // A9: Check if all recipes have been retrieved
                if (recipes.length === RECIPE_URLS.length) {
                    // Save to localStorage using provided function
                    saveRecipesToStorage(recipes);
                    // Resolve the Promise with the recipes array
                    resolve(recipes);
                }
            } catch (err) {
                // A10: Log any errors from catch
                console.error('Error fetching recipe:', err);
                // A11: Pass any errors to reject
                reject(err);
            }
        }
    });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
    if (!recipes) return;
    let main = document.querySelector('main');
    recipes.forEach((recipe) => {
        let recipeCard = document.createElement('recipe-card');
        recipeCard.data = recipe;
        main.append(recipeCard);
    });
}