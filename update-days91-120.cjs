const fs = require('fs');
const path = require('path');

const blogDir = 'D:\\successodyssey\\src\\pages\\blog';

const FLUID_AD = `
      <!-- Mid-Article Ad -->
      <div class="ad-unit ad-unit--mid">
        <ins class="adsbygoogle"
             style="display:block; text-align:center;"
             data-ad-layout="in-article"
             data-ad-format="fluid"
             data-ad-client="ca-pub-7229511013815291"
             data-ad-slot="4827765044"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>
      </div>
`;

// Files that need ALL 4 updates (dateModified + keywords + FAQ + fluid ad)
const fullUpdates = [
  {
    file: 'accountability-systems.astro',
    newKeywords: 'accountability systems, accountability partner, how to stay accountable, accountability for goals, accountability science, commitment devices, social accountability, public commitment goals, accountability groups, how to build accountability, external accountability, accountability strategies',
    faq: [
      { q: 'What is an accountability system and why does it work?', a: 'An accountability system is any structure — a person, group, commitment device, or tracking method — that makes your commitments visible to others and creates consequences for failing them. Research by the American Society of Training and Development found that having a specific accountability appointment with another person increases the probability of achieving a goal by 95%.' },
      { q: 'What types of accountability systems are most effective?', a: 'Research ranks them roughly: accountability partner (one-on-one, high commitment), accountability groups or mastermind groups, public commitments (social accountability), commitment devices (Beeminder, financial stakes), coaches, and tracking systems. The most effective combine social accountability with concrete consequences — people work harder when their reputation is on the line.' },
      { q: 'How does social accountability change behavior?', a: 'Social accountability activates several psychological mechanisms: loss aversion (not wanting to lose face), identity alignment (wanting to be the person you said you would be), intrinsic motivation (commitment to others you respect), and reciprocal accountability (knowing others are also counting on the system). These mechanisms are powerful enough to substitute for willpower in many contexts.' },
      { q: 'What is a commitment device and how do you create one?', a: 'A commitment device is a mechanism you set up in advance to lock in a future choice. Examples: paying a financial penalty if you miss a workout (stickK, Beeminder), giving a trusted person money to donate to a cause you hate if you fail, scheduling public performance before you feel ready. Commitment devices work by making your future self\'s choice consistent with your current values.' }
    ]
  },
  {
    file: 'decision-fatigue.astro',
    newKeywords: 'decision fatigue, decision fatigue examples, decision fatigue science, how to reduce decision fatigue, willpower and decision making, cognitive depletion decisions, decision fatigue productivity, barack obama decision fatigue, reducing daily decisions, decision fatigue solutions, cognitive load decisions, simplify decisions',
    faq: [
      { q: 'What is decision fatigue and how does it affect productivity?', a: 'Decision fatigue is the deteriorating quality of decisions made after a long session of decision-making. Research by Roy Baumeister and others shows that decision-making depletes a cognitive resource — the more decisions made earlier in the day, the worse the quality of subsequent decisions. This is why important decisions should be made early, and trivial ones automated or eliminated.' },
      { q: 'What is the most famous example of decision fatigue?', a: 'Barack Obama wore only gray or blue suits during his presidency, explaining "I\'m trying to pare down decisions. I don\'t want to make decisions about what I\'m eating or wearing. Because I have too many other decisions to make." Steve Jobs wore the same black turtleneck and jeans. These weren\'t eccentricities — they were deliberate strategies to conserve cognitive resources for consequential choices.' },
      { q: 'How does decision fatigue affect quality of judgment?', a: 'Research on Israeli judges found parole rates dropped from ~65% to nearly 0% as the session progressed — only to jump back to 65% after a food break. The effect appears across medical decisions, financial choices, and consumer behavior. Fatigued decision-makers tend toward default options (denying parole, maintaining status quo), impulsive choices, or avoidance altogether.' },
      { q: 'What are the most effective strategies for reducing decision fatigue?', a: 'Key strategies: Make important decisions in the morning when cognitive resources are freshest. Automate or eliminate trivial decisions (clothing, meals, routines). Create decision rules and frameworks in advance so common situations don\'t require fresh deliberation. Batch similar decisions together. Take breaks with food (glucose helps restore decision quality). Limit the number of decisions you face each day.' }
    ]
  },
  {
    file: 'decision-making-framework.astro',
    newKeywords: 'decision making framework, better decisions, how to make better decisions, decision making process, decision making model, structured decision making, improve decision quality, decision framework steps, rational decision making, evidence based decisions, decision making tools, systematic decision process',
    faq: [
      { q: 'What is a decision-making framework and why use one?', a: 'A decision-making framework is a structured process for evaluating choices that reduces the influence of cognitive biases, emotional noise, and incomplete analysis. Frameworks don\'t guarantee right answers, but they systematically improve the quality of reasoning and create records that enable learning from outcomes — compounding decision quality over time.' },
      { q: 'What are the most evidence-based decision-making frameworks?', a: 'The most researched and practically effective frameworks include: pre-mortem analysis (imagine failure and trace causes), the Cynefin framework (matches decision process to problem type), WRAP by Chip and Dan Heath (Widen options, Reality-test assumptions, Attain distance, Prepare to be wrong), and decision matrices for multi-criteria choices. Each addresses different decision failure modes.' },
      { q: 'How do you make better decisions under uncertainty?', a: 'Under genuine uncertainty, evidence-based approaches include: using base rates rather than unique-case reasoning, probabilistic thinking (assign explicit probabilities to outcomes), seeking disconfirming evidence before committing, making reversible decisions faster and irreversible decisions slower, and acknowledging uncertainty explicitly rather than defaulting to false confidence.' },
      { q: 'What is the difference between good decisions and good outcomes?', a: 'A good decision is one made with the best available information and reasoning at the time. A good outcome is what actually happens — which involves factors outside your control. These are often confused, leading to "resulting" — judging decisions by outcomes rather than process. The goal is consistently good decision processes, which produce good outcomes on average over time, not necessarily in every instance.' }
    ]
  },
  {
    file: 'how-billionaires-decide.astro',
    newKeywords: 'how billionaires make decisions, billionaire decision making, bezos decision framework, warren buffett decision process, decision making strategies, how successful people decide, elite decision making, billionaire thinking, high stakes decisions, decision frameworks billionaires, ultra high net worth decision making, learning from elite decision makers',
    faq: [
      { q: 'How do billionaires approach high-stakes decision-making differently?', a: 'Research and documented accounts reveal common patterns: they distinguish between reversible and irreversible decisions (spending far more time on the latter), they explicitly seek disconfirming evidence before committing, they use frameworks consistently rather than relying on intuition for novel situations, and they invest heavily in the quality of information and advisors before deciding.' },
      { q: 'What is Jeff Bezos\'s two-type decision framework?', a: 'Bezos divides decisions into Type 1 (one-way doors — irreversible, high-stakes, requiring extensive deliberation) and Type 2 (two-way doors — reversible, where the cost of moving fast and adjusting is lower than the cost of slow consensus). He argues most decisions are Type 2 and should be made quickly by individuals, not slowly by committees, preserving cognitive resources for true Type 1 decisions.' },
      { q: 'How does Warren Buffett\'s circle of competence shape his decision-making?', a: 'Buffett\'s most important decision-making rule is refusing to decide outside his circle of competence. He has passed on hundreds of investments in technology, biotech, and other domains he couldn\'t analyze confidently — even when they seemed obvious. This discipline, which requires saying "I don\'t know" and walking away, has protected him from the losses that destroy long-term compounding.' },
      { q: 'What cognitive habits do the most successful decision-makers share?', a: 'Consistently documented patterns include: writing before deciding (externalizing reasoning reduces emotional influence), seeking explicit disagreement ("what am I missing?"), sleeping on major decisions rather than deciding in the moment, creating decision checklists for their most common decision types, and conducting systematic post-mortems to learn from both successes and failures.' }
    ]
  }
];

