import React, { useRef } from "react";
import { Phone, Mail, MapPin, ArrowRight, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";
interface ContactProps {
  isDarkMode?: boolean;
}

export default function Contact({ isDarkMode = true }: ContactProps) {
  const phone_no = "+94 77 352 8200";
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Let's Build the Future
              </span>
            </h2>
            <p
              className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-800"} max-w-3xl mx-auto`}
            >
              Ready to bring your construction project to life? Connect with our
              team of experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-8 order-2 md:order-1">
              <h3
                className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-8`}
              >
                Get In Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start sm:items-center group gap-4 sm:gap-0">
                  <div className="p-3 sm:p-4 bg-cyan-500/20 rounded-full border border-cyan-400/30 mr-4 sm:mr-6 group-hover:bg-cyan-500/30 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div
                      className={`${isDarkMode ? "text-white" : "text-gray-900"} font-semibold`}
                    >
                      Call Us
                    </div>
                    <div
                      className={`${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
                    >
                      {phone_no}
                    </div>
                    <div className="text-sm text-emerald-400">
                      Available 24/7
                    </div>
                  </div>
                </div>
                <div className="flex items-start sm:items-center group gap-4 sm:gap-0">
                  <div className="p-3 sm:p-4 bg-purple-500/20 rounded-full border border-purple-400/30 mr-4 sm:mr-6 group-hover:bg-purple-500/30 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div
                      className={`${isDarkMode ? "text-white" : "text-gray-900"} font-semibold`}
                    >
                      Email
                    </div>
                    <div
                      className={`${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
                    >
                      info@cb.lk
                    </div>
                    <div className="text-sm text-emerald-400">
                      Response within 2 hours
                    </div>
                  </div>
                </div>
                <div className="flex items-start sm:items-center group gap-4 sm:gap-0">
                  <div className="p-3 sm:p-4 bg-emerald-500/20 rounded-full border border-emerald-400/30 mr-4 sm:mr-6 group-hover:bg-emerald-500/30 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div
                      className={`${isDarkMode ? "text-white" : "text-gray-900"} font-semibold`}
                    >
                      Visit Us
                    </div>
                    <div
                      className={`${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
                    >
                      123 Main Street
                      <br />
                      Kurunegala, Sri Lanka
                    </div>
                    <div className="text-sm text-emerald-400">
                      Open Mon-Sat 9AM-6PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${isDarkMode ? "glass-card" : "bg-white border border-gray-200 shadow-lg"} rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 ${isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-50"} transition-all duration-300 order-1 md:order-2`}
            >
              <h3
                className={`text-xl sm:text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4 sm:mb-6 flex items-center`}
              >
                <Sparkles className="w-6 h-6 text-cyan-400 mr-2 animate-pulse" />
                Start Your Project
              </h3>
              <form
                ref={form}
                onSubmit={sendEmail}
                className="space-y-3 sm:space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="hidden"
                    name="to_email"
                    value="parakramawork@gmail.com"
                  />
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    className={`px-3 py-2 sm:px-4 sm:py-3 ${isDarkMode ? "bg-white/10 text-white placeholder-gray-400 border-white/20" : "bg-gray-50 text-gray-900 placeholder-gray-600 border-gray-300"} backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all`}
                    required
                  />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    className={`px-3 py-2 sm:px-4 sm:py-3 ${isDarkMode ? "bg-white/10 text-white placeholder-gray-400 border-white/20" : "bg-gray-50 text-gray-900 placeholder-gray-600 border-gray-300"} backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all`}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 ${isDarkMode ? "bg-white/10 text-white placeholder-gray-400 border-white/20" : "bg-gray-50 text-gray-900 placeholder-gray-600 border-gray-300"} backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all`}
                    required
                  />
                </div>
                <div>
                  <select
                    name="project_type"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 ${isDarkMode ? "bg-white/10 text-white border-white/20" : "bg-gray-50 text-gray-900 border-gray-300"} backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all`}
                    required
                  >
                    <option value="">Project Type</option>
                    <option value="commercial">Commercial Construction</option>
                    <option value="residential">
                      Residential Construction
                    </option>
                    <option value="infrastructure">
                      Infrastructure Projects
                    </option>
                    <option value="renovation">
                      Renovation & Retrofitting
                    </option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 ${isDarkMode ? "bg-white/10 text-white placeholder-gray-400 border-white/20" : "bg-gray-50 text-gray-900 placeholder-gray-600 border-gray-300"} backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all resize-none`}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 btn-glow bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group text-base sm:text-lg"
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Launch Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
