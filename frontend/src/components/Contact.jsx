import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
  const [result, setResult] = useState("");
  const [buttonStatus, setButtonStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({}); // validation errors
  const [toast, setToast] = useState(null);

  // Simple validation
  const validate = (formData) => {
    const newErrors = {};
    if (!formData.get("name").trim()) newErrors.name = "Name is required";
    if (!formData.get("email").trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.get("email")))
      newErrors.email = "Invalid email address";
    if (!formData.get("message").trim())
      newErrors.message = "Message cannot be empty";
    return newErrors;
  };

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    setResult("");
    setButtonStatus("sending");

    const formData = new FormData(form);
    formData.append("access_key", web3Key);

    // validate before sending
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setButtonStatus("idle");
      showToast("Please fix validation errors", "error");
      return;
    }
    setErrors({});

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully ✅");
      setButtonStatus("success");
      showToast("Form submitted successfully 🎉", "success");
      form.reset();

      // revert back after 3s
      setTimeout(() => setButtonStatus("idle"), 3000);
    } else {
      console.log("Error", data);
      setResult(data.message);
      setButtonStatus("error");
      showToast("Submission failed ❌", "error");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-[#f0f0f0] text-lg sm:text-xl font-bold px-4 sm:px-6 md:px-10 pb-20">
      {/* <div className="elements flex flex-col items-center w-full text-[10vw] sm:text-5xl md:text-5xl lg:text-7xl leading-tight mb-10 text-white tracking-widest abnes">
        <h1>LET'S WORK TOGETHER</h1>
      </div> */}

      <div className="w-full lg:max-w-[60vw] bg-[#D90908] cyber-box p-[2px] relative z-10 mt-4">
        <div 
          className="flex flex-col w-full h-full bg-black relative"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}
        >
          {/* Terminal Header */}
          <div className="bg-[#D90908] text-black font-mono text-sm sm:text-base px-4 py-2 flex justify-between items-center shrink-0">
            <span className="font-bold">>_ INITIATE_CONTACT.EXE</span>
            <span className="animate-pulse font-bold">_</span>
          </div>

          <AnimatePresence>
            {buttonStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
              >
                <div className="text-[#D90908] text-5xl sm:text-6xl mb-4 animate-bounce">
                  <span className="block border-2 border-[#D90908] p-4 rounded-full">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
                <h2 className="text-[#D90908] font-mono text-xl sm:text-2xl tracking-widest text-center">
                  >_ DATA_TRANSMITTED
                </h2>
                <p className="text-gray-500 font-mono mt-2 text-sm sm:text-base text-center px-4">
                  Connection securely closed.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        <form onSubmit={onSubmit} className="flex flex-col gap-6 p-6 sm:p-10">
          <input type="hidden" name="access_key" value={web3Key} />

          {/* Name */}
          <div className={`relative cyber-input cyber-border-red z-10 ${errors.name ? "animate-shake border-white" : ""}`}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="bg-black w-full text-[#D90908] font-bold h-12 sm:h-14 px-4 placeholder:tracking-widest placeholder:text-[#D90908]/50 placeholder:font-sans outline-none"
            />
          </div>
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}

          {/* Email */}
          <div className={`relative cyber-input cyber-border-red z-10 ${errors.email ? "animate-shake border-white" : ""}`}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-black w-full text-[#D90908] font-bold h-12 sm:h-14 px-4 placeholder:tracking-widest placeholder:text-[#D90908]/50 placeholder:font-sans outline-none"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}

          {/* Message */}
          <div className={`relative cyber-box cyber-border-red z-10 ${errors.message ? "animate-shake border-white" : ""}`}>
            <textarea
              name="message"
              rows="6"
              placeholder="Message"
              className="bg-black w-full text-[#D90908] font-bold px-4 py-2 outline-none resize-none placeholder:tracking-widest placeholder:text-[#D90908]/50 placeholder:font-sans"
            />
          </div>
          {errors.message && (
            <span className="text-red-500 text-sm">{errors.message}</span>
          )}

          {/* Button */}
          <button
            type="submit"
            className={`cyber-button cyber-border-red cyber-hover-fill w-full h-12 sm:h-14 font-bold text-base sm:text-lg cursor-pointer transition-all duration-500 z-10 flex items-center justify-center
              ${
                buttonStatus === "success"
                  ? "bg-[#D90908] text-black border-green-500 animate-pulse"
                  : buttonStatus === "sending"
                  ? "bg-transparent text-gray-500 border-gray-600 cursor-not-allowed"
                  : "bg-black text-[#D90908] hover:bg-[#D90908] hover:text-black"
              }`}
            disabled={buttonStatus === "sending"}
          >
            {buttonStatus === "success"
              ? "Sent ✅"
              : buttonStatus === "sending"
              ? "Sending..."
              : "SEND"}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
