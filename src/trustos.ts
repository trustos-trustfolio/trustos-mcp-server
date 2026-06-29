import type { VerifyDecisionInput } from "./schemas.js";

const DEFAULT_BASE_URL = "https://api.trust-os.io";
const VERIFY_PATH = "/v1/decision/verify";

export type VerifyDecisionResult = {
  decision_id?: string;
  recommendation?: string;
  risk_score?: number;
  risk_level?: string;
  policy?: string;
  proof_hash?: string;
  verified?: boolean;
  latency_ms?: number;
  [key: string]: unknown;
};

export async function verifyDecision(input: VerifyDecisionInput): Promise<VerifyDecisionResult> {
  const apiKey = process.env.TRUSTOS_API_KEY;
  if (!apiKey) {
    throw new Error("TRUSTOS_API_KEY environment variable is not set.");
  }

  const baseUrl = (process.env.TRUSTOS_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");
  const url = `${baseUrl}${VERIFY_PATH}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "User-Agent": "trustos-mcp-server/0.1.0",
      },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Trust OS request failed: ${msg}`);
  }

  if (!response.ok) {
    let body = "";
    try { body = await response.text(); } catch { /* ignore */ }
    throw new Error(
      `Trust OS API error ${response.status} ${response.statusText}` +
      (body ? `: ${body.slice(0, 200)}` : "")
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error("Trust OS returned an invalid JSON response.");
  }

  return data as VerifyDecisionResult;
}
