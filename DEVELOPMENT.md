# Rada Development Guide

## Local Development Setup

### 1. Database Setup

Install PostgreSQL (if not already installed):
```bash
# macOS
brew install postgresql
brew services start postgresql

# Create database
createdb rada_dev
```

Update your `.env`:
```
DATABASE_URL="postgresql://localhost:5432/rada_dev?schema=public"
```

### 2. Initialize Database

```bash
npm run db:push
```

### 3. Seed Sample Data (Optional)

Create a seed script to test the platform:

```bash
# Create seed file
touch prisma/seed.ts
```

### 4. M-Pesa Testing

#### Sandbox Environment
1. Go to https://developer.safaricom.co.ke/
2. Create test app
3. Use test credentials:
   - Business Shortcode: 174379
   - Passkey: (provided in Daraja portal)
   - Test Phone: 254708374149

#### Testing STK Push
```bash
# Use ngrok for local callbacks
ngrok http 3000

# Update .env with ngrok URL
MPESA_CALLBACK_URL=https://abc123.ngrok.io/api/mpesa/callback
```

### 5. SMS Testing

Africa's Talking provides test credits:
```bash
# They give free credits for testing
# Check balance at: https://account.africastalking.com/
```

## API Testing

### Test Ticket Purchase

```bash
curl -X POST http://localhost:3000/api/tickets/purchase \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "event-id-here",
    "ticketTypeId": "ticket-type-id",
    "userId": "user-id-here",
    "phoneNumber": "254712345678",
    "quantity": 1
  }'
```

### Test Artist Page

```bash
curl http://localhost:3000/api/artists/nviiri
```

## Database Management

### View Database
```bash
npm run db:studio
```
This opens Prisma Studio at http://localhost:5555

### Update Schema
After editing `schema.prisma`:
```bash
npm run db:push
```

### Generate Prisma Client
```bash
npm run db:generate
```

## Common Issues

### Issue: M-Pesa callback not received
**Solution**: 
- Check ngrok is running
- Verify callback URL is publicly accessible
- Check Daraja portal logs

### Issue: SMS not sending
**Solution**:
- Verify Africa's Talking credits
- Check phone number format (must start with +254)
- Review API logs

### Issue: Database connection error
**Solution**:
```bash
# Check PostgreSQL is running
brew services list

# Restart if needed
brew services restart postgresql
```

## Production Deployment

### Environment Setup

1. **Database**: Use managed PostgreSQL (e.g., Supabase, Railway, Neon)
2. **Hosting**: Deploy to Vercel, Railway, or Render
3. **Domain**: Set up custom domain (rada.ke)

### Deployment Steps

```bash
# Build the project
npm run build

# Deploy to Vercel
npx vercel --prod
```

### Environment Variables (Production)

Update all `.env` variables for production:
- Use production M-Pesa credentials
- Use production database URL
- Set secure `NEXTAUTH_SECRET`
- Configure production callback URLs

### Database Migrations

For production, use migrations instead of `db:push`:

```bash
# Create migration
npx prisma migrate dev --name init

# Deploy to production
npx prisma migrate deploy
```

## Performance Optimization

### Image Optimization
- Use Cloudinary auto-compression
- Serve WebP format for modern browsers
- Lazy load images below fold

### Database Indexing
Already configured in schema:
- Artist slug (for fast lookups)
- Ticket phone numbers (for CRM)
- Event dates (for feed queries)

### Caching Strategy
- Cache artist profiles (60s)
- Cache event listings (30s)
- Real-time for ticket sales

## Monitoring

### Logs
```bash
# View application logs
npm run dev

# Production logs (Vercel)
npx vercel logs
```

### Database Monitoring
- Monitor slow queries in Prisma Studio
- Set up alerts for connection pool exhaustion
- Track ticket purchase volume

### M-Pesa Monitoring
- Track callback success rate
- Monitor payment failure reasons
- Set up alerts for payment issues

## Security Checklist

- [ ] Environment variables secured
- [ ] Database connection encrypted
- [ ] API rate limiting enabled
- [ ] CORS properly configured
- [ ] QR codes use secure hash
- [ ] M-Pesa webhooks verified
- [ ] User authentication implemented
- [ ] SQL injection protection (Prisma)
- [ ] XSS protection (React defaults)

## Testing

### Manual Testing Checklist

- [ ] Artist page loads on 3G
- [ ] M-Pesa STK Push triggers
- [ ] SMS delivery works
- [ ] QR code generates correctly
- [ ] Ticket shows in fan account
- [ ] Superfan auto-detection works
- [ ] Broadcast sends to multiple numbers
- [ ] Event feed shows upcoming shows

### Load Testing

Test ticket sales under load:
```bash
# Install artillery
npm install -g artillery

# Run load test
artillery quick --count 10 --num 5 http://localhost:3000/api/tickets/purchase
```

## Backup Strategy

### Database Backups
- Automated daily backups (via hosting provider)
- Export critical data weekly
- Test restore procedure monthly

### Code Backups
- Git repository (primary)
- GitHub (remote backup)
- Local backups of `.env` files (encrypted)

## Support & Troubleshooting

### Debug Mode
Enable detailed logging:
```env
# .env.local
DEBUG=true
LOG_LEVEL=verbose
```

### Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 1032 | M-Pesa timeout | User didn't enter PIN - retry |
| 1037 | Insufficient funds | Ask user to check M-Pesa balance |
| 2001 | Invalid phone | Check number format (254...) |

### Getting Help
- Check GitHub issues
- Email: dev@rada.ke
- Slack: #rada-dev (internal)
