import React, { useState } from "react";
import Address from "../../components/Address";
import ProductCart from "../../components/ProductCart";
import { useSelector } from "react-redux";
import CheckOutProduct from "../../components/CheckOutProduct";
import CheckOut from "../../components/CheckOut";
import AddressBox from "../../components/AddressBox";
import CancelIcon from "@mui/icons-material/Cancel";
import PaymentBox from "../../components/PaymentBox";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
export default function CheckOutPage() {
  const products = useSelector((state) => state?.CheckOut?.products);
  const address = useSelector((state) => state?.Auth?.User?.addresses);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showForm, setshowForm] = useState(false);

  const handlePaymentChange = (value) => {
    setSelectedPayment(value);
    console.log(selectedPayment);
    // Update the state with the selected payment method
  };
  const handleAddressSelect = (addressId) => {
    console.log(addressId);
    setSelectedAddress(addressId); // Track the selected address ID
  };
  const subTotal =
    products &&
    products.reduce((total, product) => {
      console.log(total);
      console.log(product.product);
      return total + product.product.price * product.quantity;
    }, 0);
  const total =
    products &&
    products.reduce((total, product) => {
      return total + product.product.sellingPrice * product.quantity;
    }, 0);
  return (
    products &&
    products.length > 0 && (
      <div className="mx-auto w-[90%] flex flex-col border md:flex-row flex-wrap ">
        <div>
          {address && address.length > 0 ? (
            <>
              <div>
                {address.map((address, idx) => (
                  <AddressBox
                    address={address}
                    idx={idx}
                    onSelectAddress={handleAddressSelect}
                  />
                ))}
              </div>
              <div onClick={() => setshowForm(!showForm)} className=" inline">
                {showForm ? (
                  <>
                    {" "}
                    <CancelIcon />
                  </>
                ) : (
                  <button>Add New Address</button>
                )}
              </div>
              {showForm && (
                <Address showForm={showForm} setshowForm={setshowForm} />
              )}
            </>
          ) : (
            <Address showForm={showForm} setshowForm={setshowForm} />
          )}
          <div className="">
            <h4 className="text-lg">Payment method</h4>
            <div className="flex sm:flex-row flex-col gap-4  p-4 justify-evenly">
              <PaymentBox
                text={"Cash on delivery"}
                value="cod"
                icon={<PaymentIcon fontSize={"small"} color="secondary" />}
                selectedValue={selectedPayment}
                onChange={handlePaymentChange}
              />
              <PaymentBox
                text={"Net Banking"}
                value="netbanking"
                icon={
                  <AccountBalanceIcon fontSize={"small"} color="secondary" />
                }
                selectedValue={selectedPayment}
                onChange={handlePaymentChange}
              />
            </div>
          </div>
        </div>
        <div className=" flex-grow">
          <div className="flex flex-col my-2 gap-4 w-[90%] mx-auto lg:w-[75%] ">
            {" "}
            {products.map((product) => (
              <CheckOutProduct product={product} />
            ))}
          </div>
          <div className="w-[90%] mx-auto">
            <CheckOut
              subTotal={subTotal}
              total={total}
              paymentMode={selectedPayment}
              selectedAddress={selectedAddress}
            />
          </div>
        </div>
      </div>
    )
  );
}
