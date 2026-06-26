import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    const fullPrompt = context
      ? `${context}\n\nİstifadəçi sualı: ${prompt}`
      : prompt;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 saniyə

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Sən "Data-Flow AI" biznes analitika köməkçisən.`
          },
          {
            role: "user",
            content: fullPrompt
          }
        ],
        max_tokens: 512
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    console.log("Groq status:", response.status);
    const data = await response.json();
    console.log("Groq cavabı:", JSON.stringify(data).slice(0, 200));

    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error("Cavab alınmadı: " + JSON.stringify(data));

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("Xəta:", error?.message);
    return NextResponse.json({ error: "AI xətası", details: error?.message }, { status: 500 });
  }
}