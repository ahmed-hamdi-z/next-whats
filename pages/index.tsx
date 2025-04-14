// pages/index.tsx
import React, { useState } from "react";

const WhatsAppForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendWhatsApp = async () => {
    try {
      const res = await fetch("/api/send-group-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      alert(result.message);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-auto text-right">
      <div className="mt-5 mb-5 z-10">
        <img className="w-40 h-40" src="/images/logo.png" alt="Logo" />
      </div>
      <form className="shadow-md shadow-[#0762C8] rounded-[30px] p-10 mb-5 md:w-[120%] w-[85%] opacity-90">
        <label className="block text-[#0762C8] p-1.5 font-medium">
          الاسم بالكامل
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-[#0762C8] p-1.5 font-medium">
          إدارة / مكتب / محطة
        </label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-[#0762C8] p-1.5 font-medium">نوع الطلب</label>
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-[#0762C8] p-1.5 font-medium">الملاحظات</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="button"
          onClick={sendWhatsApp}
          className="cursor-pointer mt-2.5 bg-green-500 text-white px-10 py-2 rounded-full font-medium hover:bg-green-600 transition duration-300"
        >
          إرسال إلى واتساب
        </button>
      </form>
    </div>
  );
};

export default WhatsAppForm;
