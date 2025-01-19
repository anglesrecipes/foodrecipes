import { sendEmail } from "@/utils/mail.utils";

export async function POST(request: Request) {
  const sender = {
    name: "Foudrecipes",
    address: "aniffour.dev@gmail.com",
  };

  const { email } = await request.json();

  try {
    const result = await sendEmail({
      sender,
      recipients: [{ name: "User", address: email }],
      subject: "Thank you for subscribing to our newsletter!",
      message:
        "<p>Thank you for subscribing to our newsletter, you will receive our newsletter shortly.</p>",
    });

    return Response.json({
      accepted: result.accepted,
    });
  } catch (error) {
    console.error(error); // Use the error variable here, like logging it
    return Response.json({ message: "Not Sent!" }, { status: 500 });
  }
}
