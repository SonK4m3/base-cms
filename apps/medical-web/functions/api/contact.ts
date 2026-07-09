export async function onRequestPost(context) {
  const { request, env } = context;
  const formData = await request.formData();

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const age = String(formData.get("age") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const currentStatus = String(formData.get("currentStatus") || formData.get("message") || "").trim();
  const timeframe = String(formData.get("timeframe") || "").trim();
  const doctor = String(formData.get("doctor") || "").trim();
  const consent = String(formData.get("consent") || "").trim();
  const turnstileToken = String(formData.get("cf-turnstile-response") || "").trim();

  if (!name || !phone || !currentStatus || !consent) {
    return Response.json(
      { ok: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const isHuman = await verifyTurnstile({
      token: turnstileToken,
      secret: env.TURNSTILE_SECRET_KEY,
      ip: request.headers.get("CF-Connecting-IP") || undefined
    });

    if (!isHuman) {
      return Response.json(
        { ok: false, message: "Invalid captcha" },
        { status: 400 }
      );
    }
  }

  return Response.json({
    ok: true,
    message: "Thanks. The clinic will get back to you soon.",
    lead: {
      name,
      phone,
      age,
      service,
      currentStatus,
      timeframe,
      doctor
    }
  });
}

async function verifyTurnstile(input) {
  const body = new FormData();
  body.append("secret", input.secret);
  body.append("response", input.token);

  if (input.ip) {
    body.append("remoteip", input.ip);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body
    }
  );

  const result = await response.json();
  return Boolean(result && result.success);
}
