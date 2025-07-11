export interface Email {
  id: string;
  to: string;
  subject: string;
  body: string;
}

export interface Provider {
  send(email: Email): Promise<boolean>;
}
