const onChangeListener = (event) => {
	event.target.classList.remove("error");
};

const createFormElement = (row) => {
	if (!row?.children || ![...row.children].length) {
		return null;
	}
	const [typeEl, idEl, placeholderEl] = [...row.children];
	const id = idEl.textContent;
	const type = typeEl.textContent;
	const placeholder = placeholderEl.innerHTML;
	switch (type) {
		case "text":
		case "email":
			const text = document.createElement("input");
			text.id = id;
			text.type = type;
			text.placeholder = placeholder;
			text.addEventListener("change", onChangeListener);
			return text;
		case "textarea":
			const textarea = document.createElement("textarea");
			textarea.id = id;
			textarea.placeholder = placeholder;
			textarea.addEventListener("change", onChangeListener);
			return textarea;
		case "dropdown":
			const dropdown = document.createElement("select");
			placeholder.split(",").forEach((label, index) => {
				const option = document.createElement("option");
				option.value = label;
				option.innerHTML = label;
				if (index === 0) {
					option.value = "";
				}
				dropdown.appendChild(option);
			});
			dropdown.id = id;
			dropdown.addEventListener("change", onChangeListener);
			return dropdown;
		case "checkbox":
			const span = document.createElement("span");
			const label = document.createElement("label");
			const checkbox = document.createElement("input");
			label.htmlFor = id;
			span.innerHTML = placeholder;
			checkbox.id = id;
			checkbox.checked = false;
			checkbox.type = "checkbox";
			label.appendChild(checkbox);
			label.appendChild(span);
			return label;
		case "dropdown":
			return null;
		default:
			return null;
	}
};

const onFormSubmit = (event) => {
	event.preventDefault();
	let error = false;
	const name = event.target.querySelector("#name");
	const email = event.target.querySelector("#email");
	const interests = event.target.querySelector("#interests");
	if (!name.value || !name.value.trim()) {
		error = true;
		name.className = "error";
	}
	if (!email.value || !email.value.trim()) {
		error = true;
		email.className = "error";
	}
	if (!interests.value || !interests.value.trim()) {
		error = true;
		interests.className = "error";
	}
	if (!error) {
		const payload = {
			data: {
				name: name.value.trim(),
				email: email.value.trim(),
				interests: interests.value.trim(),
			},
		};
		const loader = document.querySelector("#loader-wrapper");
		loader?.classList.add("show");
		fetch("/email-form", {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (
					(response.status === 200 || response.status === 201) &&
					response.ok
				) {
					name.value = "";
					email.value = "";
					interests.value = "";
				}
			})
			.finally(() => {
				loader?.classList.remove("show");
			});
	}
};

export default async function decorate(block) {
	const documentFragment = new DocumentFragment();
	const loaderWrapper = document.createElement("div");
	loaderWrapper.className = "loader-wrapper";
	loaderWrapper.id = "loader-wrapper";
	const loader = document.createElement("div");
	loader.className = "loader";
	loader.id = "loader";
	loaderWrapper.appendChild(loader);
	const form = document.createElement("form");
	form.addEventListener("submit", onFormSubmit);
	documentFragment.appendChild(form);
	documentFragment.appendChild(loaderWrapper);
	[...block.children].forEach((row) => {
		const div = document.createElement("div");
		div.className = "form-element";
		const rowElement = createFormElement(row);
		div.appendChild(rowElement);
		form.appendChild(div);
	});
	const submitButton = document.createElement("button");
	submitButton.type = "submit";
	submitButton.innerHTML = "Submit";
	form.appendChild(submitButton);
	block.innerHTML = "";
	block.appendChild(documentFragment);
}
