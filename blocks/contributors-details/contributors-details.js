export default async function decorate(block) {
	const fragment = new DocumentFragment();
	[...block.children].forEach((contributor) => {
		console.log("contributor :: ", contributor);
		const contributorElem = document.createElement("div");
		contributorElem.className = "contributor";
		const picture = contributor.querySelector("picture");
		const title = contributor.querySelector("h3");
		title.removeAttribute("id");
		const specialities = contributor.querySelector("h5");
		specialities.removeAttribute("id");
		const image = document.createElement("div");
		image.className = "image";
		image.appendChild(picture);
		const userTitle = document.createElement("div");
		userTitle.className = "title";
		userTitle.appendChild(title);
		const skills = document.createElement("div");
		skills.className = "skills";
		skills.appendChild(specialities);
		contributorElem.appendChild(image);
		contributorElem.appendChild(userTitle);
		contributorElem.appendChild(skills);
		fragment.appendChild(contributorElem);
	});
	block.innerHTML = "";
	block.appendChild(fragment);
}
