# PGP Verify

Simple web page that verifies PGP signatures online.

## About

PGP Verify is a client-side web application that allows you to verify detached PGP signatures directly in your browser. All verification is performed locally using [OpenPGP.js](https://openpgpjs.org/), ensuring your data never leaves your device.

Originally created as a help tool to verify AdGuard mirror websites.
Public key is available at [./mirror-attestation-pubkey.asc](./mirror-attestation-pubkey.asc).

## Features

- ✅ Verify detached PGP signatures
- ✅ Client-side verification (no data transmitted to servers)
- ✅ Clean, responsive user interface
- ✅ Based on OpenPGP.js v5.11.3
- ✅ Works entirely in your browser

## Usage

1. Visit the web application
2. Paste your original file contents into the first textarea
3. Paste the detached PGP signature into the second textarea
4. Paste the PGP public key into the third textarea
5. Click "Check Signature"
6. View the verification result

## Development

The project consists of:

- `index.html` - Main HTML page with UI elements
- `style.css` - Styling for the application
- `app.js` - JavaScript logic for signature verification
- `package.json` - Project metadata and dependencies

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the main branch.

## License

MIT
