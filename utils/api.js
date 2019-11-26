export const fetchImages = async count => {
	const response = await fetch(`http://api.unsplash.com/search/photos?query=food&per_page=${count}&client_id=84cbd8c1744df3175bbc06b8f12f754f01154e37a3cfaca2389ca6b7fb654bbc`);
	// const response = await fetch('http://unsplash.it/list');
	const jsonResponse = await response.json();
	const images = jsonResponse.results;

	return images;
};

// export const getImageFromId = id =>
// 	`http://api.unsplash.com/photos/${id}?client_id=84cbd8c1744df3175bbc06b8f12f754f01154e37a3cfaca2389ca6b7fb654bbc`

export const fetchIpsum = async count => {
	const response = await fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${count}&start-with-lorem=1`);
	const jsonResponse = await response.json();
	return jsonResponse[0];
};