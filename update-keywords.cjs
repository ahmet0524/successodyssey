const fs = require('fs');
const path = require('path');

const blogDir = 'D:\\successodyssey\\src\\pages\\blog';

// Each entry: file, and the FULL new pageKeywords value
const updates = [
  {
    file: 'inversion-mental-model.astro',
    newKeywords: 'inversion mental model, inversion thinking, Charlie Munger inversion, thinking backwards, invert always invert, problem solving inversion, Jacobi inversion, how to use inversion thinking, reverse thinking technique, avoid failure strategy, inverted thinking, inversion decision making'
  },
  {
    file: 'second-order-thinking.astro',
    newKeywords: 'second order thinking, second order effects, second order consequences, Howard Marks thinking, second level thinking, long term thinking mental model, how to think long term, unintended consequences, downstream effects, beyond first order effects, systems thinking, think ahead'
  },
  {
    file: 'circle-of-competence.astro',
    newKeywords: 'circle of competence, Warren Buffett circle of competence, Charlie Munger circle of competence, know your limits, stay in your lane investing, circle of competence examples, how to define circle of competence, expand circle of competence, edge of competence, avoid overconfidence investing'
  },
  {
    file: 'pareto-principle-80-20.astro',
    newKeywords: 'pareto principle, 80 20 rule, 80/20 principle, Pareto principle examples, 80 20 rule productivity, 80 20 rule business, Vilfredo Pareto, how to apply 80 20 rule, pareto analysis, vital few trivial many, high impact tasks, leverage in work'
  },
  {
    file: 'occams-razor-explained.astro',
    newKeywords: "Occam's razor, Occam's razor explained, principle of parsimony, law of parsimony, Occam's razor examples, simplest explanation, Occam razor decision making, entia non sunt multiplicanda, fewest assumptions, eliminate complexity, simplicity heuristic, razor principles"
  },
  {
    file: 'compounding-mental-model.astro',
    newKeywords: 'compounding mental model, power of compounding, compound effect, compounding knowledge, compounding habits, Warren Buffett compounding, compound interest life, compounding relationships, exponential growth, compounding skills, long-term compounding, patience and compounding'
  },
  {
    file: 'opportunity-cost-thinking.astro',
    newKeywords: 'opportunity cost, opportunity cost examples, opportunity cost definition, opportunity cost thinking, hidden cost of decisions, economic opportunity cost, time opportunity cost, career opportunity cost, real cost analysis, cost of doing nothing, trade-off thinking, resource allocation'
  },
  {
    file: 'feynman-technique.astro',
    newKeywords: 'Feynman technique, Feynman learning method, how to learn anything faster, Feynman technique steps, Richard Feynman learning, learn faster study technique, understanding vs memorizing, deep learning technique, teach to learn, identify knowledge gaps, explain like five, simplify to understand'
  },
  {
    file: 'regret-minimization.astro',
    newKeywords: 'regret minimization framework, Jeff Bezos regret minimization, regret minimization, how to make big decisions, bezos decision framework, minimize regret, 80 year old self decision making, bold life decisions, future self thinking, deathbed test, long-term perspective, reduce life regrets'
  },
  {
    file: 'confirmation-bias.astro',
    newKeywords: 'confirmation bias, confirmation bias examples, how to overcome confirmation bias, cognitive bias decision making, confirmation bias psychology, motivated reasoning, how to avoid confirmation bias, seek disconfirming evidence, echo chamber thinking, belief bias, selective information, biased thinking'
  },
  {
    file: 'survivorship-bias.astro',
    newKeywords: 'survivorship bias, survivorship bias examples, survivorship bias definition, Abraham Wald, survivorship bias business, how to avoid survivorship bias, selection bias, cognitive bias, hidden failures, visible success bias, missing data bias, sampling bias'
  },
  {
    file: 'hanlon-razor.astro',
    newKeywords: "Hanlon's razor, never attribute to malice, Hanlon's razor examples, Hanlon's razor explained, assume incompetence not malice, cognitive bias attribution, fundamental attribution error, Occam's razor malice, charitable interpretation, avoid paranoia, malice vs incompetence, charity principle"
  },
  {
    file: 'map-territory.astro',
    newKeywords: 'map is not the territory, map territory mental model, Alfred Korzybski, mental models reality, models vs reality, how to update beliefs, epistemology mental models, cognitive map territory, perception vs reality, updating your map, reality distortion, map vs reality'
  },
  {
    file: 'skin-in-the-game.astro',
    newKeywords: 'skin in the game, Nassim Taleb skin in the game, skin in the game meaning, skin in the game examples, Taleb antifragile, moral hazard, accountability decisions, risk sharing, align incentives, personal accountability, downside risk, risk ownership'
  },
  {
    file: 'eisenhower-matrix.astro',
    newKeywords: 'Eisenhower matrix, Eisenhower matrix explained, urgent vs important, Eisenhower principle, priority matrix, time management matrix, Stephen Covey time management, do delegate delete defer, four quadrant matrix, important not urgent, Q2 productivity, task prioritization'
  },
  {
    file: 'mental-models-investing.astro',
    newKeywords: 'mental models investing, investing mental models, Warren Buffett mental models, Charlie Munger investing, moat investing, Mr Market mental model, margin of safety, circle of competence investing, value investing mental models, think like Buffett, investor psychology, investment decision framework'
  },
  {
    file: 'mental-models-business.astro',
    newKeywords: 'mental models business, business decision making frameworks, jobs to be done theory, flywheel business, product market fit mental model, business mental models, Jeff Bezos mental models, business strategy frameworks, strategic thinking tools, competitive advantage mental model, entrepreneur thinking, problem solving business'
  },
  {
    file: 'charlie-munger-mental-models.astro',
    newKeywords: "Charlie Munger mental models, Charlie Munger latticework, psychology of human misjudgment, Munger thinking frameworks, Poor Charlie's Almanack, Munger wisdom, Charlie Munger worldly wisdom, multidisciplinary thinking Munger, Munger investing philosophy, lollapalooza effect, worldly wisdom Munger, Berkshire Hathaway thinking"
  },
  {
    file: 'build-mental-model-library.astro',
    newKeywords: 'how to build mental model library, mental model library, learning mental models, applying mental models, mental model system, personal knowledge management mental models, how to think better, mental models practice, mental model journal, organize mental models, practical mental models, mental model habit'
  }
];

let successCount = 0;
let errorCount = 0;

for (const update of updates) {
  const filePath = path.join(blogDir, update.file);

  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the entire pageKeywords line
    const keywordsRegex = /const pageKeywords = ".*?";/;
    if (keywordsRegex.test(content)) {
      content = content.replace(keywordsRegex, `const pageKeywords = "${update.newKeywords}";`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  OK: ${update.file}`);
      successCount++;
    } else {
      console.log(`  WARNING: pageKeywords line not found in ${update.file}`);
      errorCount++;
    }

  } catch (err) {
    console.error(`  ERROR: ${update.file} — ${err.message}`);
    errorCount++;
  }
}

console.log(`\nDone. ${successCount} files updated, ${errorCount} errors.`);
