import Stripe from "stripe";

async function payment(
    {   stripe=new Stripe(process.env.STRIPE_KEY),
        metadata={},
        payment_method_types=["card"],
        mode="payment",
        success_url=process.env.SUCCUESS_URL,
        cancel_url=process.env.CANCEL_URL,
        discounts=[],
        customer_email="",
        line_items=[]
    }={}
){
    
    const session=await stripe.checkout.sessions.create({
        payment_method_types,
        mode,
        metadata,
        success_url,
        cancel_url,
        discounts,
        customer_email,
        line_items
    })
    return session;
}

export default payment




