import { Provider, Email } from '../types';

export class ProviderA implements Provider {
  async send(email: Email): Promise<boolean> {
    if (Math.random() < 0.7) return true;
    throw new Error("ProviderA failed");
  }
}
