import { NextResponse } from "next/server";
import { sendQuizCompletionNotification } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { answers, bmiResult, personalizedTips } = await req.json();

    if (!answers) {
      return NextResponse.json(
        { error: "Missing quiz answers" },
        { status: 400 }
      );
    }

    await sendQuizCompletionNotification(answers, bmiResult, personalizedTips);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending quiz completion notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
