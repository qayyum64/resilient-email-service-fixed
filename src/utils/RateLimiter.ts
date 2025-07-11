export class RateLimiter {
  private tokens: number;
  private interval: number;

  constructor(limit: number, intervalMs: number) {
    this.tokens = limit;
    this.interval = intervalMs;
    setInterval(() => {
      this.tokens = limit;
    }, intervalMs);
  }

  allow(): boolean {
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    return false;
  }
}
