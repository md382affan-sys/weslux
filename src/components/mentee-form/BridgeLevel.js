export default function BridgeLevel({ formData, onChange }) {
  return (
    <div className="space-y-10">
      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Professional Vision *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          When you think about your future career, what kind of work would you like to be doing and what would make it meaningful or exciting for you? Is there a specific role you would like to have?
        </p>
        <textarea
          name="professionalVision"
          value={formData.professionalVision}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
          placeholder="Describe your professional vision..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Current Domain *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Which area of study are you currently focused on?
        </p>
        <input
          type="text"
          name="currentDomain"
          value={formData.currentDomain}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
          placeholder="e.g., Science, Commerce, Arts..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Choice Validation *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How did you choose your current area of study (e.g. market trends, family advice, friends circle, simply like the subject)? In which way it is related to your current interests?
        </p>
        <textarea
          name="choiceValidation"
          value={formData.choiceValidation}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
          placeholder="Explain your choice and its relation to your interests..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Industry Exposure *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What kind of access do you have to any professionals or mentors working in the industry you wish to join?
        </p>
        <textarea
          name="industryAccess"
          value={formData.industryAccess}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
          placeholder="Describe your access to industry professionals..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Support Gap *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What is the most significant piece of information or guidance you feel is currently missing from your school environment?
        </p>
        <textarea
          name="supportGap"
          value={formData.supportGap}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
          placeholder="Share what guidance is missing..."
        />
      </div>


      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Career Clarity Score *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          On a scale of 1–5, how clear are you about your career path after the final school year?
        </p>
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num} className="flex flex-col items-center cursor-pointer group">
              <input
                type="radio"
                name="careerClarity"
                value={num}
                checked={formData.careerClarity === String(num)}
                onChange={onChange}
                required
                className="sr-only"
              />
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                formData.careerClarity === String(num)
                  ? 'bg-purple-500 text-white scale-110'
                  : 'bg-gray-200 text-gray-600 group-hover:bg-purple-100'
              }`}>
                {num}
              </div>
              <span className="text-sm mt-2 text-gray-600">
                {num === 1 ? 'Not clear' : num === 5 ? 'Very clear' : ''}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Backup Plan *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What other alternative careers you might choose as a secondary plan?
        </p>
        <textarea
          name="backupPlan"
          value={formData.backupPlan}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
          placeholder="Describe your backup plan..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Entrance Exam Strategy *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What university entrance exams or tests are you aware of that you might need to take? Are you preparing for any of those?
        </p>
        <textarea
          name="entranceExams"
          value={formData.entranceExams}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
          placeholder="List exams and your preparation status..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Information Source *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Where do you mostly get career information from, and why do you prefer this source?
        </p>
        <input
          type="text"
          name="informationSource"
          value={formData.informationSource}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
          placeholder="e.g., YouTube, Coaching, School, Friends..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Skill Gap Awareness *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What skills do you think you should have for your desired career?
        </p>
        <textarea
          name="skillGap"
          value={formData.skillGap}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
          placeholder="List the skills you need..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Time Investment *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How many hours per day do you actively invest in career preparation?
        </p>
        <input
          type="text"
          name="timeInvestment"
          value={formData.timeInvestment}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
          placeholder="e.g., 2-3 hours per day"
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Decision Satisfaction *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How happy do you currently feel with your chosen area of study, and what factors influence that feeling? Have you considered changing the area of study, and what could influence such a decision?
        </p>
        <textarea
          name="decisionSatisfaction"
          value={formData.decisionSatisfaction}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
          placeholder="Share your satisfaction and thoughts..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Real-world Exposure *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Have you done any student jobs, internships, projects, or practical learning? If so, in which area, and what were your impressions?
        </p>
        <textarea
          name="realWorldExposure"
          value={formData.realWorldExposure}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
          placeholder="Describe your practical experience..."
        />
      </div>
    </div>
  );
}
