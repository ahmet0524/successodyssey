const fs = require('fs');
const path = require('path');

const blogDir = 'D:\\successodyssey\\src\\pages\\blog';

const updates = [
  {
    file: 'first-principles-thinking.astro',
    oldKeywords: 'first principles thinking, first principles, Elon Musk thinking, how to think from first principles, first principles reasoning, first principles examples, Feynman technique thinking, deductive reasoning',
    newKeywords: 'first principles thinking, first principles, Elon Musk thinking, how to think from first principles, first principles reasoning, first principles examples, Feynman technique thinking, deductive reasoning, first principles problem solving, mental model framework, break down assumptions, bottom-up reasoning',
    faq: {
      questions: [
        {
          q: 'What is first principles thinking?',
          a: 'First principles thinking is a reasoning method where you break a problem down to its most fundamental truths — the things you know to be absolutely true — and build your solutions up from there, rather than reasoning by analogy from existing assumptions.'
        },
        {
          q: 'How is first principles thinking different from reasoning by analogy?',
          a: 'Reasoning by analogy copies or adjusts what already exists. First principles thinking ignores existing solutions and starts from scratch with verified facts, enabling genuinely novel solutions that others overlook.'
        },
        {
          q: 'What are real-world examples of first principles thinking?',
          a: 'Elon Musk used first principles to reduce battery costs for Tesla by analyzing raw material prices instead of accepting market rates. Aristotle applied it to ethics and logic. Richard Feynman used it to rebuild physics knowledge from scratch.'
        },
        {
          q: 'How can I practice first principles thinking daily?',
          a: 'Start by identifying assumptions in any belief or problem. Ask "Why is this true?" repeatedly until you reach bedrock facts. Then rebuild your reasoning from those facts upward. Journaling and the Socratic method are great tools for practice.'
        }
      ]
    }
  },
  {
    file: 'inversion-mental-model.astro',
    oldKeywords: 'inversion mental model, inversion thinking, think backwards, avoid failure thinking, Charlie Munger inversion, problem solving by inversion, reverse thinking, mental model inversion',
    newKeywords: 'inversion mental model, inversion thinking, think backwards, avoid failure thinking, Charlie Munger inversion, problem solving by inversion, reverse thinking, mental model inversion, how to use inversion, prevent failure strategy, inverted thinking technique, inverse problem solving',
    faq: {
      questions: [
        {
          q: 'What is the inversion mental model?',
          a: 'Inversion is a thinking technique where instead of asking how to achieve a goal, you ask how you could guarantee failure — then avoid those things. It was popularized by Charlie Munger and mathematician Carl Jacobi.'
        },
        {
          q: 'How does inversion help with decision-making?',
          a: 'By focusing on what to avoid rather than what to pursue, inversion helps you identify hidden risks, eliminate bad options, and simplify complex problems. It acts as a filter that removes the most dangerous paths before you choose a direction.'
        },
        {
          q: 'What are practical examples of inversion thinking?',
          a: 'Instead of asking "how do I become a great leader?" ask "what would make me a terrible leader?" Instead of "how do I build wealth?" ask "how would I guarantee staying poor?" The answers reveal the most critical factors to address.'
        },
        {
          q: 'How is inversion related to Stoicism?',
          a: 'The Stoic practice of premeditatio malorum (premeditation of evils) is a form of inversion — imagining worst-case scenarios to prepare mentally and reduce fear. Both inversion and Stoicism use negative visualization to improve decision quality.'
        }
      ]
    }
  },
  {
    file: 'second-order-thinking.astro',
    oldKeywords: 'second order thinking, second order effects, consequences of consequences, long term thinking, systems thinking mental model, Howard Marks thinking, unintended consequences, decision making mental models',
    newKeywords: 'second order thinking, second order effects, consequences of consequences, long term thinking, systems thinking mental model, Howard Marks thinking, unintended consequences, decision making mental models, second order consequences, think ahead strategy, downstream effects, beyond first order',
    faq: {
      questions: [
        {
          q: 'What is second-order thinking?',
          a: 'Second-order thinking means considering the downstream consequences of your decisions — not just the immediate result (first-order), but what happens next, and what happens after that. It was popularized by investor Howard Marks.'
        },
        {
          q: 'What are real-life examples of second-order thinking?',
          a: 'Introducing rabbits to Australia (first-order: pest control; second-order: ecological disaster). Raising the minimum wage (first-order: higher wages; second-order: potential job cuts). Taking antibiotics carelessly (second-order: antibiotic resistance).'
        },
        {
          q: 'How does second-order thinking improve decisions?',
          a: 'It prevents you from optimizing for short-term gains at the cost of long-term damage. By mapping out chains of consequences before acting, you avoid common traps and make choices that hold up over time.'
        },
        {
          q: 'How does second-order thinking apply to investing?',
          a: 'In investing, first-order thinking asks "is this company good?" Second-order asks "does everyone already know it\'s good, making the price too high?" The edge comes from thinking one step ahead of consensus — as Howard Marks emphasizes.'
        }
      ]
    }
  },
  {
    file: 'circle-of-competence.astro',
    oldKeywords: 'circle of competence, Warren Buffett circle of competence, know your limits, expertise boundaries, investing within competence, self-awareness mental model, know what you know, competence zone',
    newKeywords: 'circle of competence, Warren Buffett circle of competence, know your limits, expertise boundaries, investing within competence, self-awareness mental model, know what you know, competence zone, how to define circle of competence, expanding expertise, operating in your strengths, avoid overconfidence',
    faq: {
      questions: [
        {
          q: 'What is the circle of competence?',
          a: 'The circle of competence is a mental model developed by Warren Buffett and Charlie Munger that defines the areas where you have genuine, deep knowledge — and outside of which you are at significant risk of making poor decisions.'
        },
        {
          q: 'How do you define your own circle of competence?',
          a: 'List domains where you can consistently predict outcomes, explain complex nuances, and identify errors experts make. Be ruthlessly honest — credentials don\'t equal competence. Real competence comes from experience, not just study.'
        },
        {
          q: 'Why do the edges of your circle matter more than its size?',
          a: 'Knowing exactly where your competence ends is more valuable than having a large circle. The most dangerous investment or decision is the one made just outside your circle while thinking you\'re still inside it.'
        },
        {
          q: 'How can you expand your circle of competence?',
          a: 'Study deeply, seek feedback from real-world results, work alongside experts, and build mental models in adjacent domains. Expansion is slow and deliberate — rushing it creates false confidence more dangerous than ignorance.'
        }
      ]
    }
  },
  {
    file: 'pareto-principle-80-20.astro',
    oldKeywords: 'pareto principle, 80 20 rule, 80-20 principle, pareto analysis, vital few trivial many, productivity 80 20, business pareto principle, time management 80 20 rule, focus on what matters',
    newKeywords: 'pareto principle, 80 20 rule, 80-20 principle, pareto analysis, vital few trivial many, productivity 80 20, business pareto principle, time management 80 20 rule, focus on what matters, pareto efficiency, 80 20 thinking, leverage points, high impact tasks',
    faq: {
      questions: [
        {
          q: 'What is the Pareto Principle?',
          a: 'The Pareto Principle states that roughly 80% of outcomes come from 20% of causes. Named after Italian economist Vilfredo Pareto, it was observed across economics, business, and nature — from wealth distribution to software bugs.'
        },
        {
          q: 'How do you apply the 80/20 rule to productivity?',
          a: 'Identify the 20% of tasks that produce 80% of your results. Prioritize those relentlessly and minimize or delegate the rest. Audit your weekly activities to find which ones actually move the needle versus which ones just feel productive.'
        },
        {
          q: 'What are the most powerful business applications of the Pareto Principle?',
          a: 'In sales, 20% of customers often generate 80% of revenue — focus there. In product development, 20% of features drive 80% of usage. In customer service, 20% of issues cause 80% of complaints. Finding the vital few is the key.'
        },
        {
          q: 'How does the 80/20 rule apply to personal development?',
          a: 'In learning, 20% of concepts cover 80% of practical use cases — master fundamentals deeply before breadth. In relationships, 20% of people provide 80% of your support and joy. The 80/20 rule helps you invest time where it truly compounds.'
        }
      ]
    }
  },
  {
    file: 'occams-razor-explained.astro',
    oldKeywords: "Occam's razor, Occam's razor explained, simplest explanation, parsimony principle, problem solving simplicity, scientific reasoning, razor principles, Occam razor mental model",
    newKeywords: "Occam's razor, Occam's razor explained, simplest explanation, parsimony principle, problem solving simplicity, scientific reasoning, razor principles, Occam razor mental model, principle of parsimony, simplicity heuristic, eliminate unnecessary complexity, fewest assumptions",
    faq: {
      questions: [
        {
          q: "What is Occam's Razor?",
          a: "Occam's Razor is a problem-solving principle that states: among competing explanations, the one with the fewest assumptions should be preferred. It doesn't mean the simplest answer is always right — it means unnecessary complexity should be eliminated."
        },
        {
          q: "Where does Occam's Razor come from?",
          a: "It is attributed to 14th-century friar William of Ockham, who wrote 'entities should not be multiplied beyond necessity.' It became a foundational heuristic in science and philosophy, later formalized as the principle of parsimony."
        },
        {
          q: "When should you apply Occam's Razor?",
          a: "Apply it when multiple explanations fit the evidence equally well. In medicine, diagnosis, business problem-solving, and scientific hypothesis testing, start with the simplest explanation and only add complexity if the evidence demands it."
        },
        {
          q: "What are the limits of Occam's Razor?",
          a: "Reality is sometimes genuinely complex. Occam's Razor is a heuristic, not a law — it guides where to start looking, not where to stop. Einstein's relativity was more complex than Newtonian physics, yet more accurate. Simplicity is a starting preference, not a final verdict."
        }
      ]
    }
  },
  {
    file: 'compounding-mental-model.astro',
    oldKeywords: 'compounding mental model, power of compounding, compound interest, compounding knowledge, compounding habits, exponential growth thinking, Warren Buffett compounding, compound effect mental model, compounding returns',
    newKeywords: 'compounding mental model, power of compounding, compound interest, compounding knowledge, compounding habits, exponential growth thinking, Warren Buffett compounding, compound effect mental model, compounding returns, compounding skills, long-term compounding, compound growth strategy, patience and compounding',
    faq: {
      questions: [
        {
          q: 'What is the compounding mental model?',
          a: 'The compounding mental model applies the mathematics of compound interest to all areas of life — knowledge, skills, relationships, habits, and reputation. Small consistent improvements multiply over time, producing dramatically outsized results.'
        },
        {
          q: 'How does compounding apply beyond finance?',
          a: 'Reading 30 minutes daily compounds into thousands of books over a lifetime. Consistent exercise compounds into lifelong health. Daily skill practice compounds into mastery. Warren Buffett often credits his wealth to compound interest — and his habits.'
        },
        {
          q: 'Why does compounding feel slow at first?',
          a: 'Compound growth is exponential: it starts nearly flat, then curves steeply upward. Most people quit during the early flat phase, never reaching the inflection point. The key insight is that the biggest gains come late — patience is the prerequisite.'
        },
        {
          q: 'How can you harness compounding in your daily life?',
          a: 'Choose consistency over intensity. Show up daily. Avoid anything that resets your progress (quitting, debt, burnout). Reinvest gains — let knowledge build on knowledge, skills on skills, connections on connections. Time is your greatest compounding lever.'
        }
      ]
    }
  },
  {
    file: 'opportunity-cost-thinking.astro',
    oldKeywords: 'opportunity cost, opportunity cost thinking, hidden cost of decisions, trade-off thinking, economic opportunity cost, decision making opportunity cost, what you give up, true cost of choices',
    newKeywords: 'opportunity cost, opportunity cost thinking, hidden cost of decisions, trade-off thinking, economic opportunity cost, decision making opportunity cost, what you give up, true cost of choices, opportunity cost examples, real cost analysis, resource allocation thinking, cost of doing nothing',
    faq: {
      questions: [
        {
          q: 'What is opportunity cost?',
          a: 'Opportunity cost is the value of the best alternative you give up when making a decision. Every choice comes with an invisible price tag: what you could have done instead. It is the most overlooked cost in everyday decision-making.'
        },
        {
          q: 'Why is opportunity cost so often ignored?',
          a: 'Because it is invisible. You only see what you chose, not what you gave up. Our brains are wired to account for tangible costs (money paid) but routinely ignore intangible ones (time spent, options foregone), leading to consistently suboptimal decisions.'
        },
        {
          q: 'How does opportunity cost thinking change your decisions?',
          a: 'It forces you to ask "compared to what?" for every choice. Spending two hours on low-value work has a cost: the high-value work undone. Keeping money in a savings account has a cost: investment returns foregone. Naming the alternative sharpens every decision.'
        },
        {
          q: 'What is the opportunity cost of doing nothing?',
          a: 'Inaction is itself a choice with an opportunity cost. Delaying a health change, an investment, or a difficult conversation all have compounding costs that grow over time. The most expensive opportunities are often the ones left untaken.'
        }
      ]
    }
  },
  {
    file: 'feynman-technique.astro',
    oldKeywords: 'Feynman technique, how to learn faster, explain like im five, Richard Feynman learning method, deep learning technique, study method, Feynman learning, learn anything fast',
    newKeywords: 'Feynman technique, how to learn faster, explain like im five, Richard Feynman learning method, deep learning technique, study method, Feynman learning, learn anything fast, teach to learn, simplify to understand, identify knowledge gaps, Feynman method steps',
    faq: {
      questions: [
        {
          q: 'What is the Feynman Technique?',
          a: "The Feynman Technique is a four-step learning method developed by Nobel Prize-winning physicist Richard Feynman: choose a concept, explain it in plain language as if teaching a child, identify gaps in your explanation, and go back to the source to fill them."
        },
        {
          q: 'Why is teaching the best way to learn?',
          a: 'Teaching forces you to confront what you actually understand versus what you merely recognize. The act of explaining exposes gaps, fuzzy thinking, and false confidence that passive reading or re-reading never reveals.'
        },
        {
          q: 'How do you apply the Feynman Technique step by step?',
          a: 'Step 1: Write the concept name at the top of a blank page. Step 2: Explain it as if teaching someone with no background. Step 3: Notice where you hesitate, use jargon, or go vague — those are your gaps. Step 4: Return to source material and relearn those gaps. Repeat until the explanation is clean.'
        },
        {
          q: 'What kinds of knowledge does the Feynman Technique work best for?',
          a: 'It works for any conceptual knowledge: science, philosophy, economics, history, mental models, programming. It is less applicable to procedural skills (like playing piano) which require physical practice, but even there, explaining the theory deepens execution.'
        }
      ]
    }
  },
  {
    file: 'regret-minimization.astro',
    oldKeywords: 'regret minimization, Jeff Bezos regret minimization, regret minimization framework, decision making long term, 80 year old self, minimize regret, life decisions framework, future self thinking',
    newKeywords: 'regret minimization, Jeff Bezos regret minimization, regret minimization framework, decision making long term, 80 year old self, minimize regret, life decisions framework, future self thinking, how to make big decisions, long-term perspective, deathbed test, reduce life regrets',
    faq: {
      questions: [
        {
          q: 'What is the Regret Minimization Framework?',
          a: 'The Regret Minimization Framework is a decision-making tool invented by Jeff Bezos. When facing a major decision, imagine yourself at age 80 looking back. Ask: "Will I regret NOT doing this?" If yes, do it. It prioritizes long-term fulfillment over short-term comfort.'
        },
        {
          q: 'How did Jeff Bezos use regret minimization to start Amazon?',
          a: "Bezos was considering leaving his Wall Street job to start an internet company in 1994. He asked which choice his 80-year-old self would regret more — not trying, or failing. He concluded he would regret inaction far more, and left to found Amazon."
        },
        {
          q: 'What types of decisions is the regret minimization framework best for?',
          a: 'It is most powerful for high-stakes, irreversible or hard-to-reverse decisions: career changes, starting a business, moving cities, pursuing a relationship, or making large investments. For small daily choices, other frameworks are more efficient.'
        },
        {
          q: 'How is regret minimization different from other decision frameworks?',
          a: 'Most frameworks optimize for the present or near future. Regret minimization leaps to the end of your life and works backward — prioritizing meaning, boldness, and growth over security and comfort. It is fundamentally about values alignment, not risk calculation.'
        }
      ]
    }
  },
  {
    file: 'confirmation-bias.astro',
    oldKeywords: 'confirmation bias, cognitive bias, confirmation bias examples, how to overcome confirmation bias, biased thinking, belief bias, selective information, seek disconfirming evidence',
    newKeywords: 'confirmation bias, cognitive bias, confirmation bias examples, how to overcome confirmation bias, biased thinking, belief bias, selective information, seek disconfirming evidence, what is confirmation bias, avoid confirmation bias, echo chamber thinking, disconfirming evidence',
    faq: {
      questions: [
        {
          q: 'What is confirmation bias?',
          a: 'Confirmation bias is the tendency to search for, interpret, and remember information in a way that confirms your pre-existing beliefs, while ignoring or dismissing contradicting evidence. It is one of the most pervasive and dangerous cognitive biases.'
        },
        {
          q: 'Why is confirmation bias so hard to overcome?',
          a: 'Because it is unconscious and feels like good reasoning. When we find evidence that supports our view, it feels like confirmation of truth. When we encounter contradicting evidence, we instinctively find reasons to dismiss it rather than updating our beliefs.'
        },
        {
          q: 'What are the most damaging examples of confirmation bias?',
          a: 'In investing, confirmation bias causes investors to seek out bullish news on stocks they own while ignoring warning signs. In medicine, it leads to premature diagnosis. In politics, it creates echo chambers. In relationships, it reinforces harmful patterns.'
        },
        {
          q: 'How can you actively reduce confirmation bias?',
          a: 'Deliberately seek disconfirming evidence. Ask "what would change my mind?" before researching. Use pre-mortems. Consult people who disagree with you. Separate information gathering from decision-making. Steel-man opposing views before evaluating your own.'
        }
      ]
    }
  },
  {
    file: 'survivorship-bias.astro',
    oldKeywords: 'survivorship bias, survivorship bias examples, cognitive bias, selection bias, success stories bias, missing data, Abraham Wald survivorship, failed startups survivorship bias',
    newKeywords: 'survivorship bias, survivorship bias examples, cognitive bias, selection bias, success stories bias, missing data, Abraham Wald survivorship, failed startups survivorship bias, what is survivorship bias, hidden failures, visible success bias, sampling bias',
    faq: {
      questions: [
        {
          q: 'What is survivorship bias?',
          a: "Survivorship bias occurs when we focus on subjects that passed a selection process while ignoring those that did not — because the failures are invisible. We only see survivors, which distorts our perception of what works and what doesn't."
        },
        {
          q: 'What is the most famous example of survivorship bias?',
          a: "During WWII, statistician Abraham Wald analyzed bullet holes in returning planes. The military wanted to reinforce damaged areas. Wald said reinforce the undamaged areas instead — because planes hit there didn't return. The missing data was the most important data."
        },
        {
          q: 'How does survivorship bias affect our perception of success?',
          a: "We hear about successful entrepreneurs, investors, and authors, but not the thousands who tried the same approach and failed. This creates a distorted view that makes successful strategies seem universally applicable when they may be the product of luck, timing, or selection."
        },
        {
          q: 'How can you guard against survivorship bias?',
          a: "Actively seek out failure data, not just success stories. Ask 'who is not in this sample?' before drawing conclusions. Study companies that failed, not just those that succeeded. Look for the planes that didn't come back."
        }
      ]
    }
  },
  {
    file: 'hanlon-razor.astro',
    oldKeywords: "Hanlon's razor, never attribute to malice, Hanlon razor explained, cognitive bias relationships, assume incompetence not malice, charity principle, misattribution, social mental models",
    newKeywords: "Hanlon's razor, never attribute to malice, Hanlon razor explained, cognitive bias relationships, assume incompetence not malice, charity principle, misattribution, social mental models, Hanlon's razor examples, avoid paranoia, charitable interpretation, malice vs incompetence",
    faq: {
      questions: [
        {
          q: "What is Hanlon's Razor?",
          a: "Hanlon's Razor states: 'Never attribute to malice that which is adequately explained by stupidity (or incompetence).' It is a heuristic that encourages charitable interpretation — assuming oversight or error before assuming harmful intent."
        },
        {
          q: "Where does Hanlon's Razor come from?",
          a: "The principle is attributed to Robert J. Hanlon, who submitted it to a 1980 joke book. It echoes Occam's Razor in spirit. Similar formulations appear in Goethe, Napoleon, and others — the core idea has ancient roots in charitable reasoning."
        },
        {
          q: "Why is Hanlon's Razor useful in relationships and work?",
          a: "Most friction in relationships and workplaces comes from misunderstanding, not malice. Assuming bad intent triggers defensiveness and conflict that escalates unnecessarily. Hanlon's Razor keeps you curious instead of paranoid, and preserves relationships that careless attribution would destroy."
        },
        {
          q: "When should you NOT apply Hanlon's Razor?",
          a: "When there is clear evidence of repeated, intentional harm; when someone has explicitly stated harmful intent; or in high-stakes situations where assuming incompetence exposes you to serious risk. Hanlon's Razor is a default starting position, not a law to apply regardless of evidence."
        }
      ]
    }
  },
  {
    file: 'map-territory.astro',
    oldKeywords: 'map is not the territory, map territory mental model, Alfred Korzybski, mental models reality, perception vs reality, models of reality, cognitive maps, map territory relation',
    newKeywords: 'map is not the territory, map territory mental model, Alfred Korzybski, mental models reality, perception vs reality, models of reality, cognitive maps, map territory relation, map vs reality, mental representation, updating your map, reality distortion',
    faq: {
      questions: [
        {
          q: 'What does "the map is not the territory" mean?',
          a: "It means our mental models, beliefs, and descriptions of reality are never the same as reality itself. Just as a map simplifies and abstracts the actual landscape, our perceptions, theories, and worldviews are simplified representations — useful but always incomplete and potentially misleading."
        },
        {
          q: 'Who coined the phrase "the map is not the territory"?',
          a: 'Alfred Korzybski, a Polish-American philosopher and linguist, coined the phrase in 1931. He developed General Semantics — a discipline studying how language shapes our perception of reality, often leading us to confuse our descriptions with the things they describe.'
        },
        {
          q: 'How does the map-territory distinction improve decision-making?',
          a: 'It reminds you to question whether your model of a situation matches reality — or whether you are acting on outdated, biased, or incomplete information. Good decision-makers actively seek reality checks that challenge their maps rather than seeking data that confirms them.'
        },
        {
          q: 'How do you update your mental maps?',
          a: 'Seek direct experience over secondhand accounts. Actively expose yourself to contradicting evidence. Treat your beliefs as hypotheses, not facts. Ask "what would change this belief?" and stay genuinely open to the answer. A map that never updates becomes a trap.'
        }
      ]
    }
  },
  {
    file: 'skin-in-the-game.astro',
    oldKeywords: 'skin in the game, Nassim Taleb skin in the game, personal accountability, risk and reward alignment, decision making accountability, having stake in outcome, risk ownership, personal responsibility',
    newKeywords: 'skin in the game, Nassim Taleb skin in the game, personal accountability, risk and reward alignment, decision making accountability, having stake in outcome, risk ownership, personal responsibility, skin in the game examples, align incentives, moral hazard, Taleb risk',
    faq: {
      questions: [
        {
          q: 'What does "skin in the game" mean?',
          a: "Skin in the game means having a personal stake — especially downside risk — in the outcomes of decisions you make or advice you give. It was popularized by Nassim Nicholas Taleb as a core principle of ethics, accountability, and good decision-making."
        },
        {
          q: 'Why is skin in the game important for decision quality?',
          a: 'When decision-makers share in the consequences of their choices, they think more carefully and act more responsibly. Absent skin in the game, bad advice, reckless risk-taking, and moral hazard flourish — as seen in financial crises where bankers had unlimited upside but socialized the downside.'
        },
        {
          q: 'What are real examples of skin in the game?',
          a: 'A doctor who follows the same health protocols they prescribe. An investor who puts personal capital in the same funds they recommend to clients. Roman architects who had to stand under bridges they designed when the scaffolding was removed. Each example aligns incentives with outcomes.'
        },
        {
          q: 'How can you apply skin in the game in everyday life?',
          a: "Only give advice you would follow yourself. Invest in projects you personally work on. Hold yourself accountable to the same standards you apply to others. And when evaluating advice from others, ask: 'Do they have anything to lose if they're wrong?'"
        }
      ]
    }
  },
  {
    file: 'eisenhower-matrix.astro',
    oldKeywords: 'Eisenhower matrix, Eisenhower decision matrix, urgent important matrix, prioritization framework, time management Eisenhower, do delegate delete defer, task prioritization, priority matrix',
    newKeywords: 'Eisenhower matrix, Eisenhower decision matrix, urgent important matrix, prioritization framework, time management Eisenhower, do delegate delete defer, task prioritization, priority matrix, how to use Eisenhower matrix, four quadrant matrix, important vs urgent, productivity prioritization',
    faq: {
      questions: [
        {
          q: 'What is the Eisenhower Matrix?',
          a: "The Eisenhower Matrix is a prioritization framework that divides tasks into four quadrants based on urgency and importance: Do (urgent + important), Schedule (important, not urgent), Delegate (urgent, not important), and Eliminate (neither). It was inspired by Dwight D. Eisenhower's approach to productivity."
        },
        {
          q: 'What is the difference between urgent and important tasks?',
          a: "Urgent tasks demand immediate attention but may not move you toward meaningful goals — emails, interruptions, minor crises. Important tasks contribute to your long-term objectives and values but rarely scream for attention. The trap is spending all your time on urgent-but-not-important work."
        },
        {
          q: 'Which quadrant should you focus on most?',
          a: "Quadrant 2 — important but not urgent — is where the highest-leverage work lives: strategic planning, skill development, relationship building, health. High performers deliberately protect time for Q2 work. Neglecting it causes Q1 crises to multiply over time."
        },
        {
          q: 'How do you implement the Eisenhower Matrix in daily life?',
          a: 'At the start of each day or week, list your tasks and assign each to a quadrant. Do Q1 tasks first. Block dedicated time for Q2. Delegate Q3 immediately. Ruthlessly eliminate Q4. Review weekly to track if you are shifting more time into Q2 over time.'
        }
      ]
    }
  },
  {
    file: 'mental-models-investing.astro',
    oldKeywords: 'mental models investing, investing mental models, Warren Buffett investing, Charlie Munger lattice, value investing mental models, decision making investing, financial mental models, investment thinking frameworks, behavioral finance',
    newKeywords: 'mental models investing, investing mental models, Warren Buffett investing, Charlie Munger lattice, value investing mental models, decision making investing, financial mental models, investment thinking frameworks, behavioral finance, think like Buffett, investor psychology, investment decision framework',
    faq: {
      questions: [
        {
          q: 'What are mental models in investing?',
          a: 'Mental models in investing are frameworks for understanding markets, companies, and human behavior that help investors make better decisions. Charlie Munger described the ideal approach as building a "latticework" of models from multiple disciplines — not just finance.'
        },
        {
          q: 'Which mental models are most valuable for investors?',
          a: 'Circle of competence (know what you know), margin of safety (build in error room), second-order thinking (think beyond consensus), inversion (ask what kills this investment), and compounding (favor long runways) are among the most powerful models for investment decisions.'
        },
        {
          q: 'How did Warren Buffett and Charlie Munger use mental models?',
          a: "Munger famously studied every major discipline — psychology, physics, biology, economics — extracting core principles and applying them to investing. Buffett has said that most of his best decisions came from thinking like a business owner, not a stock trader — a fundamental mental model shift."
        },
        {
          q: 'How can individual investors apply mental models to their portfolio?',
          a: 'Start by clearly defining your circle of competence and investing only within it. Apply inversion to every investment thesis. Use second-order thinking to ask what happens if your thesis is right and how that is already priced in. And always demand a margin of safety.'
        }
      ]
    }
  },
  {
    file: 'mental-models-business.astro',
    oldKeywords: 'mental models business, business mental models, strategic thinking frameworks, business strategy models, competitive advantage mental model, business decision making, management mental models, entrepreneur mental models',
    newKeywords: 'mental models business, business mental models, strategic thinking frameworks, business strategy models, competitive advantage mental model, business decision making, management mental models, entrepreneur mental models, how to think in business, business frameworks, problem solving business, business mental clarity',
    faq: {
      questions: [
        {
          q: 'What are mental models in business?',
          a: 'Mental models in business are simplified frameworks that help leaders and entrepreneurs understand complex situations, anticipate consequences, and make better decisions faster. They replace the need to think from scratch in every situation by providing reusable thinking tools.'
        },
        {
          q: 'Which mental models matter most for business leaders?',
          a: 'Leverage (what moves produce outsized results), second-order thinking (anticipate downstream consequences), inversion (what could kill this?), the Pareto Principle (focus on vital few), and skin in the game (align team incentives with outcomes) are foundational for business leadership.'
        },
        {
          q: 'How do mental models create competitive advantage?',
          a: 'Leaders who use mental models see patterns others miss, avoid common strategic traps, and make decisions faster with less information. The competitive edge comes from using models across disciplines — importing insights from biology, physics, or psychology into business contexts.'
        },
        {
          q: 'How can you build a mental model practice for your business?',
          a: 'Hold weekly decision reviews where you identify which mental model applies to current challenges. Keep a model library. When a decision fails, perform a post-mortem asking which model was misapplied or missing. Over time, model use becomes instinctive.'
        }
      ]
    }
  },
  {
    file: 'charlie-munger-mental-models.astro',
    oldKeywords: "Charlie Munger mental models, Munger lattice of models, Poor Charlie's Almanack, Munger wisdom, multidisciplinary thinking, Berkshire Hathaway thinking, Charlie Munger wisdom, mental models Charlie Munger",
    newKeywords: "Charlie Munger mental models, Munger lattice of models, Poor Charlie's Almanack, Munger wisdom, multidisciplinary thinking, Berkshire Hathaway thinking, Charlie Munger wisdom, mental models Charlie Munger, Munger thinking framework, latticework of mental models, Munger investing philosophy, worldly wisdom",
    faq: {
      questions: [
        {
          q: 'What is Charlie Munger\'s mental model approach?',
          a: "Munger advocated building a 'latticework of mental models' — collecting the most important ideas from every major discipline (mathematics, physics, biology, psychology, economics, history) and applying them together when analyzing any situation. No single model is enough; you need the full toolkit."
        },
        {
          q: 'What are Charlie Munger\'s most important mental models?',
          a: "Munger's key models include inversion, circle of competence, incentive-caused bias, social proof, availability heuristic, compounding, the lollapalooza effect (multiple models reinforcing simultaneously), and margin of safety. He often cited psychology as the most underrated source of business insight."
        },
        {
          q: 'How did Munger apply mental models to investing?',
          a: "Munger looked for businesses with durable competitive advantages (moats), strong management incentives aligned with shareholders, and prices below intrinsic value. He avoided complexity he couldn't understand and used inversion constantly — asking 'what would cause this investment to fail?'"
        },
        {
          q: "What is the best way to learn from Charlie Munger's approach?",
          a: "Start with 'Poor Charlie's Almanack' — a collection of his speeches and talks. Then study each discipline he mentions, extracting its core models. Apply them to real situations you face. Munger believed the best learning comes from thinking through actual problems, not just reading."
        }
      ]
    }
  },
  {
    file: 'build-mental-model-library.astro',
    oldKeywords: 'build mental model library, mental model collection, how to learn mental models, mental model practice, personal knowledge system, collect mental models, apply mental models, mental model habit',
    newKeywords: 'build mental model library, mental model collection, how to learn mental models, mental model practice, personal knowledge system, collect mental models, apply mental models, mental model habit, mental model system, organize mental models, mental model journal, practical mental models',
    faq: {
      questions: [
        {
          q: 'What is a mental model library?',
          a: 'A mental model library is your personal collection of thinking frameworks — organized, understood deeply, and ready to apply. Unlike passively knowing about mental models, a library means you have internalized them well enough to deploy them automatically when facing decisions or problems.'
        },
        {
          q: 'How do you start building a mental model library?',
          a: "Start with 10-15 high-leverage models: first principles, inversion, circle of competence, second-order thinking, Pareto principle, compounding, and a few from psychology. Don't try to collect everything — go deep on a few rather than shallow on many."
        },
        {
          q: 'How do you move from knowing about mental models to actually using them?',
          a: 'Apply each model to a real problem within 48 hours of learning it. Keep a decision journal where you note which model you used and why. Review weekly. The shift from knowledge to application is the single biggest leverage point in building a working mental model library.'
        },
        {
          q: 'How should you organize your mental model library?',
          a: "Group models by function (decision-making, problem-solving, understanding people, understanding systems) rather than by origin discipline. This makes retrieval faster when you face a real situation. Tools like Notion, Obsidian, or even a simple notebook work well — the medium matters less than the practice."
        }
      ]
    }
  }
];

