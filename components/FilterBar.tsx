"use client";

import { DISTRICTS, YEARS, GradeLevel, StudentGroup } from "@/lib/data";

const GRADES: GradeLevel[] = [
  "All Grades", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8",
];

const STUDENT_GROUPS: StudentGroup[] = [
  "All Students",
  "African American",
  "Hispanic",
  "White",
  "Asian",
  "Economically Disadvantaged",
  "Special Education",
  "English Learners",
];

interface FilterBarProps {
  year: string;
  setYear: (v: string) => void;
  district: string;
  setDistrict: (v: string) => void;
  grade: GradeLevel;
  setGrade: (v: GradeLevel) => void;
  studentGroup: StudentGroup;
  setStudentGroup: (v: StudentGroup) => void;
}

export function FilterBar({
  year, setYear,
  district, setDistrict,
  grade, setGrade,
  studentGroup, setStudentGroup,
}: FilterBarProps) {
  const selectClass =
    "bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer min-w-[160px]";

  return (
    <div className="border-b border-slate-700/50 bg-slate-900/50">
      <div className="max-w-screen-2xl mx-auto px-6 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filters:</span>

          <select className={selectClass} value={year} onChange={(e) => setYear(e.target.value)}>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y} School Year</option>
            ))}
          </select>

          <select className={selectClass} value={district} onChange={(e) => setDistrict(e.target.value)}>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select className={selectClass} value={grade} onChange={(e) => setGrade(e.target.value as GradeLevel)}>
            {GRADES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select className={selectClass} value={studentGroup} onChange={(e) => setStudentGroup(e.target.value as StudentGroup)}>
            {STUDENT_GROUPS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
