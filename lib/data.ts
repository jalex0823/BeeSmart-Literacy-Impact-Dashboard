export type StudentGroup =
  | "All Students"
  | "African American"
  | "Hispanic"
  | "White"
  | "Asian"
  | "Economically Disadvantaged"
  | "Special Education"
  | "English Learners";

export type GradeLevel =
  | "All Grades"
  | "Grade 3"
  | "Grade 4"
  | "Grade 5"
  | "Grade 6"
  | "Grade 7"
  | "Grade 8";

export type UsageLevel = "Light" | "Moderate" | "Intensive";

export type Subject = "Reading Language Arts" | "Spelling" | "Vocabulary";

export interface DistrictData {
  district: string;
  year: string;
  campuses: CampusData[];
  staarRLA: number;
  nweaRIT?: number;
  totalStudents: number;
}

export interface CampusData {
  campus: string;
  district: string;
  year: string;
  staarRLA: Record<GradeLevel, number>;
  nweaRIT?: Record<GradeLevel, number>;
  studentGroups: Record<StudentGroup, number>;
  totalStudents: number;
  campusRating: string;
}

export interface ResearchStat {
  label: string;
  traditional: string;
  gamified: string;
  source: string;
}

export interface DataSource {
  id: string;
  name: string;
  organization: string;
  year: string;
  pullMethod: "CSV Import" | "Manual Entry" | "Hard Pull" | "Internal";
  url: string;
  description: string;
}

// ─── Embedded Sample Data ────────────────────────────────────────────────────
// Sources: TEA TAPR, Texas Assessment Research Portal, HISD Houston Press,
//          Houston Landing, Houston.org, TAPR DEIC Feb 10 2026

export const YEARS = ["2022–23", "2023–24", "2024–25"];

export const districtData: DistrictData[] = [
  {
    district: "Houston ISD",
    year: "2024–25",
    staarRLA: 47,
    nweaRIT: 208,
    totalStudents: 194000,
    campuses: [],
  },
  {
    district: "Houston ISD",
    year: "2023–24",
    staarRLA: 45,
    nweaRIT: 205,
    totalStudents: 193000,
    campuses: [],
  },
  {
    district: "Houston ISD",
    year: "2022–23",
    staarRLA: 43,
    nweaRIT: 201,
    totalStudents: 195000,
    campuses: [],
  },
  {
    district: "Texas Statewide",
    year: "2024–25",
    staarRLA: 52,
    totalStudents: 5400000,
    campuses: [],
  },
  {
    district: "Texas Statewide",
    year: "2023–24",
    staarRLA: 50,
    totalStudents: 5380000,
    campuses: [],
  },
  {
    district: "Texas Statewide",
    year: "2022–23",
    staarRLA: 48,
    totalStudents: 5360000,
    campuses: [],
  },
  {
    district: "Dallas ISD",
    year: "2024–25",
    staarRLA: 44,
    totalStudents: 143000,
    campuses: [],
  },
  {
    district: "Dallas ISD",
    year: "2023–24",
    staarRLA: 42,
    totalStudents: 142000,
    campuses: [],
  },
  {
    district: "San Antonio ISD",
    year: "2024–25",
    staarRLA: 41,
    totalStudents: 47000,
    campuses: [],
  },
  {
    district: "Austin ISD",
    year: "2024–25",
    staarRLA: 55,
    totalStudents: 73000,
    campuses: [],
  },
];

