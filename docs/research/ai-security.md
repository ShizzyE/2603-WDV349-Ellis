# AI Security 🤖🔐

At PlanBuddy's current state we do not have to worry about major security risks with our AI agent, but it's always important to be knowledgeable on the potential security issues we can and will face.

## Threat Model ❌

A malicious attacker may be able to control their messages/prompts and potentially inject malicious content into data that the AI later retrieves. They should not have direct access to the database or internal system instructions. If a successful injection does happen the attacker could change task data and insert unwanted text or wrong data into the system.


## Risks ⚠️🤖

**__Prompt Injection__**
- Direct prompt injection
- Indirect prompt injection

**__Jailbreaks__**
- Multi-turn attacks
- Malicious instructions in retrieved content

### AI Agent Risks

The main risk for PlanBuddy is an attacker gaining access to other peoples personal information through the AI Agent/ LLM. We don't want to give the Agent to many tools that are not necessary like reading User tables. This can grant access to malicious users to perform tasks like goal hijacking, tool misuse, and even data exfiltration. Even though these risks may seem minor when dealing with simple tasks, they become much more serious when the same agent is given access to personal information, financial data, or health information.

**__Data Risks__**
- Sensitive information disclosure
- Cross-user data access
- Prompt/system instruction leakage
- Memory poisoning
- RAG/context poisoning

### OWASP LLM & GenAI Risks
- Prompt Injection (LLM01)
- Sensitive Information Disclosure (LLM02)
- Excessive Agency (LLM06)

After doing research into OWASP's LLM and GenAI risks, the five most relevant to PlanBuddy are **Prompt Injection, Sensitive Information Disclosure, Improper Output Handling, Excessive Agency, and System Prompt Leakage**. Prompt injection is especially important because malicious users could manipulate the agent through their messages or malicious content stored in tasks. Sensitive information disclosure is also a major concern because the agent handles users' personal task data and must never expose another user's information. Improper output handling and excessive agency are relevant because PlanBuddy allows the AI to call tools that can modify database information, meaning AI-generated actions need to be validated and restricted. System prompt leakage is less severe for PlanBuddy, but sensitive information or security controls should never be stored in the system prompt because OWASP recommends enforcing authorization and security controls outside of the LLM.


## Constraint Methods 🔒

You can directly limit an agent with system instructions, tool/function restrictions, and deny-by-default-behavior to mitigate attacks. You don't always want to rely on the hard coded model security either. Server-side auth, rate limiting, data validation, and tool argument validation all play an important part in limiting what a malicious user can gain access to. 


## Admin/User Confirmation ✅

As PlanBuddy gains more tools and access, high-risk actions such as deleting data, modifying settings, or performing external API actions will require explicit confirmation. Some high-risk capabilities may be disabled entirely until they have been properly tested and secured. For tools that are allowed (deleting or editing a task), the user must explicitly confirm the intended action before it is executed. The AI cannot approve its own actions, assume the user has given permission, or bypass the confirmation process. Confirmation and authorization must be enforced by the application, not by the AI agent.

 
## AI Agent Access ⛔️

When dealing with the PlanBuddy assistant, just like real-world work environments, we will give them least privilege access starting out just so it can function. To even access the AI agent it's the user must be authenticated by PlanBuddy's backend/ system and even this will be limited with short-lived JWT tokens. 

**AI Tool Access**
- Get Tasks (Read only)
- Create Tasks
- Update tasks (Modification)
- No direct database access
- No arbitrary SQL execution
- No unnecessary access to tables such as the User table

### Isolation
- User/tenant isolation
- Database access boundaries
- API access boundaries
- Sandboxing where necessary


## Input and Output Security 👮🏽‍♂️📊

**__Input Security__**
PlanBuddy should validate user input before it reaches the AI agent or backend. Prompt injection and malicious content should be detected and treated as potential threats. Input should also have reasonable length limits to prevent abuse. Any external or retrieved content should be treated as untrusted data. These protections help prevent attackers from manipulating the AI through malicious input.

**__Output Security__**
AI-generated responses and tool arguments should be validated before being used by the application. Schemas should ensure that the AI only produces expected values and formats. Sensitive information should be filtered when necessary to prevent accidental data exposure. Model-generated commands or actions should never be executed without additional validation. Server-side authorization should always verify that the requested action is allowed before it is performed.

**__Memory and RAG Security__**
If PlanBuddy eventually uses memory or RAG, stored and retrieved information should be treated as untrusted. Attackers could attempt to poison memory or documents with malicious instructions that influence the AI later. Access to stored information must also be restricted to prevent cross-user data leakage. Retrieved content should be authorized and validated before being provided to the AI. This helps protect against memory poisoning, malicious documents, and indirect prompt injection.


## Monitoring and Logging 🖥️
- Log AI/tool actions
- Log authorization decisions
- Detect unusual tool usage
- Rate limiting
- Alerting
- Audit trails
- Incident response


## Ways to security test AI agent 🧪

**Prompt Injection Testing**
- Direct injection
- Indirect injection
- Jailbreak attempts
- Multi-turn attacks

**Agent Testing**
- Unauthorized tool calls
- Privilege escalation
- Data access violations
- Destructive actions
- Data exfiltration

**Regression Testing**
- Turn discovered attacks into automated tests
- Re-test after model/prompt/tool changes


## PlanBuddy Security Architecture 🧱
- User → AI → backend authorization → tools → database/external APIs
- The AI should never have arbitrary database access
- Security controls should be enforced at each boundary
- The backend should verify authorization before executing AI-requested actions


## Security Recommendations 📑
PlanBuddy should follow least privilege, enforce authorization outside of the AI, limit the number of available tools, validate inputs and tool arguments, require confirmation for high-risk actions, and test regularly for prompt injection and agent misuse. As PlanBuddy gains additional tools and access to more sensitive information, these security controls should be strengthened accordingly.

**References:**

[GenAI OWASP Security](https://genai.owasp.org/llmrisk/llm01-prompt-injection/?utm_source=chatgpt.com)

[IBM Prompt Injection Blog](https://www.ibm.com/think/topics/prompt-injection)

[Medium: 8 Core Constraints for Building Production-Grade AI Agents](https://medium.com/@talweezy/8-core-constraints-for-building-production-grade-ai-agents-66bc5494f02a)

