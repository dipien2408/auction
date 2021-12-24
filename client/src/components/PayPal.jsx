import React, { useRef, useEffect } from "react";
import { userRequest, publicRequest } from "../requestMethods";

export default function PayPal({handlePayPal, description, amount, userId, productId}) {
	const paypal = useRef();
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	const options = {
		createOrder: (data, actions, err) => {
			return actions.order.create({
				intent: "CAPTURE",
				purchase_units: [
					{
						description: description,
						amount: {
								currency_code: "USD",
								value: amount,
						},
					},	
				],
			});
		},
		onApprove: async (data, actions) => {
			const order = await actions.order.capture();
			console.log(order);
			const setPaid = async () => {
				try {
				  await publicRequest.put("/products/paid/" +productId, {
					paid: true,
				  })
				} catch {}
			};
			const orderCreate = async () => {
				try {
					const res = await userRequest.post("/orders", {
						userId: userId,
						productId: productId,
						amount: amount,
					});
					handlePayPal(res.data._id);
					res && setPaid();
				} catch {}
			};
			orderCreate();
		},
		onError: (err) => {
			console.log(err);
		}
	}
	let btn
	useEffect(() => {
		(async () => {
			await sleep(1000)
			if (paypal.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				btn = window.paypal.Buttons(options);
				btn.render(paypal.current);
			  }
			})();		
	}, [window.paypal]);

	return (
		<div>
			<div ref={paypal}></div>
		</div>
	)
}
