# Resilient Email Sending Service

## Features
- Retry with exponential backoff
- Fallback between providers
- Idempotent email tracking
- Basic rate limiting
- Simple status tracking
- Logging

## Setup

```bash
npm install
npm run start
npm run test
```

## Assumptions
- Mocked providers randomly fail
- No actual email sent
- Rate limiter set to 5 per 10 seconds

## Test

```bash
npm run test
```
