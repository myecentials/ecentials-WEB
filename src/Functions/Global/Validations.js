 /**
 * The function `ValidateObject` checks for missing keys in an object and sets them in a
 * provided array if any are found.
 * @param obj - The `obj` parameter in the `ValidateObject` function is an object that you want
 * to validate for missing keys.
 * @param setMissingObjects - The `setMissingObjects` parameter is a function that is used to
 * handle the missing keys found in the object during validation. It takes an array of missing
 * keys as an argument and performs some action, such as displaying an error message or updating
 * the UI to indicate the missing keys.
 * @returns The function `ValidateObject` returns a boolean value - `true` if there are missing
 * keys in the object `obj`, and `false` if all keys are present.
 */
 export const ValidateObject = (obj, setMissingObjects) => {
	const missingKeys = Object.keys(obj).filter((key) => !obj[key]);
	if (missingKeys?.length === 0) {
		return false;
	} else {
		setMissingObjects(missingKeys);
		return true;
	}
};
