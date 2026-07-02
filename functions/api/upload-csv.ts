export const onRequestPost = async (context: { request: Request }) => {
  try {
    const body: any = await context.request.json();
    const { fileName } = body;
    const safeFileName = fileName || "tasks.csv";

    return new Response(
      JSON.stringify({
        success: true,
        message: `CSV integrated in client session state. (Server-side storage was bypassed in Cloudflare serverless environment)`,
        serverlessMode: true,
        fileName: safeFileName
      }),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message || "Internal server error" }),
      {
        status: 500,
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};
