import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if(confirm) {
      deleteProduct(id, dispatch);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "end", headerName: "End", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "curWinner", headerName: "Current Winner", width: 180 },
    { field: "paid", headerName: "Paid", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (     
      <div className="productList">
        <div className="productTitleContainer" style={{justifyContent: 'space-between'}}>
          <h1 className="productTitle">Product</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      </div>
  );
}