Got it 👍
You don’t need the low-level implementation details right now — instead you want a **Frontend Flow Document** that clearly explains how the **user experience** should work across the app. Here’s a restructured version of your scope in **frontend/UX flow format** (not implementation-heavy):

---

# 🔹 GiG Geni – Frontend Development Flow (UX-First)

## 1. Global Navigation & Access Rules

* **Logo** → Always clickable → Home.
* **Menu Items**: `Home`, `Competitions`, `Leaderboards`.
* **Auth Section**:

  * **Not logged in** → Show **Login** button.
  * **Logged in** → Show **Avatar dropdown** with `Profile`, `Settings`, `Logout`.
* **Access gating**:

  * If user tries to **Join/Create Competition**:

    * Redirect → **Login** → **Email Verification** → **Profile Completion** → Back to flow.
  * If profile incomplete → show **Profile Completion modal**.

---

## 2. User Onboarding Journey (Employee vs Employer)

### Sign-up (Minimal form)

* Users create account with **email + password + role (Employee/Employer)**.
* Immediate redirect → **Email Verification screen** (enter OTP).
* On success → Redirect to **Home**.

### First Login

* On Home → **Profile Completion Modal (Multi-step form)** appears.
* Users can **Fill Now** or **Skip**.
* **Rules**:

  * Skipping still allows browsing but **blocks gated actions** (Join/Create).
  * Modal re-appears on next gated attempt if profile incomplete.
  * Profile can also be completed later from **Dashboard → Profile**.

### Multi-step Profile Forms

* **Employee steps**:

  1. Personal Information
  2. Experience
  3. Education
  4. Skills
  5. Social/Links
* **Employer steps**:

  1. Personal Information (common)
  2. Company Details
  3. Hiring Preferences
  4. Social/Links
* Each step saves independently.
* Progress visible via **stepper/progress bar**.

---

## 3. Competitions Flow

### Creation

* **Who can create**: Employer or Admin.
* **Flow**:

  1. Login/Profile completion required.
  2. Access → **Create Competition Form**.
  3. Fill details (title, category, rounds setup).
  4. Save → Competition listed in Employer/Admin Dashboard.

### Participation (Employees)

1. Click **Join Competition**.
2. If not logged in → redirected to Login → Profile completion.
3. Once eligible → Redirect to competition dashboard with **round tracker**.

---

## 4. Competition Journey (4 Rounds)

1. **Round 1: Screening Quiz**

   * Poster either:

     * Uploads own questions, OR
     * Uses AI-assisted question template (generates Google Form).
   * Participants → Fill Google Form.
   * System evaluates answers → If score ≥ 85% → unlock Round 2.

2. **Round 2: Video Pitch**

   * Participants → Upload 1–2 min video link (Google Drive).
   * Instructions shown on how to make link public.
   * Examiner reviews → If approved → unlock Round 3.

3. **Round 3: Live Zoom Interview**

   * Employer/Admin schedules session.
   * Participants notified by email + in-app notification.
   * After session → evaluators decide who moves forward.

4. **Round 4: Final Evaluation**

   * Remaining participants evaluated.
   * Employer/Admin can **assign marks**, **select winners**, and **set final positions**.
   * Competition marked **Completed**.

---

## 5. Dashboards

### Employee Dashboard

* **Overview** → Competitions followed + progress.
* **My Competitions** → List with progress tracker & “Continue” button.
* **Achievements** → Completed competitions & results.
* **Profile & Settings** → Edit profile / password, delete account.
* (Interviews, Messages → upcoming).

### Employer Dashboard

* **Overview** → Stats on competitions.
* **My Competitions** → Manage created competitions.
* **Candidates** → View applicants & progress.
* **Interviews** → Manage scheduled Zoom sessions.
* **Analytics** → Engagement reports.
* **Profile & Settings**.

### Admin Dashboard

* **Overview** → System stats & insights.
* **Users** → Manage all users.
* **Competitions** → View/manage any competition.
* **Subscriptions** → Manage plans.
* **Content Management** → Homepage & static sections.
* **Analytics & Reports**.
* **Notifications** → Create/manage system notices.
* **Settings**.

---

## 6. Leaderboard Page

* Displays **top employees** ranked by:

  * Total competitions participated.
  * Points earned (based on round scores + evaluator marks).
* **Row structure**:

  * Profile photo, name, role, competitions count, total points, achievements.
* Filters: Category, Date range (30/90 days, all-time).
* Sorting: By points (default), by competitions.
* Paginated list.

---

## 7. UX Enhancements

* **Progress bars** for competitions & onboarding.
* **Stepper modals** for profile completion.
* **Next Step buttons** enforce order.
* **Notifications & popups** for round unlocks, interview schedules, results.
* **Role-based dashboards** (Employee vs Employer vs Admin).
* **Leaderboard badges** for winners/high scorers.

---

✅ This doc focuses only on **frontend flow and user journeys**, not backend code.
Would you like me to also **redesign the onboarding flow diagram visually** (step-by-step chart for Employee vs Employer) so you can hand it to designers/PMs?
