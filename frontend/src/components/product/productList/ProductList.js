import React from 'react'
import '../Product.css'

function ProductList({ products, isLoading }) {
    return (
        <div className='ProductTable'>
            {renderProductHeading()}

            {products.map(product => {
                return (
                    <div className="ProductList">
                        <div className="ProductListSKU">
                            {product.Sku.slice(0, 12)}
                        </div>
                        <div className="ProductListName">
                            {product.Name.toUpperCase()}
                        </div>
                        <div className="ProductListDesc">
                            {product.Category}
                        </div>
                        <div className="ProductListDesc">
                            ${parseInt(product.Price).toLocaleString()}
                        </div>
                        <div className="ProductListDesc">
                            {product.Quantity}
                        </div>
                        <div className="ProductListDesc">
                            <button>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )

    function renderProductHeading() {
        return (
            <>
                <div className="ProductHeader">
                    <div className="ProductDesc">
                        #
                    </div>
                    <div className="ProductName">
                        Name
                    </div>
                    <div className="ProductDesc">
                        Category
                    </div>
                    <div className="ProductDesc">
                        Price
                    </div>
                    <div className="ProductDesc">
                        Quantity
                    </div>
                    <div className="ProductDesc">
                    </div>
                </div>
            </>
        )
    }
}

export default ProductList