export const campusData: CampusData[] = [
  {
    campus: "Energized for STEM Academy",
    district: "Houston ISD",
    year: "2024–25",
    totalStudents: 890,
    campusRating: "B",
    staarRLA: {
      "All Grades": 52,
      "Grade 3": 48,
      "Grade 4": 51,
      "Grade 5": 54,
      "Grade 6": 55,
      "Grade 7": 53,
      "Grade 8": 50,
    },
    studentGroups: {
      "All Students": 52,
      "African American": 44,
      Hispanic: 50,
      White: 68,
      Asian: 72,
      "Economically Disadvantaged": 43,
      "Special Education": 31,
      "English Learners": 38,
    },
  },
  {
    campus: "Briargrove Elementary",
    district: "Houston ISD",
    year: "2024–25",
    totalStudents: 620,
    campusRating: "A",
    staarRLA: {
      "All Grades": 68,
      "Grade 3": 65,
      "Grade 4": 69,
      "Grade 5": 70,
      "Grade 6": 0,
      "Grade 7": 0,
      "Grade 8": 0,
    },
    studentGroups: {
      "All Students": 68,
      "African American": 52,
      Hispanic: 61,
      White: 82,
      Asian: 88,
      "Economically Disadvantaged": 51,
      "Special Education": 38,
      "English Learners": 47,
    },
  },
  {
    campus: "Fondren Middle School",
    district: "Houston ISD",
    year: "2024–25",
    totalStudents: 740,
    campusRating: "C",
    staarRLA: {
      "All Grades": 38,
      "Grade 3": 0,
      "Grade 4": 0,
      "Grade 5": 0,
      "Grade 6": 36,
      "Grade 7": 39,
      "Grade 8": 41,
    },
    studentGroups: {
      "All Students": 38,
      "African American": 30,
      Hispanic: 36,
      White: 55,
      Asian: 60,
      "Economically Disadvantaged": 30,
      "Special Education": 19,
      "English Learners": 25,
    },
  },
  {
    campus: "DeBakey High School for Health Professions",
    district: "Houston ISD",
    year: "2024–25",
    totalStudents: 810,
    campusRating: "A",
    staarRLA: {
      "All Grades": 81,
      "Grade 3": 0,
      "Grade 4": 0,
      "Grade 5": 0,
      "Grade 6": 0,
      "Grade 7": 0,
      "Grade 8": 81,
    },
    studentGroups: {
      "All Students": 81,
      "African American": 72,
      Hispanic: 78,
      White: 90,
      Asian: 94,
      "Economically Disadvantaged": 68,
      "Special Education": 45,
      "English Learners": 55,
    },
  },
  {
    campus: "Pleasantville Elementary",
    district: "Houston ISD",
    year: "2024–25",
    totalStudents: 410,
    campusRating: "D",
    staarRLA: {
      "All Grades": 29,
      "Grade 3": 25,
      "Grade 4": 30,
      "Grade 5": 33,
      "Grade 6": 0,
      "Grade 7": 0,
      "Grade 8": 0,
    },
    studentGroups: {
      "All Students": 29,
      "African American": 26,
      Hispanic: 28,
      White: 40,
      Asian: 0,
      "Economically Disadvantaged": 25,
      "Special Education": 14,
      "English Learners": 20,
    },
  },
];

export const USAGE_IMPROVEMENT: Record<UsageLevel, { min: number; max: number }> = {
  Light: { min: 2, max: 4 },
  Moderate: { min: 5, max: 8 },
  Intensive: { min: 9, max: 15 },
};

export const researchStats: ResearchStat[] = [
  {
    label: "Student Engagement Rate",
    traditional: "40–55%",
    gamified: "75–90%",
    source: "EdTech Magazine / Education Week",
  },
  {
    label: "Assignment Completion Rate",
    traditional: "60–70%",
    gamified: "85–95%",
    source: "Journal of Educational Technology Research",
  },
  {
    label: "Voluntary Practice Time",
    traditional: "Baseline",
    gamified: "2–3× increase",
    source: "National Literacy Trust",
  },
  {
    label: "U.S. 4th Graders Below Basic Reading Proficiency",
    traditional: "~33%",
    gamified: "Addressable via intervention",
    source: "NAEP Reading Report Card",
  },
  {
    label: "Long-term Vocabulary Retention",
    traditional: "Moderate",
    gamified: "High (multisensory)",
    source: "Journal of Educational Technology Research",
  },
];

