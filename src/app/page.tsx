"use client";

import { useState, useRef } from "react";
import Image from "next/image";


export default function Home() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    weeks: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  
  const yearsRef = useRef<HTMLDivElement>(null);
  const monthsRef = useRef<HTMLDivElement>(null);
  const daysRef = useRef<HTMLDivElement>(null);

  const isLeapYear = (y: number) => {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  };

  const isValidDate = (d: number, m: number, y: number) => {
    if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
    if (m < 1 || m > 12) return false;
    
    const daysInMonth = [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return d > 0 && d <= daysInMonth[m - 1];
  };

  const animateValue = (ref: React.RefObject<HTMLDivElement | null>, start: number, end: number, duration: number) => {
    if (!ref.current) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      if (ref.current) {
        ref.current.innerHTML = Math.floor(easeProgress * (end - start) + start).toString();
      }
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!d || !m || !y) {
      setError("Please fill in all fields.");
      setResults(null);
      return;
    }

    if (!isValidDate(d, m, y)) {
      setError("Must be a valid date.");
      setResults(null);
      return;
    }

    const birthDate = new Date(y, m - 1, d);
    const today = new Date();

    if (birthDate > today) {
      setError("Must be in the past.");
      setResults(null);
      return;
    }

    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const weeks = Math.floor(diffDays / 7);
    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    const minutes = Math.floor(diffTime / (1000 * 60));
    const seconds = Math.floor(diffTime / 1000);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResults({ years, months, days, totalDays: diffDays, weeks, hours, minutes, seconds });

    setTimeout(() => {
      animateValue(yearsRef, 0, years, 1000);
      animateValue(monthsRef, 0, months, 1000);
      animateValue(daysRef, 0, days, 1000);
    }, 0);
  };

  const handleReset = () => {
    setDay("");
    setMonth("");
    setYear("");
    setError("");
    setResults(null);
  };



  return (
    <article className="max-w-[1200px] mx-auto px-4 py-8 md:py-20">
      
      {/* Hero Section */}
      <header className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 text-foreground tracking-tight">
          Free Exact Age Calculator
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed md:leading-loose">
          Instantly calculate your chronological age in years, months, and days. Discover exactly how many days you&apos;ve been alive with our precision date of birth calculator.
        </p>
      </header>

      {/* The Interactive Calculator Tool */}
      <section className="mb-12 md:mb-20 flex justify-center w-full">
        <div
          className="w-full max-w-2xl p-5 sm:p-12 rounded-3xl sm:rounded-[2rem] shadow-2xl border border-border bg-card text-card-foreground relative transition-all duration-300"
          aria-labelledby="calculator-form-title"
        >
          <h2 id="calculator-form-title" className="sr-only">Interactive Age Calculator Form</h2>
          <form onSubmit={calculateAge} noValidate>
            <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-8">
              <div className="flex flex-col">
                <label htmlFor="day" className="text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide text-muted-foreground ml-1">
                  Day
                </label>
                <input
                  type="number"
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  min="1"
                  max="31"
                  required
                  aria-required="true"
                  className="p-3 sm:p-4 border-2 border-border rounded-xl sm:rounded-2xl bg-background text-foreground text-base sm:text-xl transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 w-full font-medium"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="month" className="text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide text-muted-foreground ml-1">
                  Month
                </label>
                <input
                  type="number"
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  min="1"
                  max="12"
                  required
                  aria-required="true"
                  className="p-3 sm:p-4 border-2 border-border rounded-xl sm:rounded-2xl bg-background text-foreground text-base sm:text-xl transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 w-full font-medium"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="year" className="text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide text-muted-foreground ml-1">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YYYY"
                  min="1900"
                  required
                  aria-required="true"
                  className="p-3 sm:p-4 border-2 border-border rounded-xl sm:rounded-2xl bg-background text-foreground text-base sm:text-xl transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 w-full font-medium"
                />
              </div>
            </div>

            {error && (
              <div className="text-destructive bg-destructive/10 p-3 sm:p-4 rounded-xl text-sm mb-6 text-center font-bold border border-destructive/20" role="alert">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-2">
              <button
                type="submit"
                className="flex-[2] py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-extrabold text-base sm:text-lg text-primary-foreground bg-primary shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1 active:translate-y-0 focus:ring-4 focus:ring-primary/30 outline-none"
              >
                Calculate Age
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg bg-background text-muted-foreground border-2 border-border hover:bg-muted hover:text-foreground transition-all focus:ring-4 focus:ring-border outline-none"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Unified Results Dashboard */}
          {results && (
            <div className="animate-fade-in mt-10 sm:mt-12 bg-muted/30 p-4 sm:p-8 rounded-3xl border border-border shadow-inner" aria-live="polite">
              <h3 className="text-sm sm:text-lg font-bold mb-4 sm:mb-6 text-center text-foreground uppercase tracking-wider">Your Exact Age</h3>
              
              {/* Primary Years/Months/Days */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-card p-4 sm:p-6 rounded-2xl text-center border border-border shadow-md transform transition-all hover:scale-105">
                  <div ref={yearsRef} className="text-3xl sm:text-6xl font-black text-primary mb-1 sm:mb-2 leading-none">
                    {results.years}
                  </div>
                  <div className="text-[10px] sm:text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    Years
                  </div>
                </div>
                <div className="bg-card p-4 sm:p-6 rounded-2xl text-center border border-border shadow-md transform transition-all hover:scale-105">
                  <div ref={monthsRef} className="text-3xl sm:text-6xl font-black text-primary mb-1 sm:mb-2 leading-none">
                    {results.months}
                  </div>
                  <div className="text-[10px] sm:text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    Months
                  </div>
                </div>
                <div className="bg-card p-4 sm:p-6 rounded-2xl text-center border border-border shadow-md transform transition-all hover:scale-105">
                  <div ref={daysRef} className="text-3xl sm:text-6xl font-black text-primary mb-1 sm:mb-2 leading-none">
                    {results.days}
                  </div>
                  <div className="text-[10px] sm:text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    Days
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-card p-4 sm:p-6 rounded-2xl border border-border shadow-sm flex flex-wrap justify-center gap-3 sm:gap-6">
                <p className="text-muted-foreground text-sm sm:text-lg font-medium text-center">
                  <span className="font-extrabold text-foreground text-base sm:text-xl">
                    {results.weeks.toLocaleString()}
                  </span>{" "}
                  weeks
                </p>
                <div className="hidden sm:block w-px bg-border"></div>
                <p className="text-muted-foreground text-sm sm:text-lg font-medium text-center">
                  <span className="font-extrabold text-foreground text-base sm:text-xl">
                    {results.totalDays.toLocaleString()}
                  </span>{" "}
                  days
                </p>
                <div className="hidden sm:block w-px bg-border"></div>
                <p className="text-muted-foreground text-sm sm:text-lg font-medium text-center">
                  <span className="font-extrabold text-foreground text-base sm:text-xl">
                    {results.hours.toLocaleString()}
                  </span>{" "}
                  hours
                </p>
                <div className="hidden sm:block w-px bg-border"></div>
                <p className="text-muted-foreground text-sm sm:text-lg font-medium text-center">
                  <span className="font-extrabold text-foreground text-base sm:text-xl">
                    {results.minutes.toLocaleString()}
                  </span>{" "}
                  mins
                </p>
                <div className="hidden sm:block w-px bg-border"></div>
                <p className="text-muted-foreground text-sm sm:text-lg font-medium text-center">
                  <span className="font-extrabold text-foreground text-base sm:text-xl">
                    {results.seconds.toLocaleString()}
                  </span>{" "}
                  secs
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Sections */}
      <section className="mt-20 md:mt-32 space-y-20 md:space-y-32">
        
        {/* Why Use This Tool */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-foreground">Why Use Our Exact Age Calculator?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Knowing your exact chronological age is more than just a number. It&apos;s used for official documents, competitive sports eligibility, and tracking personal milestones with precision. 
            </p>
            <ul className="space-y-4">
              {[
                "100% Privacy Friendly: Calculations happen in your browser.",
                "Precision Accuracy: Accounts for leap years and varying month lengths.",
                "Detailed Breakdown: See your age in weeks, days, hours, and even seconds.",
                "Zero Cost: No registration or subscription required."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground font-semibold">
                  <span className="text-primary mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/30 rounded-[2.5rem] p-8 border border-border shadow-inner flex items-center justify-center">
            <Image 
              src="/exact-age-calculator-illustration.png" 
              alt="Age Calculation Illustration" 
              width={400} 
              height={400} 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* How it Works */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-foreground">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Enter DOB", desc: "Input your day, month, and year of birth." },
              { step: "02", title: "Smart Compute", desc: "Our algorithm calculates the exact time difference." },
              { step: "03", title: "Get Results", desc: "Instantly see your age in multiple formats." }
            ].map((s, i) => (
              <div key={i} className="space-y-4">
                <div className="text-5xl font-black text-primary/20">{s.step}</div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed FAQ Section */}
        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-16 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-foreground">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                q: "How is my exact age calculated?",
                a: "Our tool calculates your age by finding the difference between your date of birth and the current date. It uses the Gregorian calendar system, ensuring every leap year and month length is accounted for."
              },
              {
                q: "Is my data stored on your servers?",
                a: "No. Your privacy is our priority. All calculations are performed locally in your browser. We do not collect, store, or share your date of birth or any personal information."
              },
              {
                q: "Can I use this for official purposes?",
                a: "While our calculator is highly accurate, it is intended for informational and entertainment purposes. For official legal or government documents, always refer to your birth certificate or official ID."
              },
              {
                q: "Does it account for time zones?",
                a: "The calculator uses your local device time to determine 'today'. This ensures that the calculation is relevant to where you are currently located."
              }
            ].map((faq, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-xl font-bold text-foreground flex gap-3">
                  <span className="text-primary italic">Q.</span> {faq.q}
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-7 border-l-2 border-primary/20">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </article>
  );
}
