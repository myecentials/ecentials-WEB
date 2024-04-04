import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import PropTypes from 'prop-types';

/**
 * SkipTable Component
 * @param {Object} props - Component props
 * @param {Array} props.columns - An array of column objects defining the columns of the DataTable.
 * @param {React.Component} props.ExpandedComponent - The component to be rendered when a row is expanded.
 * @param {function} props.fetchItemApi - Function to fetch items from the API.
 * @param {Array} props.data - The array of data to be displayed in the DataTable.
 * @param {function} props.setData - Function to set the data in the component state.
 * @param {Array} props.filterData - The filtered array of data to be displayed.
 * @param {function} props.setFilterData - Function to set the filtered data in the component state.
 * @param {number} props.total - Total number of items.
 * @param {function} props.searchItemApi - Function to search items in the API.
 * @param {boolean} props.isLoading - Boolean indicating whether data is being loaded.
 * @param {number} props.limit - The limit of items to be displayed per page.
 * @param {function} props.setLimit - Function to set the limit of items per page.
 * @returns {JSX.Element} SkipTable component
 */
const SkipTable = ({
	columns,
	ExpandedComponent,
	fetchItemApi,
	data,
	setData,
	filterData,
	setFilterData,
	total,
	searchItemApi,
	isLoading,
	limit,
	setLimit,
	CustomLoader
}) => {
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

	const [searchText, setSearchText] = useState("");
	const [sload, setSLoad] = useState(true);
	const [load, setLoad] = useState(false);
	const [skip, setSkip] = useState(0);
	const [cSkip, setCSkip] = useState(0);

	useEffect(() => {
		console.log("Fetching", skip, limit);
	}, [skip, limit]);

	useEffect(() => {
		console.log(data);
	}, [data]);

	/**
	 * The `handleNext` function in a JavaScript React component fetches new data or extracts elements from
	 * an existing array based on the current skip and limit values.
	 */
	const handleNext = () => {
		if (skip === cSkip) {
			const newSkip = skip + limit; //  then fetch
			fetchItemApi(newSkip, limit);
			setSkip(newSkip);
			setCSkip(newSkip);
		} else {
			const newSkip = cSkip + limit; // after slice the existing array
			const extractedElements = data.slice(newSkip, newSkip + limit + 1);
			setFilterData(extractedElements);
			console.log("Show array from", newSkip);
			console.log("to", newSkip + limit);
			setCSkip(newSkip);
		}
	};

	/**
	 * The `handleNewLimit` function sets a new limit for data display, resets skip values, clears
	 * existing data, fetches new data, extracts elements based on the new limit, and updates the filtered
	 * data state.
	 */
	const handleNewLimit = (val) => {
		setLimit(val);
		setCSkip(0);
		setSkip(0);
		setData([]);
		fetchItemApi(0, val);
		const extractedElements = data.slice(0, val);
		setFilterData(extractedElements);
	};

	/**
	 * The `handlePrevious` function in JavaScript React updates the displayed array by moving back to the
	 * previous set of elements based on the specified limit.
	 */
	const handlePrevious = () => {
		const newSkip = cSkip - limit;
		console.log("Show array from", newSkip);
		console.log("to", newSkip + limit);
		const extractedElements = data.slice(newSkip, newSkip + limit);
		setFilterData(extractedElements);
		setCSkip(newSkip);
	};

	/**
	 * The `handleFilter` function checks if the input value is empty and updates state variables
	 * accordingly, or sets the search text and triggers a search function if the input is not empty.
	 */
	const handleFilter = (event) => {
		if (event.target.value === "") {
			console.log("Empty oo, do something");
			setSLoad(true);
			setLoad(false);
			setCSkip(0);
			const extractedElements = data.slice(0, limit);
			setFilterData(extractedElements);
		} else {
			setSLoad(false);
			setLoad(true);
			setSearchText(event.target.value);
		}
	};

	return (
		<div className="mx-3 card  border-0">
			<div className="d-flex justify-content-between ms-bg py-2 gy-md-0 gy-2 ">
				<div className="d-flex ">
					<input
						type="search"
						className="form-control border-0 rounded-pill  w-50 mx-4"
						placeholder="Search..."
						name="search"
						onChange={handleFilter}
					/>

					<button
						className="btn w-10 rounded-2 bg-light text-secondary"
						onClick={() => searchItemApi(searchText)}
						disabled={sload}>
						Search
					</button>
				</div>
			</div>

			<div className="table-responsive">
				{isTabletOrMobile ? (
					<DataTable
						columns={columns}
						data={filterData}
						customStyles={customStyles}
						striped
						pagination={load}
						progressPending={isLoading}
						progressComponent={CustomLoader }
						expandableRows
						expandableRowsComponent={ExpandedComponent}
					/>
				) : (
					<DataTable
						columns={columns}
						data={filterData}
						customStyles={customStyles}
						striped
						pagination={load}
						progressPending={isLoading}
						progressComponent={CustomLoader }
					/>
				)}
			</div>
			{/* )} */}
			<div className="d-md-flex justify-content-end  align-items-center mx-4 mb-5 mt-4">
				{data?.length === 0 || load ? (
					""
				) : (
					<>
						<div>
							<label htmlFor="selectOptions">Select Options:</label>
							<select
								id="selectOptions"
								value={limit}
								onChange={(e) => handleNewLimit(parseInt(e.target.value, 10))}>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
								<option value="30">30</option>
							</select>
						</div>
						<p className="small text-center my-2 mx-4">
							{`${cSkip + 1} - ${cSkip + limit} of ${total}`}
						</p>
						<button
							className=" border-0 mx-2"
							onClick={handlePrevious}
							disabled={cSkip === 0}>
							<FiArrowLeftCircle
								size={30}
								className={` bg-white ${cSkip === 0 ? "" : "text-deep"} `}
							/>
						</button>
						<button
							className="  border-0 mx-2"
							onClick={handleNext}
							disabled={total - cSkip <= limit}>
							<FiArrowRightCircle
								size={30}
								className={`bg-white ${
									total - cSkip <= limit ? "" : "text-deep"
								}`}
							/>{" "}
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default SkipTable;

SkipTable.propTypes = {
    columns: PropTypes.array.isRequired,
    ExpandedComponent: PropTypes.elementType.isRequired,
    fetchItemApi: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    setData: PropTypes.func.isRequired,
    filterData: PropTypes.array.isRequired,
    setFilterData: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    searchItemApi: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    limit: PropTypes.number.isRequired,
    setLimit: PropTypes.func.isRequired,
};

/**
 *  This is the styling for the Datatable
 */
const customStyles = {
	headRow: {
		style: {
			backgroundColor: "#4D44B5",
			color: "white",
			fontSize: "18px",
			fontWeight: 800,
		},
	},
	cells: {
		style: {
			fontSize: "16px",
			fontWeight: 500,
		},
	},
};
