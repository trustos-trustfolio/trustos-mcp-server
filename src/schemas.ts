import { z } from "zod";

export const verifyDecisionSchema = z.object({
  action: z.string().min(1).describe("The action or decision to verify (e.g. stablecoin_transfer)"),
  amount: z.number().positive().optional().describe("Monetary amount involved"),
  currency: z.string().optional().describe("Currency code (e.g. USDC, USD)"),
  destination: z.string().optional().describe("Destination address or identifier"),
  source: z.string().optional().describe("Source address or identifier"),
  priority: z.string().optional().describe("Priority level (e.g. high, critical)"),
  metadata: z.record(z.unknown()).optional().describe("Additional context as key-value pairs"),
});

export type VerifyDecisionInput = z.infer<typeof verifyDecisionSchema>;
