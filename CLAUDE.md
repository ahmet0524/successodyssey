
# CLAUDE.md — successodysseyhub.com

Bu dosya her Claude oturumunda referans olarak kullanılır.

---

## Komutlar

```bash
npm run dev       # localhost:4321
npm run build     # dist/ klasörüne build
npm run preview   # build önizleme
git -c http.sslVerify=false push origin main   # SSL bypass ile push
```

---

## Site Yapısı

- **Framework:** Astro 5 (static), **Deploy:** Netlify
- **Domain:** https://successodysseyhub.com
- **Hedef:** ABD trafiği, İngilizce, AdSense + Affiliate gelir modeli

```
src/
  pages/
    blog/          ← her post buraya .astro olarak
    blog.astro     ← blog listesi (allBlogPosts dizisi)
    index.astro    ← ana sayfa
  layouts/
    Layout.astro   ← eski postlar (AdSense script burada)
    BaseLayout.astro ← Day 97+ yeni postlar
  components/
    blog/
      ContentBox.astro
      StepsList.astro
      ContentGrid.astro
      ComparisonTable.astro
      ImageWithCaption.astro
      CodeBlock.astro
```

---

## AdSense Bilgileri

- **Publisher ID:** `ca-pub-7229511013815291`
- **In-Article slot:** `2952775705` → REKLAM 2 (fluid, orta)
- **Display slot:** `4827765044` → REKLAM 1 (ToC sonrası) + REKLAM 3 (conclusion öncesi)

```html
<!-- REKLAM 1 — ToC'tan hemen sonra -->
<ins class="adsbygoogle" style="display:block"
  data-ad-client="ca-pub-7229511013815291"
  data-ad-slot="4827765044"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

<!-- REKLAM 2 — İçerik ortası (7-8. section arası) -->
<ins class="adsbygoogle" style="display:block; text-align:center;"
  data-ad-layout="in-article"
  data-ad-format="fluid"
  data-ad-client="ca-pub-7229511013815291"
  data-ad-slot="2952775705"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

<!-- REKLAM 3 — Conclusion'dan hemen önce -->
<ins class="adsbygoogle" style="display:block"
  data-ad-client="ca-pub-7229511013815291"
  data-ad-slot="4827765044"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

---

## Görsel Döngüsü (Day 97+ yeni postlar)

| Gün % 3 | Görsel |
|---------|--------|
| 1 | `/images/card1a.jpg` |
| 2 | `/images/card2a.jpg` |
| 0 | `/images/card3a.jpg` |

---

## Yeni Post Şablonu (Day 97+ — BaseLayout)

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ContentBox from '../../components/blog/ContentBox.astro';
import StepsList from '../../components/blog/StepsList.astro';

const title = "...";
const description = "...";           // 150-160 karakter, aktif fiil
const keywords = "kw1, kw2, ...";   // minimum 10 semantik varyasyon
const publishDate = "YYYY-MM-DD";
const canonicalUrl = "https://successodysseyhub.com/blog/slug"; // trailing slash YOK
const imageUrl = "/images/cardXa.jpg";

const faqSchema = { /* ZORUNLU — tam 3 soru */ };
---
<BaseLayout title description keywords canonicalUrl imageUrl>
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
  <article class="blog-post">
    <header>H1 + tarih + okuma süresi</header>
    <nav class="table-of-contents">Tüm H2'lere anchor</nav>
    <!-- REKLAM 1 (display, slot 4827765044) -->
    <!-- Ana bölümler (H2) -->
    <!-- REKLAM 2 (fluid in-article, slot 2952775705) — 7-8. section arası -->
    <section id="how-to-apply"><StepsList /></section>
    <section id="misconceptions"><ContentBox type="warning" /></section>
    <!-- REKLAM 3 (display, slot 4827765044) -->
    <section id="conclusion">...</section>
    <ContentBox type="tip">CTA</ContentBox>
    <section class="author-bio">...</section>
    <section class="related-articles">3 iç link</section>
    <section class="external-resources">2-3 dış kaynak</section>
    <section class="book-recommendations">affiliate linkler</section>
  </article>
</BaseLayout>
```

---

## Affiliate Linkler

