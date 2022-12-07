
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
// import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";

const Dashboard = () => {
    // useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { products, isLoading, isError, message } = useSelector(
        (state) => state.productReducer
    );


    useEffect(() => {
        if (isLoggedIn === false) {
            dispatch(getProducts());
        }

        console.log(products)
        if (isError) {
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch]);

    console.log(products)

    return (
        <>
            <ProductSummary products={products} />
            <ProductList products={products} isLoading={isLoading} />
        </>
    );
};

export default Dashboard;