export default function FinalValidation({ formData, onChange, category }) {
  const isStudent = ['6th-10th', '11th-12th', 'university', 'young-professional'].includes(category);
  const isMentor = category === 'mentor';

  return (
    <div className="space-y-10">
      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Problem Statement Validation *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Do you agree with the statement: "Most students possess a degree but lack a clear professional roadmap"?
        </p>
        <select
          name="problemValidation"
          value={formData.problemValidation}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
        >
          <option value="">Select an option</option>
          <option value="strongly-agree">Strongly Agree</option>
          <option value="agree">Agree</option>
          <option value="neutral">Neutral</option>
          <option value="disagree">Disagree</option>
          <option value="strongly-disagree">Strongly Disagree</option>
        </select>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Mentorship Necessity *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          In your honest opinion, is professional mentoring a "luxury" or a "necessity" for students in today's competitive environment?
        </p>
        <div className="flex gap-4">
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="mentorshipNecessity"
              value="luxury"
              checked={formData.mentorshipNecessity === 'luxury'}
              onChange={onChange}
              required
              className="sr-only"
            />
            <div className={`p-5 rounded-xl border-2 text-center font-semibold text-base transition-all ${
              formData.mentorshipNecessity === 'luxury'
                ? 'bg-pink-500 text-white border-pink-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300'
            }`}>
              Luxury
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="mentorshipNecessity"
              value="necessity"
              checked={formData.mentorshipNecessity === 'necessity'}
              onChange={onChange}
              className="sr-only"
            />
            <div className={`p-5 rounded-xl border-2 text-center font-semibold text-base transition-all ${
              formData.mentorshipNecessity === 'necessity'
                ? 'bg-pink-500 text-white border-pink-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300'
            }`}>
              Necessity
            </div>
          </label>
        </div>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Open Feedback *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          If you could change one thing about how students are currently guided toward their careers, what would it be?
        </p>
        <textarea
          name="openFeedback"
          value={formData.openFeedback}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all resize-none"
          placeholder="Share your thoughts..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Referral Intent *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Would you recommend such a mentorship program to your friends?
        </p>
        <div className="flex gap-4">
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="referralIntent"
              value="yes"
              checked={formData.referralIntent === 'yes'}
              onChange={onChange}
              required
              className="sr-only"
            />
            <div className={`p-5 rounded-xl border-2 text-center font-semibold text-base transition-all ${
              formData.referralIntent === 'yes'
                ? 'bg-pink-500 text-white border-pink-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300'
            }`}>
              Yes
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="referralIntent"
              value="no"
              checked={formData.referralIntent === 'no'}
              onChange={onChange}
              className="sr-only"
            />
            <div className={`p-5 rounded-xl border-2 text-center font-semibold text-base transition-all ${
              formData.referralIntent === 'no'
                ? 'bg-pink-500 text-white border-pink-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300'
            }`}>
              No
            </div>
          </label>
        </div>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Outcome Expectation *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What result would make this mentorship program "worth it" for you?
        </p>
        <textarea
          name="outcomeExpectation"
          value={formData.outcomeExpectation}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all resize-none"
          placeholder="Describe your expected outcomes..."
        />
      </div>

      {isStudent && (
        <>
          <div className="animate-fadeIn">
            <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Willingness to Invest *
            </label>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Would you be willing to invest in a structured mentorship program if it guarantees outcomes?
            </p>
            <select
              name="willingnessToInvest"
              value={formData.willingnessToInvest}
              onChange={onChange}
              required
              className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="maybe">Maybe</option>
            </select>
          </div>

          <div className="animate-fadeIn">
            <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Urgency Level *
            </label>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              How urgently do you feel you need career guidance?
            </p>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map(num => (
                <label key={num} className="flex flex-col items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="urgencyLevel"
                    value={num}
                    checked={formData.urgencyLevel === String(num)}
                    onChange={onChange}
                    required
                    className="sr-only"
                  />
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                    formData.urgencyLevel === String(num)
                      ? 'bg-pink-500 text-white scale-110'
                      : 'bg-gray-200 text-gray-600 group-hover:bg-pink-100'
                  }`}>
                    {num}
                  </div>
                  <span className="text-sm mt-2 text-gray-600">
                    {num === 1 ? 'Not urgent' : num === 5 ? 'Very urgent' : ''}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Awareness *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What other mentoring and coaching programs or platforms are you aware of in Luxembourg (or in nearby countries)?
        </p>
        <textarea
          name="awareness"
          value={formData.awareness}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all resize-none"
          placeholder="List programs you know about..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Mentorship structure expectations *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How do you imagine an effective mentoring program should be structured (e.g., frequency of meetings, format, level of guidance)?
        </p>
        <textarea
          name="mentorshipStructure"
          value={formData.mentorshipStructure}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all resize-none"
          placeholder="Describe your ideal program structure..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Success definition *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          {isMentor 
            ? "What do you think when you hear the word 'mentoring'? How do you define a 'mentor' and a 'mentee'? How would you define a successful mentorship?"
            : "What do you think when you hear the word 'mentoring'? How would you define a successful mentorship?"
          }
        </p>
        <textarea
          name="successDefinition"
          value={formData.successDefinition}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all resize-none"
          placeholder="Share your definition of successful mentorship..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Mentorship Format Preference *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How would you prefer mentorship?
        </p>
        <select
          name="formatPreference"
          value={formData.formatPreference}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
        >
          <option value="">Select an option</option>
          <option value="1-on-1">1:1</option>
          <option value="group">Group</option>
          <option value="workshops">Workshops</option>
          <option value="online-sessions">Online Sessions</option>
          <option value="mixed">Mixed Approach</option>
        </select>
      </div>
    </div>
  );
}
