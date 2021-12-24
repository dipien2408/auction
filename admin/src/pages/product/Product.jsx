import { useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {Timer} from "../../components/timer/Timer"
import { useState } from "react";
import { updateProduct } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Product() {
	const location = useLocation();
  const productId = location.pathname.split("/")[2];
	const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

	const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
	const [end, setEnd] = useState(false);
	const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !desc || !price) {
      return alert("Missing information!");
    } 
		if(!file) {
			const newProduct = {title, desc, price, end, img: product.img};
			updateProduct(productId, newProduct, dispatch);
			setSuccess(true);
		} else {
			const fileName = new Date().getTime() + file.name;
			const storage = getStorage(app);
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);

			// Register three observers:
			// 1. 'state_changed' observer, called any time the state changes
			// 2. Error observer, called on failure
			// 3. Completion observer, called on successful completion
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
						default:
					}
				},
				(error) => {
					// Handle unsuccessful uploads
				},
				() => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						const newProduct = { title, desc, price, end, img: downloadURL };
						updateProduct(productId, newProduct, dispatch);
						setSuccess(true);
					});
				}
			);
		}    
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
      </div>
      <div className="productTop">
				<div className="productTopLeft">
						<Chart data={productData} dataKey="Sales" title="Sales Performance"/>
				</div>
				<div className="productTopRight">
					<div className="productInfoTop">
						<img src={product.img} alt="" className="productInfoImg" />
						<span className="productName">{product.title}</span>
					</div>
					<div className="productInfoBottom">
						<div className="productInfoItem">
							<span className="productInfoKey">id:</span>
							<span className="productInfoValue">{product._id}</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">Countdown:</span>
							<span className="productInfoValue"><Timer time={product.time}/></span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">Current Winner:</span>
							<span className="productInfoValue">{product.curWinner}</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">Paid:</span>
							<span className="productInfoValue">{product.paid.toString()}</span>
						</div>
					</div>
				</div>
      </div>
      <div className="productBottom">
				<form className="productForm" onSubmit={handleSubmit}>
					<div className="productFormLeft">
						<div className="productFormLeftWrapper">
							<label>Product Name</label>
							<input type="text" placeholder={product.title} onChange={(e) => setTitle(e.target.value)}/>
						</div>
						<div className="productFormLeftWrapper">
							<label>Product Description</label>
							<input type="text" placeholder={product.desc} onChange={(e) => setDesc(e.target.value)}/>
						</div>
						<div className="productFormLeftWrapper">
							<label>Price</label>
							<input type="text" placeholder={product.price} onChange={(e) => setPrice(e.target.value)}/>
						</div>
						<div className="productFormLeftWrapper">
							<label>End</label>
							<select name="end" id="end" onChange={(e) => setEnd(e.target.value)}>
								<option value="true">Yes</option>
								<option value="false">No</option>
							</select>
						</div> 
          </div>
					<div className="productFormRight">
						<div className="productUpload">
							<img src={file ? URL.createObjectURL(file) : product.img} alt="" className="productUploadImg" />
							<label htmlFor="file">
									<Publish/>
							</label>
							<input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])} />
						</div>
						<button className="productButton" type="submit">Update</button>
						{success && (
							<span style={{color: "green", textAlign: "center"}}>
								Product has been updated...
							</span>            
          	)}  
					</div>
				</form>
      </div>
    </div>
  );
}