"use strict"
//https://pokeapi.co/

// Pokeapi Link
const POKEAPI ="https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
const POKEMONPATH="https://pokeapi.co/api/v2/pokemon/"

//Using this method to ensure Fetches will be properly checked if theres an error
async function apiFetcher(url,funcName) {
    try { 
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Func:" +funcName +" | Network response was not ok " +response.statusText);
		}
		const data = await response.json();
		return data;
	}
    catch (error) {
		console.error("Func:" +funcName +" | There has been a problem with your fetch operation:",error);
	}
}


//This is to check 
async function getPokemon(searchValue){
    searchValue = searchValue.toLowerCase()
    //Checks if search value is not null or empty // used ternary operator
    searchValue = searchValue!=null?searchValue:'';
   

    let data = await  apiFetcher(POKEAPI,'getPokemon')
    let pokeNames =    data.results.map(res=>res.name)
    let pokemons = pokeNames.filter(name=>{
        if(name.includes(searchValue)){
            return name;
        }
    })
    
    const pokeDex = pokemons.forEach(async pokemon => {
        const data = await apiFetcher(POKEMONPATH+pokemon,"PokemonsForEach")
        const details =
        if(data.is_default){
            const details ={
                name:data.name,
            }
            
        }
        return details
    });
    
    
    
}

getPokemon('saur')
apiFetcher(POKEAPI,'test')


