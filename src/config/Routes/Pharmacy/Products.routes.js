import React from "react";
import { Route, Routes ,Navigate} from "react-router-dom";
import Products from "../../../pages/Pharmacy/Products/Products";
import AddCategory from "../../../pages/Pharmacy/Products/AddCategory";
import AddProducts from "../../../pages/Pharmacy/Products/AddProducts";
import Category from "../../../pages/Pharmacy/Products/Category";
import EditProduct from "../../../pages/Pharmacy/Products/EditProduct";
import MassUpload from "../../../pages/Pharmacy/Products/MassUpload";
import ProductDetails from "../../../pages/Pharmacy/Products/ProductDetails";
import MassUploadDetail from "../../../pages/Pharmacy/Products/MassUploadDetail";
import BarcodeScan from "../../../pages/Pharmacy/Products/BarcodeScan";
const ProductsRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Products />} />
			<Route path="/mass-upload" element={<MassUpload />} />
			<Route
				path="/mass-upload-details"
				element={<MassUploadDetail />}
			/>
			<Route path="/category" element={<Category />} />
			<Route path="/add-categories" element={<AddCategory />} />
			<Route path="/add-products" element={<AddProducts />} />
			<Route path="/:slug" element={<ProductDetails />} />
			<Route path="/edit-product" element={<EditProduct />} />
			<Route path="/barcode-scan" element={<BarcodeScan />} />
            <Route path="*" element={<Navigate to="/error" />} />

		</Routes>
	);
};

export default ProductsRoutes;
