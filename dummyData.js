// data/dummyData.js
export const dummyProjectData = {
  // === Project Alpha Data ===
  "project-alpha": {
    summary: "Initiation Phase - Q3 2025 Product Launch",
    progress: 30,
    currentPhase: "Planning & Requirements Gathering",
    complianceStatus: "green",
    complianceScore: 90,
    kpis: {
      velocity: 25, // points per sprint
      openBugs: 5,
      riskLevel: "low", // low, medium, high
      budgetAdherence: 95, // %
    },
    milestones: [
      { name: "Project Kick-off", date: "2025-07-01", status: "completed" },
      { name: "Requirements Sign-off", date: "2025-07-20", status: "completed" },
      { name: "Initial Design Complete", date: "2025-08-10", status: "upcoming" },
      { name: "Development Start", date: "2025-09-01", status: "upcoming" },
    ],
    nextMajorMilestone: {
      name: "Initial Design Complete",
      date: "2025-08-10",
    },
    upcomingDeliverables: [
      { name: "Detailed Requirement Specification", dueDate: "2025-07-25", owner: "Alice", status: "upcoming" },
      { name: "Architecture Design Document", dueDate: "2025-08-05", owner: "Bob", status: "upcoming" },
    ],
    recentActivity: [
      { type: "Comment", user: "Alice", description: "Reviewed initial requirement drafts.", timestamp: "2025-06-21 10:00", link: "#" },
      { type: "File Upload", user: "Bob", description: "Uploaded 'Project Plan v0.1.pdf'.", timestamp: "2025-06-20 15:30", link: "#" },
      { type: "Handoff", user: "Charlie", description: "Market Research handed off to Product Team.", timestamp: "2025-06-19 11:00", link: "#" },
    ],
    handoffTracking: [
      { phase: "Requirements", owner: "Alice", status: "In Progress" },
      { phase: "Design", owner: "Bob", status: "Pending" },
      { phase: "Development", owner: "David", status: "Pending" },
    ],
    bottlenecks: {
      current: "Delay in external vendor response for integration.",
      lastIdentified: "2025-06-20",
    },
    externalDependencies: [
      { name: "Payment Gateway API", type: "API", status: "stable", lastUpdated: "2025-06-15" },
      { name: "External Data Provider", type: "Service", status: "pending", lastUpdated: "2025-06-10" },
      { name: "Third-Party Authentication", type: "SDK", status: "critical", lastUpdated: "2025-06-01" },
    ],
    teamHealth: {
      morale: "high", // high, medium, low
      burnoutRisk: "low", // low, medium, high
      resourceUtilization: [
        { role: "Backend Dev", utilization: 85 },
        { role: "Frontend Dev", utilization: 70 },
        { role: "QA Engineer", utilization: 60 },
      ],
    }
  },

  // === Project Beta Data ===
  "project-beta": {
    summary: "Execution Phase - Feature X Development",
    progress: 75,
    currentPhase: "Development & Testing",
    complianceStatus: "yellow",
    complianceScore: 78,
    kpis: {
      velocity: 18,
      openBugs: 12,
      riskLevel: "medium",
      budgetAdherence: 88,
    },
    milestones: [
      { name: "Design Complete", date: "2025-05-15", status: "completed" },
      { name: "Backend Development Complete", date: "2025-06-10", status: "completed" },
      { name: "Frontend Development Complete", date: "2025-07-01", status: "upcoming" },
      { name: "Integration Testing Start", date: "2025-07-15", status: "upcoming" },
    ],
    nextMajorMilestone: {
      name: "Frontend Development Complete",
      date: "2025-07-01",
    },
    upcomingDeliverables: [
      { name: "User Interface Module", dueDate: "2025-06-28", owner: "Eve", status: "delayed" },
      { name: "API Documentation Update", dueDate: "2025-07-05", owner: "Frank", status: "upcoming" },
    ],
    recentActivity: [
      { type: "Comment", user: "Eve", description: "Bug found in user registration flow.", timestamp: "2025-06-21 09:30", link: "#" },
      { type: "File Upload", user: "Frank", description: "Uploaded 'Test Plan v1.0.docx'.", timestamp: "2025-06-20 10:00", link: "#" },
      { type: "Handoff", user: "Grace", description: "Backend module 3 handed off to QA.", timestamp: "2025-06-19 14:00", link: "#" },
    ],
    handoffTracking: [
      { phase: "Frontend Dev", owner: "Eve", status: "In Progress" },
      { phase: "QA Testing", owner: "Grace", status: "In Progress" },
      { phase: "Deployment", owner: "Henry", status: "Pending" },
    ],
    bottlenecks: {
      current: "Frontend team bandwidth issues impacting UI completion.",
      lastIdentified: "2025-06-19",
    },
    externalDependencies: [
      { name: "CDN Service", type: "Infrastructure", status: "stable", lastUpdated: "2025-06-01" },
      { name: "Email Service Provider", type: "Service", status: "stable", lastUpdated: "2025-05-20" },
    ],
    teamHealth: {
      morale: "medium",
      burnoutRisk: "medium",
      resourceUtilization: [
        { role: "Backend Dev", utilization: 90 },
        { role: "Frontend Dev", utilization: 95 },
        { role: "QA Engineer", utilization: 80 },
      ],
    }
  },

  // === Project Gamma Data ===
  "project-gamma": {
    summary: "Deployment Phase - Infrastructure Upgrade",
    progress: 90,
    currentPhase: "Final Testing & Deployment",
    complianceStatus: "red",
    complianceScore: 65,
    kpis: {
      velocity: 10,
      openBugs: 2,
      riskLevel: "high",
      budgetAdherence: 105,
    },
    milestones: [
      { name: "Environment Setup", date: "2025-05-01", status: "completed" },
      { name: "Migration Plan Approval", date: "2025-05-20", status: "completed" },
      { name: "Pilot Deployment", date: "2025-06-15", status: "completed" },
      { name: "Full Production Rollout", date: "2025-07-01", status: "upcoming" },
      { name: "Post-Deployment Audit", date: "2025-07-15", status: "upcoming" },
    ],
    nextMajorMilestone: {
      name: "Full Production Rollout",
      date: "2025-07-01",
    },
    upcomingDeliverables: [
      { name: "Final Security Audit Report", dueDate: "2025-06-28", owner: "Isaac", status: "upcoming" },
      { name: "Rollback Plan Document", dueDate: "2025-06-29", owner: "Jack", status: "upcoming" },
    ],
    recentActivity: [
      { type: "Comment", user: "Isaac", description: "Identified a critical vulnerability in legacy service.", timestamp: "2025-06-21 11:00", link: "#" },
      { type: "File Upload", user: "Jack", description: "Uploaded 'Production Checklist v2.0.pdf'.", timestamp: "2025-06-20 13:00", link: "#" },
      { type: "Handoff", user: "Karen", description: "Infrastructure configuration handed off to DevOps.", timestamp: "2025-06-19 16:00", link: "#" },
    ],
    handoffTracking: [
      { phase: "Security Audit", owner: "Isaac", status: "In Progress" },
      { phase: "Deployment Planning", owner: "Jack", status: "In Progress" },
      { phase: "Post-Deployment Support", owner: "Karen", status: "Pending" },
    ],
    bottlenecks: {
      current: "Unresolved critical security finding blocking deployment.",
      lastIdentified: "2025-06-21",
    },
    externalDependencies: [
      { name: "Cloud Provider Services", type: "Infrastructure", status: "stable", lastUpdated: "2025-06-20" },
      { name: "Network Hardware Vendor", type: "Hardware", status: "pending", lastUpdated: "2025-06-18" },
    ],
    teamHealth: {
      morale: "low",
      burnoutRisk: "high",
      resourceUtilization: [
        { role: "DevOps Engineer", utilization: 98 },
        { role: "Security Analyst", utilization: 92 },
        { role: "Network Engineer", utilization: 85 },
      ],
    }
  }
};


