'use client';

export default function ApplicationReview({ formData, onChange }) {
  return (
    <div className="space-y-10 animate-fadeIn">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          📋 Mentorship Program Feedback Form
        </h2>
        <p className="text-lg text-gray-600">
          Thank you for completing your application on <strong>Mentor Connect</strong>. Before you submit,
          please take a moment to review the platform and share your feedback. Your opinions help us improve.
        </p>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Overall Application Rating *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How would you rate the overall interface of the Mentor Connect application?
        </p>
        <div className="flex gap-4 flex-wrap">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num} className="flex flex-col items-center cursor-pointer group">
              <input
                type="radio"
                name="websiteRating"
                value={num}
                checked={formData.websiteRating === String(num)}
                onChange={onChange}
                required
                className="sr-only"
              />
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                formData.websiteRating === String(num)
                  ? 'bg-blue-500 text-white scale-110'
                  : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100'
              }`}>
                {num}
              </div>
              <span className="text-sm mt-2 text-gray-600">
                {num === 1 ? 'Very poor' : num === 5 ? 'Excellent' : ''}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Ease of Navigation *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How easy was it to navigate through the application and complete it?
        </p>
        <select
          name="navigationEase"
          value={formData.navigationEase}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
        >
          <option value="">Select an option</option>
          <option value="very-easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="neutral">Neutral</option>
          <option value="difficult">Difficult</option>
          <option value="very-difficult">Very Difficult</option>
        </select>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Interface Rating *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What do you think about the design and look of the Mentor Connect interface?
        </p>
        <select
          name="interfaceRating"
          value={formData.interfaceRating}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
        >
          <option value="">Select an option</option>
          <option value="very-good">Very Good</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
          <option value="very-poor">Very Poor</option>
        </select>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          What did you like the most?
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Tell us what you enjoyed most about the Mentor Connect platform.
        </p>
        <textarea
          name="likedMost"
          value={formData.likedMost}
          onChange={onChange}
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Share what you liked..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          What changes would you like in the interface?
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          If you could change or improve anything about the application, what would it be?
        </p>
        <textarea
          name="suggestedChanges"
          value={formData.suggestedChanges}
          onChange={onChange}
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Describe any changes you would like..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Any other suggestions or feedback? *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Anything else you would like to tell us about the Mentor Connect app or your experience with us?
        </p>
        <textarea
          name="additionalFeedback"
          value={formData.additionalFeedback}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Share your suggestions, review, or anything you want to tell us..."
        />
      </div>
    </div>
  );
}