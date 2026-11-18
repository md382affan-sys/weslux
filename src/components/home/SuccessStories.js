'use client';

import { useState } from 'react';
import Image from 'next/image';

const stories = [
  {
    id: 6,
    name: 'Leyli Ahmadova',
    location: 'Azerbaijan',
    image: '/testimonials/leyli-ahmadova.png',
    story: 'Honestly, I didn’t expect much. I just wanted to talk to someone who works in law, and I had no idea where to find that person. WESLUX matched me with a mentor and we talked every week or two. They’re easy to talk to and never sugarcoat anything. Over time it went from random questions to planning my next steps, and I’ve learned more from those meetings than from months of googling. It’s free, which still surprises me. If you’re a student with questions, just try it',
    program: 'Mentorship Program',
  },
  {
    id: 7,
    name: 'Luca Crozzoli',
    location: 'Italy',
    image: '/testimonials/luca-crozzoli.png',
    story: 'I joined WESLUX mostly out of curiosity, and it turned out to be one of the more useful things I did this year., the conversations with my mentor are relaxed but actually go somewhere I didn’t expect. I get straight answers about how things work in the industry, what to focus on now, and what can wait.',
    program: 'Mentorship Program',
  },
  {
    id: 8,
    name: 'Sine Kooy',
    location: 'England',
    image: '/testimonials/sine-kooy.png',
    story: 'Finishing a psychology degree left me with plenty of options but no idea of which one actually suited me. Through WESLUX I was paired with a professional, and we talk every couple of weeks. That regular rhythm is what made the difference. Instead of general career advice, I get honest feedback on what I’m considering and a clear idea of what to try next. It didn’t cost me anything, which still feels strange given how much I’ve gotten out of it. If you’re finishing a degree and feeling a bit lost, this should be a no-brainer sign up',
    program: 'Mentorship Program',
  },
  {
    id: 9,
    name: 'Holy Thompson',
    location: 'Belgium',
    image: '/testimonials/holy-thompson.png',
    story: 'My mentor once told me I was applying for the wrong things, and he was right. He was the first person to look at what I actually wanted and explain what the work looks like day to day, not just the job title. Some meetings I’m venting about the process, and in some he’s pushing me to new ways of getting into this industry. It’s become more of a relationship than a program. Without it I’d still be guessing.',
    program: 'Mentorship Program',
  },
];

export default function SuccessStories() {
  const [activeStory, setActiveStory] = useState(0);
  const story = stories[activeStory];

  const showPrevious = () => {
    setActiveStory((current) => (current - 1 + stories.length) % stories.length);
  };

  const showNext = () => {
    setActiveStory((current) => (current + 1) % stories.length);
  };

  return (
    <section className="homeStories">
      <div className="homeSectionInner">
        <div className="homeSectionHeading">
          <div>
            <p className="homeEyebrow">Stories</p>
            <h2>Experiences shaped by learning and guidance.</h2>
          </div>
        </div>

        <div className="homeStoriesLayout">
          <article className="homeStoryFeature" aria-live="polite">
            <div className="homeStoryPhoto" aria-hidden="true">
              <Image
                src={story.image}
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, (max-width: 1023px) 45vw, 40vw"
              />
              <span>{story.program}</span>
            </div>
            <div className="homeStoryContent">
              <svg className="homeQuoteMark" viewBox="0 0 48 40" fill="none" aria-hidden="true">
                <path d="M19.2 2C8.6 6.5 3 14.2 3 24.7 3 32 6.7 37 12.5 37c5.1 0 8.8-3.9 8.8-8.8 0-5.3-3.5-8.4-8.2-8.4-.7 0-1.3.1-1.9.2C12.2 14.3 16 9.5 23 5.7L19.2 2Zm22.1 0C30.7 6.5 25.1 14.2 25.1 24.7c0 7.3 3.7 12.3 9.5 12.3 5.1 0 8.8-3.9 8.8-8.8 0-5.3-3.5-8.4-8.2-8.4-.7 0-1.3.1-1.9.2 1-5.7 4.8-10.5 11.8-14.3L41.3 2Z" fill="currentColor" />
              </svg>
              <p className="homeStoryProgram">
                {story.program}
                {story.year && <> <span>·</span> {story.year}</>}
              </p>
              <blockquote>{story.story}</blockquote>
              <div className="homeStoryPerson">
                <div>
                  <h3>{story.name}</h3>
                  <p>{story.role || story.location}</p>
                </div>
              </div>
              <div className="homeStoryControls" aria-label="Story navigation">
                <button type="button" onClick={showPrevious} aria-label="Previous story">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M19 12H5m0 0 7-7m-7 7 7 7" />
                  </svg>
                </button>
                <div className="homeStoryDots">
                  {stories.map((item, index) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setActiveStory(index)}
                      aria-label={`Show story ${index + 1}: ${item.name}`}
                      aria-current={index === activeStory ? 'true' : undefined}
                    />
                  ))}
                </div>
                <button type="button" onClick={showNext} aria-label="Next story">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14m0 0-7-7m7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
