import { Metadata } from 'next';
import { Mail, MessageSquare, HelpCircle, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact Us | Cipherly Security Toolkit",
  description: "Get in touch with the Cipherly team for support, feedback, or business inquiries.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="space-y-6 mb-16 text-center">
        <h1 className="text-5xl font-black tracking-tighter uppercase">Contact Us</h1>
        <p className="text-xl text-muted-foreground font-medium italic">
          We'd love to hear from you. Here's how you can reach the Cipherly team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="glass p-8 rounded-[2rem] space-y-4 border border-border hover:border-primary/40 transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Email Support</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            For general inquiries, bug reports, and technical support, please email us directly. 
            We aim to respond within 24-48 business hours.
          </p>
          <a href="mailto:support@cipherlyapp.com" className="inline-block mt-2 font-bold text-primary hover:underline">
            support@cipherlyapp.com
          </a>
        </div>

        <div className="glass p-8 rounded-[2rem] space-y-4 border border-border hover:border-primary/40 transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">GitHub Discussions</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Have a feature request, noticed a bug, or want to discuss a cryptography topic? 
            Open a discussion on our GitHub page to get help from the community and the team.
          </p>
          <a
            href="https://github.com/kashifdevfe/Cipherly/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 font-bold text-primary hover:underline"
          >
            Open GitHub Discussions
          </a>
        </div>
        
        <div className="glass p-8 rounded-[2rem] space-y-4 border border-border hover:border-primary/40 transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Help Center</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Check out our extensive FAQ and tutorial guides. You might find the answer to your 
            question without needing to wait for a response!
          </p>
          <a href="/blog" className="inline-block mt-2 font-bold text-primary hover:underline">
            Browse Guides & Tutorials
          </a>
        </div>
        
        <div className="glass p-8 rounded-[2rem] space-y-4 border border-border hover:border-primary/40 transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Business Inquiries</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            For partnerships, advertising, or media inquiries, please reach out to our 
            business development team.
          </p>
          <a href="mailto:business@cipherlyapp.com" className="inline-block mt-2 font-bold text-primary hover:underline">
            business@cipherlyapp.com
          </a>
        </div>
      </div>
      
      <div className="glass rounded-[3rem] p-10 md:p-16 space-y-6 text-center bg-secondary/30">
        <h2 className="text-2xl font-bold">Feedback Always Welcome</h2>
        <p className="text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          Cipherly was built to be the best browser-native cryptographic toolkit available. 
          If you have a feature request, notice a bug, or just want to say hi, your feedback 
          is what helps us improve. 
        </p>
      </div>
    </div>
  );
}
