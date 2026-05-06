import Image from "next/image";

export default function Footer() {
  const shareUrl = "https://ahmedtls.pro";
  const shareText = "Check out this amazing tool!";

  return (
    <footer className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-border max-w-[1200px] mx-auto px-4 pb-12">
      {/* Social Sharing Buttons */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 md:mb-20 border-b border-border pb-10 md:pb-16">
        <span className="font-bold text-muted-foreground uppercase tracking-widest text-sm">Share this tool</span>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2 sm:py-3 bg-[#1DA1F2] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md hover:-translate-y-1"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
            Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2 sm:py-3 bg-[#1877F2] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md hover:-translate-y-1"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            Facebook
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2 sm:py-3 bg-[#0A66C2] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md hover:-translate-y-1"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            LinkedIn
          </a>
        </div>
      </section>

      {/* Author Bio */}
      <section className="bg-muted/50 border border-border p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] flex flex-col md:flex-row gap-6 md:gap-10 items-center shadow-lg hover:shadow-xl transition-shadow text-center md:text-left">
        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-4 border-background shadow-xl">
          <Image
            src="/author-profile.jpeg"
            alt="Ahmed Raza"
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3 md:mb-4 text-foreground tracking-tight">About the Author: Ahmed Raza</h3>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed md:leading-loose max-w-2xl">
            Ahmed Raza is a software developer dedicated to building high-performance utility applications. With a background in crafting scalable digital solutions, he ensures that tools prioritize technical precision, user privacy, and rapid performance.
          </p>
        </div>
      </section>

      <nav className="flex flex-wrap justify-center gap-6 mt-12 mb-8">
        <a href="/blog" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Blog</a>
        <a href="/privacy-policy" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
        <a href="/contact" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
      </nav>

      <div className="text-center mt-12 text-sm text-muted-foreground font-medium">
        &copy; {new Date().getFullYear()} ahmedtls.pro. All rights reserved.
      </div>
    </footer>
  );
}
