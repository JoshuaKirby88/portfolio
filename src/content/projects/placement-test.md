## AI Conversational Placement Test

<themeimage src="/placement-test/test-ui/" alt="Student Voice Interface" width="0" height="0" sizes="100vw" className="w-full h-auto" >
</themeimage>

I built an AI placement test that mimics the probing intuition of a senior teacher.
It takes a 2-week scheduling bottleneck and compresses it into a 30-minute, on-demand assessment.

- **Role:** Full-stack Engineer
- **Status:** Internal Beta
- **Tech:** [Next.js](https://nextjs.org) ([OpenNext](https://opennext.js.org)), [Cloudflare Workers](https://workers.cloudflare.com) & [D1](https://developers.cloudflare.com/d1), [Vercel AI SDK](https://sdk.vercel.ai)
- **Key Metric:** **70% Strict Recall** (Automated Regression Baseline)

### 1. The Context: The 2-Week Bottleneck

Language schools cannot enrol a student until they verify their level.
Currently, this requires a live 20-minute interview with a senior teacher.

This manual step creates a massive bottleneck.
Between timezones and teacher availability, students often wait **1–2 weeks** just to take a placement test.
Teachers, meanwhile, burn hours on repetitive beginner assessments instead of teaching.

I needed an asynchronous solution that was rigorous enough to replace the human expert.

### 2. The Solution: An Agentic Examiner

I recognised early on that I lacked the domain expertise to design a language test.
Building the logic on my own assumptions would have resulted in a flawed product.

To fix this, I interviewed a senior instructor and analysed hours of audio recordings from real placement tests.
I discovered that experts don't just "chat." They follow a strict logic to verify specific skills.

**How it Works**
A school configures a test by linking questions to **Target Grammar Patterns** (e.g., "Question 1 checks for _Past Tense_").
The AI's goal is to elicit that specific pattern from the student.

I codified this behaviour into a **Pedagogical State Machine**:

1.  **Ask:** Pose the configured question.

2.  **Hint:** If the target grammar is missing, ask a specific follow-up to elicit it (e.g. "What did you do yesterday?").

3.  **Explicit:** If they still miss it, explicitly instruct them to use the pattern.

4.  **Give Up:** If they fail, move to the next question.

<themeimage src="/placement-test/state-machine/" alt="Pedagogical State Machine Diagram" width="0" height="0" sizes="100vw" className="w-full h-auto" >
</themeimage>

This ensures every student gets a standardised chance to prove their ability, unlike a free-form LLM chat which might drift off-topic.

### 3. Engineering Challenge II: Measuring "Correctness"

The hardest technical challenge was **Evaluation**.

Ensuring an AI reliably detects specific grammar patterns like "Conditional Ba-Form" in a messy, 3-minute spoken transcript is difficult.

I solved this with a **Parallel "Fan-Out" Architecture**:

1.  **Extraction Agent:** Scans the transcript and proposes potential matches.

2.  **Verification Agents (Parallel):** I spawn a separate, isolated LLM process for each proposed match.

<fanoutarchitecture transcript="I went to the store. I buy milk. It was good." candidates='[{"word": "went", "status": "pass"}, {"word": "buy", "status": "fail"}, {"word": "was", "status": "pass"}]' >
</fanoutarchitecture>

**The Regression Suite**

To validate this architecture, I created a dataset of **~600** samples.

Each sample consists of a student response and a target grammar, manually annotated with every valid instance of that grammar.

I evaluate the system on **Strict Recall**. A sample only passes if the AI identifies **100%** of the annotated grammar instances.

Currently, the system achieves a **70% Strict Recall** rate.

<macterminal>
Eval Complete

Summary:
──────────────────────────────────────────────────
Total Samples: 573
Successful Samples: 405
Success Rate: 70.68%
Total Labels: 605
Total Predictions: 520
True Positives: 460
False Negatives: 145
False Positives: 64
Total Cost: $0.2417
Average Cost: $0.000422
──────────────────────────────────────────────────
</macterminal>

This infrastructure transforms prompt engineering from guesswork into a deterministic process. I can tweak the prompt, run the suite, and immediately see if performance improved or regressed.

**Why Extraction, Not Scoring?**

I avoided having the LLM directly assign a proficiency score (e.g., "N4 Level").

LLM scoring is subjective, biased, and drifts over time.

Instead, I treat the LLM as a **Pattern Extractor**, not a Judge.

It only identifies evidence ("Did they use _Target Pattern X_?").

The final scoring is deterministic math based on the [_Minna no Nihongo_](https://www.3anet.co.jp/en/series.html) curriculum.

This makes the result **transparent**. A teacher can look at the "Chapter 12" bar graph and click through to the exact quote that triggered the score.

### 4. Engineering Challenge III: Architecture at Scale

Although [GenkiJACS](https://www.genkijacs.com/) is the pilot partner, I designed this system to be used by any language school.

I needed a platform that adapted to different operational workflows without code changes.

I built a **Multi-Tenant SaaS Architecture** using Next.js Middleware.

- **Transparent Rewrites:** The system maps `school.languagetest.net` → `languagetest.net/school` instantly. Users see their school's domain, not mine.

- **Configurable Student Auth:** Privacy laws vary by referral agency. I architected the system to support fully anonymous usage, mandatory accounts, or custom data collection (e.g., omitting Emails entirely while requiring the student's name).

- **Tenant Isolation:** Cookies are scoped strictly to the subdomain, ensuring that a session at School A never leaks into School B.

<themeimage src="/placement-test/school-student-auth-config/" alt="Student Auth Configuration Page" width="0" height="0" sizes="100vw" className="w-full h-auto" >
</themeimage>

This allows me to onboard new customers programmatically. A new school can sign up and configure a privacy-compliant intake flow instantly, with zero infrastructure changes.

### 5. Retrospective & Trade-offs

**Trade-off 1: Verbatim Accuracy > Cleanliness**
Standard STT models try to "fix" speech. They remove stutters and self-corrections.
For a language test, those errors are the signal.

I ditched standard STT for **Gemini 2.5 Pro**.
It is slower.
But it preserves every mistake verbatim. This ensures I am grading the student's actual Japanese, not a sanitised version.

**Trade-off 2: Accuracy > Cost**
This system is expensive (~$0.50/test).
I am testing against **~270 grammar patterns** in parallel. That burns tokens.

This is acceptable for a baseline, but not for scale.
The next optimisation is to reduce the scope. Once the system exits beta and I have enough student data, I plan to identify which grammar patterns actually correlate with fluency, and remove the rest to reduce the token load.
