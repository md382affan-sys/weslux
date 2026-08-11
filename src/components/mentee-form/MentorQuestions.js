export default function MentorQuestions({ formData, onChange }) {
  return (
    <div className="space-y-10">
      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Initial Motivation *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          If you've mentored before, what initially motivated you to take on that role? What is currently motivating you to become a mentor? Please list the 2-3 biggest factors influencing your motivation, and place them in order of importance.
        </p>
        <textarea
          name="initialMotivation"
          value={formData.initialMotivation}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
          placeholder="List your motivations in order of importance..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Skills *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What skills or knowledge do you wish to share with your mentee? How have you gained that knowledge?
        </p>
        <textarea
          name="skillsToShare"
          value={formData.skillsToShare}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
          placeholder="Describe skills and how you acquired them..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Challenges *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          If you experienced challenges such as limited time or low mentee engagement, how would you approach that, and what kind of support or adjustments would help you stay motivated?
        </p>
        <textarea
          name="challenges"
          value={formData.challenges}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
          placeholder="Share your approach to challenges..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Resources *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What kind of support or resources would you expect from a mentorship program (e.g. coordinators guidance) to help you succeed as a mentor? In which ways would you be able to assess if your mentoring is impactful and successful?
        </p>
        <textarea
          name="resourcesNeeded"
          value={formData.resourcesNeeded}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
          placeholder="Describe needed support and success metrics..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Long term motivation *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What factors would encourage you to continue mentoring over the long term? What would an ideal "best case" experience look like for you?
        </p>
        <textarea
          name="longTermMotivation"
          value={formData.longTermMotivation}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
          placeholder="Describe long-term motivators and ideal experience..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Experience with the Younger generation *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What do you think might be the most challenging part of mentoring a student or young professional? Have you previously interacted with students or young professionals? If so, what has been your impression of their mindset, strengths, or challenges?
        </p>
        <textarea
          name="youngerGenExperience"
          value={formData.youngerGenExperience}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
          placeholder="Share your experience with younger generation..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Needs of Mentees *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          What do you think the current generation needs the most support or guidance with when it comes to their careers?
        </p>
        <textarea
          name="menteeNeeds"
          value={formData.menteeNeeds}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
          placeholder="Describe what current generation needs..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Perceived value *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          In your view, what makes mentoring meaningful for the mentor and impactful for the mentee?
        </p>
        <textarea
          name="perceivedValue"
          value={formData.perceivedValue}
          onChange={onChange}
          required
          rows="5"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
          placeholder="Share your perspective on meaningful mentoring..."
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Time Investment *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Given mentorship is a long journey and it would require an investment of time, how much time would you be able to dedicate to help the mentees?
        </p>
        <input
          type="text"
          name="timeInvestmentMentor"
          value={formData.timeInvestmentMentor}
          onChange={onChange}
          required
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
          placeholder="e.g., 2-3 hours per week"
        />
      </div>

      <div className="animate-fadeIn">
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Coordinators Involvement *
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Given the program is providing online mentoring, what kind of program coordinators involvement would be helpful?
        </p>
        <textarea
          name="coordinatorInvolvement"
          value={formData.coordinatorInvolvement}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
          placeholder="Describe desired coordinator involvement..."
        />
      </div>
    </div>
  );
}