```
https://amzn.to/atomichabits       → Atomic Habits – James Clear
https://amzn.to/thinkgrowrich      → Think and Grow Rich – Napoleon Hill
https://amzn.to/7habits            → The 7 Habits – Stephen Covey
https://amzn.to/charliesalmanack   → Poor Charlie's Almanack – Charlie Munger
https://amzn.to/greatmentalmodels  → The Great Mental Models – Shane Parrish
```

---

## blog.astro Kuralı

- **Index 0 = Featured post** ("Latest" badge). En yeni post her zaman EN ÜSTE eklenir.
- Silinen/yanlış postlar diziden kaldırılmalı — broken link bırakılmaz.

---

## SEO Kuralları

1. `canonicalUrl` → trailing slash **YOK** (`/blog/slug` ✅ `/blog/slug/` ❌)
2. `pageTitle` → 50-60 karakter
3. `description` → 150-160 karakter + aktif fiil
4. `readingTime` → sabit sayı, `Math.ceil` **YASAK**
5. H1 sadece 1 tane, H2 minimum 6, H3 alt başlıklar, H4 **KULLANMA**
6. Her H2'de `id` attribute zorunlu
7. FAQPage JSON-LD → tam **3 soru** (ne az ne fazla)
8. `pageKeywords` → minimum 10 semantik varyasyon
9. Her yazıda en az 4 iç link (Related Articles + inline)
10. 2.000–2.800 kelime hedefi
11. Slug: max 4-5 kelime, küçük harf, tire — stop word ekleme

---

## 200 Günlük İçerik Planı — Durum Tablosu

### PHASE 1 — Mevcut 14 Sayfayı Güncelle (Gün 1-14)
> ⚠️ Bu sayfalar **silinmez** — AdSense + E-E-A-T güncellemesi yapılacak.

| Gün | Slug | Güncelleme | Durum |
|-----|------|------------|-------|
| 1 | `mental-models` | AdSense + readingTime + alt text | ⏳ |
| 2 | `success-philosophy` | AdSense + SEO | ⏳ |
| 3 | `stoicism` | AdSense + kelime artır | ⏳ |
| 4 | `habits-discipline-momentum` | AdSense + iç link | ⏳ |
| 5 | `vision-to-reality` | AdSense + meta desc | ⏳ |
| 6 | `overcoming-resistance` | AdSense + related | ⏳ |
| 7 | `rethinking-success` | AdSense + H2 yapısı | ⏳ |
| 8 | `happiness-philosophy` | AdSense + ToC | ⏳ |
| 9 | `ai-amplified-mental-models` | AdSense + canonical | ⏳ |
| 10 | `dopamine-digital-age` | AdSense + schema | ⏳ |
| 11 | `extreme-mindset-neuroscience` | AdSense + hero image | ⏳ |
| 12 | `assumption-wealth` | AdSense + affiliate | ⏳ |
| 13 | `synchronicity` | AdSense + related | ⏳ |
| 14 | `best-productivity-tools-2025` | AdSense + affiliate | ⏳ |

### PHASE 2 — Mental Models Serisi (Gün 15-35)

| Gün | Slug | Başlık | Durum |
|-----|------|--------|-------|
| 15 | `first-principles-thinking` | First Principles Thinking | ✅ |
| 16 | `inversion-mental-model` | The Inversion Mental Model | ✅ |
| 17 | `second-order-thinking` | Second-Order Thinking | ✅ |
| 18 | `circle-of-competence` | Circle of Competence | ✅ |
| 19 | `pareto-principle-80-20` | The 80/20 Rule | ✅ |
| 20 | `occams-razor-explained` | Occam's Razor Explained | ✅ |
| 21 | `compounding-mental-model` | The Power of Compounding | ✅ |
| 22 | `opportunity-cost-thinking` | Opportunity Cost | ✅ |
| 23 | `feynman-technique` | The Feynman Technique | ✅ |
| 24 | `regret-minimization` | Regret Minimization Framework | ✅ |
| 25 | `confirmation-bias` | How Confirmation Bias Destroys Decisions | ✅ |
| 26 | `survivorship-bias` | Survivorship Bias | ✅ |
| 27 | `hanlon-razor` | Hanlon's Razor | ✅ |
| 28 | `map-territory` | The Map Is Not the Territory | ✅ |
| 29 | `skin-in-the-game` | Skin in the Game | ✅ |
| 30 | `eisenhower-matrix` | The Eisenhower Matrix | ✅ |
| 31 | `mental-models-investing` | Mental Models for Investors | ✅ |
| 32 | `mental-models-business` | Mental Models for Business | ✅ |
| 33 | `charlie-munger-mental-models` | Charlie Munger's Mental Models | ✅ |
| 34 | `mental-models-relationships` | Mental Models for Relationships | ✅ |
| 35 | `build-mental-model-library` | How to Build Your Mental Model Library | ✅ |

