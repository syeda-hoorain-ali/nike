import ReceiptEmail from '@/emails/receipt';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: NextRequest) => {
    try {

        const { email } = await request.json()

        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: "You order's is on its way.",
            react: ReceiptEmail(),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
