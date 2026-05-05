import React from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-slate lg:prose-lg dark:prose-invert">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Contact Us</h1>
      <p className="text-center text-lg mb-12">
        Have questions or feedback about the Exact Age Calculator? We&apos;d love to hear from you!
      </p>
      
      <div className="bg-muted/50 p-8 rounded-3xl border border-border shadow-sm max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Email Support</h3>
            <p className="text-muted-foreground">For general inquiries, support, or feedback, please reach out to us at:</p>
            <p className="font-semibold text-primary mt-1">info@ahmedtls.pro</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Technical Feedback</h3>
            <p className="text-muted-foreground">Spotted a bug or have a feature request? Let us know so we can improve the tool for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