### PHASE 3 — Success Psychology Serisi (Gün 36-60)

| Gün | Slug | Başlık | Durum |
|-----|------|--------|-------|
| 36 | `psychology-of-success` | The Psychology of Success | ✅ |
| 37 | `growth-mindset-vs-fixed` | Growth Mindset vs Fixed Mindset | ✅ |
| 38 | `discipline-beats-motivation` | Why Discipline Beats Motivation | ✅ |
| 39 | `psychology-high-achievers` | The Psychology of High Achievers | ✅ |
| 40 | `self-control-science` | The Science of Self-Control | ✅ |
| 41 | `how-successful-people-think` | How Successful People Think | ✅ |
| 42 | `fear-of-failure-success` | How Successful People Handle Fear | ✅ |
| 43 | `resilience-psychology` | The Psychology of Resilience | ✅ |
| 44 | `intrinsic-motivation` | Intrinsic vs Extrinsic Motivation | ✅ |
| 45 | `delayed-gratification` | The Power of Delayed Gratification | ✅ |
| 46 | `grit-persistence` | Grit: Why Persistence Matters | ✅ |
| 47 | `impostor-syndrome` | Impostor Syndrome: How High Achievers Beat It | ✅ |
| 48 | `psychology-of-goals` | The Psychology of Goal Setting | ✅ |
| 49 | `mindset-billionaires` | The Mindset of Billionaires | ✅ |
| 50 | `scarcity-vs-abundance` | Scarcity vs Abundance Mindset | ✅ |
| 51 | `emotional-intelligence-success` | Emotional Intelligence and Success | ✅ |
| 52 | `cognitive-biases-success` | Cognitive Biases That Sabotage Success | ✅ |
| 53 | `flow-state-productivity` | Flow State: Peak Performance | ✅ |
| 54 | `psychology-procrastination` | The Psychology of Procrastination | ✅ |
| 55 | `locus-of-control` | Internal vs External Locus of Control | ✅ |
| 56 | `self-efficacy-success` | Self-Efficacy: Believe You Can | ✅ |
| 57 | `psychology-money-success` | The Psychology of Money and Success | ✅ |
| 58 | `visualization-success` | Does Visualization Actually Work? | ✅ |
| 59 | `identity-based-success` | Identity-Based Success | ✅ |
| 60 | `psychology-habits-change` | The Psychology of Lasting Behavior Change | ✅ |

### PHASE 4 — Habit & Productivity Serisi (Gün 61-90)

| Gün | Slug | Başlık | Durum |
|-----|------|--------|-------|
| 61 | `habit-loop-explained` | The Habit Loop | ✅ |
| 62 | `morning-routine-successful-people` | Morning Routines of Successful People | ✅ |
| 63 | `deep-work-strategy` | Deep Work Strategy | ✅ |
| 64 | `time-blocking-method` | Time Blocking Method | ✅ |
| 65 | `5am-club-habit` | The 5 AM Club | ✅ |
| 66 | `atomic-habits-summary` | Atomic Habits: Key Lessons | ✅ |
| 67 | `single-tasking-vs-multitasking` | Why Single-Tasking Beats Multitasking | ✅ |
| 68 | `productivity-systems-comparison` | GTD vs Pomodoro vs Time Blocking | ✅ |
| 69 | `energy-management-productivity` | Energy Management vs Time Management | ✅ |
| 70 | `keystone-habits` | Keystone Habits | ✅ |
| 71 | `habit-stacking` | Habit Stacking | ✅ |
| 72 | `consistency-over-intensity` | Consistency Over Intensity | ✅ |
| 73 | `1-percent-better` | The 1% Better Rule | ✅ |
| 74 | `evening-routine` | The Perfect Evening Routine | ✅ |
| 75 | `distraction-free-work` | Distraction-Free Work Environment | ✅ |
| 76 | `weekly-review-system` | The Weekly Review | ✅ |
| 77 | `90-day-goal-setting` | 90-Day Goal Setting | ✅ |
| 78 | `saying-no-productivity` | The Art of Saying No | ✅ |
| 79 | `digital-minimalism-productivity` | Digital Minimalism | ✅ |
| 80 | `sleep-optimization` | Sleep Optimization | ✅ |
| 81 | `exercise-mental-performance` | How Exercise Improves Mental Performance | ✅ |
| 82 | `journaling-for-success` | Journaling for Success | ✅ |
| 83 | `reading-habits-successful` | Reading Habits of Successful People | ✅ |
| 84 | `batching-tasks` | Task Batching | ✅ |
| 85 | `decision-fatigue` | Decision Fatigue | ✅ |
| 86 | `accountability-systems` | Accountability Systems | ✅ |
| 87 | `environment-design-habits` | Environment Design for Habits | ✅ |
| 88 | `identity-change-habits` | How to Change Your Identity | ✅ |
| 89 | `tracking-progress` | Why Tracking Progress Is Key | ✅ |
| 90 | `monthly-review-system` | Monthly Review System | ✅ |

