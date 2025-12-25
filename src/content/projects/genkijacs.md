## GenkiJACS 1-year internship

I independently designed, built, and operated a production RAG chatbot and staff portal for [GenkiJACS](https://www.genkijacs.com/) (Japanese language school).

- **Role:** Software Engineer Intern (sole engineer, part-time)
- **Location:** Fukuoka, Japan
- **Duration:** Sep 2023 – Jun 2024
- **Tech:** TypeScript, Python, Next.js, AWS, [Pinecone](https://www.pinecone.io) (vector DB), OpenAI
- **Impact:** **10,000+** messages, **~70** hours saved per week

### 1. Context & Problem

[GenkiJACS](https://www.genkijacs.com/) teaches Japanese to students from around the world, many of whom make their first contact through the website.

- **Support workload:** Sales staff were spending a lot of time replying to repetitive emails even though most answers were already on the website.
- **Student experience:** Prospective students often had to wait for replies during a key decision window.
- **Visibility:** The team had little insight into what students were actually asking, so it was hard to see which topics blocked enrollment, or which pages needed improvement.

### 2. Solution

I built a production chatbot embedded on [GenkiJACS](https://www.genkijacs.com/) and its sister school [I.C.NAGOYA](https://icn.gr.jp/)'s websites that automatically answers questions using the latest information.
Behind it, a staff portal and auto-scraping pipeline keep the knowledge base up to date, so the system runs with zero ongoing maintenance.

### 3. Architecture & system design

At a high level, the system has three moving parts:

1. A chatbot students see on the website
2. An auto-updating knowledge base
3. A staff portal to see what’s happening behind the scenes

#### From your point of view as a student

You type a question on the website in any language.
Behind the scenes, the chatbot first sends your question to [OpenAI’s moderations API](https://platform.openai.com/docs/api-reference/moderations) to make sure it’s safe to answer.
If it’s safe, we rephrase your question into a search‑friendly version:

We add school‑specific keywords.

<addkeywords original="What courses do you offer?" keywords="Study, Core Japanese Course, Learn"></addkeywords>

And fold in context from the earlier messages in your conversation.

<addconversationcontext rephrased="Why is a **consent form** required for students under **18**?">
User: From what age can I study?
Assistant: ... for students under 18, a parental consent form is required.
User: Why is it required?
</addconversationcontext>

When you phrase something negatively, we expand it into a more helpful positive form so we can surface the full range of options.

<addkeywords original="Do you only offer beginner courses?" keywords="What intermediate and advanced courses do you offer?"></addkeywords>

We then [embed](https://platform.openai.com/docs/guides/embeddings) this rephrased query and send it to [Pinecone](https://www.pinecone.io) to search across all stored content.

The matches returned by [Pinecone](https://www.pinecone.io) are split into two groups: **Website Content** and **Staff Notes**.

**For Website Content**, we pull in the neighbouring chunks around each match (using a stored chunk index in the metadata), fetch the underlying text from the database by URL + chunk index, sort everything by score, and group chunks from the same page to form a continuous and coherent passage.

<websitecontentprocess></websitecontentprocess>

**For Staff Notes**, we also sort by score. But if we leave them in the middle, they tend to get buried.
To fix this, we'll place them near the end of the prompt to effectively prioritize them over the **Website Content**.

Finally, we construct a prompt using a **system message**, the **assembled context** (with source URLs for inline citations), and your **original question**.

The model generates a reply in your original language, and we stream that answer back to you with clickable links if you want to dive deeper.

#### Auto-updating knowledge base

Every day, a scraper walks both school websites, follows links, and keeps only the important pages (e.g. course info, pricing, accommodation, FAQs).
It extracts the main content from each page, splits them into small chunks, and tags each chunk with metadata like URL and position on the page.
The scraper then compares these chunks with what’s stored and only updates entries in the database when content has actually changed.

#### Staff portal for edge cases and insight

To bridge the gap between the chat interface and the staff portal, we built a seamless handoff mechanism.
When a student clicks to email us, we inject the conversation ID directly into the body.

```
Conversation ID: xxx

(The above ID will help us quickly locate and review your conversation with our chatbot, ensuring we can provide you with the best possible support.
If you would prefer that our team not review the conversation, you're welcome to omit the ID from this email.)
```

This ID acts as a bridge, allowing staff to instantly replay the conversation history, ensuring the support experience feels continuous rather than disjointed.

To keep operations agile, the dashboard lets staff add time-sensitive entries like holiday closures or special course info, and switch them on or off instantly.
It also surfaces high-level analytics, showing which pages are referenced most and where users are located, so the school can see where the website is working and where students get stuck.

#### How the pieces fit together

A TypeScript/Next.js application powers both the backend APIs and the staff portal, with the chatbot serving as a static React app embedded via iframe.
The system relies on OpenAI for language models and embeddings, with [Pinecone](https://www.pinecone.io) storing the searchable vectors, while the actual text content and the wider infrastructure run on AWS.

### 4. My role & way of working

I was the only technical person on staff, responsible for designing, building, and operating the entire system end-to-end.
My job was to turn a vague request into a concrete, production ready system that actually reduced support load and gave the team better visibility into what students were asking.
In practice, that meant owning the full stack: the chatbot UI and staff portal, the backend APIs, the data pipeline for scraping, and all deployment and operations on AWS.
I worked in short loops with the staff—watching how the chatbot was used, looking at conversation logs and analytics, and then making targeted improvements like adding **Staff Notes** for edge cases, refining retrieval behaviour, and tuning moderation and handoff to email when a human needed to step in.

### 5. Impact & business value

I deployed the chatbot and staff portal to production in **April 2024**.

- **Usage:** Handled **10,000+** messages from around **2,000** unique users.
- **Efficiency:** Saves roughly **70** staff-hours per week by offloading repetitive email questions to the chatbot.
- **Operations:** Runs with **zero** day-to-day maintenance thanks to automated scraping and a stable deployment pipeline.
- **Student experience:** Provides instant, **24/7** answers in any language, instead of waiting hours or days for an email reply.
- **Business intelligence:** Gives staff visibility into which URLs and topics are referenced most, which countries users come from, and where the website content is confusing or blocking enrolment.

### 6. Beyond the chatbot: broader responsibilities

Beyond the chatbot, I also looked after the network for the six‑storey school building, configuring the VPN and troubleshooting connectivity issues.

I explored an email auto‑reply agent that pulled raw messages from IMAP and tried to answer them using a similar knowledge base, but this project never shipped—the complexity of messy, unstructured email threads and edge cases outpaced my developer experience at the time.
That failure taught me to prototype before committing, building a thin demo early and only doubling down once I'm confident and it actually works in practice.

### 7. Learnings & what I’d improve next

The parts that worked best were the zero‑maintenance architecture, the inline citations that let users see exactly where answers came from, and the staff portal which turned the chatbot from a black box into a tool the team could actually steer.
I’m also happy with how well the system handled multilingual questions, letting students ask in their own language while still grounding answers in the school’s core English and Japanese content.
If I were to extend it, I would focus on hardening system security and privacy to better protect user data, alongside building richer analytics to measure user satisfaction and resolution quality, not just raw usage.
Overall, this project gave me hands‑on experience owning a production RAG system end‑to‑end—from architecture and data pipelines to UX and operations—which is the kind of responsibility I’m excited to take on in an internship or year‑in‑industry role working on AI systems and internal tools.
