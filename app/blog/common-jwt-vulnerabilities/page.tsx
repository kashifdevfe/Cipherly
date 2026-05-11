import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "JWT Security Best Practices: Avoiding Common Mistakes | Cipherly Blog",
  description: "Learn JWT security best practices, common vulnerabilities, and how to properly implement JSON Web Tokens in your applications.",
};

export default function BlogPost() {
  return (
    <article className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-bold">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Blog
          </Link>
          <h1 className="text-5xl font-black tracking-tighter">JWT Security Best Practices: Avoiding Common Mistakes</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-bold">Cipherly Team</span>
            <span>•</span>
            <span>May 2026</span>
            <span>•</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Security</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">What is JWT?</h2>
            <p>
              JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. 
              Think of it as a digital passport—it contains information about who you are (claims) and proof that it's legitimate (signature).
            </p>
            <p>
              JWTs are widely used for authentication and authorization in modern web applications. 
              A typical JWT looks like this:
            </p>
            <div className="bg-secondary/30 border border-border rounded-lg p-4 font-mono text-xs break-all">
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">JWT Structure</h2>
            <p>
              A JWT consists of three parts separated by dots (.), each base64-encoded:
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <strong>Header:</strong> Specifies the type (JWT) and the signing algorithm (HS256, RS256, etc.)
              </li>
              <li>
                <strong>Payload:</strong> Contains claims (user ID, permissions, expiration time, etc.)
              </li>
              <li>
                <strong>Signature:</strong> Ensures the token hasn't been tampered with
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Common JWT Vulnerabilities</h2>
            
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">1. Using "none" Algorithm</h4>
                <p className="text-sm mb-2">
                  Some JWT libraries support an algorithm called "none", which skips signature verification. 
                  This is extremely dangerous and should never be allowed in production.
                </p>
                <code className="text-xs bg-red-500/5 px-2 py-1 rounded block">
                  {'{alg: "none"}'} ← NEVER use this
                </code>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">2. Weak Secrets</h4>
                <p className="text-sm">
                  If you're using HMAC (HS256), your secret must be strong. A weak secret can be brute-forced.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">3. Not Validating Expiration (exp)</h4>
                <p className="text-sm">
                  Always check if a token has expired. An old stolen token should not grant access.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">4. Algorithm Substitution</h4>
                <p className="text-sm">
                  An attacker might change RS256 (asymmetric) to HS256 (symmetric) and use your public key as the HMAC secret.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">5. Storing Sensitive Data in Payload</h4>
                <p className="text-sm">
                  Remember: JWT payload is base64-encoded, not encrypted. Anyone can decode it. Don't store passwords, API keys, or SSNs.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">JWT Best Practices</h2>
            
            <div className="space-y-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6">
              <h4 className="font-bold text-emerald-400 mb-4">✅ Security Checklist</h4>
              
              <div className="space-y-3">
                <div>
                  <h5 className="font-bold text-foreground mb-1">Use Strong Signing Algorithms</h5>
                  <p className="text-sm">Use RS256, HS512, or newer. Never use "none" or weak algorithms like MD5.</p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">Use a Strong Secret (for HMAC)</h5>
                  <p className="text-sm">At least 256 bits of random data. Example: 64 random hex characters.</p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">Always Validate Expiration</h5>
                  <p className="text-sm">Check the "exp" claim on every request. Expired tokens should be rejected.</p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">Set Short Expiration Times</h5>
                  <p className="text-sm">15-30 minutes is common. This limits the damage if a token is stolen.</p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">Use HTTPS</h5>
                  <p className="text-sm">Always transmit JWTs over HTTPS. Never use HTTP.</p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">Store Tokens Securely</h5>
                  <p className="text-sm">In the browser, use httpOnly cookies rather than localStorage (protects against XSS).</p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">Include Issued-At (iat) Claim</h5>
                  <p className="text-sm">This helps detect tokens that were issued before a known compromise.</p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">Use Subject (sub) Claim</h5>
                  <p className="text-sm">Identify who the token belongs to (user ID, email, etc.).</p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">Implement Token Refresh</h5>
                  <p className="text-sm">Use short-lived access tokens and longer-lived refresh tokens.</p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">Validate Algorithm Explicitly</h5>
                  <p className="text-sm">Don't accept any algorithm. Specify exactly which algorithm(s) you expect.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">JWT Payload Example (Secure)</h2>
            <div className="bg-secondary/30 border border-border rounded-lg p-4 space-y-2 font-mono text-xs">
              <p>{'{'}</p>
              <p className="ml-4">"sub": "user123",</p>
              <p className="ml-4">"email": "user@example.com",</p>
              <p className="ml-4">"role": "admin",</p>
              <p className="ml-4">"iat": 1516239022,</p>
              <p className="ml-4">"exp": 1516242622,  // 1 hour</p>
              <p className="ml-4">"nbf": 1516239022</p>
              <p>{'}'}</p>
            </div>
            <p className="text-xs italic">
              ✅ Includes expiration, issued-at, subject, and no sensitive data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">When NOT to Use JWT</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>When you need to revoke tokens immediately (JWTs can't be revoked until expiration)</li>
              <li>When storing highly sensitive data (use server-side sessions instead)</li>
              <li>For very short-lived tokens where a session would be more efficient</li>
            </ul>
          </section>

          <section className="space-y-4 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h2 className="text-xl font-bold text-foreground">Validate Your JWTs</h2>
            <p>
              Use Cipherly's JWT Debugger to decode, inspect, and validate your tokens. 
              Check signatures, verify claims, and ensure your tokens are properly formatted.
            </p>
            <Link 
              href="/tools/jwt-decoder-validator"
              className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try JWT Debugger
            </Link>
          </section>
        </div>
      </div>
    </article>
  );
}
