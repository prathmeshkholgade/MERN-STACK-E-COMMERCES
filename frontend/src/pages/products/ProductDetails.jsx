import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSigleProduct } from "../../app/features/products/productSlice";
import ReviewInput from "../../components/ReviewInput";
import ReviewCard from "../../components/ReviewCard";
import ProductCard from "../../components/ProductCard";
export default function ProductDetails() {
  const { id } = useParams();
  const { product, similarProducts } = useSelector((state) => state.Product);
  const reviews = useSelector((state) => state?.Product?.product?.reviews);
  const dispatch = useDispatch();
  const [currImg, setcurrImg] = useState(0);
  const imgContainerRef = useRef(null); // Ref for the image container
  const [isDragging, setIsDragging] = useState(false); // To track dragging state
  const [startX, setStartX] = useState(0); // Starting x position for drag
  const [scrollLeft, setScrollLeft] = useState(0); // Scroll position when drag starts

  const fetchProduct = async (id) => {
    try {
      await dispatch(fetchSigleProduct(id)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMouseDown = (e) => {
    const container = imgContainerRef.current;
    if (container) {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft); // Mouse x position relative to container
      setScrollLeft(container.scrollLeft); // Set the scroll position at start of drag
    }
  };

  // Mouse Move (during drag)
  const handleMouseMove = (e) => {
    if (!isDragging) return; // Only scroll if dragging
    const container = imgContainerRef.current;
    if (container) {
      e.preventDefault(); // Prevent text selection
      const x = e.pageX - container.offsetLeft; // Current x position
      const walk = (x - startX) * 2; // Distance scrolled (multiplied for faster scroll)
      container.scrollLeft = scrollLeft - walk; // Set the new scroll position
    }
  };

  // Mouse Up (end drag)
  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };
  useEffect(() => {
    fetchProduct(id);
  }, [id]);
  return product ? (
    <div className="mx-auto w-[90%]  h-full ">
      <div className="flex   h-[90vh] py-2    ">
        <div className="imgs   w-[40%]  ">
          <div className="p-1 w-full border-2 border-gray-200">
            <img
              src={product.image[currImg].url}
              alt={product.name}
              className="w-full object-center h-[450px] rounded-lg "
            />
          </div>
          <div
            ref={imgContainerRef} // Reference for the container
            className="flex gap-2 my-2  overflow-auto scrollbar-hide hover:scrollbar-show justify-center"
            onWheel={(e) => {
              imgContainerRef.current.scrollLeft += e.deltaY; // Horizontal scroll on mouse wheel
            }}
            onMouseDown={handleMouseDown} // Start dragging
            onMouseMove={handleMouseMove} // Dragging in progress
            onMouseUp={handleMouseUp} // End dragging
            onMouseLeave={handleMouseUp} // End drag if mouse leaves container
            style={{ cursor: isDragging ? "grabbing" : "grab" }} // Change cursor on drag
          >
            {product.image.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                className={`${
                  currImg === idx && "border-2 border-zinc-800"
                } w-24 h-24 rounded-lg`}
                onClick={() => setcurrImg(idx)}
              />
            ))}
          </div>
        </div>
        <div className="details flex flex-col py-4 px-8 w-[60%]    ">
          <div className=" flex flex-col p-2 min-h-[550px] ">
            <div className="product-info w-full flex-grow  ">
              <div className="py-4">
                <h2 className="text-3xl font-medium">{product.name}</h2>
                <p className="text-lg py-2">{product.description} </p>
              </div>
              <div className="flex gap-8 ">
                <p className="text-xl font-semibold">₹{product.sellingPrice}</p>
                <p className="line-through text-lg">₹{product.price}</p>
              </div>
            </div>

            <div className="btns  bg-white py-4 px-8">
              <div className="py-2 flex gap-8">
                <button className="bg-red-600 text-white py-1 px-6 rounded-md">
                  Edit
                </button>
                <button className="py-1 px-6 rounded-md bg-red-600 text-white">
                  Delete
                </button>
              </div>
              <div className="flex gap-8 ">
                <button className="bg-[#ff9f00] py-2 px-4 text-lg rounded-md text-white font-medium ">
                  ADD TO CART
                </button>
                <button className="bg-[#fb641b] py-2 px-6 text-lg rounded-md text-white font-medium ">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-1" />
      <div className=" w-full mt-4  p-2 ">
        <div className="flex gap-10 flex-wrap justify-between w-[90%] mx-auto">
          {reviews &&
            reviews.map((review, idx) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      </div>
      <div className="rating input bg-gray-400 mb-4">
        <ReviewInput />
      </div>
      <div>
        <h2>Similar Products</h2>
        <div className="flex flex-wrap gap-4">
          {similarProducts &&
            similarProducts.map((product, idx) => (
              <ProductCard product={product} />
            ))}
        </div>
      </div>
    </div>
  ) : (
    "<h1>Loading.. </h1>"
  );
}