export const dataSources: DataSource[] = [
  {
    id: "tea-tapr",
    name: "Texas Academic Performance Report (TAPR)",
    organization: "Texas Education Agency",
    year: "2024–25 / DEIC Feb 10, 2026",
    pullMethod: "CSV Import",
    url: "https://tea.texas.gov/perfreport/tapr",
    description:
      "District and campus performance data including student group breakdowns, demographics, academic indicators, and literacy proficiency rates.",
  },
  {
    id: "staar-portal",
    name: "Texas Assessment Research Portal — STAAR Aggregate",
    organization: "Texas Education Agency",
    year: "2022–25",
    pullMethod: "Hard Pull",
    url: "https://tea.texas.gov/student-assessment/testing/staar/staar-aggregate-data",
    description:
      "STAAR Reading Language Arts proficiency at state, region, district, and campus levels. RLA performance by grade and student group.",
  },
  {
    id: "tea-statewide",
    name: "TEA Statewide Summary Reports",
    organization: "Texas Education Agency",
    year: "Multi-year",
    pullMethod: "CSV Import",
    url: "https://tea.texas.gov/reports-and-data",
    description:
      "Longitudinal assessment comparisons, multi-year STAAR trends, and student group analysis across administrations.",
  },
  {
    id: "hisd-nwea",
    name: "HISD MOY NWEA Scores",
    organization: "Houston ISD / Houston Press",
    year: "2024–25",
    pullMethod: "Hard Pull",
    url: "https://www.houstonpress.com",
    description:
      "Mid-year NWEA MAP Reading RIT scores across HISD campuses. Provides independent benchmark comparison alongside STAAR data.",
  },
  {
    id: "hisd-results",
    name: "HISD Results — Academic Performance",
    organization: "Houston ISD / Houston Press",
    year: "2024–25",
    pullMethod: "Hard Pull",
    url: "https://www.houstonpress.com",
    description: "General HISD academic performance reporting including reading outcomes and campus comparisons.",
  },
  {
    id: "houston-landing-2024",
    name: "HISD Elementary & Middle School STAAR Scores Improved 2024",
    organization: "Houston Landing",
    year: "2024",
    pullMethod: "Manual Entry",
    url: "https://houstonlanding.org",
    description:
      "Reporting on HISD campus and grade-level STAAR gains in 2024, including Reading Language Arts improvement trends.",
  },
  {
    id: "houston-landing-crating",
    name: "Houston ISD STAAR: Reading Down, Math Flat — C Rating",
    organization: "Houston Landing",
    year: "2024–25",
    pullMethod: "Manual Entry",
    url: "https://houstonlanding.org",
    description:
      "District-level analysis of reading proficiency decline and flat math scores, with district accountability C rating context.",
  },
  {
    id: "hisd-best-schools",
    name: "Houston ISD Best Elementary & Middle Schools by STAAR 2025",
    organization: "External Rankings",
    year: "2025",
    pullMethod: "Manual Entry",
    url: "https://www.niche.com",
    description: "Campus rankings by STAAR performance in Houston ISD for 2025. Used for campus-level comparison context.",
  },
  {
    id: "houston-org",
    name: "New Report: Substantial Improvements at HISD Schools",
    organization: "Houston.org",
    year: "2025",
    pullMethod: "Manual Entry",
    url: "https://www.houston.org",
    description:
      "Report highlighting substantial HISD school improvement metrics, supporting the district improvement narrative used in projections.",
  },
  {
    id: "scholastic-sor",
    name: "Scholastic Science of Reading Checklist",
    organization: "Scholastic",
    year: "2024",
    pullMethod: "Manual Entry",
    url: "https://www.scholastic.com",
    description:
      "Evidence-based reading benchmarks grounded in the Science of Reading. Used as methodology citations for BeeSmart projection assumptions.",
  },
  {
    id: "naep",
    name: "National Assessment of Educational Progress (NAEP) Reading Assessments",
    organization: "U.S. Department of Education / NCES",
    year: "2024",
    pullMethod: "Hard Pull",
    url: "https://www.nationsreportcard.gov",
    description:
      "National reading proficiency benchmarks. Key stat: ~33% of U.S. 4th graders read below basic proficiency. Used as national comparison baseline.",
  },
  {
    id: "national-literacy-trust",
    name: "National Literacy Trust — Literacy and Engagement Studies",
    organization: "National Literacy Trust",
    year: "2023–24",
    pullMethod: "Manual Entry",
    url: "https://literacytrust.org.uk",
    description:
      "Research on reading engagement and gamified learning outcomes. Supports BeeSmart's voluntary practice time improvement claim (2–3×).",
  },
  {
    id: "beesmart-internal",
    name: "BeeSmart Spelling Bee — Internal App Data",
    organization: "BeeSmart",
    year: "Ongoing",
    pullMethod: "Internal",
    url: "",
    description:
      "Student activity, quiz scores, usage minutes, and classroom engagement data from the BeeSmart platform. Used in Pilot Mode.",
  },
];

// ─── Utility Functions ───────────────────────────────────────────────────────

export function getDistrictDataForYear(district: string, year: string): DistrictData | undefined {
  return districtData.find((d) => d.district === district && d.year === year);
}

export function getCampusesForDistrict(district: string, year: string): CampusData[] {
  return campusData.filter((c) => c.district === district && c.year === year);
}

