import React, { useRef, useEffect } from "react";
import { userRequest } from "../requestMethods";

export default function PayPal({description, amount, handlePayPal, userId, productId}) {
	const paypal = useRef();
	useEffect(() => {
		window.paypal.Buttons({
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
				const createOrder = async () => {
					try {
						const res = await userRequest.post("/orders", {
							userId: userId,
							productId: productId,
							amount: amount,
						});
						handlePayPal(res.data._id, true);
					} catch {}
				};
				createOrder();
			},
			onError: (err) => {
				console.log(err);
			}
		})
		.render(paypal.current);
	}, [amount, description, handlePayPal, productId, userId,]);

	return (
		<div>
			<div ref={paypal}></div>
		</div>
	)
}