### PHASE 5 — Decision Making Serisi (Gün 91-115)

| Gün | Slug | Başlık | Durum |
|-----|------|--------|-------|
| 91 | `decision-making-framework` | A Simple Framework for Better Decisions | ✅ |
| 92 | `how-billionaires-decide` | How Billionaires Make Decisions | ✅ |
| 93 | `reversible-vs-irreversible` | Reversible vs Irreversible Decisions | ✅ |
| 94 | `10-10-10-rule` | The 10/10/10 Rule | ✅ |
| 95 | `thinking-clearly-uncertainty` | Think Clearly Under Uncertainty | ✅ |
| 96 | `strategic-thinking-skills` | Strategic Thinking | ✅ |
| 97 | `avoid-cognitive-biases` | How to Avoid Cognitive Biases | ✅ |
| 98 | `intuition-vs-analysis` | When to Trust Your Gut | ✅ |
| 99 | `pre-mortem-technique` | The Pre-Mortem Technique | ✅ |
| 100 | `decision-journal` | Why You Need a Decision Journal | ✅ |
| 101 | `risk-assessment-life` | Personal Risk Assessment | ✅ |
| 102 | `sunk-cost-fallacy` | The Sunk Cost Fallacy | ✅ |
| 103 | `critical-thinking-skills` | Critical Thinking Skills | ✅ |
| 104 | `thinking-in-bets` | Thinking in Bets | ✅ |
| 105 | `probabilistic-thinking` | Probabilistic Thinking | ✅ |
| 106 | `lateral-thinking` | Lateral Thinking | ✅ |
| 107 | `systems-thinking` | Systems Thinking | ✅ |
| 108 | `devil-advocate-thinking` | Devil's Advocate Thinking | ✅ |
| 109 | `steel-man-argument` | Steel Manning | ✅ |
| 110 | `long-term-thinking` | Long-Term Thinking | ✅ |
| 111 | `bayesian-thinking` | Bayesian Thinking | ✅ |
| 112 | `decision-making-under-pressure` | Decisions Under Pressure | ⏳ **SIRADA** |
| 113 | `avoiding-analysis-paralysis` | Overcome Analysis Paralysis | ⏳ |
| 114 | `fast-slow-thinking` | Fast vs Slow Thinking (Kahneman) | ⏳ |
| 115 | `wisdom-of-crowds` | The Wisdom of Crowds | ⏳ |

### PHASE 6 — Success Philosophy Serisi (Gün 116-140)