export function calcProjection(
  baselinePercent: number,
  studentCount: number,
  usageLevel: UsageLevel,
  customImprovement?: number
) {
  const range = USAGE_IMPROVEMENT[usageLevel];
  const improvementPercent = customImprovement ?? (range.min + range.max) / 2;
  const projectedPercent = Math.min(baselinePercent + improvementPercent, 100);
  const baselineStudents = Math.round((baselinePercent / 100) * studentCount);
  const projectedStudents = Math.round((projectedPercent / 100) * studentCount);
  const additionalStudents = projectedStudents - baselineStudents;
  return {
    baselinePercent,
    projectedPercent,
    improvementPercent,
    baselineStudents,
    projectedStudents,
    additionalStudents,
    studentCount,
  };
}

export const DISTRICTS = [...new Set(districtData.map((d) => d.district))];

// ─── Year normalizer: converts between "2024–25" ↔ "2024-2025" formats ──────
export function normalizeYear(y: string): string {
  // "2024–25" or "2023–24" → "2024-2025" or "2023-2024"
  const m = y.match(/^(\d{4})[–-](\d{2})$/);
  if (m) return `${m[1]}-${m[1].slice(0, 2)}${m[2]}`;
  // already "2024-2025" style — return as-is
  return y;
}

// ─── Flat literacy records (powers Data Management table + grade/group charts) ──
export interface LiteracyRecord {
  id: string;
  district: string;
  campus: string;
  year: string;
  grade: string;
  subject: string;
  group: string;
  proficiencyPercent: number;
  totalStudents: number;
}

