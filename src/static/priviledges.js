const vHRM = "hrms";
const vCUSTOMERS = "customers";
const vSALES = "sales";
const vPRODUCTS = "products";
const vDELIVERIES = "delivery";
const vMANUFACTURERS = "manufacturers";
const vRETURNS = "returns";
const vORDERS = "orders";
const vREPORTS = "reports";
const vINVOICES = "invoices";
const vSETTINGS = "settings";
const vDASHBOARD = "dashboard";

/**
 * The `PRIVILEDGESWLABELS` constant is an array of objects that represent different privileges
 * in a system. Each object in the array has two properties: `label` and `value`. The `label`
 * property represents the human-readable name of the privilege, while the `value` property
 * represents the corresponding value associated with that privilege.
 */
export const PRIVILEDGESWLABELS = [
	{
		label: "HRM",
		value: vHRM,
	},
	{
		label: "Customers",
		value: vCUSTOMERS,
	},
	{
		label: "Sales/Payment",
		value: vSALES,
	},
	{
		label: "Products",
		value: vPRODUCTS,
	},
	// {
	// 	label: "Delivery",
	// 	value: vDELIVERIES,
	// },
	{
		label: "Manufacturer",
		value: vMANUFACTURERS,
	},
	{
		label: "Return",
		value: vRETURNS,
	},
	{
		label: "Orders",
		value: vORDERS,
	},
	{
		label: "Report",
		value: vREPORTS,
	},
	{
		label: "Invoice",
		value: vINVOICES,
	},
];

/**
 *  The `PRIVILEDGES` constant is an object that maps specific privileges to their corresponding
 * values. Each key in the object represents a privilege, such as "hrm", "customers", "sales",
 * etc., and the value associated with each key is the constant defined earlier in the code
 * (e.g., `vHRM`, `vCUSTOMERS`, `vSALES`, etc.).
 */
export const PRIVILEDGES = {
	hrm: vHRM,
	customers: vCUSTOMERS,
	sales: vSALES,
	products: vPRODUCTS,
	wholesaler: vMANUFACTURERS,
	returns: vRETURNS,
	orders: vORDERS,
	reports: vREPORTS,
	invoices: vINVOICES,
	delivery: vDELIVERIES,
    settings: vSETTINGS,
    dashboard: vDASHBOARD
};
