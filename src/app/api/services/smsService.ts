import twilio from "twilio";

interface SendSmsProps {
  phone: string;
  codigo: string;
}

export async function sendVerificationCodeSMS({ phone, codigo }: SendSmsProps) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!accountSid || !authToken) throw new Error("Invalid Twilio Credentials");
  const client = twilio(accountSid, authToken);
  const infoMessage = await client.messages.create({
    body: `Aqui esta tu codigo de verificacion:  ${codigo}`,
    from: "+15735383546",
    to: `+${phone}`,
  });
  return infoMessage;
}
