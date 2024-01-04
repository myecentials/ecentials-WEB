import React from "react";
import { Route,Routes ,Navigate} from "react-router-dom";
import Staff from "../../../pages/Pharmacy/HRM/Staff";
import StaffDetails from "../../../pages/Pharmacy/HRM/StaffDetails";
import EditProfile from "../../../pages/Pharmacy/HRM/EditProfile";
import AddNewStaff from "../../../pages/Pharmacy/HRM/AddNewStaff";
import OrgChart from "../../../pages/Pharmacy/HRM/OrgChart";
const HrmRoutes = () => {


	return (
		<Routes>
			<Route path="staff" element={<Staff />} />
			<Route path="staff/:name" element={<StaffDetails />} />
			<Route path="staff/:name/edit" element={<EditProfile />} />
			<Route path="staff/add-new-staff" element={<AddNewStaff />} />
			<Route path="org-chart" element={<OrgChart />} />
			<Route path="*" element={<Navigate to="/error" />} />
			
		</Routes>
	);
};

export default HrmRoutes;
