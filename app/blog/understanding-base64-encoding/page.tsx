import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AuthorBio from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: "Understanding Base64 Encoding: What It Is and Why We Use It | Cipherly Blog",
  description: "Learn how Base64 encoding works under the hood, why it's essential for web development, and why it is not a form of encryption.",
};

export default function BlogPost() {
  return (
    <article className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="space-y-12">
        <div className="space-y-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-bold">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Blog
          </Link>
          <h1 className="text-5xl font-black tracking-tighter">Understanding Base64 Encoding: What It Is and Why We Use It</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-bold">Cipherly Team</span>
            <span>•</span>
            <span>May 2026</span>
            <span>•</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Informational</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">First, Let's Clear Up a Misconception</h2>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 my-6 text-center">
              <h3 className="text-red-400 font-bold m-0 text-xl uppercase tracking-widest">Base64 is NOT Encryption</h3>
            </div>
            <p>
              The most common mistake beginners make is assuming that because Base64 text looks like scrambled gibberish (e.g., <code>SGVsbG8gV29ybGQ=</code>), it must be secure. This is absolutely false. Base64 is an <strong>encoding</strong> scheme, not encryption. Anyone can decode a Base64 string instantly without a password or key. Never use Base64 to hide passwords or sensitive data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">So, What Is Base64?</h2>
            <p>
              Base64 is a way to represent binary data (like images, compiled programs, or encrypted ciphertexts) using only 64 safe, printable ASCII characters: <code>A-Z</code>, <code>a-z</code>, <code>0-9</code>, <code>+</code>, and <code>/</code>.
            </p>
            <p>
              But why do we need to do this? Why can't we just send the raw binary data?
            </p>
            <p>
              Historically, many communication protocols on the internet (like SMTP for email) were designed to handle strictly plain text. If you try to send a raw binary file (like a JPEG image) through a system that expects text, the system might misinterpret the binary bytes as control characters. A specific byte might tell the system "end of file" or "delete line," causing the system to crash or corrupt the file entirely.
            </p>
            <p>
              Base64 solves this problem. It acts as a safe wrapper, converting unpredictable binary data into a harmless, plain-text alphabet that every system on the internet knows how to process without errors.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">How Does It Work? (The Math)</h2>
            <p>
              Computers think in 8-bit bytes. Base64 thinks in 6-bit chunks. This mismatch is the core of how the algorithm works.
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>Base64 takes three 8-bit bytes of raw data (3 × 8 = 24 bits total).</li>
              <li>It splits those 24 bits into four 6-bit chunks (4 × 6 = 24 bits).</li>
              <li>Since a 6-bit chunk can hold 64 different values (2<sup>6</sup> = 64), each chunk is mapped to one of the 64 characters in the Base64 alphabet.</li>
            </ol>
            <p className="mt-4">
              <strong>The Padding Issue:</strong> What happens if your data isn't perfectly divisible by 3 bytes? The algorithm adds padding. It uses the equals sign (<code>=</code>) at the end of the string to indicate padding. If you see one or two <code>=</code> signs at the end of a string, you almost certainly are looking at Base64.
            </p>
            <p>
              <em>Note: Because Base64 turns 3 bytes of raw data into 4 bytes of text, the resulting file size is always ~33% larger than the original.</em>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Common Use Cases in Web Development</h2>
            
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-bold text-foreground mb-2">1. Embedding Images in HTML/CSS (Data URIs)</h4>
                <p className="text-sm mb-2">Instead of forcing the browser to make a separate HTTP request to download an icon, developers can encode the image to Base64 and embed it directly into the HTML:</p>
                <code className="text-xs bg-secondary/50 px-2 py-1 rounded block overflow-hidden text-ellipsis whitespace-nowrap">
                  &lt;img src="data:image/png;base64,iVBORw0KGgoAAA..." /&gt;
                </code>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h4 className="font-bold text-foreground mb-2">2. JSON Web Tokens (JWT)</h4>
                <p className="text-sm">The header, payload, and signature of a <Link href="/tools/jwt-decoder-validator" className="text-primary hover:underline">JWT</Link> are all encoded using a slightly modified version called Base64URL. This ensures the token can be safely passed in HTTP headers and URLs without special characters breaking the request.</p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h4 className="font-bold text-foreground mb-2">3. Sending Email Attachments</h4>
                <p className="text-sm">When you attach a PDF or photo to an email, your email client automatically Base64 encodes the file so it can survive transmission across ancient SMTP mail servers.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 p-6 bg-primary/5 border border-primary/20 rounded-lg mt-8">
            <h2 className="text-xl font-bold text-foreground">Try Base64 Encoding Yourself</h2>
            <p>
              Want to see how an image or string looks when encoded? Cipherly offers a lightning-fast, entirely local Base64 encoder and decoder. You can even drag and drop files to convert them instantly in your browser.
            </p>
            <Link 
              href="/tools/base64-encode-decode"
              className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Open Base64 Encoder
            </Link>
          </section>

          <AuthorBio />
        </div>
      </div>
    </article>
  );
}
