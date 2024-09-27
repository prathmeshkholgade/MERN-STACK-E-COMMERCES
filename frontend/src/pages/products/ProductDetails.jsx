import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSigleProduct } from "../../app/features/products/productSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const product = useSelector((state) => state.Product.product);
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
  return (
    product && (
      <div className=" w-full h-full ">
        <div className="flex  mx-auto w-[90%] h-[90vh] py-2   bg-black ">
          <div className="imgs bg-blue-400  w-[40%]">
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
          <div className="details flex flex-col py-4 px-8 w-[60%]   bg-zinc-400 overflow-auto">
            <div className="bg-purple-300 flex flex-col p-2 min-h-[500px] ">
              <div className="product-info w-full flex-grow  bg-red-400">
                <div className="py-4">
                  <h2 className="text-3xl font-medium">{product.name}</h2>
                  <p className="text-lg py-2">{product.description} </p>
                </div>
                <div className="flex gap-8 ">
                  <p className="text-xl font-semibold">
                    ₹{product.sellingPrice}
                  </p>
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
            <div>
              <h1>
                Review Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate, quam iusto numquam, inventore temporibus mollitia
                quibusdam illum officia veniam adipisci dignissimos officiis
                facere neque architecto aperiam. Nobis nisi vero sequi, fuga
                quis praesentium voluptate debitis totam nesciunt sint
                consequuntur accusamus. Excepturi placeat molestias accusantium
                dolorum maiores porro et dignissimos unde autem aperiam
                reprehenderit voluptatibus quos nemo quibusdam, labore quisquam
                magnam iure quam recusandae fugiat quaerat eligendi laboriosam!
                Tempore laudantium aliquam fuga iure saepe quaerat cupiditate
                totam architecto id soluta praesentium repellat, dolores numquam
                nesciunt dolorum hic minus maiores iusto laboriosam suscipit
                nulla expedita cum consectetur cumque? Aperiam natus libero in
                eligendi suscipit placeat omnis nisi, consequatur deserunt,
                beatae magni voluptatem, minus odio at sunt ipsam alias
                aspernatur labore. Quasi eligendi neque impedit in eum amet
                cumque dolorem, nobis quos dolorum vero expedita culpa ullam
                eveniet repellendus architecto esse delectus non odio ratione
                est recusandae dignissimos nam molestias. Dignissimos eum
                suscipit repudiandae sed exercitationem soluta error inventore
                quam cupiditate veritatis ratione illum, voluptas rem aliquid ab
                sapiente cum architecto modi laudantium incidunt iste aperiam
                iure a dolores. Recusandae tempore quibusdam quos repellat sint
                vitae mollitia sunt natus praesentium incidunt dicta ut a nulla
                corporis porro enim itaque cum delectus ad molestias, laudantium
                est laboriosam. Illum eveniet similique, impedit, error nemo
                laudantium laboriosam optio, consequuntur eos dignissimos fugit
                nam quas? Similique debitis iusto architecto! Eaque perspiciatis
                tempore temporibus minima, modi quo ratione distinctio et optio
                aspernatur sunt. Accusantium, cupiditate. Deleniti blanditiis
                ratione, earum in, aut accusantium nesciunt et aliquam vero
                alias laborum harum at voluptas placeat dolorem quam sed
                distinctio eveniet asperiores dicta! Nihil officia distinctio
                labore pariatur consequatur dolore sunt porro itaque iusto. Ex
                sapiente omnis a cupiditate eaque adipisci, enim illo minima
                quam quasi nam id consequuntur magnam illum repellat officiis
                quod ipsum? Qui reiciendis beatae perspiciatis saepe asperiores,
                laborum, debitis placeat doloremque a impedit enim maxime
                ducimus inventore? Eius iste nemo quibusdam ipsa officia fugit
                modi et laborum quae deserunt. Repellendus laborum beatae cum
                voluptate perferendis, dolores voluptates? Labore rerum
                repudiandae tempore corrupti ipsa earum dolorum pariatur,
                reiciendis esse illo dicta distinctio dolor sit? Earum eaque
                consequatur, rerum, architecto maiores et molestiae laboriosam
                placeat officia magnam sunt? Ex explicabo autem quaerat
                reprehenderit et eius odio praesentium impedit aut veritatis.
                Laudantium doloremque reiciendis fugit omnis natus odit
                voluptatibus blanditiis incidunt, explicabo mollitia vero velit
                ipsam architecto impedit laboriosam corrupti tempore voluptas
                optio accusantium illo eum totam aspernatur. Dolorem iure
                dolorum quam, amet sequi excepturi eveniet aperiam voluptates
                delectus consectetur? Impedit quibusdam cupiditate unde eveniet
                quas fuga rerum placeat, ab, sequi deserunt nostrum. Provident
                totam facere accusamus nisi dolorum, eaque vel vero id. Dolorum
                nihil accusamus fugit, incidunt iure illum dolore pariatur
                distinctio enim quaerat, earum error facilis voluptates. Maiores
                quod ratione necessitatibus accusantium eius esse vel quia
                praesentium quas. Nostrum esse harum magni excepturi earum
                voluptates laudantium! Enim, modi! Illo suscipit officiis modi
                obcaecati, consequatur ea. Voluptatibus, laborum at laudantium
                exercitationem ex recusandae numquam! Provident, quisquam
                laborum asperiores, quas omnis eos voluptate eaque accusamus in
                quis explicabo itaque. Dolor, veritatis?
              </h1>
            </div>
          </div>
        </div>
        <div>
          <h2>
            Similar Products Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Minus earum architecto distinctio et tenetur nisi labore
            dolorum autem ea quam praesentium sequi qui assumenda, esse quis eum
            in. Voluptates expedita adipisci odit praesentium obcaecati
            nesciunt, quisquam consectetur sed rerum corrupti libero assumenda
            dolore vero sit, neque ad eaque quo, consequuntur quaerat.
            Accusantium enim deleniti obcaecati laboriosam perspiciatis itaque
            quidem sequi quisquam, doloribus odit ea qui dicta illum pariatur in
            quos recusandae molestias animi quo quas! Eligendi quam ipsum, id
            minus commodi deserunt. Facilis nemo incidunt vitae sequi nostrum
            esse sint. Excepturi architecto laboriosam id quisquam blanditiis
            perspiciatis. Pariatur vitae nobis, beatae alias molestias, non
            nihil libero accusamus deserunt aliquam corrupti facere maxime enim,
            assumenda eveniet consequatur magni fugiat vel sequi quasi
            temporibus est delectus quod. Doloremque repellendus sapiente
            temporibus commodi vero, id, eum, labore quasi unde dolor tempore
            alias. Quo eius expedita rerum, vel blanditiis rem voluptates,
            eligendi deserunt voluptatem laborum quia at tenetur quisquam!
            Doloribus praesentium a numquam sequi eius quasi quibusdam! Illum
            beatae dolor laudantium aliquid iste nesciunt perspiciatis accusamus
            deleniti impedit nisi. Harum id recusandae expedita eaque quia aut
            perferendis sint modi nisi tenetur sequi nesciunt ad cupiditate,
            quibusdam iusto eveniet ratione ipsum et praesentium. Porro, ea
            minima, expedita quis animi magnam delectus tempora iusto amet illo
            voluptatibus quaerat ab reprehenderit dolore cupiditate esse
            consequuntur commodi omnis quas tenetur repudiandae at? Obcaecati a
            laboriosam doloremque ea nulla maiores numquam aliquam veniam!
            Consectetur, ratione non blanditiis dolore id molestias sapiente aut
            placeat obcaecati ad alias. Id ipsum fugit voluptate. Laborum, quasi
            cupiditate. Fuga molestiae unde expedita cumque animi sapiente eaque
            dolorum debitis! Ratione labore pariatur non iusto dicta?
            Dignissimos blanditiis, alias nemo impedit ipsa commodi eos sed.
            Sunt et excepturi accusamus, neque veritatis, impedit, optio ratione
            porro corrupti vitae quos doloremque voluptatum vel eum perferendis
            dolor magnam officiis est quod? Fuga ut quod sunt, commodi
            reprehenderit officia dolore atque inventore quis nemo asperiores
            omnis molestiae maiores consectetur eaque vel iure perspiciatis
            deserunt? Esse quas facere error, nemo quam sint aspernatur
            explicabo quo fugit modi laborum autem magnam reprehenderit fuga
            quasi vitae hic doloremque beatae enim nostrum natus harum dolorem
            cum. Illum minus eaque quia, qui corrupti unde facere ut optio
            repellendus! Expedita saepe quidem reprehenderit, similique quis
            obcaecati ipsam voluptas sint omnis, tempore consequatur sequi
            beatae, minima tenetur dignissimos nesciunt ipsa atque nemo pariatur
            corrupti sit officiis rem! Animi natus, velit esse deleniti sit iure
            quidem, minima excepturi explicabo molestias repellendus ducimus
            mollitia sint maiores cumque quis dicta repudiandae accusamus
            deserunt! Officia distinctio explicabo asperiores a expedita nihil
            ipsam alias, possimus voluptatibus rem reiciendis iure quisquam, eum
            nemo voluptates blanditiis consectetur id nesciunt error voluptas.
            Incidunt est, facilis cupiditate nihil quos assumenda officiis totam
            culpa rerum tempore soluta cum quidem obcaecati itaque similique
            commodi! Totam velit blanditiis provident sunt voluptatum debitis,
            non id consequatur fugiat numquam veritatis facere incidunt
            architecto alias autem neque itaque at perferendis vero, laboriosam
            natus impedit! Provident similique nulla, aperiam cupiditate eum
            iusto consequatur qui rem error illo, commodi culpa sint, est
            repellat alias?
          </h2>
        </div>
      </div>
    )
  );
}

