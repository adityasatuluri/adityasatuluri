import React, { useState } from "react";

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
    setResult("");
    setButtonStatus("sending");

    const formData = new FormData(event.target);
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
      event.target.reset();

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
    <div className="w-full h-full flex items-center justify-center text-[#f0f0f0] text-lg sm:text-xl font-bold px-4 sm:px-6 md:px-10 relative">
      <div className="flex flex-col justify-center space-y-6 w-full lg:max-w-[80vw]">
        <div className="elements flex flex-col items-center w-full text-[14vw] sm:text-5xl md:text-5xl lg:text-8xl leading-tight">
          <h1>LET'S WORK TOGETHER</h1>
        </div>
        <div className="elements w-full flex flex-col space-y-5">
          <form onSubmit={onSubmit} className="flex flex-col space-y-4">
            <input type="hidden" name="access_key" value={web3Key} />

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={`bg-white w-full text-black h-12 sm:h-14 px-4 placeholder:tracking-widest placeholder:font-sans rounded transition-all duration-300 ${
                errors.name ? "border-2 border-red-500 animate-shake" : "border"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`bg-white w-full text-black h-12 sm:h-14 px-4 placeholder:tracking-widest placeholder:font-sans rounded transition-all duration-300 ${
                errors.email
                  ? "border-2 border-red-500 animate-shake"
                  : "border"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}

            {/* Message */}
            <textarea
              name="message"
              rows="6"
              placeholder="Message"
              className={`bg-white w-full text-black px-4 py-2 outline-none resize-none placeholder:tracking-widest placeholder:font-sans rounded transition-all duration-300 ${
                errors.message
                  ? "border-2 border-red-500 animate-shake"
                  : "border"
              }`}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">{errors.message}</span>
            )}

            {/* Button */}
            <button
              type="submit"
              className={`w-full h-12 sm:h-14 border jura-font text-base sm:text-lg cursor-pointer transition-all duration-500 rounded shadow-md
                ${
                  buttonStatus === "success"
                    ? "bg-green-600 text-white border-green-700 animate-pulse"
                    : buttonStatus === "sending"
                    ? "bg-gray-500 text-white border-gray-600 cursor-not-allowed"
                    : "bg-[#090909] text-white hover:bg-red-600 hover:font-bold hover:border-black border-neutral-400"
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