| Gün | Slug | Başlık | Durum |
|-----|------|--------|-------|
| 116 | `napoleon-hill-lessons` | Napoleon Hill's Greatest Lessons | ⏳ |
| 117 | `jim-rohn-philosophy` | Jim Rohn's Philosophy | ⏳ |
| 118 | `earl-nightingale-strangest-secret` | Earl Nightingale's Strangest Secret | ⏳ |
| 119 | `stoicism-success` | How Stoicism Leads to Modern Success | ⏳ |
| 120 | `marcus-aurelius-meditations` | Marcus Aurelius Meditations | ⏳ |
| 121 | `seneca-time-success` | Seneca on Time | ⏳ |
| 122 | `epictetus-control` | Epictetus on Control | ⏳ |
| 123 | `viktor-frankl-meaning` | Viktor Frankl on Finding Meaning | ⏳ |
| 124 | `alan-watts-success` | Alan Watts on Success | ⏳ |
| 125 | `naval-ravikant-wealth` | Naval Ravikant's Guide to Wealth | ⏳ |
| 126 | `charlie-munger-wisdom` | Charlie Munger's Greatest Wisdom | ⏳ |
| 127 | `warren-buffett-life-lessons` | Warren Buffett's Life Lessons | ⏳ |
| 128 | `elon-musk-thinking` | How Elon Musk Thinks | ⏳ |
| 129 | `jeff-bezos-principles` | Jeff Bezos' Leadership Principles | ⏳ |
| 130 | `steve-jobs-philosophy` | Steve Jobs' Philosophy | ⏳ |
| 131 | `long-game-success` | The Long Game | ⏳ |
| 132 | `compound-effect-success` | The Compound Effect | ⏳ |
| 133 | `pursuit-of-excellence` | The Philosophy of Excellence | ⏳ |
| 134 | `success-vs-happiness` | Success vs Happiness | ⏳ |
| 135 | `philosophy-failure` | The Philosophy of Failure | ⏳ |
| 136 | `meritocracy-reality` | Meritocracy: Myth or Reality? | ⏳ |
| 137 | `stoic-philosophy-work` | Stoic Philosophy at Work | ⏳ |
| 138 | `meaning-vs-pleasure` | Meaning vs Pleasure | ⏳ |
| 139 | `virtue-success` | Virtue and Success | ⏳ |
| 140 | `timeless-success-principles` | Timeless Principles of Success | ⏳ |

### PHASE 7 — Personal Finance & Career (Gün 141-165) — En Yüksek RPM

| Gün | Slug | Başlık | Durum |
|-----|------|--------|-------|
| 141 | `financial-independence-mindset` | Financial Independence Mindset | ⏳ |
| 142 | `wealth-building-habits` | Wealth Building Habits | ⏳ |
| 143 | `money-mindset-shift` | The Money Mindset Shift | ⏳ |
| 144 | `passive-income-mental-models` | Mental Models for Passive Income | ⏳ |
| 145 | `career-growth-strategy` | Career Growth Strategy | ⏳ |
| 146 | `negotiation-psychology` | The Psychology of Negotiation | ⏳ |
| 147 | `networking-strategy` | Strategic Networking | ⏳ |
| 148 | `entrepreneurship-mindset` | The Entrepreneurship Mindset | ⏳ |
| 149 | `personal-brand-success` | Building a Personal Brand | ⏳ |
| 150 | `high-income-skills` | High-Income Skills Worth Developing | ⏳ |
| 151 | `financial-habits-millionaires` | Financial Habits of Millionaires | ⏳ |
| 152 | `investing-psychology` | The Psychology of Investing | ⏳ |
| 153 | `risk-tolerance-success` | Understanding Your Risk Tolerance | ⏳ |
| 154 | `salary-negotiation` | How to Negotiate Your Salary | ⏳ |
| 155 | `side-hustle-mental-models` | Mental Models for Side Hustle | ⏳ |
| 156 | `frugality-vs-investing` | Frugality vs Investing | ⏳ |
| 157 | `real-estate-mindset` | The Real Estate Investor Mindset | ⏳ |
| 158 | `time-value-money-life` | The Time Value of Money | ⏳ |
| 159 | `opportunity-cost-career` | Opportunity Cost in Career | ⏳ |
| 160 | `financial-freedom-philosophy` | The Philosophy of Financial Freedom | ⏳ |
| 161 | `business-mental-models` | Mental Models for Business Owners | ⏳ |
| 162 | `leadership-philosophy` | The Philosophy of Great Leadership | ⏳ |
| 163 | `productivity-income` | How Productivity Increases Income | ⏳ |
| 164 | `skill-stacking` | Skill Stacking | ⏳ |
| 165 | `ikigai-career` | Ikigai: Career Fulfillment | ⏳ |

### PHASE 8 — Neuroscience & Brain Performance (Gün 166-185)

