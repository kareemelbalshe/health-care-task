import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { truncate } from "../../lib/functions/truncate";
import { Product } from "../../lib/types/types";
import { cartAction } from "../../lib/redux/slices/cart-slice";
import { FaRegEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AppDispatch } from "../../lib/redux/store";
import { memo, useRef } from "react";
import { toast } from "react-toastify";
import { BsCartPlus } from "react-icons/bs";

interface ProductSliderProps {
  arr?: Product[];
}

const ProductSlider = memo(function Slider({
  arr = [],
}: ProductSliderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 310;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative my-10 w-full px-4 md:px-16">
      <button
        onClick={() => scrollSlider("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg z-1 hidden md:flex"
        aria-label="Scroll Left"
      >
        <FaChevronLeft size={20} />
      </button>

      <div
        ref={sliderRef}
        className="flex gap-7 w-full text-black items-start overflow-x-scroll hide-scrollbar scroll-smooth"
      >
        {arr.map((item) => (
          <div
            className="flex items-center flex-col bg-amber-400 rounded-lg pb-2 min-w-72 group min-h-[470px]"
            key={item._id}
          >
            <div className="flex justify-center items-center relative overflow-hidden">
              <img
                className="w-72 h-80 bg-center bg-no-repeat object-cover"
                src={item?.image && item?.image[0]?.url}
                alt={item.title || "Product Image"}
                loading="lazy"
              />

              <FaRegEye
                onClick={() => navigate(`/product/${item._id}`)}
                className="absolute left-4 top-4 text-amber-400 text-2xl cursor-pointer"
                aria-label="View Product"
              />

              <button
                onClick={() => {
                  if (item.stock > 0) {
                    dispatch(cartAction.addToCart(item));
                    toast.success("Product has been added to the cart!");
                  } else {
                    toast.error("Out of stock, text me at whatsapp");
                  }
                }}
                className="absolute bottom-[-100%] w-full bg-black text-white p-2 transition-all duration-300 group-hover:bottom-0 flex items-center justify-center gap-2 text-xl"
              >
                <BsCartPlus /> <p>Add to Cart</p>
              </button>
            </div>

            <h1 className="text-2xl">{truncate(item.title, 20)}</h1>
            <p className={`${item.discount && "line-through"} text-sm`}>
              Price:{" "}
              <span className="font-bold text-red-500">{item.price} EGP</span>
            </p>

            {item.discount > 0 && (
              <>
                <span className="text-sm ">
                  Discount:{" "}
                  <span className="font-bold text-blue-500">
                    {item.discount}%
                  </span>
                </span>
                <span className="text-sm">
                  Price After Discount:{" "}
                  <span className="font-bold text-blue-500">
                    {item.priceAfterDiscount} EGP
                  </span>
                </span>
              </>
            )}

            <span className="text-sm">
              Quantity: <span className="font-bold">{item.stock}</span>
            </span>
            <span className="text-md">
              Category: <span className="font-bold">({item.category})</span>
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollSlider("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg z-1 hidden md:flex"
        aria-label="Scroll Right"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
});

export default ProductSlider;
