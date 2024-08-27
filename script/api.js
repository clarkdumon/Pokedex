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
async function searchPokemon(searchValue) {
    searchValue = searchValue.toLowerCase();
    //Checks if search value is not null or empty // used ternary operator
    searchValue = searchValue != null ? searchValue : "";

    let getList = await apiFetcher(POKEAPI, "searchPokemon");
    let pokeNames = getList.results.map((res) => res.name);
    // console.log(pokeNames);

    let pokemonDetails = (pokeNames)=>{
        console.log(pokeNames)
        let pokeDex = [];
        pokeNames.forEach( pokemon => {
            pokeDex.push(apiFetcher(POKEMONPATH+pokemon,"PokemonForEach"))
        });
        
        Promise.all(pokeDex).then(async result=>{
            const pokemon = result.map(data=>{
                let details = {
                    is_default: data.is_default,
                    name: data.name,
                    sprite:data.sprites.other["official-artwork"].front_default,
                    type: data.types.map(type=>type.type.name)
                };
                return details
            })
            return pokemon
        }).then(pokemon=>{
            let thedefault = pokemon.filter(data=>data.is_default)
            return thedefault
        }).then(pokemon=>{
            pokemon.forEach(name=>{
                if(name.name.includes(searchValue)){
                    console.log(name)
                }
            })
        })
        

    };pokemonDetails(pokeNames);
    
    // let  sss = pokeNames.forEach( async eachPokemon => {
    //     const data = await apiFetcher(POKEMONPATH+eachPokemon,"PokemonsForEach")
    //     console.log(data);
    //     return data
    // })//let pokemonDetails
    

   
    
}//async function getPokemon(searchValue)




searchPokemon('dori')
apiFetcher(POKEAPI,'test')


// let pokemons = pokeNames.filter(name=>{
//         if(name.includes(searchValue)){
//             return name;
//         }
//     })//let pokemons 
    
//     const pokeDex = await []
//     const pokeList = pokemons.forEach(async pokemon => {
//         const data = await apiFetcher(POKEMONPATH+pokemon,"PokemonsForEach")
//         console.log(data)
//         if(data.is_default){
//             const details ={

//                 name:data.name,
//                 sprite: data.sprites.other["official-artwork"].front_default,
//                 type:data.types.map(types=>{
//                     return types.type.name
//                 }),//type:data.types.map
//             }//const details
//             pokeDex.push(details) ;// details
//         }//ending-IF
        
//     });//const pokeList
//     console.log( pokeDex)