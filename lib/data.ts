export const employees = [
  { id: "EMP-1042", name: "Avery Johnson", role: "Payroll Manager", department: "Finance", status: "Active" },
  { id: "EMP-1088", name: "Maya Chen", role: "People Partner", department: "HR", status: "Active" },
  { id: "EMP-1120", name: "Noah Patel", role: "Backend Engineer", department: "Technology", status: "Active" },
  { id: "EMP-1194", name: "Sophia Martin", role: "Sales Director", department: "Revenue", status: "Active" },
  { id: "EMP-1261", name: "Elijah Brown", role: "Operations Lead", department: "Operations", status: "Probation" },
  { id: "EMP-1305", name: "Isabella Garcia", role: "Recruiter", department: "Talent", status: "Active" },
  { id: "EMP-1417", name: "Lucas Smith", role: "Compliance Officer", department: "Legal", status: "Active" },
  { id: "EMP-1482", name: "Amara Wilson", role: "Product Manager", department: "Product", status: "Active" }
];

export const payrollRows = [
  { id: "EMP-1042", name: "Avery Johnson", role: "Payroll Manager", grossSalary: 9200, tax: 1840, benefits: 410, loan: 0, netSalary: 6950 },
  { id: "EMP-1088", name: "Maya Chen", role: "People Partner", grossSalary: 8100, tax: 1620, benefits: 390, loan: 150, netSalary: 5940 },
  { id: "EMP-1120", name: "Noah Patel", role: "Backend Engineer", grossSalary: 10400, tax: 2184, benefits: 480, loan: 0, netSalary: 7736 },
  { id: "EMP-1194", name: "Sophia Martin", role: "Sales Director", grossSalary: 11800, tax: 2478, benefits: 520, loan: 300, netSalary: 8502 },
  { id: "EMP-1261", name: "Elijah Brown", role: "Operations Lead", grossSalary: 7600, tax: 1444, benefits: 360, loan: 0, netSalary: 5796 }
];

export const leaveRequests = [
  { employee: "Maya Chen", type: "Annual Leave", days: 5, cover: "Avery Johnson", status: "Pending" },
  { employee: "Noah Patel", type: "Sick Leave", days: 2, cover: "Amara Wilson", status: "Approved" },
  { employee: "Elijah Brown", type: "Study Leave", days: 3, cover: "Ops Desk", status: "Pending" },
  { employee: "Isabella Garcia", type: "Annual Leave", days: 4, cover: "Talent Pool", status: "Declined" }
];

export const timeSignals = [
  { day: "Mon", attendance: 96 },
  { day: "Tue", attendance: 93 },
  { day: "Wed", attendance: 98 },
  { day: "Thu", attendance: 91 },
  { day: "Fri", attendance: 89 },
  { day: "Mon", attendance: 95 },
  { day: "Tue", attendance: 97 }
];

export const departmentAnalytics = [
  { department: "Technology", headcount: 86, costIndex: 92 },
  { department: "Revenue", headcount: 64, costIndex: 76 },
  { department: "Operations", headcount: 51, costIndex: 58 },
  { department: "Finance", headcount: 28, costIndex: 38 },
  { department: "People", headcount: 22, costIndex: 31 }
];

export const recruitmentPipeline = [
  { stage: "Applied", count: 142 },
  { stage: "Screen", count: 38 },
  { stage: "Interview", count: 19 },
  { stage: "Offer", count: 6 },
  { stage: "Hired", count: 3 }
];

export const performanceReviews = [
  { team: "Technology", completed: 71, total: 86 },
  { team: "Revenue", completed: 49, total: 64 },
  { team: "Operations", completed: 42, total: 51 },
  { team: "Finance", completed: 26, total: 28 }
];

export const onboardingTasks = [
  { title: "Contract signed", owner: "HR", done: true },
  { title: "Payroll profile created", owner: "Payroll", done: true },
  { title: "Equipment issued", owner: "IT", done: false },
  { title: "Benefits enrollment", owner: "People", done: false }
];

export const auditEvents = [
  { time: "09:42", actor: "A. Johnson", action: "Generated draft payslips for May 2026 payroll batch." },
  { time: "10:15", actor: "M. Chen", action: "Approved sick leave request for Noah Patel." },
  { time: "11:04", actor: "System", action: "Flagged 7 missing timesheets for manager review." },
  { time: "12:20", actor: "S. Martin", action: "Updated commission deduction approval workflow." }
];
