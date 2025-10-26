import { useState, useEffect } from 'react';
import { TrendingUp, MapPin, CheckCircle, MessageCircle, Target, Users, Lightbulb, Rocket, BarChart3, Shield, X, Search, Share2, TrendingUpIcon, Menu, ChevronDown } from 'lucide-react';
import { supabase } from './lib/supabase';
import PhoneInput from './components/PhoneInput';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phoneCountryCode: '+1',
    phoneNumber: '',
    problem: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitStatus('idle');
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('growth_plan_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            business_name: formData.businessName,
            phone_country_code: formData.phoneCountryCode,
            phone_number: formData.phoneNumber,
            problem: formData.problem,
            message: formData.message
          }
        ]);

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        businessName: '',
        phoneCountryCode: '+1',
        phoneNumber: '',
        problem: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const scrollToContact = () => {
    const ctaSection = document.getElementById('contact-form');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80;
      const sectionTop = section.offsetTop - navHeight;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.querySelectorAll('.scroll-animate').forEach(el => {
        el.classList.add('scroll-animate-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const animateElements = document.querySelectorAll('.scroll-animate');

    setTimeout(() => {
      animateElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      animateElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'how-we-work', 'why-choose-us', 'what-makes-us-different', 'faq', 'contact-form'];
      const navHeight = 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= navHeight && rect.bottom >= navHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-beige-100">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/removed bg (1) copy.png"
                alt="IMM Results"
                className="h-10 w-auto cursor-pointer"
                onClick={() => scrollToSection('home')}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-base font-semibold transition-colors duration-200 hover:text-primary-600 ${
                  activeSection === 'home' ? 'text-primary-600' : 'text-neutral-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`text-base font-semibold transition-colors duration-200 hover:text-primary-600 ${
                  activeSection === 'services' ? 'text-primary-600' : 'text-neutral-700'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('how-we-work')}
                className={`text-base font-semibold transition-colors duration-200 hover:text-primary-600 ${
                  activeSection === 'how-we-work' ? 'text-primary-600' : 'text-neutral-700'
                }`}
              >
                How We Work
              </button>
              <button
                onClick={() => scrollToSection('why-choose-us')}
                className={`text-base font-semibold transition-colors duration-200 hover:text-primary-600 ${
                  activeSection === 'why-choose-us' ? 'text-primary-600' : 'text-neutral-700'
                }`}
              >
                Why Choose Us?
              </button>
              <button
                onClick={() => scrollToSection('what-makes-us-different')}
                className={`text-base font-semibold transition-colors duration-200 hover:text-primary-600 ${
                  activeSection === 'what-makes-us-different' ? 'text-primary-600' : 'text-neutral-700'
                }`}
              >
                The Difference
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className={`text-base font-semibold transition-colors duration-200 hover:text-primary-600 ${
                  activeSection === 'faq' ? 'text-primary-600' : 'text-neutral-700'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('contact-form')}
                className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-bold text-base hover:bg-primary-700 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-neutral-200">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection('home')}
                  className={`text-left text-base font-semibold transition-colors duration-200 hover:text-primary-600 py-2 ${
                    activeSection === 'home' ? 'text-primary-600' : 'text-neutral-700'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className={`text-left text-base font-semibold transition-colors duration-200 hover:text-primary-600 py-2 ${
                    activeSection === 'services' ? 'text-primary-600' : 'text-neutral-700'
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('how-we-work')}
                  className={`text-left text-base font-semibold transition-colors duration-200 hover:text-primary-600 py-2 ${
                    activeSection === 'how-we-work' ? 'text-primary-600' : 'text-neutral-700'
                  }`}
                >
                  How We Work
                </button>
                <button
                  onClick={() => scrollToSection('why-choose-us')}
                  className={`text-left text-base font-semibold transition-colors duration-200 hover:text-primary-600 py-2 ${
                    activeSection === 'why-choose-us' ? 'text-primary-600' : 'text-neutral-700'
                  }`}
                >
                  Why Choose Us?
                </button>
                <button
                  onClick={() => scrollToSection('what-makes-us-different')}
                  className={`text-left text-base font-semibold transition-colors duration-200 hover:text-primary-600 py-2 ${
                    activeSection === 'what-makes-us-different' ? 'text-primary-600' : 'text-neutral-700'
                  }`}
                >
                  The Difference
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className={`text-left text-base font-semibold transition-colors duration-200 hover:text-primary-600 py-2 ${
                    activeSection === 'faq' ? 'text-primary-600' : 'text-neutral-700'
                  }`}
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollToSection('contact-form')}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold text-base hover:bg-primary-700 transition-all duration-200 text-left"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section id="home" className="py-24 px-6 bg-beige-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-3 leading-tight tracking-tight scroll-animate">
            More Leads. More Customers. All in 30 Days.
          </h1>
          <p className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6 scroll-animate">
            Guaranteed.
          </p>
          <p className="text-xl md:text-2xl text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto scroll-animate scroll-animate-delay-1">
            We put your business in front of locals actively searching for your services - starting this month.
          </p>
          <button
            onClick={scrollToContact}
            className="bg-primary-600 text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-primary-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-200 scroll-animate scroll-animate-delay-2"
          >
            Get My Guaranteed Growth Plan
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem-section" className="py-24 px-6 bg-beige-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-20 text-center tracking-tight scroll-animate">
            The Problem Most Businesses Face
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 cursor-pointer scroll-animate">
              <div className="w-14 h-14 mb-6 text-neutral-400 bg-neutral-50 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">DIY Marketing</h3>
              <p className="text-neutral-600 leading-relaxed">
                Doing it yourself is exhausting and takes time away from running your business.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 cursor-pointer scroll-animate scroll-animate-delay-1">
              <div className="w-14 h-14 mb-6 text-neutral-400 bg-neutral-50 rounded-xl flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Hiring Staff</h3>
              <p className="text-neutral-600 leading-relaxed">
                Hiring someone in house is costly and risky.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 cursor-pointer scroll-animate scroll-animate-delay-2">
              <div className="w-14 h-14 mb-6 text-neutral-400 bg-neutral-50 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Hiring an Agency</h3>
              <p className="text-neutral-600 leading-relaxed">
                Large agencies often overlook small businesses or hand your account to inexperienced staff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we can help you grow - New Section */}
      <section id="services" className="py-24 px-6 bg-beige-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 text-center tracking-tight scroll-animate">
            How we can help you grow
          </h2>
          <p className="text-xl text-neutral-600 mb-16 text-center leading-relaxed max-w-3xl mx-auto scroll-animate scroll-animate-delay-1">
            We handle the marketing that brings clients to you
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 cursor-pointer scroll-animate">
              <div className="w-14 h-14 mb-6 text-primary-600 bg-primary-50 rounded-xl flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Ads To Get To The Top Of Google</h3>
              <p className="text-neutral-600 leading-relaxed">
                Show up when locals search for what you offer
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 cursor-pointer scroll-animate scroll-animate-delay-1">
              <div className="w-14 h-14 mb-6 text-primary-600 bg-primary-50 rounded-xl flex items-center justify-center">
                <Share2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">FB/IG Ads To Reach EVERY Local Client</h3>
              <p className="text-neutral-600 leading-relaxed">
                Be everywhere. Google, Instagram, Facebook, YouTube…
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 cursor-pointer scroll-animate scroll-animate-delay-2">
              <div className="w-14 h-14 mb-6 text-primary-600 bg-primary-50 rounded-xl flex items-center justify-center">
                <TrendingUpIcon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Reach Number 1 On Google For Free</h3>
              <p className="text-neutral-600 leading-relaxed">
                Be the #1 on Google Maps organically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="how-we-work" className="py-24 px-6 bg-beige-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight scroll-animate">
              How We Work
            </h2>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed scroll-animate scroll-animate-delay-1">
              We'll take over and do the heavy lifting. You just enjoy more clients.
            </p>
          </div>

          {/* 4-Phase Process - Interactive Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Phase 1 Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 text-center group cursor-pointer scroll-animate">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <Lightbulb className="w-10 h-10 text-primary-600 group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <div className="mb-2 text-primary-600 font-bold text-sm uppercase tracking-wider">Phase 1</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Strategy & Setup</h3>
              <p className="text-neutral-600 leading-relaxed text-base">
                We analyze your business and create a custom plan that targets your ideal customers.
              </p>
            </div>

            {/* Phase 2 Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 text-center group cursor-pointer scroll-animate scroll-animate-delay-1">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <Rocket className="w-10 h-10 text-primary-600 group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <div className="mb-2 text-primary-600 font-bold text-sm uppercase tracking-wider">Phase 2</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Execution & Launch</h3>
              <p className="text-neutral-600 leading-relaxed text-base">
                We build and launch campaigns designed to generate qualified leads and sales.
              </p>
            </div>

            {/* Phase 3 Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 text-center group cursor-pointer scroll-animate scroll-animate-delay-2">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <BarChart3 className="w-10 h-10 text-primary-600 group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <div className="mb-2 text-primary-600 font-bold text-sm uppercase tracking-wider">Phase 3</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Optimize & Scale</h3>
              <p className="text-neutral-600 leading-relaxed text-base">
                We continuously refine your campaigns to maximize ROI and scale what works.
              </p>
            </div>

            {/* Phase 4 Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 text-center group cursor-pointer scroll-animate scroll-animate-delay-3">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <Shield className="w-10 h-10 text-primary-600 group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <div className="mb-2 text-primary-600 font-bold text-sm uppercase tracking-wider">Phase 4</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Guarantee & Accountability</h3>
              <p className="text-neutral-600 leading-relaxed text-base">
                We share your risk and stay accountable with transparent reporting and guaranteed results.
              </p>
            </div>
          </div>

          {/* Micro CTA */}
          <div className="text-center">
            <button
              onClick={scrollToContact}
              className="bg-primary-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-200"
            >
              Ready To See This In Action?
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="why-choose-us" className="py-24 px-6 bg-beige-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-20 text-center tracking-tight scroll-animate">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* IMM Results - Left Side */}
            <div className="bg-primary-50 p-12 rounded-2xl shadow-xl border-2 border-primary-600 transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer scroll-animate">
              <div className="mb-10">
                <img
                  src="/removed bg (1) copy copy.png"
                  alt="IMM Results"
                  className="h-16 w-auto"
                />
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-neutral-900 leading-relaxed font-medium">If it doesn't work, we refund you</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-neutral-900 leading-relaxed font-medium">Start small and see if we're a good fit</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-neutral-900 leading-relaxed font-medium">Facebook, Instagram, Google, we cover it all</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-neutral-900 leading-relaxed font-medium">Stay flexible - no long-term commitments required</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-neutral-900 leading-relaxed font-medium">Regular calls to review what's working</span>
                </li>
              </ul>
            </div>

            {/* Other Agencies - Right Side */}
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-neutral-200 transition-all duration-500 hover:opacity-50 scroll-animate scroll-animate-delay-1">
              <h3 className="text-3xl font-bold text-neutral-400 mb-10">Other Agencies</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-neutral-500" />
                  </div>
                  <span className="text-lg text-neutral-500 leading-relaxed">Generic content templates</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-neutral-500" />
                  </div>
                  <span className="text-lg text-neutral-500 leading-relaxed">Monthly reporting only</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-neutral-500" />
                  </div>
                  <span className="text-lg text-neutral-500 leading-relaxed">Separate teams for different platforms</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-neutral-500" />
                  </div>
                  <span className="text-lg text-neutral-500 leading-relaxed">Long-term contracts required</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-neutral-500" />
                  </div>
                  <span className="text-lg text-neutral-500 leading-relaxed">One-size-fits-all approach</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section id="what-makes-us-different" className="py-24 px-6 bg-beige-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-20 text-center tracking-tight scroll-animate">
            What Makes Us Different
          </h2>

          <div className="grid md:grid-cols-3 gap-x-8 gap-y-16">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 text-center group cursor-pointer scroll-animate">
              <div className="text-4xl mb-6">
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <TrendingUp className="w-8 h-8 text-primary-600 group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Focused on ROI</h3>
              <p className="text-neutral-600 leading-relaxed">
                We measure success by revenue growth, not social media likes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 text-center group cursor-pointer scroll-animate scroll-animate-delay-1">
              <div className="text-4xl mb-6">
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <MapPin className="w-8 h-8 text-primary-600 group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Local Expertise</h3>
              <p className="text-neutral-600 leading-relaxed">
                We understand your market and speak directly to your customers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 text-center group cursor-pointer scroll-animate scroll-animate-delay-2">
              <div className="text-4xl mb-6">
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-primary-600 group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Performance Guaranteed</h3>
              <p className="text-neutral-600 leading-relaxed">
                We share your risk. No results means no payment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 text-center group cursor-pointer scroll-animate scroll-animate-delay-3">
              <div className="text-4xl mb-6">
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <MessageCircle className="w-8 h-8 text-primary-600 group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Direct Communication</h3>
              <p className="text-neutral-600 leading-relaxed">
                You always work directly with real people who care about your business.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 text-center group cursor-pointer scroll-animate scroll-animate-delay-4">
              <div className="text-4xl mb-6">
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <Target className="w-8 h-8 text-primary-600 group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">No Guesswork</h3>
              <p className="text-neutral-600 leading-relaxed">
                We use proven campaigns that deliver consistent results.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-neutral-100 text-center group cursor-pointer scroll-animate scroll-animate-delay-5">
              <div className="text-4xl mb-6">
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                  <Users className="w-8 h-8 text-primary-600 group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Personal Attention</h3>
              <p className="text-neutral-600 leading-relaxed">
                We only take on clients we can give full focus and impact to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 text-center tracking-tight scroll-animate">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-neutral-600 mb-16 text-center leading-relaxed">
            Everything you need to know about working with us
          </p>

          <div className="space-y-4">
            {[
              {
                question: "What exactly are you going to do for my business?",
                answer: (
                  <div>
                    <p className="mb-4">We handle everything from strategy to execution. That means we:</p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>Build your custom advertising plan</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>Create and manage your Facebook and Google ad campaigns</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>Optimise and refine performance for the best return</span>
                      </li>
                    </ul>
                    <p className="mt-4">In short, we handle the marketing whilst you focus on running your business.</p>
                  </div>
                )
              },
              {
                question: "How long does it take to start seeing results?",
                answer: "You can expect to start seeing more leads turn into paying customers within 30 days of launching your campaigns."
              },
              {
                question: "How much is this going to cost me upfront?",
                answer: "No two businesses are the same. Every campaign is personalised and tailored to suit your local market, goals, and ad spend. We'll discuss your budget and goals during your strategy session, and design a plan that fits your situation whilst maximising your return."
              },
              {
                question: "How do I know I'll get my money back if it doesn't work?",
                answer: "Our entire model is built around results. If we don't deliver, you don't lose. We only succeed when you see real growth and that's why our guarantee ensures you can move forward with total confidence."
              },
              {
                question: "How much of my time is this going to require?",
                answer: "Very little. We do the heavy lifting from research to launch to optimisation. We'll just need a short onboarding call and regular check-ins to review performance and updates."
              },
              {
                question: "Do I need to learn how to do any of this technical stuff?",
                answer: "Not at all. That's what we're here for. You don't need to know how ads, tracking, or funnels work. We manage all of that for you so you can focus on serving your customers."
              },
              {
                question: "What if this doesn't work for my type of business?",
                answer: "Our approach is built around understanding your market and audience first. Because every campaign is customised, we only move forward when we're confident we can help your business get results."
              },
              {
                question: "How long am I locked into this contract?",
                answer: "You're not. We believe in earning your business month after month, not trapping you in a long-term commitment. You stay because it's working, not because you're stuck."
              },
              {
                question: "What happens if I want to cancel?",
                answer: "Just contact us directly and we'll make sure to handle it the same day."
              },
              {
                question: "Can I think about it and get back to you?",
                answer: "Of course. There's no pressure. We'll provide your custom growth plan so you can review it and make an informed decision when you're ready."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-beige-50 rounded-xl border border-neutral-200 overflow-hidden scroll-animate"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-beige-100 transition-colors duration-200"
                >
                  <h3 className="text-lg font-bold text-neutral-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-neutral-700 leading-relaxed">
                    {typeof faq.answer === 'string' ? faq.answer : faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact-form" className="py-24 px-6 bg-beige-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            Get Your Guaranteed Growth Plan
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 mb-16 leading-relaxed max-w-3xl mx-auto">
            Let's build a marketing plan that drives real sales, not just traffic.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
            {submitStatus === 'success' && (
              <div className="bg-primary-50 border-2 border-primary-600 text-primary-900 px-6 py-4 rounded-xl">
                <p className="font-semibold">Success!</p>
                <p>Thank you for your submission. We'll be in touch soon!</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-accent-50 border-2 border-accent-600 text-accent-900 px-6 py-4 rounded-xl">
                <p className="font-semibold">Error</p>
                <p>{errorMessage}</p>
              </div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-6 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all bg-white disabled:opacity-50 disabled:cursor-not-allowed text-neutral-900 placeholder-neutral-400"
              required
              onChange={handleChange}
              value={formData.name}
              disabled={isSubmitting}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-6 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all bg-white disabled:opacity-50 disabled:cursor-not-allowed text-neutral-900 placeholder-neutral-400"
              required
              onChange={handleChange}
              value={formData.email}
              disabled={isSubmitting}
            />
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              className="w-full px-6 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all bg-white disabled:opacity-50 disabled:cursor-not-allowed text-neutral-900 placeholder-neutral-400"
              required
              onChange={handleChange}
              value={formData.businessName}
              disabled={isSubmitting}
            />
            <PhoneInput
              countryCode={formData.phoneCountryCode}
              phoneNumber={formData.phoneNumber}
              onCountryCodeChange={(code) => setFormData({ ...formData, phoneCountryCode: code })}
              onPhoneNumberChange={(number) => setFormData({ ...formData, phoneNumber: number })}
              disabled={isSubmitting}
              required={false}
            />
            <div className="w-full text-left">
              <label htmlFor="problem" className="block text-neutral-800 font-semibold mb-3 text-base">
                What is the #1 problem you are facing?
              </label>
              <select
                id="problem"
                name="problem"
                className="w-full px-6 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all bg-white text-neutral-900 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                required
                onChange={handleChange}
                value={formData.problem}
                disabled={isSubmitting}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23525252' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1.5rem center',
                  backgroundSize: '12px'
                }}
              >
                <option value="" disabled>Select an option</option>
                <option value="not-enough-leads">I don't have enough leads.</option>
                <option value="low-quality-leads">My leads are low quality or too cheap.</option>
                <option value="no-time-marketing">I don't have time to do marketing myself.</option>
                <option value="agency-not-delivering">My current marketing agency isn't delivering results.</option>
                <option value="just-starting">I'm just starting out and need a plan.</option>
                <option value="other">Other.</option>
              </select>
            </div>
            <div className="w-full text-left">
              <label htmlFor="message" className="block text-neutral-800 font-semibold mb-3 text-base">
                Tell us a bit more about your situation.
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-6 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all resize-none bg-white disabled:opacity-50 disabled:cursor-not-allowed text-neutral-900 placeholder-neutral-400"
                required
                onChange={handleChange}
                value={formData.message}
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 hover:scale-105 active:scale-100 cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Get My Guaranteed Growth Plan'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-neutral-600">
            <a href="mailto:info@immresults.com" className="hover:text-primary-600 transition-colors font-medium">
              info@immresults.com
            </a>
          </p>
          <p className="text-neutral-500 text-sm">
            © IMM Results
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
