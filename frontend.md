

# 🔹 GiG Geni – Frontend Development Workflow

## 1. Navigation (Global Header)

* **Logo** → Always clickable to Home.
* **Menu Items** → `Home`, `Competitions`, `Leaderboards`.
* **Auth Section**:

  * If **not logged in** → Show **Login** button.
  * If **logged in** → Show **Avatar dropdown** → `Profile`, `Settings`, `Logout`.
* **Access Rules**:

  * Clicking **Join/Create Competition** →

    * Redirect → Login → Profile Completion → Back to flow.

---

## 2. Home Page Sections

* **Hero Section** → Banner + CTA (Join Competition, Post Competition).
* **Employee vs Employer Benefits** → Split two-column layout.
* **Competition Flow Section** → Visual 4-step roadmap:
  `Questions → Video → Zoom Interview → Task Evaluation`.
* **GiG Geni Ambition & Roadmap** → Infographic of future plans.
* **Upcoming Features & Mobile App Signup** → Form for waitlist.
* **Footer** → About | Terms | Privacy | Contact | Social Links.

---

## 3. Competition Flow (UX for Different Roles)

### Employees (Job Seekers)

1. Click **Join Competition** → Redirect (if not logged in).
2. Complete Profile (skills, education, experience, etc.).
3. Redirect → Competition steps:

   * **Round 1**: Screening (Quiz, MCQs, situational).
   * **Round 2**: Task (Coding challenge, business case, sales roleplay, marketing campaign).
   * **Round 3**: Demo/Presentation (Project pitch, client closing, strategy presentation).
   * **Final**: Evaluation (Interview, live pitch, scoring).
4. **Progress Tracker UI** → visible at all times.

### Employers (Competition Posters)

1. Click **Create Competition** → Login/Profile completion.
2. Redirect → Post Competition form.
3. **Employer Dashboard**:

   * Manage competitions.
   * View candidates & progress.
   * Schedule interviews.
   * Select winners.

---

## 4. Competition Journey Types

* **Computer Science / IT** → Screening quiz → Coding task → Live demo.
* **Business & Entrepreneurship** → Case study → Business challenge → Pitch deck.
* **Sales** → Knowledge test → Roleplay → Closing challenge.
* **Marketing** → Digital quiz → Campaign design → Real-world pitch.

Each mapped to **Competition.rounds\[]** (frontend renders UI dynamically per domain).

---

## 5. Admin Dashboard

* Restricted to admin role.
* Sections:

  * Users
  * Competitions
  * Subscriptions
  * Homepage Content
  * Analytics & Reports

---

## 6. UX Enhancements

* **Progress bars** for steps.
* **“Next Step” buttons** → sequential enforcement.
* **Popups/notifications** → interview schedules, results.
* **Separate dashboards** → Employees vs Employers.

---

# 🔹 TypeScript Interfaces

```ts
// Base Competition
interface Competition {
  id: string;
  title: string;
  organizer: string;
  location?: string;
  rating?: number;
  categories: string[]; // e.g. ["IT", "Business"]
  prizes?: string;
  registrationFee?: string;
  startDate?: Date;
  endDate?: Date;
  resultDate?: Date;
  description?: string;
  skillsTested: string[];
  projectBrief?: string;
  termsAndConditions: string[];
  submissionFormats: string[];
  maxFileSize?: string;
  createdAt?: Date;
  updatedAt?: Date;
  rounds: CompetitionRound[]; // <-- integrated journey
}

// Competition Round
interface CompetitionRound {
  roundNumber: number;
  title: string;
  description: string;
  type: "quiz" | "task" | "presentation" | "interview";
  evaluationCriteria: string[];
}

// Employer (Organizer)
interface EmployerProfile {
  companyName: string;
  companySize?: number;
  industry?: string;
  teamMembers?: string[];
  hiringPreferences?: string[];
  postedCompetitions: Competition[];
}

// Employee (Candidate)
interface Experience {
  company?: string;
  role?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

interface Education {
  institution?: string;
  degree?: string;
  field?: string;
  startYear?: number;
  endYear?: number;
}

interface Training {
  title?: string;
  provider?: string;
  date?: Date;
  description?: string;
}

interface Reference {
  name?: string;
  relationship?: string;
  contact?: string;
}

interface ContactInformation {
  email?: string;
  phone?: string;
}

interface Address {
  home?: string;
  permanent?: string;
}

interface UserProfile {
  name: string;
  profilePhoto?: string;
  rating?: number;
  ovationTag?: string;
  topRanking?: string;
  txValue?: number;
  aboutMe?: string;
  identityValidation?: string;
  salaryExpectation?: string;
  jobPreference?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  personalInformation?: string;
  address?: Address;
  contactInformation?: ContactInformation;
  assets: string[];
  additionalActivity?: string;
  training: Training[];
  reference: Reference[];
  socialLinks: string[];
  createdAt?: Date;
  updatedAt?: Date;
  appliedCompetitions?: Competition[];
}
```

🔹 Dashboard Flows (Role-Based)
Employee Dashboard

Overview → All competitions they are following/participated + general stats.

My Competitions → List of competitions participated, with stats + “Continue” button.

Applications → Upcoming feature (currently no implementation).

Achievements → Holds achievements (currently only competitions).

Interviews → Locked (upcoming).

Messages → Same as interview (upcoming).

Profile → View & edit profile.

Settings → Change password, delete account, etc.

Employer Dashboard

Overview → Competition stats + engagement (reaches, follows, etc.).

My Competitions → All competitions created, with stats + “Continue” button.

Candidates → Employees who have won prizes in competitions.

Achievements → Employee achievements related to competitions.

Interviews → Competition-related interview section.

Analytics → Competition insights and reports.

Billing → Upcoming feature.

Messages → Same as interview (upcoming).

Profile → View & edit profile.

Settings → Change password, delete account, etc.

Admin Dashboard

Overview → Competition stats + engagement insights.

Users → Manage all users (block/unblock, details view).

Competitions → Admin can view/create competitions (like employer).

Subscriptions → Create/manage subscription plans.

Analytics → System-wide insights.

Reports → Upcoming feature.

Content Management → Homepage/competition content.

Notifications → Create/manage system notifications.

Settings → Change password, delete account, etc.