export const dummyComplianceData = {
  sbomStatus: [
    { component: "react@18.2.0", status: "compliant", triggerLog: "Initial scan" },
    { component: "lodash@4.17.21", status: "vulnerable", triggerLog: "Known vulnerability detected (CVE-2021-23339)" },
    { component: "express@4.18.2", status: "compliant", triggerLog: "Regular scan" },
  ],
  securityFindings: [
    { finding: "XSS vulnerability in login form", remediation: "Input sanitization required", status: "open", severity: "high" },
    { finding: "Weak password policy", remediation: "Implement strong password requirements", status: "in progress", severity: "medium" },
  ],
  requirementToCodeMapping: [
    { requirement: "User authentication", codeFile: "src/auth/Login.js", status: "mapped" },
    { requirement: "Data encryption at rest", codeFile: "src/utils/db.js", status: "pending review" },
    { requirement: "Payment processing", codeFile: "src/payments/PaymentHandler.js", status: "mapped" },
    { requirement: "Data validation", codeFile: "src/utils/validation.js", status: "mapped" },
    { requirement: "API rate limiting", codeFile: "src/middleware/rateLimit.js", status: "pending review" },
  ],
  testCasesToRequirementMapping: [
    { testCase: "TC-001: Valid Login", requirement: "User authentication", status: "passed" },
    { testCase: "TC-002: Invalid Login", requirement: "User authentication", status: "passed" },
    { testCase: "TC-003: Data encryption", requirement: "Data encryption at rest", status: "failed" },
    { testCase: "TC-004: Payment flow", requirement: "Payment processing", status: "passed" },
    { testCase: "TC-005: Input validation", requirement: "Data validation", status: "passed" },
  ],
  policyAdherence: [
    { policy: "Data Privacy Policy", status: "compliant" },
    { policy: "Security Best Practices", status: "audit required" },
  ],
  auditTrail: [
    { event: "Policy change: data retention updated", user: "Admin", timestamp: "2025-06-15 10:00" },
    { event: "SBOM scan initiated for 'Feature X'", user: "System", timestamp: "2025-06-10 08:00" },
  ],
  // === WorkflowView Specific ===
  unitTests: [
    { name: "Auth: Valid Login", status: "passed", coverage: "95%" },
    { name: "Auth: Invalid Login", status: "passed", coverage: "90%" },
    { name: "Encryption Function", status: "failed", coverage: "65%" },
    { name: "Payment Processing", status: "passed", coverage: "88%" },
    { name: "Data Validation", status: "passed", coverage: "92%" },
  ],
  bugs: [
    { id: "BUG-101", title: "Login crashes on Safari", severity: "high", status: "open", assignee: "John Doe" },
    { id: "BUG-102", title: "MFA prompt not appearing", severity: "medium", status: "in progress", assignee: "Jane Smith" },
    { id: "BUG-103", title: "Payment timeout issue", severity: "high", status: "resolved", assignee: "Bob Wilson" },
    { id: "BUG-104", title: "UI alignment on mobile", severity: "low", status: "open", assignee: "Alice Brown" },
  ],
  deployments: [
    { id: "DEPLOY-001", environment: "staging", version: "v1.2.3", status: "successful", timestamp: "2025-06-15 09:00", deployedBy: "DevOps Team" },
    { id: "DEPLOY-002", environment: "production", version: "v1.2.3", status: "pending", timestamp: "2025-06-20 13:45", deployedBy: "Release Manager" },
    { id: "DEPLOY-003", environment: "development", version: "v1.2.4", status: "successful", timestamp: "2025-06-21 11:30", deployedBy: "Developer" },
  ],
  // === Code Quality Data ===
  codeQuality: {
    overallScore: 78,
    status: "good", // good, moderate, bad
    metrics: [
      { name: "Code Coverage", value: 85, target: 80, status: "good", trend: "up" },
      { name: "Technical Debt", value: 12, target: 15, status: "good", trend: "down", unit: "hours" },
      { name: "Code Complexity", value: 3.2, target: 4.0, status: "good", trend: "stable" },
      { name: "Duplication", value: 2.1, target: 5.0, status: "good", trend: "down", unit: "%" },
      { name: "Maintainability Index", value: 72, target: 70, status: "good", trend: "up" },
      { name: "Security Hotspots", value: 3, target: 0, status: "moderate", trend: "up" },
    ],
    codeSmells: [
      { file: "src/auth/Login.js", issue: "Complex method should be broken down", severity: "medium", line: 45 },
      { file: "src/utils/helpers.js", issue: "Unused import statement", severity: "low", line: 12 },
      { file: "src/components/Dashboard.js", issue: "Magic number should be constant", severity: "low", line: 78 },
    ],
    securityIssues: [
      { file: "src/api/endpoints.js", issue: "Potential SQL injection vulnerability", severity: "high", line: 156 },
      { file: "src/utils/validation.js", issue: "Weak password validation", severity: "medium", line: 23 },
    ],
    performanceMetrics: [
      { metric: "Bundle Size", value: "245KB", status: "good", target: "< 500KB" },
      { metric: "First Contentful Paint", value: "1.2s", status: "good", target: "< 2s" },
      { metric: "Time to Interactive", value: "2.8s", status: "moderate", target: "< 3s" },
    ]
  },
  // === Documentation Data ===
  documentation: {
    userDocumentation: {
      status: "in-progress",
      lastUpdated: "2025-06-20",
      coverage: 65,
      sections: ["Getting Started", "User Guide", "FAQ"]
    },
    technicalDocumentation: {
      status: "complete",
      lastUpdated: "2025-06-18",
      coverage: 90,
      sections: ["Architecture", "API Reference", "Database Schema", "Deployment Guide"]
    },
    userFlows: {
      status: "pending",
      lastUpdated: "2025-06-15",
      coverage: 30,
      flows: ["Login Flow", "Payment Flow", "User Registration"]
    },
    apiDocumentation: {
      status: "complete",
      lastUpdated: "2025-06-19",
      coverage: 95,
      endpoints: 24
    },
    releaseNotes: {
      status: "complete",
      lastUpdated: "2025-06-21",
      versions: ["v1.2.3", "v1.2.2", "v1.2.1"]
    }
  },
  // === New Dummy Data for other components ===
  vendorData: {
    totalVendors: 15,
    activeContracts: 12,
    expiringContracts: 3,
    vendorCompliance: [
      { name: "CloudSolutions Inc.", complianceScore: 92, status: "compliant", lastAudit: "2025-05-10" },
      { name: "DataSecure LLC", complianceScore: 78, status: "non-compliant", lastAudit: "2025-04-22" },
      { name: "DevTools Corp.", complianceScore: 85, status: "compliant", lastAudit: "2025-06-01" },
      { name: "MarketingPros", complianceScore: 60, status: "needs review", lastAudit: "2025-03-15" },
    ],
    contracts: [
      { id: "C-001", vendor: "CloudSolutions Inc.", expiryDate: "2026-01-01", status: "active" },
      { id: "C-002", vendor: "DataSecure LLC", expiryDate: "2025-07-30", status: "expiring soon" },
      { id: "C-003", vendor: "DevTools Corp.", expiryDate: "2025-11-15", status: "active" },
      { id: "C-004", vendor: "MarketingPros", expiryDate: "2025-08-01", status: "expiring soon" },
    ]
  },
  ledgerData: {
    transactions: [
      { id: "TXN-7890", type: "Asset Transfer", amount: 1500.00, status: "completed", timestamp: "2025-06-20T10:00:00Z", smartContract: "SC-AssetX-101" },
      { id: "TXN-7891", type: "Royalty Payment", amount: 500.00, status: "contract enforced", timestamp: "2025-06-19T15:30:00Z", smartContract: "SC-Royalty-002" },
      { id: "TXN-7892", type: "License Renewal", amount: 250.00, status: "pending", timestamp: "2025-06-18T09:00:00Z", smartContract: "SC-License-ABC" },
      { id: "TXN-7893", type: "Compliance Report Generation", amount: 0.00, status: "completed", timestamp: "2025-06-17T11:45:00Z", smartContract: "SC-Audit-XYZ" },
      { id: "TXN-7894", type: "Invoice Settlement", amount: 1200.50, status: "completed", timestamp: "2025-06-16T14:20:00Z", smartContract: "SC-Invoice-222" },
      { id: "TXN-7895", type: "Data Access Grant", amount: 0.00, status: "contract enforced", timestamp: "2025-06-15T08:10:00Z", smartContract: "SC-DataAccess-001" },
    ],
    auditLog: [
      { event: "New transaction 'TXN-7890' added to ledger.", user: "System", timestamp: "2025-06-20T10:00:05Z", type: "transaction", details: "Signed by Party A and Party B." },
      { event: "Smart Contract 'SC-Royalty-002' executed.", user: "Automated System", timestamp: "2025-06-19T15:30:02Z", type: "smart_contract", details: "Conditions met for royalty payout." },
      { event: "User login successful: alice@example.com.", user: "alice@example.com", timestamp: "2025-06-19T10:15:10Z", type: "security", details: "From IP: 203.0.113.45" },
      { event: "Ledger data backup initiated.", user: "Admin", timestamp: "2025-06-18T23:00:00Z", type: "system" },
      { event: "Transaction 'TXN-7892' status updated to 'pending'.", user: "John Doe", timestamp: "2025-06-18T09:05:00Z", type: "transaction", details: "Awaiting final approval." },
    ]
  },
  sbomEditorData: {
    sbomComponents: [
      { id: 1, name: "axios", version: "0.21.1", license: "MIT", status: "compliant" },
      { id: 2, name: "moment", version: "2.29.1", license: "MIT", status: "compliant" },
      { id: 3, name: "sequelize", version: "6.6.5", license: "MIT", status: "vulnerable" },
      { id: 4, name: "react-router-dom", version: "5.2.0", license: "MIT", status: "compliant" },
    ],
    policies: [
      { id: 1, name: "Open Source License Compliance", description: "All open-source components must use MIT, Apache 2.0, or BSD licenses.", severity: "high", enforce: true },
      { id: 2, name: "Vulnerability Remediation Policy", description: "High-severity vulnerabilities must be remediated within 7 days.", severity: "high", enforce: true },
      { id: 3, name: "Data Encryption Standard", description: "All sensitive data at rest must be encrypted with AES-256.", severity: "medium", enforce: true },
    ]
  },
  apiMonitoringData: {
    totalEndpoints: 50,
    avgLatency: 85, // ms
    totalAlerts: 7,
    endpoints: [
      { endpoint: "/api/v1/users", status: "active", latency: 75, errorRate: 1.2 },
      { endpoint: "/api/v1/products", status: "active", latency: 90, errorRate: 0.5 },
      { endpoint: "/api/v1/orders", status: "active", latency: 120, errorRate: 3.0 },
      { endpoint: "/api/v1/auth/login", status: "active", latency: 60, errorRate: 0.1 },
      { endpoint: "/api/v1/payments", status: "inactive", latency: 200, errorRate: 15.0 },
    ],
    alerts: [
      { id: 1, message: "High error rate on /api/v1/payments", severity: "high", timestamp: "2025-06-21 14:15" },
      { id: 2, message: "Increased latency on /api/v1/orders", severity: "medium", timestamp: "2025-06-21 13:00" },
      { id: 3, message: "Endpoint /api/v1/analytics is down", severity: "high", timestamp: "2025-06-20 10:30" },
    ]
  },
  userManagementData: {
    users: [
      { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active" },
      { id: 2, name: "Bob Williams", email: "bob@example.com", role: "editor", status: "active" },
      { id: 3, name: "Charlie Davis", email: "charlie@example.com", role: "viewer", status: "inactive" },
      { id: 4, name: "Diana Prince", email: "diana@example.com", role: "editor", status: "active" },
    ],
    roles: [
      { name: "Admin", permissions: ["manage_users", "manage_settings", "view_all_data"] },
      { name: "Editor", permissions: ["create_content", "edit_content", "view_own_data"] },
      { name: "Viewer", permissions: ["view_all_data"] },
    ]
  },
  aiInsightsData: {
    overallScore: 75,
    recommendations: [
      { title: "Optimize database queries for faster load times.", category: "optimization" },
      { title: "Review 'Payment Processing' module for potential security risks.", category: "risk" },
      { title: "Consider re-prioritizing 'User Profile' feature due to high user demand prediction.", category: "prediction" },
      { title: "Automate code review for 'Auth' module to reduce manual effort.", category: "optimization" },
    ],
    predictiveAnalytics: {
      completionConfidence: 85, // %
      bugTrend: "decreasing", // "increasing", "decreasing", "stable"
      resourceSuggestion: "Increase Backend Team capacity by 1 for next sprint."
    },
    sentimentAnalysis: [
      { comment: "The new UI is much more intuitive and user-friendly!", sentiment: "positive" },
      { comment: "Facing persistent issues with data sync. Very frustrating.", sentiment: "negative" },
      { comment: "Team meeting scheduled for tomorrow to discuss sprint progress.", sentiment: "neutral" },
      { comment: "Great progress on the latest feature. Keep it up!", sentiment: "positive" },
    ]
  },
  notificationsData: {
    unreadNotifications: [
      { id: 1, message: "New security patch available for 'lodash' (CVE-2023-1234).", timestamp: "2025-06-21 14:30", read: false },
      { id: 2, message: "Compliance audit for Q2 is due next week.", timestamp: "2025-06-20 09:00", read: false },
      { id: 3, message: "Your weekly project summary report is ready.", timestamp: "2025-06-19 17:00", read: false },
    ],
    settings: {
      emailAlerts: true,
      inAppNotifications: true,
      smsAlerts: false,
      securityAlerts: true,
      complianceUpdates: true,
      newFeatures: true,
    }
  },
  settingsAdminData: {
    systemSettings: {
      appName: "Compliance Console",
      timezone: "America/Los_Angeles",
      dataRetention: 365, // days
    },
    securitySettings: {
      mfaEnabled: true,
      passwordPolicyEnforced: true,
      autoLogoutEnabled: true,
    },
    logSettings: {
      logLevel: "info",
      auditTrailEnabled: true,
    }
  }
};