// <div className=" w-full h-full ">
// <div className="flex mx-auto w-[90%] h-[90%] py-2  ">
//   <div className="imgs w-[40%]">
//     <div className="p-1 w-full border-2 border-gray-200">
//       <img
//         src={product.image[currImg].url}
//         className="w-full object-center h-[450px] rounded-lg "
//       />
//     </div>
//     <div
//       ref={imgContainerRef} // Reference for the container
//       className="flex gap-2 my-2  overflow-auto scrollbar-hide hover:scrollbar-show justify-center"
//       onWheel={(e) => {
//         imgContainerRef.current.scrollLeft += e.deltaY; // Horizontal scroll on mouse wheel
//       }}
//       onMouseDown={handleMouseDown} // Start dragging
//       onMouseMove={handleMouseMove} // Dragging in progress
//       onMouseUp={handleMouseUp} // End dragging
//       onMouseLeave={handleMouseUp} // End drag if mouse leaves container
//       style={{ cursor: isDragging ? "grabbing" : "grab" }} // Change cursor on drag
//     >
//       {product.image.map((img, idx) => (
//         <img
//           key={idx}
//           src={img.url}
//           className={`${
//             currImg === idx && "border-2 border-zinc-800"
//           } w-24 h-24 rounded-lg`}
//           onClick={() => setcurrImg(idx)}
//         />
//       ))}
//     </div>
//   </div>
//   <div className="details py-4 px-8 flex-grow bg-red-500">
//     <div className="py-4 bg-red-50">
//       <h2 className="text-3xl font-medium">{product.name}</h2>
//       <p className="text-lg py-2">{product.description}</p>
//     </div>
//     <div className="flex gap-8 bg-orange-400">
//       <p className="text-xl font-semibold">₹{product.sellingPrice}</p>
//       <p className="line-through text-lg">₹{product.price}</p>
//     </div>
//     <div className="btns bg-white p-4">
//       <div className="py-2">
//         <button className="bg-red-600 text-white py-1 px-6 rounded-md">
//           Edit
//         </button>
//         <button className="py-1 px-6 rounded-md">Delete</button>
//       </div>
//       <div>
//         <button>ADD TO CART</button>
//         <button>BUY NOW</button>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
