// TEMP diagnostics endpoint (remove before merge): the device POSTs JS errors
// here so they appear in the dev-server console log, where they can be read
// without attaching Safari Web Inspector to the phone.
export async function POST(req: Request) {
  try {
    const text = await req.text();
    console.log('[JSERR]', text);
  } catch {
    /* ignore */
  }
  return new Response(null, { status: 204 });
}
