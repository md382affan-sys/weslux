export default function ApplicantProfile({ formData, onChange }) {
  return (
    <div className="space-y-8">
      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Full Name *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What's your full name?
        </p>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          placeholder="Enter your full name"
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Email Address *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What's your email address?
        </p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          placeholder="your.email@example.com"
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Contact Number *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What's your WhatsApp / Contact Number (with country code)?
        </p>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          placeholder="+352 123 456 789"
        />
      </div>
    </div>
  );
}
