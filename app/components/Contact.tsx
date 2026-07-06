"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import Ferrofluid from "@/components/Ferrofluid";
import MagicCard from "@/components/MagicCard";

export function Contact() {
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { setInView(entry.isIntersecting); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      toast.success("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      text: "+91 7307360089",
    },
    {
      icon: Mail,
      text: "harshcse1075@gmail.com",
    },
    {
      icon: MapPin,
      text: "Delhi, India",
    },
  ];

  const socials = [
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/feed/",
    },
    {
      icon: FaGithub,
      href: "https://github.com/harsh7401",
    },
    {
      icon: FaInstagram,
      href: "https://images.teepublic.com/derived/production/designs/10624995_0/1590506105/i_p:c_000000,s_630,q_90.jpg",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        px-4
        sm:px-6
        py-16
        sm:py-20
        lg:px-20
        lg:py-0
        flex
        items-center
        scroll-mt-8
      "
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {inView && (
        <Ferrofluid
          dpr={isMobile ? 0.35 : 1}
          colors={["#4F46E5", "#06B6D4", "#E0F2FE"]}
          speed={isMobile ? 0.1 : 0.2}
          scale={isMobile ? 1.0 : 1.6}
          turbulence={isMobile ? 0.5 : 1}
          fluidity={isMobile ? 0.2 : 0.1}
          rimWidth={isMobile ? 0.25 : 0.2}
          sharpness={isMobile ? 2.0 : 3.6}
          shimmer={isMobile ? 0.4 : 1.1}
          glow={isMobile ? 0.6 : 1.6}
          flowDirection="down"
          opacity={1}
          mouseInteraction={!isMobile}
          mouseStrength={1}
          mouseRadius={0.35}
          paused={!inView}
        />
      )}
    </div>

      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[100px] sm:h-[320px] sm:w-[320px] lg:h-[400px] lg:w-[400px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1"
        >
          <p className="text-xs xs:text-xs sm:text-sm uppercase tracking-[0.2em] xs:tracking-[0.28em] sm:tracking-[0.4em] text-teal-300">
            Get In Touch
          </p>

          <h2 className="mt-2 xs:mt-3 sm:mt-3 text-2xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white">
            Let&apos;s Build
            <br />
            Something Amazing
          </h2>

          <p className="mt-4 xs:mt-5 sm:mt-6 max-w-lg text-xs xs:text-sm sm:text-base leading-relaxed text-gray-400 md:text-lg">
            Whether you have an idea, project, freelance opportunity, or just
            want to say hello, I&apos;d love to hear from you.
          </p>

          {/* Contact Cards */}
          <div className="mt-5 space-y-2 xs:space-y-2.5 sm:mt-8 sm:space-y-4">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={!isMobile ? { x: 8 } : undefined}
                  className="
                    flex items-center gap-2 xs:gap-2.5 sm:gap-4 rounded-xl xs:rounded-2xl
                    border border-white/10 bg-white/5
                    p-2.5 xs:p-3 sm:p-4 backdrop-blur-md
                    transition-all duration-300
                    hover:border-teal-300/30
                  "
                >
                  <div
                    className="
                      rounded-lg xs:rounded-xl bg-teal-500/10 p-2 xs:p-2.5 sm:p-3
                      text-teal-400 shrink-0
                    "
                  >
                    <Icon size={18} className="xs:w-5 xs:h-5 sm:h-[22px] sm:w-[22px]" />
                  </div>

                  <span className="text-xs xs:text-sm sm:text-base text-white md:text-lg break-all sm:break-normal">
                    {item.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Social Icons */}
          <div className="mt-5 flex flex-wrap gap-2 xs:gap-2.5 sm:mt-8 sm:gap-4">
            {socials.map((social, index) => {
              const Icon = social.icon;

              return (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={!isMobile ? { y: -6, scale: 1.08 } : undefined}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    rounded-lg xs:rounded-xl sm:rounded-2xl border border-white/10
                    bg-white/5 p-2 xs:p-2.5 sm:p-3 text-white
                    backdrop-blur-md transition
                    hover:border-teal-300
                    hover:text-teal-300 cursor-target
                  "
                >
                  <Icon size={20} className="xs:w-[22px] xs:h-[22px] sm:w-[24px] sm:h-[24px]" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT */}
        <div className="order-2 w-full">
          <MagicCard
            enableSpotlight
            enableBorderGlow
            enableTilt={!isMobile}
            clickEffect
            glowColor="34, 211, 238"
          >
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="
                w-full rounded-3xl border border-white/10
                bg-white/5 p-4 sm:p-6 backdrop-blur-xl
              "
            >
              <div className="space-y-4">
                {/* Name */}
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                  className="
                    w-full rounded-2xl border border-white/10
                    bg-black/30 px-4 py-3 sm:px-6 text-sm sm:text-base text-white
                    outline-none transition
                    placeholder:text-gray-500
                    focus:border-teal-300
                    focus:ring-2 focus:ring-teal-300/20
                  "
                />

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  required
                  className="
                    w-full rounded-2xl border border-white/10
                    bg-black/30 px-4 py-3 sm:px-6 text-sm sm:text-base text-white
                    outline-none transition
                    placeholder:text-gray-500
                    focus:border-teal-300
                    focus:ring-2 focus:ring-teal-300/20
                  "
                />

                {/* Phone */}
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  required
                  className="
                    w-full rounded-2xl border border-white/10
                    bg-black/30 px-4 py-3 sm:px-6 text-sm sm:text-base text-white
                    outline-none transition
                    placeholder:text-gray-500
                    focus:border-teal-300
                    focus:ring-2 focus:ring-teal-300/20
                  "
                />

                {/* Message */}
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  required
                  className="
                    w-full rounded-2xl border border-white/10
                    bg-black/30 px-4 py-4 sm:px-6 text-sm sm:text-base text-white
                    outline-none transition
                    placeholder:text-gray-500
                    resize-none
                    focus:border-teal-300
                    focus:ring-2 focus:ring-teal-300/20
                  "
                />

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading && !isMobile ? { scale: 1.02 } : undefined}
                  whileTap={!loading ? { scale: 0.97 } : undefined}
                  className={`
                    w-full rounded-2xl
                    px-6 py-3.5 font-semibold text-sm sm:text-base
                    shadow-[0_0_25px_rgba(34,211,238,0.35)]
                    transition cursor-target
                    ${
                      loading
                        ? "bg-teal-400/60 text-black cursor-not-allowed"
                        : "bg-teal-500 text-black hover:bg-teal-400"
                    }
                  `}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div
                        className="
                          h-5 w-5 animate-spin rounded-full
                          border-2 border-black/20 border-t-black
                        "
                      />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </div>
            </motion.form>
          </MagicCard>
        </div>
      </div>
    </section>
  );
}