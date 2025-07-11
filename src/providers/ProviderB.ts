import { Provider, Email } from '../types';

export class ProviderB implements Provider {
  async send(email: Email): Promise<boolean> {
    if (Math.random() < 0.6) return true;
    throw new Error("ProviderB failed");
  }
}
