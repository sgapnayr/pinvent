import '../Product.css'
import { AiOutlineShoppingCart, AiOutlineDollarCircle, AiOutlineConsoleSql } from 'react-icons/ai'

function ProductSummary({ products }) {
    let TotalProducts = [products.map(product => product.Quantity)]
    let TotalValueArr = [products.map(product => product.Price * product.Quantity)]

    return (
        <div div className='ProductSummary' >
            <div className="ProductSquare">
                <div className="ProductSquareIcon">
                    <AiOutlineShoppingCart />
                </div>
                <div className="ProductSquareWrapper">
                    <div className="ProductSquareDesc">
                        Total Products (Including quantity)
                    </div>
                    <div className="ProductSquareData">
                        {TotalProducts[0].reduce((a, b) => a + b, 0).toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="ProductSquare Red">
                <div className="ProductSquareIcon">
                    <AiOutlineShoppingCart />
                </div>
                <div className="ProductSquareWrapper">
                    <div className="ProductSquareDesc">
                        Purchase Price of Inventory
                    </div>
                    <div className="ProductSquareData">
                        need to add cost
                    </div>
                </div>
            </div>

            <div className="ProductSquare Green">
                <div className="ProductSquareIcon">
                    <AiOutlineDollarCircle />
                </div>
                <div className="ProductSquareWrapper">
                    <div className="ProductSquareDesc">
                        Total Inventory Value
                    </div>
                    <div className="ProductSquareData">
                        ~${TotalValueArr[0].reduce((a, b) => a + b, 0).toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="ProductSquare Blue">
                <div className="ProductSquareIcon">
                    <AiOutlineDollarCircle />
                </div>
                <div className="ProductSquareWrapper">
                    <div className="ProductSquareDesc">
                        Total Value
                    </div>
                    <div className="ProductSquareData">
                        ~${TotalValueArr[0].reduce((a, b) => a + b, 0).toLocaleString()}
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ProductSummary