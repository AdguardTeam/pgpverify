import * as openpgp from 'https://cdn.jsdelivr.net/npm/openpgp@6.2.2/dist/openpgp.min.mjs';

const form = document.getElementById('verifyForm');
const resultDiv = document.getElementById('result');
const verifyButton = form.querySelector('.verify-button');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileContent = document.getElementById('fileContent').value.trim();
    const signature = document.getElementById('signature').value.trim();
    const publicKey = document.getElementById('publicKey').value.trim();
    
    if (!fileContent || !signature || !publicKey) {
        showResult('error', 'All fields are required!');
        return;
    }
    
    verifyButton.disabled = true;
    verifyButton.textContent = 'Verifying...';
    
    try {
        const result = await verifySignature(fileContent, signature, publicKey);
        showResult('success', 'Signature is valid!', result);
    } catch (error) {
        showResult('error', 'Signature verification failed!', { error: error.message });
    } finally {
        verifyButton.disabled = false;
        verifyButton.textContent = 'Check Signature';
    }
});

async function verifySignature(fileContent, signatureArmored, publicKeyArmored) {
    try {
        // Read the public key
        const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
        
        // Read the signature
        const signature = await openpgp.readSignature({
            armoredSignature: signatureArmored
        });
        
        // Create message from file content
        const message = await openpgp.createMessage({ text: fileContent });
        
        // Verify the signature
        const verificationResult = await openpgp.verify({
            message,
            signature,
            verificationKeys: publicKey
        });
        
        // Check if signature is valid
        const { verified, keyID } = verificationResult.signatures[0];
        const sign = await verificationResult.signatures[0].signature;
        await verified; // Will throw if signature is invalid
        
        return {
            valid: true,
            keyID: keyID.toHex(),
            signerUserID: publicKey.users[0]?.userID?.userID || 'Unknown',
            timestamp: sign.packets[0].created
        };
    } catch (error) {
        throw new Error(`Verification failed: ${error.message}`);
    }
}

function showResult(type, message, details = null) {
    resultDiv.className = `result ${type}`;
    resultDiv.classList.remove('hidden');
    
    let html = `<h3>${message}</h3>`;
    
    if (details) {
        html += '<div class="details">';
        if (type === 'success') {
            html += `<strong>Signer:</strong> ${details.signerUserID}<br>`;
            html += `<strong>Key ID:</strong> ${details.keyID}<br>`;
            if (details.timestamp) {
                html += `<strong>Signed:</strong> ${details.timestamp.toLocaleString()}<br>`;
            }
        } else {
            html += `<strong>Error:</strong> ${details.error}`;
        }
        html += '</div>';
    }
    
    resultDiv.innerHTML = html;
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
