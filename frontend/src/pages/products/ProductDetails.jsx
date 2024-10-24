import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSigleProduct } from "../../app/features/products/productSlice";
import ReviewInput from "../../components/ReviewInput";
import ReviewCard from "../../components/ReviewCard";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { addToCart } from "../../app/features/cart/cartSlice";
import { setCheckOutProducts } from "../../app/features/order/checkOutSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const { product, similarProducts } = useSelector((state) => state.Product);
  const reviews = useSelector((state) => state?.Product?.product?.reviews);
  const isAdmin = useSelector((state) => state?.Auth?.User?.isAdmin);
  const dispatch = useDispatch();
  const [currImg, setcurrImg] = useState(0);
  const imgContainerRef = useRef(null); // Ref for the image container
  const [isDragging, setIsDragging] = useState(false); // To track dragging state
  const [startX, setStartX] = useState(0); // Starting x position for drag
  const [scrollLeft, setScrollLeft] = useState(0); // Scroll position when drag starts
  const [currPage, setcurrPage] = useState(1);
  const navigate = useNavigate();
  const reviewsPerPage = 6;
  const pageCount = Math.ceil(reviews?.length / reviewsPerPage);
  const fetchProduct = async (id) => {
    try {
      await dispatch(fetchSigleProduct(id)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddToCart = async (data) => {
    console.log(data);
    await dispatch(addToCart({ data }));
  };
  const currReviews =
    reviews &&
    reviews?.slice((currPage - 1) * reviewsPerPage, currPage * reviewsPerPage);

  const handlePageChange = (event, value) => {
    setcurrPage(value);
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
  const handleCheckOut = () => {
    dispatch(setCheckOutProducts([{ product, quantity: 1 }]));
    navigate("/checkout");
  };

  // Mouse Up (end drag)
  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };
  useEffect(() => {
    fetchProduct(id);
  }, [id]);
  return product ? (
    <div className="mx-auto w-[90%]  h-full bg-white  ">
      <div className="md:flex    py-2   ">
        <div className="imgs   md:w-1/2   lg:w-[40%]">
          <div className="p-1 w-full ">
            <img
              src={product?.image[currImg]?.url}
              alt={product.name}
              className="w-full object-contain md:object-center h-[300px] sm:h-[450px] rounded-lg "
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
                } w-24 h-24 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-lg`}
                onClick={() => setcurrImg(idx)}
              />
            ))}
          </div>
        </div>
        <div className="details flex flex-col px-2 lg:px-8 sm:w-[60%]    ">
          <div className=" flex flex-col p-2 sm:min-h-[550px] ">
            <div className="product-info w-full flex-grow  ">
              <div className="py-2">
                <h2 className="text-3xl font-medium">{product.name}</h2>
                <p className="text-lg py-2">{product.description} </p>
              </div>
              <div className="flex gap-8 ">
                <p className="text-xl font-semibold">₹{product.sellingPrice}</p>
                <p className="line-through text-lg">₹{product.price}</p>
              </div>
            </div>

            <div className="btns   bg-white py-4 px-2 lg:px-8">
              {isAdmin && (
                <div className="py-2 flex gap-8">
                  <Link to={`/edit/${product._id}`}>
                    {" "}
                    <button className="bg-red-600 text-white py-1 px-6 rounded-md">
                      Edit
                    </button>
                  </Link>
                  <button className="py-1 px-6 rounded-md bg-red-600 text-white">
                    Delete
                  </button>
                </div>
              )}
              <div className="flex lg:text-lg gap-8 ">
                <button
                  className="bg-[#1c252e] hover:bg-opacity-80  py-2 px-4  rounded-md text-white font-medium "
                  onClick={() => handleAddToCart({ productId: product._id })}
                >
                  Add to cart
                </button>
                <button
                  onClick={handleCheckOut}
                  className="bg-[#fb641b] py-2 px-6  rounded-md text-white font-medium hover:bg-[#ae653d] "
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-1" />
      <div className=" w-full mt-4  p-2 ">
        <div className="flex gap-10 flex-wrap justify-between w-[90%] mx-auto border-b-2 mb-2">
          {reviews &&
            currReviews.map((review, idx) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
        {reviews.length > reviewsPerPage && (
          <div className="flex items-center mt-4 justify-center">
            <Pagination
              page={currPage}
              count={pageCount}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      <div className="rating input mb-4">
        <ReviewInput />
      </div>
      {similarProducts.length > 0 && (
        <div>
          <h2>Similar Products</h2>
          <div className="flex flex-wrap gap-4">
            {similarProducts &&
              similarProducts.map((product, idx) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
