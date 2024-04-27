import React from "react";
import { Route,Routes ,Navigate} from "react-router-dom";
import ProductApprovals from "../../../pages/Pharmacy/ProductApprovals/ProductApprovals";

const HrmRoutes = () => {


	return (
		<Routes>
			<Route path="" element={<ProductApprovals />} />
			
			<Route path="*" element={<Navigate to="/error" />} />
			
		</Routes>
	);
};

export default HrmRoutes;
