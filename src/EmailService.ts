import { Email, Provider } from './types';
import { ProviderA } from './providers/ProviderA';
import { ProviderB } from './providers/ProviderB';
import { RateLimiter } from './utils/RateLimiter';
import { Logger } from './utils/Logger';

export class EmailService {
  private providers: Provider[];
  private sentEmails = new Set<string>();
  private rateLimiter = new RateLimiter(5, 10000);

  constructor() {
    this.providers = [new ProviderA(), new ProviderB()];
  }

  private async retryWithBackoff(
    fn: () => Promise<boolean>,
    retries = 3,
    delay = 1000
  ): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        Logger.error(`Attempt ${i + 1} failed: ${err}`);
        await new Promise((res) => setTimeout(res, delay * Math.pow(2, i)));
      }
    }
    return false;
  }

  async sendEmail(email: Email): Promise<string> {
    if (this.sentEmails.has(email.id)) {
      return 'Already Sent';
    }

    if (!this.rateLimiter.allow()) {
      return 'Rate Limited';
    }

    for (const provider of this.providers) {
      const success = await this.retryWithBackoff(() => provider.send(email));
      if (success) {
        this.sentEmails.add(email.id);
        Logger.info(`Email sent to ${email.to}`);
        return 'Sent';
      }
      Logger.info(`Switching provider for ${email.to}`);
    }

    Logger.error(`All providers failed for ${email.to}`);
    return 'Failed';
  }
}

// Sample usage
(async () => {
  const service = new EmailService();
  const result = await service.sendEmail({
    id: "email-1",
    to: "user@example.com",
    subject: "Hello",
    body: "Testing email"
  });
  console.log(result);
})();
