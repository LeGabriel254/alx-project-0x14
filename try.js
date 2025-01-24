const url = 'https://imdb236.p.rapidapi.com/imdb/tt7631058/cast';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'd2a4e29a6dmshf6d0ad4fabf23cep1209f8jsn44c766a4af76',
		'x-rapidapi-host': 'imdb236.p.rapidapi.com'
	}
};


async function trial(){
	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
	}
}
trial()