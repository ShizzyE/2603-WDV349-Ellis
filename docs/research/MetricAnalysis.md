# Metric Analysis 🧐

## Analytics & Usage Tracking

### Goal

Track how users interact with the OpenAI-powered PlanBuddy feature and establish metrics that can be used to evaluate engagement and reliability during beta testing.

### Metrics

The following metrics will be tracked:

- AI request count
- Successful AI requests
- Failed AI requests
- AI response time
- Authenticated user associated with the request
- Date and time of the request

### Current Testing

PlanBuddy does not have real beta users yet, so analytics are currently being validated using development/test requests. This allows the backend tracking system to be tested before the application is released to users.

### Results

Test AI requests were successfully sent through the FastAPI backend and received responses from OpenAI. Successful requests were recorded as successful, while unsuccessful requests were tested using invalid API credentials and invalid request data.

### Findings

The initial testing confirms that the application can communicate with OpenAI successfully and that AI usage can be measured through backend requests. These metrics can later be used during beta testing to identify how frequently the AI feature is used, how reliable the feature is, and whether response times create a poor user experience.

---

## OpenAI Use-Case / Error Handling

### Goal

Test whether the OpenAI-powered feature works correctly for common PlanBuddy scenarios and handles errors without crashing the application.

### Use Case 1 — Task Planning

**Input:**

> I have a project due Friday and three tasks: finish the research, write the documentation, and test the application. Help me decide what I should work on first.

**Expected Result:**

PlanBuddy should prioritize the tasks logically and provide a useful explanation.

**Actual Result:**

"Start with the highest-risk / blocking work: finish the research first.

Why: Research likely informs the documentation and may reveal unknowns that affect testing or fixes. Reducing unknowns early lowers the risk of rework.

Recommended Order
Research — Clear open questions, confirm approaches, and gather facts/code snippets you’ll need.
Test the application — Catch bugs early so fixes can feed back into the documentation and research.
Write documentation — Finalize after testing and fixes so the documentation reflects the working system.
Simple Schedule Template

If the project is due Friday:

Monday–Tuesday: Research and resolve unknowns.
Wednesday: Test the application and fix issues.
Thursday–Friday: Write, review, finalize documentation, and perform a quick retest.

PlanBuddy recommendation: Start with the research, then test the application, and finish by documenting the completed work.

Would you like me to tailor this to your available hours or estimate durations for each task?"

**Status:** Pass 

---

### Use Case 2 — Task Creation

**Input:**

> Create a task for finishing my PlanBuddy documentation.

**Expected Result:**

PlanBuddy should understand that the user wants to create a task.

**Actual Result:**

AI response:
Task title: Finish PlanBuddy documentation

Description: Complete and publish the user and developer documentation for PlanBuddy so it’s accurate, clear, and ready for release.

**Checklist**
    - Create/confirm documentation outline:
    - Purpose
    - Features
    - Getting Started
    - User Guide
    - Developer API
    - Examples
    - Troubleshooting
    - FAQ
- Write introduction, feature summary, and Getting Started section.
- Document user workflows with step-by-step screenshots.
- Add developer/API reference and code samples.
- Verify that code samples work without errors.
- Add examples, edge cases, and troubleshooting tips.
- Proofread and edit for clarity and consistency.
- Check accessibility and links.
- Update table of contents and metadata.
- Publish the documentation and announce the update.

**Estimate**
5–8 hours total

**Priority**
High

**Tags**
documentation PlanBuddy release

**Acceptance Criteria**
All sections from the outline are completed.
Code samples run without errors.
Screenshots are included and properly formatted.
Documentation has been reviewed and proofread.
Documentation is published and accessible to users.

**Due Date**
Within 3 days — adjust as needed.

**Assignee**
You

**Status:** Fail (It did not actually create a task based on PlanBuddy data, but did understand the concept)

---

### Use Case 3 — Productivity Assistance

**Input:**

> I'm overwhelmed by the number of things I need to finish today. How should I organize my work?

**Expected Result:**

PlanBuddy should provide a relevant productivity recommendation.

**Actual Result:**

You’re not alone — here’s a quick, practical way to get control of the day.

**1. Brain Dump (5–10 min)**
- Write down everything you must, should, or want to do today.

**2. Pick 1–3 MITs (Most Important Tasks)**
- Choose the 1–3 tasks that will make the biggest impact or are truly due today.
- Give these tasks the highest priority.

**3. Estimate Time & Trim**
- Estimate how long each task will take.
- If something will take more than 2 hours and isn’t urgent, consider splitting it up or rescheduling it.

**4. Triage: Do / Schedule / Delegate / Delete**
- Do: MITs and urgent/important tasks.
- Schedule: Important but not urgent tasks. Put a specific time on your calendar.
- Delegate: Tasks someone else can handle.
- Delete/Postpone: Low-value or optional tasks.

**5. Build a Time-Blocked Schedule**
Block focused chunks of time for MITs, batch similar smaller tasks, reserve 30–60 minutes for email/administrative work, and leave a 30–60 minute buffer.

Example:
- 9:00–10:30 — MIT 1
- 10:30–10:45 — Break
- 10:45–12:15 — MIT 2
- 12:15–1:00 — Lunch
- 1:00–2:00 — Admin/Emails
- 2:00–3:30 — Task Batch
- 3:30–3:45 — Break
- 3:45–5:00 — Buffer/Finish

**6. Use Focus Techniques**
- Try Pomodoro (25/5) or 50/10 sessions.
- Turn off unnecessary notifications.
- Focus on one task at a time.

**7. End-of-Day Review (5–10 min)**
- Move unfinished tasks to tomorrow.
- Note what you accomplished.
- Adjust priorities for the next day.
- Quick Triage Rules
- Less than 15 minutes + urgent: Do it now.
- Not due today + low impact: Defer or delete.
- Someone else can do it: Delegate.

If you want to prioritize your actual task list, paste it and I’ll return a sorted plan.

**Status:** Pass

---

## Error Handling Tests

### Invalid API Credentials

**Test:**

Temporarily used an invalid OpenAI API key.

**Expected Result:**

The backend should reject the OpenAI request and return a controlled error instead of crashing.

**Actual Result:**

[Write what happened.]

**Status:** Pass / Fail

---

### Invalid Request

**Test:**

Sent an AI request without the required `message` field.

**Expected Result:**

FastAPI should reject the request with a validation error.

**Actual Result:**

The backend returned a `422 Unprocessable Entity` response because the required request field was missing.

**Status:** Pass

---

### Overall Findings

The OpenAI integration successfully connects the PlanBuddy backend to OpenAI. Initial use-case and error-handling tests are being used to validate the reliability and usefulness of the AI feature before beta users are introduced.

Because PlanBuddy does not currently have real users, the current analytics data represents development testing rather than actual user engagement. Once beta testing begins, the same metrics can be used to evaluate real usage patterns and identify areas for improvement.