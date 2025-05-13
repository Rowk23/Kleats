package org.example.simpli.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.example.simpli.models.ProductDTO;
import org.example.simpli.models.RequestDTO;
import org.example.simpli.models.StripeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StripeService {
    @Value("${STRIPE_API_KEY}")
    private String stripeKey;

    public StripeResponse integratedCheckout(RequestDTO request){
        Stripe.apiKey = stripeKey;
        List<SessionCreateParams.LineItem> items = new ArrayList<>();
        for(ProductDTO product: request.getProducts()) {
            var productData = SessionCreateParams.LineItem.PriceData.ProductData.builder()
                .setName(product.getName())
                .build();

            var priceData = SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency(request.getCurrency())
                .setUnitAmount(product.getAmount())
                .setProductData(productData)
                .build();

            var lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(product.getQuantity())
                .setPriceData(priceData)
                .build();
            items.add(lineItem);
        }
        var rateData = SessionCreateParams.ShippingOption.ShippingRateData.builder()
            .setType(SessionCreateParams.ShippingOption.ShippingRateData.Type.FIXED_AMOUNT)
            .setFixedAmount(
                SessionCreateParams.ShippingOption.ShippingRateData.FixedAmount.builder()
                    .setAmount(2500L)
                    .setCurrency("ron")
                    .build()
            )
            .setDisplayName("Fan Courier")
            .setDeliveryEstimate(
                SessionCreateParams.ShippingOption.ShippingRateData.DeliveryEstimate.builder()
                    .setMinimum(
                        SessionCreateParams.ShippingOption.ShippingRateData.DeliveryEstimate.Minimum.builder()
                            .setUnit(
                                SessionCreateParams.ShippingOption.ShippingRateData.DeliveryEstimate.Minimum.Unit.BUSINESS_DAY
                            )
                            .setValue(5L)
                            .build()
                    )
                    .setMaximum(
                        SessionCreateParams.ShippingOption.ShippingRateData.DeliveryEstimate.Maximum.builder()
                            .setUnit(
                                SessionCreateParams.ShippingOption.ShippingRateData.DeliveryEstimate.Maximum.Unit.BUSINESS_DAY
                            )
                            .setValue(7L)
                            .build()
                    )
                    .build()
            )
            .build();
        var fanopt = SessionCreateParams.ShippingOption.builder().setShippingRateData(rateData).build();
        var params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl("http://localhost:4200/payment")
            .setCancelUrl("http://localhost:4200/cart")
            .addAllLineItem(items)
            .addShippingOption(fanopt)
            .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
            .build();

        Session session = null;
        try {
             session = Session.create(params);
        } catch (StripeException e) {
            System.out.println(e.getMessage());
        }
        return StripeResponse
             .builder()
             .status("SUCCESS")
             .message("Payment session created!")
             .sessionId(session.getId())
             .sessionUrl(session.getUrl())
             .build();
    }
}
