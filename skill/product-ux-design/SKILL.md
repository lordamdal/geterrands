---
name: product-ux-design
description: Design product UX flows, screens and clickable HTML prototypes grounded in UX laws, Gestalt principles, cognitive-load rules and accessibility for non-technical and older users.
---

# Product UX design

Use this when designing a product experience: user flows, screens, onboarding, prototypes, or a UX review of an existing interface. The goal is an experience a non-technical person (think: a 70-year-old shop owner) can finish on the first try without help.

## 1. Start from the person and the job

Before any screen, write down:
- **Who**: the least technical realistic user (age, device, confidence, vision, patience).
- **The job**: the one outcome they came for, in their words ("answer my phone when I'm busy"), not system words ("configure telephony").
- **Done state**: what "it works" looks like in the real world (a phone that rings and gets answered), not "a config saved".
- **Every dependency** between the prompt and the done state (accounts, phone numbers, inboxes, permissions, payments). Each one is a place people quit; design each as one guided moment.

## 2. The UX laws and how to apply them

**Decision and attention**
- **Hick's law**: decision time grows with the number and complexity of choices. Show 2–3 options at a time, mark one as recommended, push the rest behind "Other ways".
- **Miller's law / chunking**: people hold roughly 4–7 items in working memory. Group settings into small named chunks; never show a long settings page.
- **Cognitive load**: remove everything that isn't needed for the current step. One question per moment.
- **Selective attention / banner blindness**: people ignore things that look like ads or boilerplate. Put the one thing that needs action in the visual center, in the conversation flow, not in a side banner.
- **Von Restorff (isolation) effect**: the item that differs is remembered. Reserve the single accent color for the primary action and "needs you" items only.
- **Serial position effect**: first and last items are remembered best. Put the most important option first and the safe exit last.

**Motor and speed**
- **Fitts's law**: time to hit a target depends on distance and size. Primary actions are big (min 48px, prefer 56px+ for older users), close to where the eye already is, and never tiny text links.
- **Doherty threshold**: keep responses under ~400ms or show progress immediately. For slow AI work, stream visible progress ("Found your hours…") so waiting feels like work being done.

**Expectations and models**
- **Jakob's law**: users spend most of their time on other products and expect yours to work the same. Chat looks like messaging; phone numbers look like phone numbers; toggles behave like toggles.
- **Mental models**: describe the agent as a new employee ("Rosa answers your phone"), not as workflows, nodes or triggers.
- **Tesler's law (conservation of complexity)**: complexity can't be deleted, only moved. Move it into the system: the builder reads the website, picks a local number, guesses defaults; the user only confirms.
- **Postel's law**: be liberal in what you accept. Accept voice, typos, "idk", a pasted URL with or without https, a phone number in any format.
- **Occam's razor / Pareto principle**: the simplest path that serves 80% of users is the default; edge cases go behind "More options".

**Motivation and memory**
- **Goal-gradient effect**: people speed up as they near a goal. Show progress as "3 of 6 set up" and let the agent visibly assemble as they go.
- **Zeigarnik effect**: unfinished tasks are remembered. On return, resume exactly where they left off with "One step left: pick a voice".
- **Peak-end rule**: experiences are judged by the peak and the end. Make "your agent is live" a real moment (their agent's phone number, big, with "call it now").
- **Aesthetic-usability effect**: polished design is perceived as easier and builds trust, which matters when giving an AI access to email and phones.
- **Parkinson's law**: tasks expand to fill time. Pre-fill and pre-decide so setup takes minutes, and say how long ("about 3 minutes").

**Gestalt (layout)**
- **Proximity**: related things sit together; spacing communicates grouping before borders do.
- **Common region**: a bordered area groups content (use for the agent card and each action card).
- **Similarity**: same function, same look. Every "connect" action looks identical across email, phone, WhatsApp.
- **Prägnanz (simplicity)**: people read complex shapes as the simplest form; keep layouts to one clear column or two.
- **Uniform connectedness**: lines or shared containers show relationships (e.g. channel → agent).

## 3. Rules for non-technical and older users

- Base text 18–20px, line-height ≥1.5, contrast ≥ 4.5:1 (prefer 7:1 for body).
- Targets ≥ 48px, generous spacing between targets so mis-taps don't trigger the wrong action.
- Always offer voice input next to text input.
- Plain words only. Banned in UI copy: integration, workflow, node, trigger, webhook, API, OAuth, configure, deploy, LLM, token. Say: "let Rosa use your email", "when someone calls", "turn on", "go live".
- Every permission screen says in one sentence what the agent will and won't do ("Rosa can read and reply to customer emails. She never deletes anything.").
- Never a dead end: every error says what happened and the one next step. Always offer "Do this later" and "Ask someone to help me" (sends a link to a family member or helper).
- Undo over confirm: make actions reversible and say so ("You can turn this off anytime").
- Don't rely on color alone; pair with text and icons.

## 4. Conversational builder pattern (prompt → working agent)

1. **Prompt**: one big box, voice button, 4 example jobs as chips.
2. **Restate**: the builder repeats the job in plain words and shows the plan as a short checklist.
3. **Ask only what it can't infer**, one card at a time, inline in the conversation. Each card has: a one-line why, a recommended default, an alternative, and "later".
4. **Assemble visibly**: a live agent card fills in (name, number, email, channels, skills, rules) as answers come in.
5. **Test before live**: let them call/text the agent in a safe sandbox and fix things by just saying what to change.
6. **Go live**: the peak moment. Show every way customers and the owner can reach the agent.
7. **Run anywhere**: the owner can manage the agent by text, email, phone or app, not only the dashboard.

## 5. Prototype standards

- Build clickable HTML with a shared stylesheet and a prototype navigation bar (previous / next / map) that is visually separate from the product UI.
- Use realistic content for one persona throughout; no lorem ipsum.
- Scripted interactions should respond to clicks like the real product would, including loading states.
- Responsive to phone width; visible keyboard focus; respect prefers-reduced-motion.

## 6. Review checklist (run before handing off)

- [ ] Can the least technical user reach the done state without reading help?
- [ ] Max 3 choices visible per decision, with a recommended one?
- [ ] Every dependency (phone, email, accounts) handled as one guided step with a default?
- [ ] Progress visible and resumable?
- [ ] One accent color, used only for primary action and attention?
- [ ] All copy free of the banned technical words?
- [ ] Targets ≥ 48px, text ≥ 18px, contrast passes?
- [ ] Errors and empty states give a next step?
- [ ] Peak moment and ending designed on purpose?
