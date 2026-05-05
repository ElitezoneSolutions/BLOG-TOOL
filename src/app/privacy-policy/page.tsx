import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-slate lg:prose-lg dark:prose-invert">
      <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
        <p>Welcome to Exact Age Calculator (ahmedtls.pro). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
        <p>We do not require any registration or personal identification to use our Age Calculator. All age calculations are performed on the client-side (in your browser) or processed temporarily to provide results and are not stored on our servers.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">3. Advertising</h2>
        <p>We use Google AdSense to serve ads on our website. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</p>
        <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
        <p>We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, you can contact us at info@ahmedtls.pro.</p>
      </section>
    </div>
  );
}
