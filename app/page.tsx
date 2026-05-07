import {
  auditEvents,
  departmentAnalytics,
  employees,
  leaveRequests,
  onboardingTasks,
  payrollRows,
  performanceReviews,
  recruitmentPipeline,
  timeSignals
} from "@/lib/data";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1
});

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const payrollGross = payrollRows.reduce((sum, row) => sum + row.grossSalary, 0);
  const deductions = payrollRows.reduce((sum, row) => sum + row.tax + row.benefits + row.loan, 0);
  const netPayroll = payrollRows.reduce((sum, row) => sum + row.netSalary, 0);
  const pendingLeave = leaveRequests.filter((request) => request.status === "Pending").length;
  const averageAttendance =
    timeSignals.reduce((sum, item) => sum + item.attendance, 0) / timeSignals.length;

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Primary">
        <div className="brand-block">
          <div className="brand-mark">HR</div>
          <div>
            <p className="eyebrow">Enterprise Suite</p>
            <h1>HR + Payroll</h1>
          </div>
        </div>

        <nav className="nav-list" aria-label="Modules">
          {[
            "Dashboard",
            "Employee Records",
            "Payroll",
            "Leave",
            "Attendance",
            "Recruitment",
            "Performance",
            "Audit Logs"
          ].map((item) => (
            <a className={cx("nav-item", item === "Dashboard" && "active")} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>
              <span>{item.slice(0, 2)}</span>
              {item}
            </a>
          ))}
        </nav>

        <section className="side-panel">
          <p className="eyebrow">Payroll Run</p>
          <strong>May 2026</strong>
          <span>Draft closes in 3 days</span>
          <button>Review batch</button>
        </section>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">People Operations Command Center</p>
            <h2>Workforce, pay, compliance, and approvals in one view</h2>
          </div>
          <div className="topbar-actions">
            <button className="ghost-button">Export</button>
            <button className="primary-button">Run payroll</button>
          </div>
        </header>

        <section className="metric-grid" id="dashboard" aria-label="Dashboard metrics">
          <article className="metric-card">
            <span>Total employees</span>
            <strong>{employees.length}</strong>
            <small>+12 active onboarding</small>
          </article>
          <article className="metric-card">
            <span>Net payroll</span>
            <strong>{money.format(netPayroll)}</strong>
            <small>{money.format(deductions)} deductions</small>
          </article>
          <article className="metric-card">
            <span>Attendance</span>
            <strong>{percent.format(averageAttendance / 100)}</strong>
            <small>Last 7 business days</small>
          </article>
          <article className="metric-card alert">
            <span>Pending approvals</span>
            <strong>{pendingLeave}</strong>
            <small>Leave and payroll exceptions</small>
          </article>
        </section>

        <section className="content-grid">
          <article className="panel wide" id="payroll">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Payroll</p>
                <h3>Salary calculations and payslip batch</h3>
              </div>
              <span className="status-pill">Gross {money.format(payrollGross)}</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Role</th>
                    <th>Gross</th>
                    <th>Tax</th>
                    <th>Benefits</th>
                    <th>Loan</th>
                    <th>Net Pay</th>
                    <th>Payslip</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <strong>{row.name}</strong>
                        <span>{row.id}</span>
                      </td>
                      <td>{row.role}</td>
                      <td>{money.format(row.grossSalary)}</td>
                      <td>{money.format(row.tax)}</td>
                      <td>{money.format(row.benefits)}</td>
                      <td>{money.format(row.loan)}</td>
                      <td className="net">{money.format(row.netSalary)}</td>
                      <td><button className="table-button">Generate</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="panel" id="analytics">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Analytics</p>
                <h3>Department cost and headcount</h3>
              </div>
            </div>
            <div className="bar-chart" aria-label="Department analytics">
              {departmentAnalytics.map((item) => (
                <div className="bar-row" key={item.department}>
                  <span>{item.department}</span>
                  <div className="track">
                    <i style={{ width: `${item.costIndex}%` }} />
                  </div>
                  <strong>{item.headcount}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="panel" id="leave">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Leave</p>
                <h3>Approval queue</h3>
              </div>
            </div>
            <div className="approval-list">
              {leaveRequests.map((request) => (
                <div className="approval-item" key={request.employee}>
                  <div>
                    <strong>{request.employee}</strong>
                    <span>{request.type} · {request.days} days · {request.cover}</span>
                  </div>
                  <b className={cx("badge", request.status.toLowerCase())}>{request.status}</b>
                </div>
              ))}
            </div>
          </article>

          <article className="panel" id="attendance">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Attendance</p>
                <h3>Time and exception signals</h3>
              </div>
            </div>
            <div className="spark-grid">
              {timeSignals.map((item) => (
                <div className="spark-day" key={item.day}>
                  <div style={{ height: `${item.attendance}%` }} />
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
            <div className="exception-row">
              <span>Late check-ins</span>
              <strong>14</strong>
              <span>Missing timesheets</span>
              <strong>7</strong>
            </div>
          </article>

          <article className="panel" id="recruitment">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Recruitment</p>
                <h3>Hiring pipeline</h3>
              </div>
            </div>
            <div className="pipeline">
              {recruitmentPipeline.map((stage) => (
                <div key={stage.stage}>
                  <strong>{stage.count}</strong>
                  <span>{stage.stage}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel" id="performance">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Performance</p>
                <h3>Review cycles</h3>
              </div>
            </div>
            <div className="review-list">
              {performanceReviews.map((review) => (
                <div key={review.team}>
                  <span>{review.team}</span>
                  <strong>{review.completed}/{review.total}</strong>
                  <progress value={review.completed} max={review.total} />
                </div>
              ))}
            </div>
          </article>

          <article className="panel" id="employee-records">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Employee Records</p>
                <h3>Active directory</h3>
              </div>
            </div>
            <div className="employee-list">
              {employees.slice(0, 5).map((employee) => (
                <div className="employee-row" key={employee.id}>
                  <span>{employee.name.split(" ").map((part) => part[0]).join("")}</span>
                  <div>
                    <strong>{employee.name}</strong>
                    <small>{employee.role} · {employee.department}</small>
                  </div>
                  <b>{employee.status}</b>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Onboarding</p>
                <h3>New hire readiness</h3>
              </div>
            </div>
            <div className="task-list">
              {onboardingTasks.map((task) => (
                <label key={task.title}>
                  <input type="checkbox" defaultChecked={task.done} />
                  <span>{task.title}</span>
                  <b>{task.owner}</b>
                </label>
              ))}
            </div>
          </article>

          <article className="panel org-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Org Chart</p>
                <h3>Leadership structure</h3>
              </div>
            </div>
            <div className="org-chart" aria-label="Organization chart">
              <div className="org-node executive">Chief People Officer</div>
              <div className="org-branches">
                <span>HR Operations</span>
                <span>Payroll</span>
                <span>Talent</span>
              </div>
              <div className="org-branches muted">
                <span>Records</span>
                <span>Compliance</span>
                <span>Reviews</span>
              </div>
            </div>
          </article>

          <article className="panel" id="audit-logs">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Audit Logs</p>
                <h3>Recent controlled actions</h3>
              </div>
            </div>
            <div className="audit-list">
              {auditEvents.map((event) => (
                <div key={`${event.time}-${event.actor}`}>
                  <span>{event.time}</span>
                  <strong>{event.actor}</strong>
                  <p>{event.action}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
