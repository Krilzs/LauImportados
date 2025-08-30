import EmailTemplate from "@/components/emails/EmailTemplate";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email, items, payment_id } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "jerocorigliano@yahoo.com.ar",
      to: [email],
      subject: "Tu compra en Lau Importados",
      react: (
        <EmailTemplate items={items} email={email} payment_id={payment_id} />
      ),
    });

    if (error) {
      console.error(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
