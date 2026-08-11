export default function LaunchLevel({ formData, onChange }) {
  return (
    <div className="space-y-10">
      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Field of Study *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Please state your degree and current year of study (e.g., B.Tech 3rd Year).
        </p>
        <input
          type="text"
          name="fieldOfStudy"
          value={formData.fieldOfStudy}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          placeholder="e.g., B.Tech Computer Science, 3rd Year"
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Immediate Career Goal *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How do you view your career path immediately upon graduation? What could be a desired role or level? In which way do you desire that your career will progress?
        </p>
        <textarea
          name="immediateCareerGoal"
          value={formData.immediateCareerGoal}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Describe your career goals and progression..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Career Direction *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Are you aiming for Job, Higher Studies, Startup, Freelancing, or other?
        </p>
        <select
          name="careerDirection"
          value={formData.careerDirection}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
        >
          <option value="">Select an option</option>
          <option value="job">Job</option>
          <option value="higher-studies">Higher Studies</option>
          <option value="startup">Startup</option>
          <option value="freelancing">Freelancing</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Post-Study Certainty *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          At this stage of your studies, how do you currently feel about continuing in this career path long term?
        </p>
        <textarea
          name="postStudyCertainty"
          value={formData.postStudyCertainty}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Share your thoughts on long-term commitment..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Mentorship Network *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Aside from professors or family, what other types of mentors or professional guidance do you have access to regarding your career strategy? How often do you use their advice?
        </p>
        <textarea
          name="mentorshipNetwork"
          value={formData.mentorshipNetwork}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Describe your mentorship network..."
        />
      </div>


      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Skill Confidence *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          On a scale of 1–5, how confident are you in your current technical/field skills?
        </p>
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num} className="flex flex-col items-center cursor-pointer group">
              <input
                type="radio"
                name="skillConfidence"
                value={num}
                checked={formData.skillConfidence === String(num)}
                onChange={onChange}
                required
                className="sr-only"
              />
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                formData.skillConfidence === String(num)
                  ? 'bg-blue-500 text-white scale-110'
                  : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100'
              }`}>
                {num}
              </div>
              <span className="text-sm mt-2 text-gray-600">
                {num === 1 ? 'Not confident' : num === 5 ? 'Very confident' : ''}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Skills - Confident In *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          In which skills do you feel most confident in?
        </p>
        <input
          type="text"
          name="skillConfidentIn"
          value={formData.skillConfidentIn}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          placeholder="List your strongest skills..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Skills - Not Confident In *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          In which ones no and why?
        </p>
        <textarea
          name="skillNotConfidentIn"
          value={formData.skillNotConfidentIn}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Describe skills you need to improve and why..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Portfolio Status *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Do you have a portfolio, projects, or proof of work? If not, do you need one and which kind?
        </p>
        <textarea
          name="portfolioStatus"
          value={formData.portfolioStatus}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Describe your portfolio status..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Internship Experience *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Have you completed any internships? If yes, describe briefly the area, duration, and what you learned.
        </p>
        <textarea
          name="internshipExperience"
          value={formData.internshipExperience}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Share your internship experience..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Networking Efforts *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How often do you contact professionals on LinkedIn or other platforms? On which topics, what were the outcomes? Do you find their content useful?
        </p>
        <textarea
          name="networkingEfforts"
          value={formData.networkingEfforts}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Describe your networking activities..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          CV Readiness *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Do you have an updated CV ready to use for applications?
        </p>
        <div className="flex gap-4">
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="cvReadiness"
              value="yes"
              checked={formData.cvReadiness === 'yes'}
              onChange={onChange}
              required
              className="sr-only"
            />
            <div className={`p-5 rounded-xl border-2 text-center font-semibold text-base transition-all ${
              formData.cvReadiness === 'yes'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
            }`}>
              Yes
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="cvReadiness"
              value="no"
              checked={formData.cvReadiness === 'no'}
              onChange={onChange}
              className="sr-only"
            />
            <div className={`p-5 rounded-xl border-2 text-center font-semibold text-base transition-all ${
              formData.cvReadiness === 'no'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
            }`}>
              No
            </div>
          </label>
        </div>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Industry Awareness *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How are you getting updated with trends in your field?
        </p>
        <input
          type="text"
          name="industryAwareness"
          value={formData.industryAwareness}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          placeholder="e.g., papers, news, social media, university career pages, forums..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Salary Expectations *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What would be the best starting salary in your opinion?
        </p>
        <input
          type="text"
          name="salaryExpectations"
          value={formData.salaryExpectations}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          placeholder="e.g., €40,000 per year"
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Action Taken *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What concrete steps have you taken in the last 3-6 months toward your career?
        </p>
        <textarea
          name="actionTaken"
          value={formData.actionTaken}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="List concrete actions you've taken..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Biggest Challenge *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What challenges or obstacles are you currently facing in progressing toward your career goals, and how are you trying to deal with them?
        </p>
        <textarea
          name="biggestChallenge"
          value={formData.biggestChallenge}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          placeholder="Describe your challenges and how you're addressing them..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Existing Needs *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Which of the following "Job-Readiness" areas do you feel you need the most support in?
        </p>
        <div className="space-y-3">
          {[
            { value: 'cv-building', label: 'CV/Resume Building' },
            { value: 'networking', label: 'Networking' },
            { value: 'technical-upskilling', label: 'Technical Upskilling' },
            { value: 'interview-prep', label: 'Interview Preparation' },
            { value: 'soft-skills', label: 'Soft Skills' }
          ].map(option => (
            <label key={option.value} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                name="jobReadinessNeeds"
                value={option.value}
                checked={formData.jobReadinessNeeds?.includes(option.value)}
                onChange={onChange}
                className="sr-only"
              />
              <div className={`flex-1 p-4 rounded-xl border-2 font-semibold text-base transition-all ${
                formData.jobReadinessNeeds?.includes(option.value)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 group-hover:border-blue-300'
              }`}>
                {option.label}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}