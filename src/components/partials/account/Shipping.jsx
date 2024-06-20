import React, { useEffect } from 'react';
import Link from 'next/link';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import { useDispatch, useSelector } from 'react-redux';
import useGetProducts from '~/hooks/useGetProducts';
import { checkServicibility, generatePaymentToken, createOrder } from '~/services/apiService'
import { useRouter } from 'next/navigation';

const Shipping = () => {
    const cartAddress = useSelector(({ user }) => user.cartAddress);
    const {cartcheckoutCalculations} = useGetProducts();
    const updatedCartWithPincode = useSelector(({ ecomerce }) => ecomerce.updatedCartWithPincode);
    const Router = useRouter();

    // if()
    useEffect(() => {
        console.log(cartAddress,"[][][][")
    }, [cartAddress])
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
      } //The maximum is exclusive and the minimum is inclusive
    const hadlePayments = (e) => {
        e?.preventDefault();
        checkServicibility(cartAddress.pincode).then(res => {
            console.log(updatedCartWithPincode);
            if (res.data.delivery_codes.length > 0) {
                let body = {
                    "amount": updatedCartWithPincode.calculateCartAmount,
                    "currency": "INR",
                    "contact_number": "08982700502",
                    "email_id": cartAddress.email
                }
                const orderId = getRandomInt(1000000000, 9999999999);
                const form = new FormData();
                form.append("order_id", orderId);
                form.append("amount", updatedCartWithPincode.calculateCartAmount);
                generatePaymentToken(form).then(re => {
                    // if (re && re.status === "created") {
                        let token = re.data.body.txnToken;
                        layerPaymentOfPaytm(token,orderId, updatedCartWithPincode.calculateCartAmount,cartAddress.email,cartAddress)
                    // }
                })
            }
        })
    }

    const  layerPaymentOfPaytm = (token,orderid,amount, email, address) =>{
        window.onpaytmFunction = (token, orderid, amount) => {
            const that = this;
      
            console.log("callll", token, orderid, amount);
            var config = {
              root: "",
              flow: "DEFAULT",
              data: {
                orderId: orderid /* update order id */,
                token: token /* update token value */,
                tokenType: "TXN_TOKEN",
                amount: amount /* update amount */,
              },
              style: {
                themeBackgroundColor: "#33cc33",
              },
              merchant: {
                redirect: false,
              },
              handler: {
                notifyMerchant: function (eventName, data) {
                  console.log("notifyMerchant handler function called");
                  console.log("eventName => ", eventName);
                  console.log("data => ", data);
                },
                transactionStatus: function transactionStatus(paymentStatus) {
                  console.log("paymentStatus => ", paymentStatus);
                  createOrderAfterPayment(address, email, paymentStatus);
                  window.Paytm.CheckoutJS.close();
                  // this.router.navigate(['/thankyou']);
                  // console.log("calling next")
                  // that.Stepper.next();
                  // that.router.navigate(["/thankyou"]);
                  console.log("after calling next");
                },
              },
            };
            console.log(config, "------");
            if (window?.Paytm && window?.Paytm.CheckoutJS) {
              console.log("inside paytm", window.Paytm);
              window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
                // initialze configuration using init method
                console.log("ONliad compet");
                window.Paytm.CheckoutJS.init(config)
                  .then(function onSuccess() {
                    console.log("init compet");
                    // after successfully updating configuration, invoke JS Checkout
                    window.Paytm.CheckoutJS.invoke();
                  })
                  .catch(function onError(error) {
                    console.log("error => ", error);
                  });
              });
            }
          };
          var script = document.createElement("script");
          script.setAttribute("type", "application/javascript");
          script.setAttribute(
            "src",
            "https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/DPwUxA41259916475739.js"
          );
          script.setAttribute(
            "onload",
            `window.onpaytmFunction("${token}","${orderid}","${amount}");`
          );
          script.setAttribute("crossorigin", "anonymous");
          document.head.appendChild(script);
    }
    
    const createOrderAfterPayment = (address, email, response) => {
        console.log("create order call");
        const userInfo = JSON.parse(localStorage.getItem("user_data"));
    
        let fullAddress =
          address.firstName +
          " " +
          address.lastName +
          " , " +
          address.address +
          " , " +
          address.city +
          ", " +
          address.state +
          " - " +
          address.pincode +
          " ," +
          address.mobile;
        const form = new FormData();
        form.append("user_id", userInfo.user_id_PK);
        form.append("pincode", address.pincode);
        form.append("customer_city", address.city);
        form.append("customer_state", "MP");
        form.append("transaction_id", response.BANKTXNID);
        form.append("delivery_address", fullAddress);
        form.append("name", address.firstName + " " + address.lastName);
        form.append("email", address.email);
        form.append("phone", address.mobile);
        form.append("delivery_amount", updatedCartWithPincode.deliveryCharges);
        createOrder(form).then((order_data) => {
            if (order_data.status) {
                Router.push('/account/payment-success');
            }
        })
        // this.commonService.createOrder(form).subscribe((data) => {
        //   if (data.status) {
        //     this.flag = 1;
        //     // document.getElementById("orp").style.pointerEvents = "auto";
        //     // document.getElementById("orp").click();
        //     this.cartItems = [];
        //     this.commonService.updateCartItemCount(0);
        //     this.Stepper.next();
        //     // this.router.navigate(['/thankyou']);
        //   }
        //   this.ngxService.stop(); // start foreground loading with 'default' id
        //   this.spinner.hide();
        // });
        // alert(response.razorpay_payment_id);
      };
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Shipping Information</h1>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-block--shipping">
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>Contact</small>
                                        <p>{cartAddress?.email}</p>
                                        <Link href="/account/checkout">
                                            Change
                                        </Link>
                                    </figure>
                                    <figure>
                                        <small>Ship to</small>
                                        <p>{ cartAddress?.address}</p>
                                        <Link href="/account/checkout">
                                            Change
                                        </Link>
                                    </figure>
                                </div>
                                <h4>Shipping Method</h4>
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>International Shipping</small>
                                        <strong>₹20.00</strong>
                                    </figure>
                                </div>
                                <div className="ps-block__footer">
                                    <Link href="/account/checkout">
                                        <i className="icon-arrow-left mr-2" />
                                        Return to information
                                    </Link>
                                    <Link
                                        href='javascript.void(0)'
                                        onClick={(e)=>hadlePayments(e)}
                                        className="ps-btn">
                                        Continue to payment
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <ModulePaymentOrderSummary shipping={true} cart_shipping={cartcheckoutCalculations} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
