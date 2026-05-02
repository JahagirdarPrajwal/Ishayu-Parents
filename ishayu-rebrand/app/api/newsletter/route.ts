import { NextResponse } from "next/server";

export const runtime = "edge";

const seen = new Set<string>();

export async function POST(req: Request) {
  let email = "";
  try {
    const body = (await req.json()) as { email?: string };
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  if (seen.has(email)) {
    return NextResponse.json({ ok: false, reason: "already" }, { status: 409 });
  }

  seen.add(email);
  console.log(`[newsletter] received: ${email}`);

  return NextResponse.json({ ok: true });
}
