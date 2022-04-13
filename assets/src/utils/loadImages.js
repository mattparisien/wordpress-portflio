const loadImages = array => {
	const images = [];

	array.forEach(image => {
		const newImg = new Image();
		console.log(image);
		newImg.src = image;
		images.push(newImg);
	});

	console.log('images', images)
	return images;
};

export default loadImages;
