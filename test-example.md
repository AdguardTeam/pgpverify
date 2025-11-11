# Testing PGP Verify

This document provides test data for verifying the PGP signature verification functionality.

## Test Data

### Original Message

```text
Hello, World! This is a test message.
```

### How to Test

1. Generate a test key pair:

   ```bash
   gpg --gen-key
   ```

1. Create a test file:

   ```bash
   echo -n "Hello, World! This is a test message." > test.txt
   ```

1. Sign the file with a detached signature:

   ```bash
   cat test.txt | gpg --armor --detach-sign --textmode > test.txt.asc
   ```

1. Export your public key:

   ```bash
   gpg --armor --export your-email@example.com > public-key.asc
   ```

1. Copy the contents of:
   - `test.txt` into the "Original File Contents" field
   - `test.txt.asc` into the "PGP Signature" field
   - `public-key.asc` into the "PGP Public Key" field

1. Click "Check Signature" to verify

## Expected Result

The application should display:

- ✅ "Signature is valid!" (green success message)
- Signer information (user ID from the key)
- Key ID (hexadecimal key identifier)
- Signature timestamp

## Invalid Signature Test

To test invalid signature detection:

1. Use the same public key and signature
2. Modify the original file contents slightly
3. Click "Check Signature"

Expected result:

- ❌ "Signature verification failed!" (red error message)
- Error details explaining the verification failure
