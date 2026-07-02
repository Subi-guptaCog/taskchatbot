interface Env {
  GEMINI_API_KEY?: string;
}

export const onRequestGet = async (context: { request: Request; env: Env }) => {
  const key = context.env.GEMINI_API_KEY;
  const hasApiKey = !!key && key !== "PLACEHOLDER" && key !== "";
  return new Response(
    JSON.stringify({
      status: "ok",
      hasApiKey,
      keyExists: !!key,
      keyPrefix: key ? key.substring(0, 6) : null,
      time: new Date().toISOString(),
      platform: "Cloudflare Pages"
    }),
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};
