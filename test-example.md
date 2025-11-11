# Testing PGP Verify

This document provides test data for verifying the PGP signature verification functionality.

## Test Data

### Original Message
```
Hello, World! This is a test message.
```

### How to Test

1. Generate a test key pair:
```bash
gpg --gen-key
```

2. Create a test file:
```bash
echo "Hello, World! This is a test message." > test.txt
```

3. Sign the file with a detached signature:
```bash
gpg --detach-sign --armor test.txt
```

4. Export your public key:
```bash
gpg --armor --export your-email@example.com > public-key.asc
```

5. Copy the contents of:
   - `test.txt` into the "Original File Contents" field
   - `test.txt.asc` into the "PGP Signature" field
   - `public-key.asc` into the "PGP Public Key" field

6. Click "Check Signature" to verify

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
