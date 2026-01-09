# Resume Setup Instructions

## Adding Your Resume PDF

To enable the "Download Resume" functionality in the About modal:

1. **Prepare your resume PDF**
   - Name it: `Bhargav_Limbasia_Resume.pdf`
   - Make sure it's up-to-date with your latest information

2. **Add to the project**
   - Place the PDF file in the `public` folder:
     ```
     portfolio-site/
       public/
         Bhargav_Limbasia_Resume.pdf  ← Add your resume here
     ```

3. **That's it!**
   - The download button will automatically work
   - When users click "DOWNLOAD RESUME" in the About modal, it will download your PDF

## Alternative: Using a Different Filename

If you want to use a different filename, update line 29 in `src/components/AboutModal.tsx`:

```typescript
// Change this line:
link.href = '/Bhargav_Limbasia_Resume.pdf';

// To your preferred filename:
link.href = '/YourName_Resume.pdf';
```

## Testing the Download

1. Start the dev server: `npm run dev`
2. Click the "BL" logo in the top left
3. Scroll down and click "DOWNLOAD RESUME"
4. Your resume should download automatically

## Important Notes

- The PDF must be in the `public` folder to be accessible
- File paths are case-sensitive on some systems
- The download works in both development and production builds
