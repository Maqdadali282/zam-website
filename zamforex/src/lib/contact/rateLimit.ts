const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

type Bucket = { count: number; windowStart: number };

// In-memory, per-server-instance limiter. There's intentionally no shared
// store (Redis, etc.) behind this — on a single always-on process it works
// as a real limiter; on serverless it resets per cold start, which still
// throttles rapid-fire abuse within one warm instance but isn't a global
// guarantee. Upgrade to a shared store if that gap matters in production.
const hits = new Map<string, Bucket>();

function sweepExpired(now: number) {
  for (const [key, bucket] of hits) {
    if (now - bucket.windowStart > WINDOW_MS) hits.delete(key);
  }
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  if (Math.random() < 0.01) sweepExpired(now);

  const bucket = hits.get(key);
  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}
