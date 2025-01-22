import { Resend } from 'resend';
import ReceiptEmail, { ReceiptEmailProps } from '@/emails/receipt';

const resend = new Resend(process.env.RESEND_API_KEY);

type ReceiptEmailParams = ReceiptEmailProps & { email: string }

export const sendReceipt = async (params: ReceiptEmailParams) => {

    try {
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: params.email,
            subject: 'Message from your portfolio',
            react: ReceiptEmail({ ...params }),
        });

        return response

    } catch (error) {
        console.log(error)
        return { data: null, error: null }
    }
}