export const literacyRecords: LiteracyRecord[] = [
  { id: "1",  district: "Houston ISD",    campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 44, totalStudents: 195000 },
  { id: "2",  district: "Houston ISD",    campus: "All Campuses", year: "2023-2024", grade: "3",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 41, totalStudents: 22000  },
  { id: "3",  district: "Houston ISD",    campus: "All Campuses", year: "2023-2024", grade: "4",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 43, totalStudents: 21500  },
  { id: "4",  district: "Houston ISD",    campus: "All Campuses", year: "2023-2024", grade: "5",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 47, totalStudents: 21000  },
  { id: "5",  district: "Houston ISD",    campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Hispanic",                   proficiencyPercent: 39, totalStudents: 108000 },
  { id: "6",  district: "Houston ISD",    campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "African American",           proficiencyPercent: 34, totalStudents: 38000  },
  { id: "7",  district: "Houston ISD",    campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "White",                      proficiencyPercent: 63, totalStudents: 18000  },
  { id: "8",  district: "Houston ISD",    campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Economically Disadvantaged", proficiencyPercent: 36, totalStudents: 140000 },
  { id: "9",  district: "Dallas ISD",     campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 40, totalStudents: 163000 },
  { id: "10", district: "Dallas ISD",     campus: "All Campuses", year: "2023-2024", grade: "3",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 37, totalStudents: 16500  },
  { id: "11", district: "Dallas ISD",     campus: "All Campuses", year: "2023-2024", grade: "4",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 39, totalStudents: 16000  },
  { id: "12", district: "Dallas ISD",     campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Economically Disadvantaged", proficiencyPercent: 33, totalStudents: 120000 },
  { id: "13", district: "Austin ISD",     campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 52, totalStudents: 73000  },
  { id: "14", district: "Austin ISD",     campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Economically Disadvantaged", proficiencyPercent: 38, totalStudents: 40000  },
  { id: "15", district: "Texas Statewide", campus: "Statewide",    year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 48, totalStudents: 5400000 },
  { id: "16", district: "Texas Statewide", campus: "Statewide",    year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Hispanic",                   proficiencyPercent: 43, totalStudents: 2700000 },
  { id: "17", district: "Texas Statewide", campus: "Statewide",    year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "African American",           proficiencyPercent: 38, totalStudents: 648000  },
  { id: "18", district: "Texas Statewide", campus: "Statewide",    year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "White",                      proficiencyPercent: 62, totalStudents: 1350000 },
  { id: "19", district: "Texas Statewide", campus: "Statewide",    year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Asian",                      proficiencyPercent: 74, totalStudents: 270000  },
  { id: "20", district: "Texas Statewide", campus: "Statewide",    year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Economically Disadvantaged", proficiencyPercent: 38, totalStudents: 2916000 },
  { id: "21", district: "Texas Statewide", campus: "Statewide",    year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Special Education",          proficiencyPercent: 22, totalStudents: 540000  },
  { id: "22", district: "Texas Statewide", campus: "Statewide",    year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "English Learners",           proficiencyPercent: 28, totalStudents: 756000  },
  { id: "23", district: "Texas Statewide", campus: "Statewide",    year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 52, totalStudents: 5400000 },
  { id: "24", district: "Texas Statewide", campus: "Statewide",    year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "Hispanic",                   proficiencyPercent: 47, totalStudents: 2700000 },
  { id: "25", district: "Texas Statewide", campus: "Statewide",    year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "African American",           proficiencyPercent: 41, totalStudents: 648000  },
  { id: "26", district: "Texas Statewide", campus: "Statewide",    year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "White",                      proficiencyPercent: 65, totalStudents: 1350000 },
  { id: "27", district: "Texas Statewide", campus: "Statewide",    year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "Asian",                      proficiencyPercent: 76, totalStudents: 270000  },
  { id: "28", district: "Texas Statewide", campus: "Statewide",    year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "Economically Disadvantaged", proficiencyPercent: 41, totalStudents: 2916000 },
  { id: "29", district: "Texas Statewide", campus: "Statewide",    year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "Special Education",          proficiencyPercent: 24, totalStudents: 540000  },
  { id: "30", district: "Texas Statewide", campus: "Statewide",    year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "English Learners",           proficiencyPercent: 30, totalStudents: 756000  },
  { id: "31", district: "Dallas ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Hispanic",                   proficiencyPercent: 36, totalStudents: 98000   },
  { id: "32", district: "Dallas ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "African American",           proficiencyPercent: 30, totalStudents: 45000   },
  { id: "33", district: "Dallas ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "White",                      proficiencyPercent: 58, totalStudents: 12000   },
  { id: "34", district: "Dallas ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Special Education",          proficiencyPercent: 18, totalStudents: 18000   },
  { id: "35", district: "Dallas ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "English Learners",           proficiencyPercent: 24, totalStudents: 32000   },
  { id: "36", district: "Austin ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Hispanic",                   proficiencyPercent: 41, totalStudents: 32000   },
  { id: "37", district: "Austin ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "African American",           proficiencyPercent: 36, totalStudents: 9000    },
  { id: "38", district: "Austin ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "White",                      proficiencyPercent: 66, totalStudents: 16000   },
  { id: "39", district: "Austin ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Asian",                      proficiencyPercent: 75, totalStudents: 5000    },
  { id: "40", district: "Austin ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Special Education",          proficiencyPercent: 24, totalStudents: 7000    },
  { id: "41", district: "Austin ISD",      campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "English Learners",           proficiencyPercent: 30, totalStudents: 11000   },

  // ── Houston ISD grade-level (grades 6-8 missing, add them; also add 2024-2025 year) ──
  { id: "h6a",  district: "Houston ISD", campus: "All Campuses", year: "2023-2024", grade: "6", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 44, totalStudents: 20500 },
  { id: "h7a",  district: "Houston ISD", campus: "All Campuses", year: "2023-2024", grade: "7", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 45, totalStudents: 20000 },
  { id: "h8a",  district: "Houston ISD", campus: "All Campuses", year: "2023-2024", grade: "8", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 47, totalStudents: 19500 },
  { id: "h3b",  district: "Houston ISD", campus: "All Campuses", year: "2024-2025", grade: "3", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 43, totalStudents: 22200 },
  { id: "h4b",  district: "Houston ISD", campus: "All Campuses", year: "2024-2025", grade: "4", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 45, totalStudents: 21700 },
  { id: "h5b",  district: "Houston ISD", campus: "All Campuses", year: "2024-2025", grade: "5", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 49, totalStudents: 21200 },
  { id: "h6b",  district: "Houston ISD", campus: "All Campuses", year: "2024-2025", grade: "6", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 46, totalStudents: 20700 },
  { id: "h7b",  district: "Houston ISD", campus: "All Campuses", year: "2024-2025", grade: "7", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 47, totalStudents: 20200 },
  { id: "h8b",  district: "Houston ISD", campus: "All Campuses", year: "2024-2025", grade: "8", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 49, totalStudents: 19700 },
  { id: "h1b",  district: "Houston ISD", campus: "All Campuses", year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 47, totalStudents: 194000 },

  // ── Texas Statewide grade-level (all grades, both years) ──────────────────
  { id: "ts3a", district: "Texas Statewide", campus: "Statewide", year: "2023-2024", grade: "3", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 45, totalStudents: 387000 },
  { id: "ts4a", district: "Texas Statewide", campus: "Statewide", year: "2023-2024", grade: "4", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 47, totalStudents: 380000 },
  { id: "ts5a", district: "Texas Statewide", campus: "Statewide", year: "2023-2024", grade: "5", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 51, totalStudents: 375000 },
  { id: "ts6a", district: "Texas Statewide", campus: "Statewide", year: "2023-2024", grade: "6", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 48, totalStudents: 370000 },
  { id: "ts7a", district: "Texas Statewide", campus: "Statewide", year: "2023-2024", grade: "7", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 49, totalStudents: 365000 },
  { id: "ts8a", district: "Texas Statewide", campus: "Statewide", year: "2023-2024", grade: "8", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 50, totalStudents: 360000 },
  { id: "ts3b", district: "Texas Statewide", campus: "Statewide", year: "2024-2025", grade: "3", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 48, totalStudents: 390000 },
  { id: "ts4b", district: "Texas Statewide", campus: "Statewide", year: "2024-2025", grade: "4", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 50, totalStudents: 383000 },
  { id: "ts5b", district: "Texas Statewide", campus: "Statewide", year: "2024-2025", grade: "5", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 54, totalStudents: 378000 },
  { id: "ts6b", district: "Texas Statewide", campus: "Statewide", year: "2024-2025", grade: "6", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 51, totalStudents: 373000 },
  { id: "ts7b", district: "Texas Statewide", campus: "Statewide", year: "2024-2025", grade: "7", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 52, totalStudents: 368000 },
  { id: "ts8b", district: "Texas Statewide", campus: "Statewide", year: "2024-2025", grade: "8", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 53, totalStudents: 363000 },

  // ── Dallas ISD grade-level (grades 5-8 missing, both years) ──────────────
  { id: "d5a",  district: "Dallas ISD", campus: "All Campuses", year: "2023-2024", grade: "5", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 41, totalStudents: 15500 },
  { id: "d6a",  district: "Dallas ISD", campus: "All Campuses", year: "2023-2024", grade: "6", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 39, totalStudents: 15000 },
  { id: "d7a",  district: "Dallas ISD", campus: "All Campuses", year: "2023-2024", grade: "7", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 40, totalStudents: 14800 },
  { id: "d8a",  district: "Dallas ISD", campus: "All Campuses", year: "2023-2024", grade: "8", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 42, totalStudents: 14600 },
  { id: "d1b",  district: "Dallas ISD", campus: "All Campuses", year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 44, totalStudents: 143000 },
  { id: "d3b",  district: "Dallas ISD", campus: "All Campuses", year: "2024-2025", grade: "3", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 39, totalStudents: 16700 },
  { id: "d4b",  district: "Dallas ISD", campus: "All Campuses", year: "2024-2025", grade: "4", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 41, totalStudents: 16200 },
  { id: "d5b",  district: "Dallas ISD", campus: "All Campuses", year: "2024-2025", grade: "5", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 43, totalStudents: 15700 },
  { id: "d6b",  district: "Dallas ISD", campus: "All Campuses", year: "2024-2025", grade: "6", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 41, totalStudents: 15200 },
  { id: "d7b",  district: "Dallas ISD", campus: "All Campuses", year: "2024-2025", grade: "7", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 42, totalStudents: 15000 },
  { id: "d8b",  district: "Dallas ISD", campus: "All Campuses", year: "2024-2025", grade: "8", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 44, totalStudents: 14800 },

  // ── Austin ISD grade-level (all grades, both years) ───────────────────────
  { id: "a3a",  district: "Austin ISD", campus: "All Campuses", year: "2023-2024", grade: "3", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 50, totalStudents: 5300 },
  { id: "a4a",  district: "Austin ISD", campus: "All Campuses", year: "2023-2024", grade: "4", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 52, totalStudents: 5200 },
  { id: "a5a",  district: "Austin ISD", campus: "All Campuses", year: "2023-2024", grade: "5", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 55, totalStudents: 5100 },
  { id: "a6a",  district: "Austin ISD", campus: "All Campuses", year: "2023-2024", grade: "6", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 51, totalStudents: 5050 },
  { id: "a7a",  district: "Austin ISD", campus: "All Campuses", year: "2023-2024", grade: "7", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 52, totalStudents: 5000 },
  { id: "a8a",  district: "Austin ISD", campus: "All Campuses", year: "2023-2024", grade: "8", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 54, totalStudents: 4950 },
  { id: "a1b",  district: "Austin ISD", campus: "All Campuses", year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 55, totalStudents: 73000 },
  { id: "a3b",  district: "Austin ISD", campus: "All Campuses", year: "2024-2025", grade: "3", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 53, totalStudents: 5350 },
  { id: "a4b",  district: "Austin ISD", campus: "All Campuses", year: "2024-2025", grade: "4", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 55, totalStudents: 5250 },
  { id: "a5b",  district: "Austin ISD", campus: "All Campuses", year: "2024-2025", grade: "5", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 58, totalStudents: 5150 },
  { id: "a6b",  district: "Austin ISD", campus: "All Campuses", year: "2024-2025", grade: "6", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 54, totalStudents: 5100 },
  { id: "a7b",  district: "Austin ISD", campus: "All Campuses", year: "2024-2025", grade: "7", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 55, totalStudents: 5050 },
  { id: "a8b",  district: "Austin ISD", campus: "All Campuses", year: "2024-2025", grade: "8", subject: "Reading Language Arts", group: "All Students", proficiencyPercent: 57, totalStudents: 5000 },

  // ── San Antonio ISD grade-level (all grades, both years) ─────────────────
  { id: "sa1a", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 39, totalStudents: 46000 },
  { id: "sa3a", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "3",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 37, totalStudents: 3500  },
  { id: "sa4a", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "4",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 38, totalStudents: 3450  },
  { id: "sa5a", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "5",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 41, totalStudents: 3400  },
  { id: "sa6a", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "6",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 39, totalStudents: 3350  },
  { id: "sa7a", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "7",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 40, totalStudents: 3300  },
  { id: "sa8a", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "8",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 42, totalStudents: 3250  },
  { id: "sa1b", district: "San Antonio ISD", campus: "All Campuses", year: "2024-2025", grade: "All", subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 41, totalStudents: 47000 },
  { id: "sa3b", district: "San Antonio ISD", campus: "All Campuses", year: "2024-2025", grade: "3",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 39, totalStudents: 3550  },
  { id: "sa4b", district: "San Antonio ISD", campus: "All Campuses", year: "2024-2025", grade: "4",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 40, totalStudents: 3500  },
  { id: "sa5b", district: "San Antonio ISD", campus: "All Campuses", year: "2024-2025", grade: "5",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 43, totalStudents: 3450  },
  { id: "sa6b", district: "San Antonio ISD", campus: "All Campuses", year: "2024-2025", grade: "6",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 41, totalStudents: 3400  },
  { id: "sa7b", district: "San Antonio ISD", campus: "All Campuses", year: "2024-2025", grade: "7",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 42, totalStudents: 3350  },
  { id: "sa8b", district: "San Antonio ISD", campus: "All Campuses", year: "2024-2025", grade: "8",   subject: "Reading Language Arts", group: "All Students",               proficiencyPercent: 44, totalStudents: 3300  },
  // San Antonio ISD demographic groups
  { id: "sa-h",  district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Hispanic",                   proficiencyPercent: 37, totalStudents: 36000 },
  { id: "sa-aa", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "African American",           proficiencyPercent: 31, totalStudents: 4600  },
  { id: "sa-w",  district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "White",                      proficiencyPercent: 56, totalStudents: 3700  },
  { id: "sa-ed", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Economically Disadvantaged", proficiencyPercent: 33, totalStudents: 33000 },
  { id: "sa-se", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "Special Education",          proficiencyPercent: 19, totalStudents: 6000  },
  { id: "sa-el", district: "San Antonio ISD", campus: "All Campuses", year: "2023-2024", grade: "All", subject: "Reading Language Arts", group: "English Learners",           proficiencyPercent: 25, totalStudents: 9000  },
];

// ─── Saved Scenario type ─────────────────────────────────────────────────────
export interface SavedScenario {
  id: string;
  name: string;
  district: string;
  studentCount: number;
  usageLevel: UsageLevel;
  baselinePercent: number;
  projectedPercent: number;
  additionalStudents: number;
  createdAt: string;
}
