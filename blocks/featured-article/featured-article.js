export default async function decorate(block) {
	const fragment = new DocumentFragment();
	[...block.children].forEach((row) => {
		const rowElem = document.createElement("div");
		rowElem.className = "featured-article--item";
		[...row.children].forEach((col, index) => {
			if (index === 0) {
				const imageWrapper = document.createElement("div");
				imageWrapper.className = "featured-article--image";
				const picture = col.querySelector("picture");
				if (picture) {
					imageWrapper.appendChild(picture);
				}
				rowElem.appendChild(imageWrapper);
			} else {
				col.className = "featured-article--content";
				rowElem.appendChild(col);
			}
		});
		fragment.appendChild(rowElem);
	});
	block.innerHTML = "";
	block.appendChild(fragment);
}