| Gün | Slug | Başlık | Durum |
|-----|------|--------|-------|
| 166 | `neuroplasticity-success` | Neuroplasticity for Success | ⏳ |
| 167 | `prefrontal-cortex-discipline` | Strengthen Your Prefrontal Cortex | ⏳ |
| 168 | `dopamine-motivation` | Dopamine for Better Motivation | ⏳ |
| 169 | `cortisol-performance` | How Cortisol Affects Performance | ⏳ |
| 170 | `sleep-brain-performance` | Sleep and Brain Performance | ⏳ |
| 171 | `meditation-brain-science` | What Meditation Does to Your Brain | ⏳ |
| 172 | `exercise-neurogenesis` | How Exercise Grows Brain Cells | ⏳ |
| 173 | `gut-brain-connection` | The Gut-Brain Connection | ⏳ |
| 174 | `attention-focus-neuroscience` | Neuroscience of Attention | ⏳ |
| 175 | `stress-performance-curve` | The Stress-Performance Curve | ⏳ |
| 176 | `brain-peak-performance` | Brain Peak Performance | ⏳ |
| 177 | `cognitive-load-theory` | Cognitive Load Theory | ⏳ |
| 178 | `growth-mindset-neuroscience` | Neuroscience of Growth Mindset | ⏳ |
| 179 | `memory-techniques-success` | Memory Techniques | ⏳ |
| 180 | `default-mode-network` | The Default Mode Network | ⏳ |
| 181 | `cold-exposure-performance` | Cold Exposure and Performance | ⏳ |
| 182 | `fasting-brain-performance` | Fasting and Brain Performance | ⏳ |
| 183 | `binaural-beats-focus` | Do Binaural Beats Improve Focus? | ⏳ |
| 184 | `nootropics-mental-performance` | Natural Nootropics | ⏳ |
| 185 | `brain-training-science` | Brain Training: What Works | ⏳ |

### PHASE 9 — Relationship & Social Intelligence (Gün 186-200)

| Gün | Slug | Başlık | Durum |
|-----|------|--------|-------|
| 186 | `social-intelligence-success` | Social Intelligence | ⏳ |
| 187 | `influence-persuasion-ethics` | Ethical Influence and Persuasion | ⏳ |
| 188 | `mentorship-accelerate-success` | How Mentorship Accelerates Success | ⏳ |
| 189 | `mastermind-group` | Napoleon Hill's Mastermind Principle | ⏳ |
| 190 | `communication-high-performers` | Communication of High Performers | ⏳ |
| 191 | `listening-skill-success` | Why Listening Is Underrated | ⏳ |
| 192 | `emotional-regulation` | Emotional Regulation for Performance | ⏳ |
| 193 | `relationships-success` | How Relationships Shape Success | ⏳ |
| 194 | `solitude-success` | The Power of Solitude | ⏳ |
| 195 | `saying-no-relationships` | Saying No in Relationships | ⏳ |
| 196 | `trust-building` | How to Build Trust That Lasts | ⏳ |
| 197 | `conflict-resolution-mental-models` | Conflict Resolution Mental Models | ⏳ |
| 198 | `giving-vs-taking` | Givers vs Takers: Adam Grant | ⏳ |
| 199 | `community-success` | Why Community Is Essential | ⏳ |
| 200 | `your-success-philosophy` | Building Your Personal Success Philosophy | ⏳ |

---

## Özet Durum

| Fase | Toplam | ✅ Tamamlandı | ⏳ Bekliyor |
|------|--------|--------------|------------|
| Phase 1 (Gün 1-14) | 14 | 0 | 14 (güncelleme) |
| Phase 2 (Gün 15-35) | 21 | 21 | 0 |
| Phase 3 (Gün 36-60) | 25 | 25 | 0 |
| Phase 4 (Gün 61-90) | 30 | 30 | 0 |
| Phase 5 (Gün 91-115) | 25 | 21 | 4 |
| Phase 6 (Gün 116-140) | 25 | 0 | 25 |
| Phase 7 (Gün 141-165) | 25 | 0 | 25 |
| Phase 8 (Gün 166-185) | 20 | 0 | 20 |
| Phase 9 (Gün 186-200) | 15 | 0 | 15 |
| **TOPLAM** | **200** | **97** | **103** |

**🔜 Sıradaki görev:** Day 112 — `decision-making-under-pressure` (image: card1a.jpg, 112%3=1)

---

## Günlük Çalışma Akışı

1. Bu dokümanı Claude'a yapıştır
2. `Gün [X] içeriğini üret` yaz
3. Claude 3 dosyayı hazırlar: `[slug].astro` + `blog.astro` güncelleme
4. `git add . && git commit -m "Day X: [başlık]" && git -c http.sslVerify=false push origin main`
5. Netlify otomatik deploy eder
