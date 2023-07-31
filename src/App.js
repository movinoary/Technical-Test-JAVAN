import { useDispatch, useSelector } from "react-redux";
import { FormatRupiah } from "@arismun/format-rupiah";
import { updateProduct } from "./app/dataSlice";

export default function App() {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const totalItem = data.length;

  const listPrice = data.map((d) => d.totalPrice);
  const totalAmount = listPrice.reduce((a, b) => a + b);

  const handleQty = (id, type) => {
    const findData = data.find((d) => d.id === id);

    let qty = findData.qty;
    let totalPrice = findData.price;
    const price = findData.price;
    const stock = findData.stock;

    if (type === "+") {
      if (qty !== stock) {
        qty = qty + 1;
      }
    } else if (type === "-") {
      if (qty !== 1) {
        qty = qty - 1;
      }
    }
    totalPrice = price * qty;

    const body = {
      ...findData,
      qty,
      totalPrice,
    };

    dispatch(updateProduct(body));
  };

  return (
    <main className="flex flex-col gap-8 ">
      <nav className="w-full text-center p-10 bg-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold	capitalize">
          shopping cart
        </h1>
      </nav>
      <section className="flex px-[5%] gap-10 flex-col lg:flex-row">
        <article className="w-full lg:w-[70%] lg:h-[75vh] overflow-hidden p-8 shadow-[0_5px_10px_2px_rgba(0,0,0,0.3)]  rounded-md flex  flex-col gap-8">
          <h2 className="text-xl sm:text-2xl font-bold	capitalize">
            Cart {`(${totalItem} Items)`}
          </h2>
          <div className="flex  flex-col gap-8 overflow-y-auto">
            {data.map((item, index) => {
              return (
                <figure
                  className="flex flex-col sm:flex-row gap-4 px-2"
                  key={index}
                >
                  <div className="w-full sm:w-48 rounded-xl shadow-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full"
                    />
                  </div>
                  <figcaption className="flex  justify-between w-full py-5">
                    <section className="h-full flex flex-col gap-1 sm:gap-3 ">
                      <div>
                        <h2 className="text-base sm:text-2xl font-bold	capitalize">
                          {item.title}
                        </h2>
                      </div>
                      <p className="uppercase text-xs sm:text-base">
                        type : {item.type}
                      </p>
                      <p className="uppercase text-xs sm:text-base">
                        color : {item.color}
                      </p>
                      <p className="uppercase text-xs sm:text-lg">
                        Size :{" "}
                        {item.size.map((size, index) => (
                          <span key={index}>{size} </span>
                        ))}
                      </p>
                    </section>
                    <section className="h-full flex flex-col justify-between">
                      <div>
                        <div className="w-full flex justify-end">
                          <button
                            onClick={() => handleQty(item.id, "-")}
                            className="border-[1px]	 border-slate-300 w-5 rounded-l-md text-sm sm:text-lg font-bold hover:bg-gray-300 ease-in duration-75"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.qty}
                            disabled
                            className="text-center w-8 sm:w-16 bg-transparent border-[1px]	 border-slate-300 text-sm sm:text-lg"
                          />
                          <button
                            onClick={() => handleQty(item.id, "+")}
                            className="border-[1px]	 border-slate-300 w-5 rounded-r-md text-sm sm:text-lg font-bold hover:bg-gray-300 ease-in duration-75"
                          >
                            +
                          </button>
                        </div>

                        {item.stock === item.qty && (
                          <p className="w-full text-center mt-2 text-xs">{`( Note:  ${item.stock} stock )`}</p>
                        )}
                      </div>
                      <div className="w-full flex justify-end">
                        <p>
                          <FormatRupiah value={item.totalPrice} />
                        </p>
                      </div>
                    </section>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </article>
        <aside className="w-full lg:w-[30%] h-full mb-12 lg:mb-0   shadow-[0_5px_10px_2px_rgba(0,0,0,0.3)]  rounded-md flex flex-col p-4 gap-8">
          <h2 className="text-xl sm:text-2xl font-bold	capitalize">
            the total amount of
          </h2>
          <div className="flex flex-col gap-4">
            <figcaption className="flex justify-between">
              <p className="text-sm sm:text-base">Temporary amount</p>
              <p className="text-sm sm:text-base">
                <FormatRupiah value={totalAmount} />
              </p>
            </figcaption>
            <figcaption className="flex justify-between">
              <p className="text-sm sm:text-base">Shopping</p>
              <p className="text-sm sm:text-base">Free</p>
            </figcaption>
            <div className="border-b-[1px] border-grey-200" />
            <figcaption className="flex justify-between font-medium">
              <p className="text-sm sm:text-base">The Total amount of</p>
              <p className="text-sm sm:text-base">
                <FormatRupiah value={totalAmount} />
              </p>
            </figcaption>
          </div>
          <button className="bg-blue-500 py-2 rounded text-white uppercase">
            go to checkout
          </button>
        </aside>
      </section>
    </main>
  );
}