// Files that only need dateModified updated
const dateOnlyUpdates = [
  'bayesian-thinking.astro',
  'intuition-vs-analysis.astro',
  'mental-models-for-relationships.astro',
  'mental-models-relationships.astro',
  'overcoming-resistance.astro',
  'probabilistic-thinking.astro',
  'rethinking-success.astro'
];

function makeFAQScript(questions) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": { "@type": "Answer", "text": q.a }
    }))
  };
  return `\n  <script type="application/ld+json" slot="head" set:html={JSON.stringify(${JSON.stringify(faqData, null, 2)})} />`;
}

let successCount = 0;
let errorCount = 0;

// Full updates
for (const update of fullUpdates) {
  const filePath = path.join(blogDir, update.file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. dateModified
    const dmRegex = /const dateModified\s*=\s*["']20\d\d-\d\d-\d\dT00:00:00Z["']/;
    if (dmRegex.test(content)) {
      const before = content;
      content = content.replace(dmRegex, 'const dateModified = "2026-05-09T00:00:00Z"');
      if (content !== before) changed = true;
    }

    // 2. Keywords
    if (update.newKeywords) {
      const kwRegex = /const pageKeywords\s*=\s*['"][^'"]+['"]\s*;/;
      if (kwRegex.test(content)) {
        const before = content;
        content = content.replace(kwRegex, `const pageKeywords = "${update.newKeywords}";`);
        if (content !== before) changed = true;
      }
    }

    // 3. FAQPage
    if (update.faq && !content.includes('"FAQPage"')) {
      const faqScript = makeFAQScript(update.faq);
      const preloadRegex = /(<link rel="preload" as="image"[^\n]+\/>)/;
      if (preloadRegex.test(content)) {
        content = content.replace(preloadRegex, `$1${faqScript}`);
        changed = true;
      } else {
        console.log(`  WARNING: No preload link in ${update.file}`);
      }
    }

    // 4. Fluid ad
    if (!content.includes('in-article')) {
      let count = 0, insertIdx = -1, searchFrom = 0;
      while (count < 2) {
        const idx = content.indexOf('</section>', searchFrom);
        if (idx === -1) break;
        count++;
        if (count === 2) insertIdx = idx + '</section>'.length;
        searchFrom = idx + 1;
      }
      if (insertIdx === -1) {
        const idx = content.indexOf('</section>');
        if (idx !== -1) insertIdx = idx + '</section>'.length;
      }
      if (insertIdx !== -1) {
        content = content.slice(0, insertIdx) + FLUID_AD + content.slice(insertIdx);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  OK (full): ${update.file}`);
      successCount++;
    }
  } catch (err) {
    console.error(`  ERROR: ${update.file} — ${err.message}`);
    errorCount++;
  }
}

// Date-only updates
for (const fileName of dateOnlyUpdates) {
  const filePath = path.join(blogDir, fileName);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const dmRegex = /const dateModified\s*=\s*["']20\d\d-\d\d-\d\dT00:00:00Z["']/;
    if (dmRegex.test(content)) {
      const before = content;
      content = content.replace(dmRegex, 'const dateModified = "2026-05-09T00:00:00Z"');
      if (content !== before) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  OK (date): ${fileName}`);
        successCount++;
      } else {
        console.log(`  SKIP (already current): ${fileName}`);
      }
    }
  } catch (err) {
    console.error(`  ERROR: ${fileName} — ${err.message}`);
    errorCount++;
  }
}

console.log(`\nDone. ${successCount} files updated, ${errorCount} errors.`);
