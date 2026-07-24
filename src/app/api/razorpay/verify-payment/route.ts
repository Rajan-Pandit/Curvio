import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'DUzphG3Im8INAiWntiXCWtak';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    if (!razorpay_payment_id) {
      return NextResponse.json(
        { error: 'Payment ID is required for verification.' },
        { status: 400 }
      );
    }

    // If signature & order ID provided, perform cryptographic HMAC-SHA256 check
    if (razorpay_order_id && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      const isSignatureValid = generatedSignature === razorpay_signature;

      if (!isSignatureValid) {
        return NextResponse.json(
          { error: 'Invalid payment signature. Verification failed.', verified: false },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Razorpay Signature Verification Error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment signature.', details: error?.message },
      { status: 500 }
    );
  }
}
