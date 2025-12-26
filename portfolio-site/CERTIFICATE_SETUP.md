# Adding the NPTEL Certificate Image

## Steps to add your certificate:

1. **Save the certificate image** from the attachment you provided
2. **Rename it to**: `nptel-deep-learning.png`
3. **Place it in**: `portfolio-site/public/certificates/`

The full path should be:
```
portfolio-site/public/certificates/nptel-deep-learning.png
```

## What's been implemented:

✅ Certificate data structure updated to support images and URLs
✅ Modal component created for viewing certificates
✅ NPTEL certificate configured to show the image when clicked
✅ Microsoft PL-900 configured to show the credential URL in an iframe when clicked
✅ Visual indicator (eye icon) shows which certificates are clickable

## How it works:

- Click on "NPTEL NOC: Deep Learning - IIT Ropar" → Opens modal with certificate image
- Click on "Microsoft PL-900" → Opens modal with embedded Microsoft credential page
- Click on "Google Generative AI" → No popup (no certificate configured yet)

## To add more certificates later:

Edit `src/data/resume.ts` and add either:
- `imageUrl: '/certificates/your-image.png'` for image certificates
- `credentialUrl: 'https://...'` for online credentials
- Both for certificates that have both options

Example:
```typescript
{
  name: 'Your Certification Name',
  issuer: 'Issuing Organization',
  imageUrl: '/certificates/your-cert.png',
  credentialUrl: 'https://verify-link.com'
}
```