let successCount = 0;
let errorCount = 0;

for (const update of updates) {
  const filePath = path.join(blogDir, update.file);

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Update keywords
    if (content.includes(update.oldKeywords)) {
      content = content.replace(update.oldKeywords, update.newKeywords);
      changed = true;
    } else {
      console.log(`  WARNING: Old keywords not found in ${update.file}`);
    }

    // 2. Insert FAQPage JSON-LD after preload link (if not already present)
    if (!content.includes('"FAQPage"')) {
      const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": update.faq.questions.map(q => ({
          "@type": "Question",
          "name": q.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.a
          }
        }))
      };

      const faqScript = `\n  <script type="application/ld+json" slot="head" set:html={JSON.stringify(${JSON.stringify(faqJsonLd, null, 2)})} />`;

      // Find the preload link line and insert after it
      const preloadRegex = /(<link rel="preload" as="image"[^\n]+\/>)/;
      if (preloadRegex.test(content)) {
        content = content.replace(preloadRegex, `$1${faqScript}`);
        changed = true;
      } else {
        console.log(`  WARNING: Preload link not found in ${update.file}`);
      }
    } else {
      console.log(`  SKIP: FAQPage already exists in ${update.file}`);
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  OK: ${update.file}`);
      successCount++;
    }

  } catch (err) {
    console.error(`  ERROR: ${update.file} — ${err.message}`);
    errorCount++;
  }
}

console.log(`\nDone. ${successCount} files updated, ${errorCount} errors.`);
