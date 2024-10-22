import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../app/features/order/orderSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminOrderCard from "../../components/Admin/AdminOrderCard";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 1, 159, 6.0, 24, 4.0, 44),
//   createData("Ice cream sandwich", 2, 237, 9.0, 37, 4.3),
//   createData("Eclair", 3, 262, 16.0, 24, 6.0),
//   createData("Cupcake", 4, 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 5, 356, 16.0, 49, 3.9, 55),
// ];
export default function AdminOrder() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.Order?.AllOrders);
  const getOrders = async () => {
    const res = await dispatch(fetchAllOrders()).unwrap();
    console.log(res);
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="flex">
      <div className="bg-red-200 w-[40%] sm:w-[30%] md:w-[20%] h-screen hidden sm:block">
        <SideBar />
      </div>
      <div className="p-4 flex-grow">
        <p className="text-lg">All Orders</p>
        <div className="bg-red-200">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 220 }}>OrderId</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell
                    // align="right"
                    sx={{ padding: "8px", height: "40px", width: "270px" }}
                  >
                    Item
                  </TableCell>
                  <TableCell align="right">QYT</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <AdminOrderCard order={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
     
      </div>
    </div>
  );
}
