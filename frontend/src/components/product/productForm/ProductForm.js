import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ProductForm.css'
import { AiOutlineFolderAdd } from 'react-icons/ai'

const ProductForm = ({
    product,
    productImage,
    imagePreview,
    description,
    setDescription,
    handleInputChange,
    handleImageChange,
    saveProduct
}) => {
    return (
        <>
            <form onSubmit={saveProduct}>
                <div className="PreviewImage">
                    <h5>Image</h5>
                    <input className='ImageInput' type="file" name="image" onChange={e => handleImageChange(e)} />

                    {imagePreview != null ? (
                        <div className="Image">
                            <img src={imagePreview} alt="..." />
                        </div>
                    ) : ''}

                    <h5 className='FormDesc'>Product Name</h5>
                    <input placeholder='Item Name...' type="text" value={product.name} name="name" onChange={handleInputChange} />
                    <h5 className='FormDesc'>Category</h5>
                    <input placeholder='Item Category...' type="text" value={product.category} name="category" onChange={handleInputChange} />
                    <h5 className='FormDesc'>Price</h5>
                    <input placeholder='12000 (Dont include , or $)' type="text" value={product.price} name="price" onChange={handleInputChange} />
                    <h5 className='FormDesc'>Quantity</h5>
                    <input placeholder='3' type="text" value={product.quantity} name="quantity" onChange={handleInputChange} />
                    <h5 className='FormDesc'>Description</h5>
                    <ReactQuill theme="snow" value={description} className='Quill' onChange={setDescription} modules={ProductForm.modules} formats={ProductForm.formats} />
                    <button className='RegisterButton LoginButton ProductButton' type="submit"><AiOutlineFolderAdd className="LoginIcon" /> Add Product</button>

                </div>
            </form >
        </>
    )
}

ProductForm.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["clean"],
    ],
};
ProductForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
];


export default ProductForm