## AI Conversational Placement Test

<themeimage src="/placement-test/test-ui/" alt="A minimalist interface for the 'GenkiJACS' language learning app. In the center, a blob-like mascot appears above a box labeled 'Click this to listen to my question again,' accompanied by a play icon. At the bottom of the screen is a large 3D emoji of a yellow hand holding a silver microphone, indicating voice input is expected. The top header includes the GenkiJACS logo, a progress bar, and icons for navigation and user settings." width="0" height="0" sizes="100vw" className="w-full h-auto" >
</themeimage>

I built an AI placement test that automates the complex oral assessment performed by a senior teacher.
It takes a 2-week scheduling bottleneck and compresses it into a 30-minute, on-demand assessment.

- **Role:** Product Engineer (Solo Founder)
- **Status:** Pilot at GenkiJACS
- **Tech:** [Next.js](https://nextjs.org) ([OpenNext](https://opennext.js.org)), [Cloudflare Workers](https://workers.cloudflare.com) & [D1](https://developers.cloudflare.com/d1), [Vercel AI SDK](https://sdk.vercel.ai)
- **Evals:** **600-Sample** Regression Suite

### 1. Context: The 2-Week Bottleneck

Language schools cannot enrol a student until they verify their level.
Currently, this requires a live 20-minute interview with a senior teacher.

This manual step creates a massive bottleneck.
Between timezones and teacher availability, students often wait **1–2 weeks** just to take a placement test.
Teachers, meanwhile, burn hours on repetitive beginner assessments instead of teaching.

I needed an asynchronous solution that was rigorous enough to replace the human expert.

### 2. Solution: An Agentic Examiner

I recognised early on that I lacked the domain expertise to design a language test.
Building the logic on my own assumptions would have resulted in a flawed product.

To fix this, I interviewed a senior teacher and analysed hours of audio recordings from real placement tests.
I discovered that experts don't just "chat." They follow a strict logic to verify specific skills.

#### How It Works

A school configures a test by linking questions to target grammar patterns (e.g., "Question 1 checks for Past Tense").
The AI's goal is to elicit that specific pattern from the student.

I codified this behaviour into a state machine:

1.  **Ask:** Pose the configured question.

2.  **Hint:** If the target grammar is missing, ask a specific follow-up to elicit it (e.g. "What did you do yesterday?").

3.  **Explicit:** If they still miss it, explicitly instruct them to use the pattern.

4.  **Give Up:** If they fail, move to the next question.

<themeimage src="/placement-test/state-machine/" alt="A flow diagram representing 'Question 1' in a language learning interface. It begins with the system asking, 'What did you do yesterday?' alongside the label 'State: Ask'. The student responds incorrectly with, 'I eat an apple,' marked as 'Fail'. The system then provides a follow-up prompt: 'You eat it every day? Or did you eat it yesterday?' labeled as 'State: Hint'. The student corrects their response to, 'I ate an apple,' which is finally marked as 'Pass'." width="0" height="0" sizes="100vw" className="w-full h-auto" >
</themeimage>

This ensures every student gets a standardised chance to prove their ability, unlike a free-form LLM chat which might drift off-topic.

### 3. Challenge I: Measuring "Correctness"

The hardest technical challenge was assessing the student's language level.
Ensuring an AI reliably detects specific grammar patterns like "Conditional Ba-Form" in a messy, 3-minute spoken transcript by a language learner is difficult.

I solved this by treating the assessment as a precise signal extraction problem, ensuring the system hears every mistake and validates every grammar individually.

1. **Live Interview:** During the test, I use `Gemini 2.5 Pro` to drive the dialogue. I leverage its native multimodal capabilities to process the student's audio directly. This captures the student's speech verbatim, preserving misconjugations and particle errors that standard STT models typically auto-correct.

2. **Asynchronous Grading:** Once the interview concludes, the pipeline performs an exhaustive search on every student response:
    - **Parallel Extraction:** The system scans each answer against **~270** grammar patterns.
    - **Verification:** Any pattern flagged as "present" triggers a secondary LLM to strictly confirm it meets the usage rules.

<fanoutarchitecture transcript="I went to the store. I buy milk. It was good." candidates='[{"word": "went", "status": "pass"}, {"word": "buy", "status": "fail"}, {"word": "was", "status": "pass"}]' >
</fanoutarchitecture>

#### The Eval Suite

To validate this architecture, I created a dataset of **~600** manual annotations.
I benchmark the system on **Strict Recall**. A sample only passes if the AI identifies **100%** of the target grammar instances.

<macterminal>
Eval Complete

Summary:
──────────────────────────────────────────────────
Total Samples: 573
Successful Samples: 405
Strict Recall: 70.68%
Recall: 72.56%
Precision: 84.34%
Average: 78.30%
F1 Score: 77.88%
Total Cost: $0.2417
Average Cost: $0.000422
──────────────────────────────────────────────────
</macterminal>

This infrastructure transforms prompt engineering from guesswork into a deterministic process. I can tweak the prompt, run the suite, and immediately see if performance improved or regressed.

#### Why Extraction, Not Scoring?

I avoided having the AI directly assign a level (e.g., "N4") because AI scoring is subjective and prone to drift.
Instead, I treat the AI as a pattern extractor, not a judge.
Its only job is to flag evidence of grammar usage.
The final score is calculated using deterministic math based on the [Minna no Nihongo](https://www.3anet.co.jp/en/series.html) curriculum.
This guarantees transparency by visualizing the assessment logic.
Instead of a black-box label, the system plots performance across Chapters 0–50, allowing teachers to instantly spot the exact point where a student's ability drops off.

<themeimage src="/placement-test/skill-distribution-graph/" alt="A vertical bar chart. The x-axis is labeled with numbers from 1 to 50, but data is only populated for the first 20 positions; the rest of the chart (21-50) is empty. The y-axis ranges from 0 to 12. The data shows an irregular distribution with the highest peak at position 4 (approximately 11) and other high points at positions 1 and 6 (approximately 10). There are visible gaps with no data bars at positions 11 and 13." caption="X-Axis: Curriculum Chapter (0–50). Y-Axis: Verified Grammar Patterns." width="0" height="0" sizes="100vw" className="w-full h-auto" >
</themeimage>

### 4. Challenge II: Architecture at Scale

I designed this system to work for any language school, not just my pilot partner.
The challenge was building a single platform that adapts to different business needs without code changes.

I solved this by building a multi-tenant architecture on Next.js:

- **Dynamic Subdomains:** Every school gets their own URL automatically (e.g., `genkijacs.languagetest.net`).
  I used [Middleware](https://nextjs.org/docs/14/app/building-your-application/routing/middleware) to route requests based on the hostname.
  This allows me to onboard new schools and display their unique branding instantly, without deploying new infrastructure.

- **Immutable Deployment:** To allow teachers to update the curriculum freely, I architected a version control system that isolates drafts from the live environment.
  Edits are made in a sandbox, and every deployment creates an immutable snapshot.
  This protects active tests and past results, while providing teachers with advanced workflows like visual diffs and atomic rollbacks.

- **Configurable Student Auth:** Schools and referral agencies have varying privacy requirements.
  I architected a flexible authentication system where admins can toggle fields like Email, Name, or Branch between "Required", "Optional", or "Hidden".
  This allows the system to seamlessly switch between strict data collection and fully anonymous usage depending on the school.

<themeimage src="/placement-test/school-student-auth-config/" alt="A user interface configuration screen for GenkiJACS titled 'Collect Student Details.' The 'Collect Student Details' radio button is selected, revealing a form with several toggle switches. The 'Email,' 'Name,' 'Start Date,' and 'Branch' toggles are active, while the 'Agency' toggle is inactive. The 'Name' and 'Start Date' fields are marked with checked 'Required' boxes. The 'Branch' section includes a text input field and a list of removable tags: Tokyo, Fukuoka, Nagoya, Kyoto, and Indonesia. At the bottom, an unselected option reads 'Do Not Collect Student Details.'" width="0" height="0" sizes="100vw" className="w-full h-auto" >
</themeimage>

This enables a self-service workflow, allowing a new school to sign up and configure a privacy-compliant intake flow instantly with zero infrastructure changes.

### 5. Learnings & Roadmap

The defining product decision was decoupling extraction from scoring.
Teachers need consistency, not creativity.
By restricting the AI to evidence extraction, I eliminated score drift and gave teachers a metric they could actually observe and trust.

If I were to extend this platform, I would focus on:

1. **Data-Driven Pruning:** The current system checks **~270** patterns per student response, which costs **~$0.50**.
   I plan to analyse the pilot data to remove low-signal patterns and reduce costs.
2. **Reducing Voice Latency:** Prioritising quality by using `Gemini 2.5 Pro` and `Gemini 2.5 TTS` introduced noticeable delays.
   I want to explore streaming architectures and hybrid model orchestration to make the conversation feel natural and instant, without reverting to low-fidelity STT.

Overall, this project was a lesson in system design, balancing the messy reality of spoken audio with the strict requirements of academic grading.

It demonstrates my ability to take a vague business problem ("Automate the placement test") and architect a reliable, multi-tenant solution from scratch.
