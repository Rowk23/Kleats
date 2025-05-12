package org.example.simpli.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.example.simpli.models.RequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {
    @Value("${STRIPE_API_KEY}")
    private String stripeKey;
    @Value("${CLIENT_BASE_URL}")
    private String clientUrl;

    public void integratedCheckout(RequestDTO request){
        Stripe.apiKey = stripeKey;
        var productData = SessionCreateParams.LineItem.PriceData.ProductData.builder()
            .setName(request.getName())
            .build();

        var priceData = SessionCreateParams.LineItem.PriceData.builder()
            .setCurrency(request.getCurrency()==null? "USD": request.getCurrency())
            .setUnitAmount(request.getAmount())
            .setProductData(productData)
            .build();

        var lineItem = SessionCreateParams.LineItem.builder()
            .setQuantity(request.getQuantity())
            .setPriceData(priceData)
            .build();

         var params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl("http://localhost:8080/success")
            .setCancelUrl("http://localhost:8080/cancel")
            .addLineItem(lineItem)
            .build();

         Session session = null;
         try {
             session = Session.create(params);
         } catch (StripeException e) {
             System.out.println(e.getMessage());
         }
         return ;
    }
}
