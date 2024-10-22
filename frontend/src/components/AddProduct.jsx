import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  fetchSigleProduct,
  fetchSigleProductForEdit,
  updateProduct,
} from "../app/features/products/productSlice";
import categories from "../utils/category";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
export default function AddProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const [isEditMode, setisEditMode] = useState(false);
  const product = useSelector((state) => state.Product.product);
  console.log(product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setisEditMode(true);
      const fetchData = async () => {
        const res = await dispatch(fetchSigleProduct(id));
        reset(res.payload.product);
        console.log(res);
      };
      fetchData();
    }
  }, [id, dispatch, reset]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      if (data.category === "default") {
        return setError("root", {
          type: "manual",
          message: "Please select a valid category",
        });
      }
      const formData = new FormData();
      if (data.img && data.img.length > 0) {
        for (let i = 0; i < data.img.length; i++) {
          formData.append("img", data.img[i]);
        }
      } else if (isEditMode && product.image) {
        console.log("edition");
        // formData.append("img", product.image);
        for (let existingImage of product.image) {
          formData.append("img", JSON.stringify(existingImage)); // Adjust this line according to your existing image structure
        }
      }

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("sellingPrice", data.sellingPrice);
      formData.append("countInStock", data.countInStock);
      formData.append("category", data.category);
      console.log(formData);
      if (isEditMode) {
        console.log("edition is processing");
        console.log(data);
        console.log(formData);
        const res = await dispatch(
          updateProduct({ id, data: formData })
        ).unwrap();
        console.log(res);
        navigate(`/product/${id}`);
      } else {
        const res = await dispatch(createProduct(formData)).unwrap();
      }
      reset();
    } catch (err) {
      console.log(err);
    }
    // console.log(data);
  };

  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className=" w-[40%] sm:w-[30%] md:w-[20%] h-screen">
        <SideBar />
      </div>
      <form
        className="md:w-[60%] m-auto p-4 flex flex-col justify-center items-center bg-white "
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <h2 className="w-4/5 py-2 text-2xl font-semibold ">Add New Product</h2>

        <div className="w-4/5 py-2">
          <label htmlFor="img" className="py-4">
            Upload Image
          </label>
          <input
            type="file"
            id="img"
            multiple
            {...register("img", {
              required: !id
                ? { value: true, message: "Please upload images" }
                : false,
            })}
            className="w-full  mt-2 border-2 border-gray-200 p-1 rounded-md"
          />
          {errors.img && <p className="text-red-700">{errors.img.message}</p>}
        </div>
        <div className="w-4/5  mt-2 py-2">
          <label htmlFor="name">Enter Product Name</label>
          <input
            type="text"
            placeholder="Enter Product Name"
            className="w-full rounded-md mt-2 p-1 border-2 border-gray-200"
            id="name"
            {...register("name", {
              required: { value: true, message: "Enter Product Name" },
            })}
          />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}
        </div>
        <div className="w-4/5  mt-2">
          <label htmlFor="description">Enter Description</label>
          <textarea
            placeholder="Enter Description"
            id="description"
            className="w-full rounded-md p-1  mt-2 border-2 border-gray-200"
            rows={4}
            {...register("description", {
              required: { value: true, message: "Enter product Description" },
            })}
          />
          {errors.description && (
            <p className="text-red-700">{errors.description.message}</p>
          )}
        </div>
        <div className="  sm:flex gap-6 w-4/5  mt-2 py-2">
          <div className="sm:w-1/2">
            <div>
              <label htmlFor="price">Enter Product Price</label>
            </div>

            <input
              type="number"
              placeholder="Enter Product Price"
              id="price"
              className="w-full rounded-md   mt-2  p-1 border-2 border-gray-200"
              {...register("price", {
                required: { value: true, message: "Enter Product Price" },
              })}
            />
            {errors.price && (
              <p className="text-red-700">{errors.price.message}</p>
            )}
          </div>
          <div className="sm:w-1/2">
            <div>
              <label htmlFor="sellingPrice">Enter Selling Price</label>
            </div>
            <input
              type="number"
              placeholder="Enter Sellling Price"
              id="sellingPrice"
              className="w-full rounded-md   mt-2  p-1 border-2 border-gray-200"
              {...register("sellingPrice", {
                required: { value: true, message: "Enter Selling Price" },
              })}
            />
            {errors.sellingPrice && (
              <p className="text-red-700">{errors.sellingPrice.message}</p>
            )}
          </div>
          <div className="sm:w-1/2">
            <div>
              <label htmlFor="stock">Enter Product Stock Count</label>
            </div>

            <input
              type="number"
              placeholder="Enter Product Stock Count"
              id="stock"
              className="w-full rounded-md   mt-2  p-1 border-2 border-gray-200"
              {...register("countInStock", {
                required: { value: true, message: "Enter Product Stock Count" },
              })}
            />
            {errors.countInStock && (
              <p className="text-red-700">{errors.countInStock.message}</p>
            )}
          </div>
        </div>
        <div className="w-4/5 mt-2  py-2">
          <div>
            <label htmlFor="category">Enter Product Category</label>
          </div>

          <select
            id="category"
            className="w-full rounded-md   mt-2  p-1 border-2 border-gray-200"
            {...register("category", {
              required: { value: true, message: "Enter Product Category" },
            })}
            defaultValue="default"
          >
            {" "}
            <option value="default" disabled>
              Select Category
            </option>
            {categories.map((category, idx) => (
              <optgroup key={idx} label={category.name}>
                {category.subcategories.map((subCategory, idx) => (
                  <option key={idx} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          {errors.category && (
            <p className="text-red-700">{errors.category.message}</p>
          )}
        </div>
        <div>
          <p className="text-red-700 text-lg">
            {" "}
            {errors.root && errors.root.message}
          </p>
        </div>
        <div className="w-4/5 mt-4">
          <button
            disabled={isSubmitting}
            className={`bg-green-300 p-1 w-1/2 rounded-md hover:bg-blue-400 border-2 border-gray-200"`}
          >
            {isSubmitting
              ? "Submitting.."
              : isEditMode
              ? "Update Product"
              : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
