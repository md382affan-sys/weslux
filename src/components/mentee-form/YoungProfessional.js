export default function YoungProfessional({ formData, onChange }) {
  return (
    <div className="space-y-10">
      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Career Start *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Can you walk me through how you got started in your current role or career path?
        </p>
        <textarea
          name="careerStart"
          value={formData.careerStart}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
          placeholder="Share your career journey..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Current Experience *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How has your experience been so far in your current role? What has surprised you the most?
        </p>
        <textarea
          name="currentExperience"
          value={formData.currentExperience}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
          placeholder="Describe your current experience..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Career Satisfaction *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          To what extent does your current role align with what you initially expected or aspired to? Does it align with what you studied in university?
        </p>
        <textarea
          name="careerSatisfaction"
          value={formData.careerSatisfaction}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
          placeholder="Share your thoughts on alignment..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Career Support *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          In which ways your employer is supporting your career growth? Do you feel you are sufficiently nurtured by your employer in your career?
        </p>
        <textarea
          name="careerSupport"
          value={formData.careerSupport}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
          placeholder="Describe employer support..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Mentorship *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Have you had any mentors or guidance in your career/position so far? If yes, how has that influenced you? If not, do you feel the lack of it? In which areas do you feel you might benefit from mentoring or guidance?
        </p>
        <textarea
          name="mentorshipExperience"
          value={formData.mentorshipExperience}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
          placeholder="Share your mentorship experience..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Career Development *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          How do you see your career evolving from here? Are there specific roles, skills, or directions you are aiming for? Are you exploring other areas within your company or considering additional qualifications (e.g., certifications, exams, international opportunities)?
        </p>
        <textarea
          name="careerDevelopment"
          value={formData.careerDevelopment}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
          placeholder="Describe your career development plans..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Career Mobility *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Have you thought about making a career move or change? What would motivate you to take that step?
        </p>
        <textarea
          name="careerMobility"
          value={formData.careerMobility}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
          placeholder="Share your thoughts on career mobility..."
        />
      </div>
    </div>
  );
}