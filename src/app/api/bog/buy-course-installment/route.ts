import { NextRequest, NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs/server";

interface IAuthData {
  access_token: string;
  exprires_in: number;
  refresh_expires_in: number;
  token_type: string;
  "not-before-policy": number;
  scope: string;
}

export async function POST(request: NextRequest) {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // const user = await currentUser();

  const clientId = process.env.BOG_CLIENT_ID!;
  const clientSecret = process.env.BOG_CLIENT_SECRET!;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const authRes = await fetch(
      "https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
      }
    );

    if (!authRes.ok) {
      const errorText = await authRes.text();
      return NextResponse.json(
        { error: errorText },
        { status: authRes.status }
      );
    }

    const { access_token }: IAuthData = await authRes.json();

    const requestBody: {
      amount: string;
      month: number;
      discount_code: string;
      product_id: string;
    } = await request.json();

    const orderPayload = {
      // callback_url: `${process.env.NEXT_PUBLIC_API_URL}/api/bog/callback`,
      callback_url: `https://www.example.com/api/bog/callback`,
      purchase_units: {
        currency: "GEL",
        total_amount: +requestBody.amount * requestBody.month,
        basket: [
          {
            quantity: 1,
            unit_price: requestBody.amount,
            product_id: requestBody.product_id,
            description: "სტუდიო ლინგო - ინგლისურის კურსი",
          },
        ],
      },
      payment_method: ["bnpl"],
      config: {
        loan: {
          type: requestBody.discount_code,
          month: requestBody.month,
        },
      },
      // redirect_urls: {
      //   fail: `${process.env.NEXT_PUBLIC_URL}`,
      //   success: `${process.env.NEXT_PUBLIC_URL}`,
      // },
    };

    const orderRes = await fetch(
      "https://api.bog.ge/payments/v1/ecommerce/orders",
      {
        method: "POST",
        headers: {
          "Accept-Language": "ka",
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      }
    );

    if (!orderRes.ok) {
      const errorText = await orderRes.text();
      console.log(errorText, "errorText");
      return NextResponse.json(
        { error: errorText },
        { status: orderRes.status }
      );
    }

    const orderData = await orderRes.json();

    return NextResponse.json({
      installmentUrl: orderData["_links"]?.redirect?.href,
      id: orderData.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
