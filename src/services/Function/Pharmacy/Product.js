/**
	 * The function `handleMedicineNameChange` updates the drug details based on the selected medicine
	 * option.
	 * @param selectedOption - The `handleMedicineNameChange` function takes in a `selectedOption`
	 * parameter, which is an object containing information about a medicine. The function then sets the
	 * `DrugDetails` state with various properties extracted from the `selectedOption` object.
	 */
export const handleMedicineNameChange = (selectedOption ,setter) => {
    console.log(selectedOption);
    setter({
        name: selectedOption?.name,
        medicine_group: selectedOption?.medicine_group,
        total_stock: 1,
        discount: "",
        nhis: "N/A",
        expiry_date: "",
        manufacturer: selectedOption?.manufacturer,
        selling_price: "",
        price: "",
        description: selectedOption?.description,
        image: selectedOption?.image,
        level: selectedOption?.level,
        dosage: selectedOption?.dosage,
        ndc: selectedOption?.ndc,
        purpose: selectedOption?.purpose_of_drug,
        upc: selectedOption?.upc,
        unii: selectedOption?.unii,
        administration_instructions: selectedOption?.administration_instructions,
        active_ingredient: selectedOption?.active_ingredients,
    });
};

/**
 * The function `handleNonDrugChange` is used to handle changes in non-drug related form inputs and
 * update the state accordingly.
 * @param e - The parameter `e` in the `handleNonDrugChange` function is an event object that is
 * passed to the function when an event (such as a change event) is triggered. It contains information
 * about the event that occurred, such as the target element that triggered the event and the type of
 * event
 */
export const handleNonDrugChange = (e, setter, val) => {
	e.preventDefault();
	const name = e.target.name;
	const value =
		e.target.type === "checkbox"
			? (e.target.value = e.target.checked
					? e.target.name.toUpperCase()
					: "N/A")
			: e.target.type === "file"
			? e.target.files[0]
			: e.target.value;
	setter({ ...val, [name]: value });
};


