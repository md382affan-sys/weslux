export default function FoundationLevel({ formData, onChange }) {
  return (
    <div className="space-y-12">
      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Career Aspirations *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          If you could pursue any career, what is your ultimate "dream" role? Why?
        </p>
        <textarea
          name="careerAspirations"
          value={formData.careerAspirations}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none"
          placeholder="Describe your dream career and why it excites you..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Academic Interests *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Which subjects do you currently find most engaging or natural to you?
        </p>
        <input
          type="text"
          name="academicInterests"
          value={formData.academicInterests}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
          placeholder="e.g., Mathematics, Science, Arts, Literature..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Stream Selection Certainty *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          On a scale of 1–5, how much do you like the area of study (e.g., Science, Commerce, Arts) you plan to choose next?
        </p>
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num} className="flex flex-col items-center cursor-pointer group">
              <input
                type="radio"
                name="streamCertainty"
                value={num}
                checked={formData.streamCertainty === String(num)}
                onChange={onChange}
                required
                className="sr-only"
              />
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                formData.streamCertainty === String(num)
                  ? 'bg-green-500 text-white scale-110'
                  : 'bg-gray-200 text-gray-600 group-hover:bg-green-100'
              }`}>
                {num}
              </div>
              <span className="text-sm mt-2 text-gray-600">
                {num === 1 ? 'Not at all' : num === 5 ? 'Very much' : ''}
              </span>
            </label>
          ))}
        </div>
      </div>


      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Current Guidance *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Who do you go to for advice when making decisions about your future education?
        </p>
        <select
          name="currentGuidance"
          value={formData.currentGuidance}
          onChange={onChange}
          required
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
        >
          <option value="">Select an option</option>
          <option value="parents">Parents</option>
          <option value="teachers">Teachers</option>
          <option value="friends">Friends</option>
          <option value="no-one">No one</option>
        </select>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Mentorship Interest *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          When you have problems in school, what do you do about them? In what ways would additional guidance from a "Big Brother/Sister" be helpful for you right now?
        </p>
        <textarea
          name="mentorshipProblems"
          value={formData.mentorshipProblems}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none"
          placeholder="Share your thoughts and how mentorship could help..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Exposure Level *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Have you ever attended any workshop, seminar, or watched content related to your dream career?
        </p>
        <div className="flex gap-4">
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="exposureLevel"
              value="yes"
              checked={formData.exposureLevel === 'yes'}
              onChange={onChange}
              required
              className="sr-only"
            />
            <div className={`p-6 rounded-2xl border-2 text-center font-semibold text-lg transition-all ${
              formData.exposureLevel === 'yes'
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
            }`}>
              Yes
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="exposureLevel"
              value="no"
              checked={formData.exposureLevel === 'no'}
              onChange={onChange}
              className="sr-only"
            />
            <div className={`p-6 rounded-2xl border-2 text-center font-semibold text-lg transition-all ${
              formData.exposureLevel === 'no'
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
            }`}>
              No
            </div>
          </label>
        </div>
      </div>

      {formData.exposureLevel === 'yes' && (
        <div className="animate-fadeIn">
          <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Exposure Details
          </label>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Was there anything you didn't find useful or particularly like? What topics did it focus on, what key lessons did you take away?
          </p>
          <textarea
            name="exposureDetails"
            value={formData.exposureDetails}
            onChange={onChange}
            rows="4"
            className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none"
            placeholder="Share your experience and learnings..."
          />
        </div>
      )}

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Role Model Influence *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Who are some people who you look up to who have the career you want? What do you admire about them and their qualities or life journey?
        </p>
        <textarea
          name="roleModel"
          value={formData.roleModel}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none"
          placeholder="Describe your role models and what inspires you about them..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Skill Awareness *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What skills or in-depth knowledge do you think are required to succeed in your dream career?
        </p>
        <input
          type="text"
          name="skillAwareness"
          value={formData.skillAwareness}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
          placeholder="List the skills and knowledge needed..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Fear Factor *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What is your biggest fear when thinking about your future career?
        </p>
        <textarea
          name="fearFactor"
          value={formData.fearFactor}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none"
          placeholder="Share your concerns and fears..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Decision Pressure *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What are the family expectations regarding you choosing a career? How does that influence your choice?
        </p>
        <textarea
          name="familyExpectations"
          value={formData.familyExpectations}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none"
          placeholder="Describe family expectations and their influence..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Learning Style *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How do you prefer to learn new things?
        </p>
        <select
          name="learningStyle"
          value={formData.learningStyle}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
        >
          <option value="">Select an option</option>
          <option value="videos">Videos</option>
          <option value="books">Books</option>
          <option value="practical">Practical</option>
          <option value="mentorship">Mentorship</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Curiosity Check *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          If given a free month, what would you love to learn or explore?
        </p>
        <textarea
          name="curiosityCheck"
          value={formData.curiosityCheck}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none"
          placeholder="Share what you'd love to explore..."
        />
      </div>
    </div>
  );
}
