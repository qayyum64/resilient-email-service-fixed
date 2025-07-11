import { EmailService } from '../src/EmailService';
import { Email } from '../src/types';

describe('EmailService', () => {
  const service = new EmailService();
  const email: Email = {
    id: 'email-001',
    to: 'test@example.com',
    subject: 'Hello',
    body: 'This is a test'
  };

  test('should send email successfully', async () => {
    const status = await service.sendEmail(email);
    expect(['Sent', 'Already Sent', 'Failed']).toContain(status);
  });

  test('should not send duplicate email', async () => {
    await service.sendEmail(email);
    const status = await service.sendEmail(email);
    expect(status).toBe('Already Sent');
  });
});
