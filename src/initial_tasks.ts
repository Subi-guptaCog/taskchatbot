import { Task, TaskPriority, TaskStatus } from "./types";

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-104",
    title: "#104: Fix Docker Build Error",
    description: "Multi-stage dotnet publish copy phase fails on permission denied constraint in base runtime container. Assigned to: Team",
    status: TaskStatus.TODO,
    priority: TaskPriority.HIGH,
    category: "Docker",
    createdAt: "2026-05-20T10:00:00Z"
  },
  {
    id: "task-105",
    title: "#105: Update ASP.NET Runtime",
    description: "Upgrade base runtime tags inside Dockerfile from aspnet:8.0 to preview levels to fix CVE vulnerabilities. Assigned to: Team",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    category: "DevOps",
    createdAt: "2026-05-20T05:00:00Z"
  },
  {
    id: "task-106",
    title: "#106: Check SQLite Connection String",
    description: "Ensure local container volumes mount the persistent sqlite database files properly under /app/data. Assigned to: Team",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Database",
    createdAt: "2026-05-19T10:00:00Z"
  },
  // --- Ajith Joseph Work Items ---
  {
    id: "task-19990",
    title: "#19990: Automated BRD Generation for STAR Loan Management System",
    description: "Work Item Type: User Story. Automated Business Requirements Document Generation for STAR Loan Management System. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T09:00:00Z"
  },
  {
    id: "task-20080",
    title: "#20080: POC: Document classification based on text in document",
    description: "Work Item Type: User Story. POC: Document classification based on the text in document. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI. CSV State: Canceled",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "User Story",
    createdAt: "2026-05-18T09:05:00Z"
  },
  {
    id: "task-20475",
    title: "#20475: ABA not able to use the mockup provided",
    description: "Work Item Type: Dev Bug. ABA not able to use the mockup provided. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T09:10:00Z"
  },
  {
    id: "task-20588",
    title: "#20588: ABA not able to download the DOCX file after 24 hours",
    description: "Work Item Type: Dev Bug. ABA not able to download the DOCX file after 24 hours of workflow. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T09:15:00Z"
  },
  {
    id: "task-21572",
    title: "#21572: Orbit and Aba need updates on orionlending.com products",
    description: "Work Item Type: User Story. Orbit and Aba need to be updated to be smart about orionlending.com products. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: AI; OLI",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    category: "User Story",
    createdAt: "2026-05-18T09:20:00Z"
  },
  {
    id: "task-21573",
    title: "#21573: N8n -> Fireflies -> Trello card creation project",
    description: "Work Item Type: User Story. N8n -> Fireflies -> Trello card creation project. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T09:25:00Z"
  },
  {
    id: "task-18931",
    title: "#18931: Vesta: Validate Loan & Property Info again on Price/Lock",
    description: "Work Item Type: User Story. Vesta: Validate Loan & Property Info again on Price/Lock and Disclosure Information. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI; Vesta",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T09:30:00Z"
  },
  {
    id: "task-19842",
    title: "#19842: Update STAR Dev/UAT NextWave operations to use sandbox",
    description: "Work Item Type: User Story. Update STAR Dev/UAT NextWave operations to use sandbox. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T09:35:00Z"
  },
  {
    id: "task-19843",
    title: "#19843: Update STAR lower environments to use NextWave sandbox",
    description: "Work Item Type: Task. Update STAR lower environments to use NextWave sandbox. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Task",
    createdAt: "2026-05-18T09:40:00Z"
  },
  {
    id: "task-19983",
    title: "#19983: Collect 1YR CMT indexes",
    description: "Work Item Type: Task. Collect 1YR CMT indexes. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Task",
    createdAt: "2026-05-18T09:45:00Z"
  },
  {
    id: "task-20081",
    title: "#20081: N8n/ABA Front-end Requested Functionality",
    description: "Work Item Type: User Story. N8n/ABA Front-end Requested Functionality. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T09:50:00Z"
  },
  {
    id: "task-20138",
    title: "#20138: EPO/EPD Process - Gather and automate ingestion of report",
    description: "Work Item Type: User Story. EPO/EPD Process - Gather and automate the ingestion of the report process. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T09:55:00Z"
  },
  {
    id: "task-20505",
    title: "#20505: Make ABA smart enough to scrape website by providing url",
    description: "Work Item Type: User Story. We need ABA to be smart enough to take direction and go out to a website to scrape and or learn by providing a url or suggested website. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.TODO,
    priority: TaskPriority.HIGH,
    category: "User Story",
    createdAt: "2026-05-18T10:00:00Z"
  },
  {
    id: "task-20597",
    title: "#20597: Add Orbit Agent to STAR and add it as option in Star Admin",
    description: "Work Item Type: Task. Add Orbit Agent to STAR and add it as an option just below ABA in Star Admin. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Task",
    createdAt: "2026-05-18T10:05:00Z"
  },
  {
    id: "task-20598",
    title: "#20598: Add Strategy Tools category to Star Master Admin menu",
    description: "Work Item Type: Task. Add a category to the menu in Star Master Admin and call it Strategy Tools. Move Aba and Orbit out of Misc and into the new Strategy Tools. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Task",
    createdAt: "2026-05-18T10:10:00Z"
  },
  {
    id: "task-20630",
    title: "#20630: Missing Nextwave sync for pcc user creation",
    description: "Work Item Type: Bug. Missing Nextwave sync for pcc user creation. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T10:15:00Z"
  },
  {
    id: "task-20696",
    title: "#20696: Validation and debugging the Reports",
    description: "Work Item Type: Task. Validation and debugging the Reports. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    category: "Task",
    createdAt: "2026-05-18T10:20:00Z"
  },
  {
    id: "task-20752",
    title: "#20752: POC Review - MemoriLabs vs Redis",
    description: "Work Item Type: User Story. POC Review - MemoriLabs vs Redis. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T10:25:00Z"
  },
  {
    id: "task-21140",
    title: "#21140: Sync SQL Data from Encompass/Vesta to Data Warehouse",
    description: "Work Item Type: User Story. Create Application to Sync SQL Data from Encompass (and eventually Vesta) to a Data Warehouse Table. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T10:30:00Z"
  },
  {
    id: "task-21229",
    title: "#21229: 4 Condition Submissions & Final Approval Rules",
    description: "Work Item Type: Task. 4 Condition Submissions & Final Approval Rules. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Task",
    createdAt: "2026-05-18T10:35:00Z"
  },
  {
    id: "task-21275",
    title: "#21275: Ensure Excel file uploads work for newer Excel versions",
    description: "Work Item Type: User Story. Ensure Excel file uploads work for users on newer Excel versions. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T10:40:00Z"
  },
  {
    id: "task-21276",
    title: "#21276: Ensure Excel file uploads work on newer Excel Versions",
    description: "Work Item Type: Task. Ensure Excel file uploads work for users on newer Excel Versions. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Task",
    createdAt: "2026-05-18T10:45:00Z"
  },
  {
    id: "task-21361",
    title: "#21361: Excel upload support on newer Excel [Duplicate]",
    description: "Work Item Type: Task. Ensure Excel file uploads work for users on newer Excel Versions. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. CSV State: Duplicated",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Task",
    createdAt: "2026-05-18T10:50:00Z"
  },
  {
    id: "task-21604",
    title: "#21604: Excel copy/paste & format issue on marketing page",
    description: "Work Item Type: User Story. Fix:P1: Excel 'format' issue - copying/pasting and upload issues. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. CSV State: Canceled",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "User Story",
    createdAt: "2026-05-18T10:55:00Z"
  },
  {
    id: "task-21605",
    title: "#21605: P1: Excel format issue - paste & upload bugs",
    description: "Work Item Type: Bug. P1: Excel 'format' issue - copying/pasting and upload issues. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. CSV State: Canceled",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-18T11:00:00Z"
  },
  {
    id: "task-21649",
    title: "#21649: Align Vesta fields to Encompass Fields via Aba",
    description: "Work Item Type: User Story. We need to use Aba to take a stab at trying to align Vesta fields to Encompass Fields using keywords/descriptions etc. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T11:05:00Z"
  },
  {
    id: "task-21661",
    title: "#21661: Vesta: Missing success popup and SR.UW required notices",
    description: "Work Item Type: Bug. Upon successfully sending the docs to Vesta, the pop up message is not displayed and when PDFs are uploaded for a SR.UW, the required pop is not displayed. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T11:10:00Z"
  },
  {
    id: "task-21699",
    title: "#21699: Bug: Incorrect Submit to Orion popup for SR.UW PTCTC",
    description: "Work Item Type: Bug. The pop-up displayed for the Submit to Orion button when a SR.Uw condition is uploaded along with other PTCTC condition is not correct. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T11:15:00Z"
  },
  {
    id: "task-21714",
    title: "#21714: Star: Submit For Final Approval hidden when conditions met",
    description: "Work Item Type: Dev Bug. 21229: The Submit For Final Approval Button is not showing even though the display conditions have been met. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T11:20:00Z"
  },
  {
    id: "task-21716",
    title: "#21716: Bug: SR.UW buttons not enabling and Star Pass broken",
    description: "Work Item Type: Bug. The SR.UW, conditions review and final approval buttons cannot be enabled and Star pass functionality is not working. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T11:25:00Z"
  },
  {
    id: "task-21741",
    title: "#21741: Star: Submit to SR.UW disabled despite all PDFs uploaded",
    description: "Work Item Type: Dev Bug. 21062: Submit To SR. UW button disabled even if all pdfs have been uploaded in PTCTC SR. UW section. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T11:30:00Z"
  },
  {
    id: "task-21749",
    title: "#21749: UAT-Vesta: Star Pass popup cosmetic style issues",
    description: "Work Item Type: Bug. UAT- Vesta | UI - The look of star pass pop-up is not correct. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T11:35:00Z"
  },
  {
    id: "task-21870",
    title: "#21870: Star: Submit For Condition Review should not display",
    description: "Work Item Type: Dev Bug. 21229: Submit For Condition Review button shouldn't display in Star. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T11:40:00Z"
  },
  {
    id: "task-21896",
    title: "#21896: Marketing Page: Uploading excel throws console crash",
    description: "Work Item Type: User Story. Bug: error while uploading excel in marketing page. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "User Story",
    createdAt: "2026-05-18T11:45:00Z"
  },
  {
    id: "task-21897",
    title: "#21897: Bug: Excel upload error in marketing panel logic",
    description: "Work Item Type: Dev Bug. Bug: error while uploading excel in marketing page. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T11:50:00Z"
  },
  {
    id: "task-21905",
    title: "#21905: Conversation log missing updates after Star Pass submit",
    description: "Work Item Type: Bug. The Conversation log is not getting updated after the star pass is used. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T11:55:00Z"
  },
  {
    id: "task-21915",
    title: "#21915: 21229: Disable button when SR conditions are uploaded",
    description: "Work Item Type: Dev Bug. 21229: Disable the button when SR conditions are uploaded. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T12:00:00Z"
  },
  {
    id: "task-21917",
    title: "#21917: 21229: Enable button when non-SR conditions uploaded",
    description: "Work Item Type: Dev Bug. 21229: Enable the button when Non SR. conditions are uploaded. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T12:05:00Z"
  },
  {
    id: "task-21936",
    title: "#21936: Star Pass: Add clickable PDF download link in table",
    description: "Work Item Type: Dev Bug. 21229: Make a clickable link to download/view the PDF in the table. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T12:10:00Z"
  },
  {
    id: "task-21947",
    title: "#21947: 21229: Update popup card styling and button design",
    description: "Work Item Type: Dev Bug. 21229: Update the popup and button style. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T12:15:00Z"
  },
  {
    id: "task-21963",
    title: "#21963: SR.UW button enabled by mistake when condition review active",
    description: "Work Item Type: Bug. When the Submit to condition review is enabled, the SR. UW button also got enabled. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T12:20:00Z"
  },
  {
    id: "task-21964",
    title: "#21964: UAT-Vesta: Submit for Condition Review missing in Star",
    description: "Work Item Type: Bug. UAT Vesta | Submit for condition review button is not displaying as per requirement 4.4.1.1. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T12:25:00Z"
  },
  {
    id: "task-21965",
    title: "#21965: Vesta: Invalid popup for unlocked & non-suspended loan",
    description: "Work Item Type: Bug. When the Submit to condition review button is clicked for a non-suspended loan where the loan is not locked, the pop-up shown is not correct. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T12:30:00Z"
  },
  {
    id: "task-21967",
    title: "#21967: Closing Date: Incorrect popup shown for future date",
    description: "Work Item Type: Bug. The closing date pop-up displayed for future closing date is not correct. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T12:35:00Z"
  },
  {
    id: "task-21969",
    title: "#21969: Vesta: Turn times popup wrongly shown for expired lock",
    description: "Work Item Type: Bug. When the current closing date (vesta) is less than today's date, instead of expired message, the turn times pop-up is displayed under submit for conditions review. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T12:40:00Z"
  },
  {
    id: "task-21970",
    title: "#21970: Vesta: Loan stage not updating to Resubmitted on review",
    description: "Work Item Type: Bug. UAT | Upon clicking the Submit to condition review, the status is not updated to Resubmitted in vesta. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T12:45:00Z"
  },
  {
    id: "task-21990",
    title: "#21990: Vesta: Stage fails to save as Resubmitted via SR.UW",
    description: "Work Item Type: Bug. UAT | When the SR.UW and Star pass conditions are submitted through SR.UW button and star pass, Vesta currentLoanStage is not set to 'Resubmitted'. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T12:50:00Z"
  },
  {
    id: "task-21991",
    title: "#21991: Vesta: Upload progress log desyncs after Star Pass use",
    description: "Work Item Type: Bug. After using the star pass, the uploads section is not properly updated as per the user story. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T12:55:00Z"
  },
  {
    id: "task-21992",
    title: "#21992: Vesta: Submit to Orion popup backdrops color mismatch",
    description: "Work Item Type: Bug. UI Issue| Need to update grey as background color for submit orion popup. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-18T13:00:00Z"
  },
  {
    id: "task-21995",
    title: "#21995: Star Pass: Missing PTF section conditions in review index",
    description: "Work Item Type: Dev Bug. 21229: The condition in PTF didn't show in Star pass review list. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T13:05:00Z"
  },
  {
    id: "task-22004",
    title: "#22004: Star: Remove unnecessary icon next to Submit SR.UW button",
    description: "Work Item Type: Dev Bug. 21061: Remove the icon beside the Submit SR. UW button. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Dev Bug",
    createdAt: "2026-05-18T13:10:00Z"
  },
  {
    id: "task-22018",
    title: "#22018: Date Picker: Calendar fails to select in Vesta popup",
    description: "Work Item Type: Dev Bug. 21229: The calendar in the popup doesn't work. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T13:15:00Z"
  },
  {
    id: "task-22026",
    title: "#22026: Vesta: Conditions review card assets deviation from specs",
    description: "Work Item Type: Bug. The look of the conditions review pop-up based on interest rate and assets have slight variations from the userstory. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T13:20:00Z"
  },
  {
    id: "task-22028",
    title: "#22028: UAT-Vesta: Submit for Partial Review fails to post payload",
    description: "Work Item Type: Bug. UAT Vesta| Submit for Partial Review button is not working. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T13:25:00Z"
  },
  {
    id: "task-22059",
    title: "#22059: Vesta: Continue button fails triggers inside Final Approval",
    description: "Work Item Type: Bug. The click functionality of Continue button in the pop-up of Submit for final approval is not working. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T13:30:00Z"
  },
  {
    id: "task-22068",
    title: "#22068: Vesta: Final Approval custom flag is not setting to 'Yes'",
    description: "Work Item Type: Bug. UAT | Upon sending the documents to Vesta through continue button of Final Approval, currentLoanStage is not changed to 'Resubmitted' and set Vesta custom field Final Approval Request is not set to 'Yes'. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T13:35:00Z"
  },
  {
    id: "task-22072",
    title: "#22072: 21229: Submit For Final Approval button doesn't trigger",
    description: "Work Item Type: Dev Bug. 21229: Submit For Final Approval button doesn't work. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T13:40:00Z"
  },
  {
    id: "task-22091",
    title: "#22091: Bug: Assets Reconcile button fails inside conditions card",
    description: "Work Item Type: Bug. The click functionality of the reconcile Assets button in the Submit for Conditions review pop-up is not working. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T13:45:00Z"
  },
  {
    id: "task-22135",
    title: "#22135: Lock Extension: Popup fails to trigger on expired locks",
    description: "Work Item Type: Dev Bug. 21229: Lock Extension popup didn't show. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T13:50:00Z"
  },
  {
    id: "task-22141",
    title: "#22141: Alerts: Unsubmitted conditions alert overrides active state",
    description: "Work Item Type: Dev Bug. 21229: Conditions Uploaded Not Submitted alert is wrong when Submit to Orion or Submit to SR.UW button enabled. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T13:55:00Z"
  },
  {
    id: "task-22151",
    title: "#22151: Vesta: Conditions submitted successfully even if expired",
    description: "Work Item Type: Dev Bug. 21229: The lock has already expired, but the conditions were submitted successfully. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T14:00:00Z"
  },
  {
    id: "task-22172",
    title: "#22172: Vesta: Submit for Final Approval remains active in error",
    description: "Work Item Type: Bug. After submitting all the documents to Vesta, the Submit to final approval button is still enabled. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T14:05:00Z"
  },
  {
    id: "task-22173",
    title: "#22173: Final Approval: Displaying incorrect earliest closing date",
    description: "Work Item Type: Bug. The earliest closing date displayed in the Final approval pop-up loan is incorrect. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T14:10:00Z"
  },
  {
    id: "task-22207",
    title: "#22207: Automated Test Plan: Incorporate template directly to Aba",
    description: "Work Item Type: User Story. Add test plan template to Aba. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T14:15:00Z"
  },
  {
    id: "task-22212",
    title: "#22212: Star: Missing hover animations inside operational buttons",
    description: "Work Item Type: Dev Bug. 21229: Please add a hover animation to the button. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Dev Bug",
    createdAt: "2026-05-18T14:20:00Z"
  },
  {
    id: "task-22214",
    title: "#22214: Lock Extension: UI overlay styling misalignment",
    description: "Work Item Type: Dev Bug. 21229: Lock Extension popup UI issue. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Dev Bug",
    createdAt: "2026-05-18T14:25:00Z"
  },
  {
    id: "task-22219",
    title: "#22219: Final Approval enabled despite asset constraint failure",
    description: "Work Item Type: Bug. The final approval button is enabled for a loan where the Total available assets are lesser than that of the total funds required. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. CSV State: Canceled",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-18T14:30:00Z"
  },
  {
    id: "task-22232",
    title: "#22232: Dev: No button display when re-uploading PDFs",
    description: "Work Item Type: Dev Bug. 21229：After submitting the condition review, if I upload a PDF again for PTA or PTCTC or other PTCTC, no button is displayed. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T14:35:00Z"
  },
  {
    id: "task-22255",
    title: "#22255: Submit to SR.UW constraints logic for file uploads",
    description: "Work Item Type: Dev Bug. 21229: Should show 'Submit to SR.UW' button when all conditions in PTCTC section uploaded not submitted and at least one condition upload not submitted in Other PTCTC section. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T14:40:00Z"
  },
  {
    id: "task-22277",
    title: "#22277: Final Approval remains disabled when conditions are met",
    description: "Work Item Type: Bug. The submit for final approval button is not enabled for a loan when the loan is locked and available Assets are greater than the funds require. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T14:45:00Z"
  },
  {
    id: "task-22290",
    title: "#22290: Suspension Modal: OK toggle switch styling update",
    description: "Work Item Type: Bug. UAT | BUG |Suspended loan for Submit for Condition Review popup the OK toggle button needs an update in style. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T14:50:00Z"
  },
  {
    id: "task-22331",
    title: "#22331: Final Approval: Black screen overlay freeze bug",
    description: "Work Item Type: Dev Bug. 21229: After clicking the Submit For Final Approval button, the page show a black overlay, please fix it. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T14:55:00Z"
  },
  {
    id: "task-22392",
    title: "#22392: Logic: Conflict hiding button triggers on condition reviews",
    description: "Work Item Type: Bug. From Orion: Don’t show the USE STAR PASS, SUBMIT TO SR. UW, or SUBMIT TO ORION buttons when the SUBMIT FOR CONDITION REVIEW or SUBMIT FOR FINAL APPROVAL buttons are enabled. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T15:00:00Z"
  },
  {
    id: "task-22508",
    title: "#22508: Show Final Approval button when all sections uploaded",
    description: "Work Item Type: Dev Bug. 21229: Show 'Submit for final approval' button when all PTCTC and all other PTCTC section conditions have been uploaded. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T15:05:00Z"
  },
  {
    id: "task-22515",
    title: "#22515: Toggle button layout state fallback constraints",
    description: "Work Item Type: Dev Bug. 21229: After submitting for final approval, if a PDF is uploaded again, the button should be displayed as Submit For Condition Review. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. CSV State: Canceled",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Dev Bug",
    createdAt: "2026-05-18T15:10:00Z"
  },
  {
    id: "task-22518",
    title: "#22518: Conflict: Orion and SR.UW buttons enabled simultaneously",
    description: "Work Item Type: Bug. UAT Vesta | THe Submit to Orion and Submit to SR. UW button s are enabled together. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T15:15:00Z"
  },
  {
    id: "task-22575",
    title: "#22575: Log: Filename not saving to the conversation records",
    description: "Work Item Type: Bug. BUG | Vesta UAT | Documents name is not updated in the conversation log. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T15:20:00Z"
  },
  {
    id: "task-22577",
    title: "#22577: Vesta: Black overlay screens on final approval submit",
    description: "Work Item Type: Bug. Beta| Vesta UAT| Black screens appear when we submit a loan for final approval. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T15:25:00Z"
  },
  {
    id: "task-22593",
    title: "#22593: Real Estate Agent: Task fails to persist Completed state",
    description: "Work Item Type: Bug. BUG | UAT VESTA | Real Estate Agent Info not moving to Completed section & overlapping Success message with loader. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T15:30:00Z"
  },
  {
    id: "task-22621",
    title: "#22621: Star Pass: Correct text label inside details notes modal",
    description: "Work Item Type: Dev Bug. 21229: Change text to 'Select one' in note popup. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Dev Bug",
    createdAt: "2026-05-18T15:35:00Z"
  },
  {
    id: "task-22624",
    title: "#22624: Buttons: Approve/Cancel action logic broken inside popup",
    description: "Work Item Type: Bug. beta - Continue and Cancel buttons are not functioning as toggle actions in “Submit for Final Approval” pop-up. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T15:40:00Z"
  },
  {
    id: "task-22628",
    title: "#22628: Earliest Closing Date: Mismatch calculation inside summary",
    description: "Work Item Type: Bug. Beta Vesta | The earliest closing date displayed in the Submit for conditions review  pop-up is incorrect. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T15:45:00Z"
  },
  {
    id: "task-22672",
    title: "#22672: Support multi-doc conditions on Loan Decision rules",
    description: "Work Item Type: User Story. Vesta - Handling Loan Decision Conditions when more than one document or document type is required. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: Next Priorities; OLI; Vesta; Vesta Loan Decision",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T15:50:00Z"
  },
  {
    id: "task-22675",
    title: "#22675: Popups: Vesta star pass displays Encompass frame inside iframe",
    description: "Work Item Type: Bug. Beta Vesta | The star pass pop vesta loans are showing encompass pop-up. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T15:55:00Z"
  },
  {
    id: "task-22709",
    title: "#22709: UI: Star Pass values display blank fields for some records",
    description: "Work Item Type: Dev Bug. Prod: Star Pass Condition Review, some fields show wrong. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Dev Bug",
    createdAt: "2026-05-18T16:00:00Z"
  },
  {
    id: "task-22718",
    title: "#22718: Vesta integration triggers updates to Encompass inappropriately",
    description: "Work Item Type: Bug. Code is updating Encompass for Vesta loans. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. Tags: OLI",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T16:05:00Z"
  },
  {
    id: "task-22723",
    title: "#22723: Display: Loan state in pipeline dashboard disagrees with decision card",
    description: "Work Item Type: Dev Bug. Prod: The loan status in pipeline is different from loan decision page. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T16:10:00Z"
  },
  {
    id: "task-22756",
    title: "#22756: Dev: Condition Review state display is confusing checkout users",
    description: "Work Item Type: Dev Bug. Prod: 'Condition Review' status concern. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Dev Bug",
    createdAt: "2026-05-18T16:15:00Z"
  },
  {
    id: "task-22774",
    title: "#22774: Validation: Final Approval alert says fully submitted on partials",
    description: "Work Item Type: Bug. BUG | BETA| FUNCTIONALITY -Final Approval - Documents not fully submitted – Final Approval alert incorrect and partial document status. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T16:20:00Z"
  },
  {
    id: "task-22775",
    title: "#22775: Bug: Submit to Senior UW remains disabled on complete uploads",
    description: "Work Item Type: Bug. BUG | BETA |  FUNCTIONALITY - Unable to submit to Senior UW despite all conditions uploaded. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T16:25:00Z"
  },
  {
    id: "task-22789",
    title: "#22789: Alerts: Typo adjustments inside star pass disclaimer texts",
    description: "Work Item Type: Bug. Bug | Prod | Text mismatch in the star pass pop up. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-18T16:30:00Z"
  },
  {
    id: "task-22791",
    title: "#22791: Constraints: Document upload rules for non-SR.UW sectors",
    description: "Work Item Type: Bug. Prod | Users have to upload documents from sections other than SR.uw and all other PTCTC to enable the submit for conditions review or final approval button. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T16:35:00Z"
  },
  {
    id: "task-22828",
    title: "#22828: Bug: PDF file uploads fail silent in Loan File panel",
    description: "Work Item Type: Bug. BUG | UAT VESTA | PDF Upload Fails to Submit in Document Upload Section (Loan File). Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T16:40:00Z"
  },
  {
    id: "task-22829",
    title: "#22829: UI: Missing set identifiers label inside Gift Funds upload area",
    description: "Work Item Type: Bug. BUG| UAT VESTA | Missing 'Set #1', 'Set #2', and 'Set #3' labels in Gift Funds document & Bank Statement  upload UI. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T16:45:00Z"
  },
  {
    id: "task-22830",
    title: "#22830: Theme: Incorrect color inside tooltip alerts",
    description: "Work Item Type: Bug. BUG | UAT VESTA | Tooltip color displayed incorrectly (Red instead of expected UI standard color). Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-18T16:50:00Z"
  },
  {
    id: "task-22831",
    title: "#22831: Content: Mismatched guidelines copy for Gift Funds wizard",
    description: "Work Item Type: Bug. BUG | UAT VESTA | Mismatch in instructional text for Gift Funds document upload in UI screens. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-18T16:55:00Z"
  },
  {
    id: "task-22847",
    title: "#22847: Overlay: Overlapping modal triggers on save & close operations",
    description: "Work Item Type: Bug. BUG |UAT VESTA | Overlapping of Popup seen while submitting the Documents and Loan document upload status not updating showing “Upload failed” error on Save & Close. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T17:00:00Z"
  },
  {
    id: "task-22907",
    title: "#22907: Display: Missing 'Provided time' label for existing documents",
    description: "Work Item Type: Dev Bug. 22672: If a document or documents already exist in Vesta, Star didn't show 'Provided time'. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Dev Bug",
    createdAt: "2026-05-18T17:05:00Z"
  },
  {
    id: "task-22946",
    title: "#22946: Vesta: senior UW vs. Submit for Condition Review toggle bug",
    description: "Work Item Type: Bug. BUG | BETA VESTA | Inconsistent visibility of Senior UW vs. “Submit for Condition Review” buttons for same user/account. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T17:10:00Z"
  },
  {
    id: "task-22982",
    title: "#22982: Vesta State: Status incorrectly forced on Submit to Orion",
    description: "Work Item Type: Bug. BUG| PROD | 22756 - Loan status incorrectly changes to “Condition Review” after submitting conditions via \"Submit to Orion\". Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. CSV State: Canceled",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-18T17:15:00Z"
  },
  {
    id: "task-23006",
    title: "#23006: Real Estate Agent Task resets state when no agents picked",
    description: "Work Item Type: Bug. BUG | PROD | CD Readiness - Real Estate Agent Info Task Does Not remain in Completed task When No Buyer/Seller Agents Selected. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T17:20:00Z"
  },
  {
    id: "task-23028",
    title: "#23028: Dev: Set LoggedItem state value to 'To Orion' on submit",
    description: "Work Item Type: Dev Bug. UAT: Update the code to make ConditionSubmissionLog.LoggedItem = 'To Orion' when clicking Submit to Orion button on the Condition page. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-18T17:25:00Z"
  },
  {
    id: "task-23036",
    title: "#23036: Task: COC Form UI layout updates inside Vesta pipeline",
    description: "Work Item Type: Task. COC Form UI updates (Vesta). Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Task",
    createdAt: "2026-05-18T17:30:00Z"
  },
  {
    id: "task-23043",
    title: "#23043: Bug: Screen Saver Icon contains blurry logo & black divider",
    description: "Work Item Type: Bug. Bug | PROD |Blurry Logo and Black Line Visible on Screen Saver Icon. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-18T17:35:00Z"
  },
  {
    id: "task-23128",
    title: "#23128: Fee Updates inputs styling out of alignment vertically",
    description: "Work Item Type: Bug. Fee updates fields are out of alignment. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T17:40:00Z"
  },
  {
    id: "task-23130",
    title: "#23130: Dev: Capture full details inside COC change log object",
    description: "Work Item Type: Bug. the change log message should include all details of the COC submission. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T17:45:00Z"
  },
  {
    id: "task-23167",
    title: "#23167: Color: Incorrect labels colors inside file upload drag card",
    description: "Work Item Type: Bug. BUG | UAT | Incorrect Text Colors in File Upload Area (“DROP HERE” and “click to browse”). Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-18T17:50:00Z"
  },
  {
    id: "task-23240",
    title: "#23240: Technical spec writer for User story creation",
    description: "Work Item Type: User Story. Technical spec writer for User story. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>",
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    category: "User Story",
    createdAt: "2026-05-18T17:55:00Z"
  },
  {
    id: "task-23261",
    title: "#23261: SR.UW button remains disabled after uploads finish",
    description: "Work Item Type: Bug. SR UW button is not enabled when all the SR UW conditions have been uploaded. Assigned to: Ajith Joseph <ajoseph@oligloballtd.com>. CSV State: Waiting for QA",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-18T18:00:00Z"
  },
  // --- Subi Gupta Work Items ---
  {
    id: "task-21224",
    title: "#21224: Vesta Alerts: Update the CD Readiness notifications",
    description: "Work Item Type: Task. 2 Update the Readiness Alerts. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Task",
    createdAt: "2026-05-19T09:00:00Z"
  },
  {
    id: "task-21535",
    title: "#21535: Logic: Pricing Incentive Expiration Date auto-population",
    description: "Work Item Type: User Story. Update logic to populate Pricing Incentive Expiration Date. Assigned to: Subi Gupta <sgupta@oligloballtd.com>. Tags: Next Priorities; OLI",
    status: TaskStatus.TODO,
    priority: TaskPriority.HIGH,
    category: "User Story",
    createdAt: "2026-05-19T09:05:00Z"
  },
  {
    id: "task-21547",
    title: "#21547: Task: Sync and save Pricing Expiration dates to DB",
    description: "Work Item Type: Task. Update logic to populate the Pricing Incentive Expiration Date. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Task",
    createdAt: "2026-05-19T09:10:00Z"
  },
  {
    id: "task-21662",
    title: "#21662: Bug: System Alerts displays empty/blank cards in corner",
    description: "Work Item Type: Bug. The alerts messages are not properly displayed. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-19T09:15:00Z"
  },
  {
    id: "task-21899",
    title: "#21899: UI: Mismatched styling for document labels inside Orion popup",
    description: "Work Item Type: Bug. UAT -Vesta | The colour of the document name and the star pass link at the bottom of the submit to Orion pop-up when a sr.uw condition is uploaded with all other PTCTC condition is not as expected. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-19T09:20:00Z"
  },
  {
    id: "task-21910",
    title: "#21910: Hide Submit to Orion button before conditions met",
    description: "Work Item Type: Dev Bug. 21229: Don't display 'Submit to Orion' button until meet the condition. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-19T09:25:00Z"
  },
  {
    id: "task-22081",
    title: "#22081: Alerts: Suppress notice alerts following Star Pass use",
    description: "Work Item Type: Dev Bug. 21229: Shouldn't show alert after submit using \"STAR PASS\". Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Dev Bug",
    createdAt: "2026-05-19T09:30:00Z"
  },
  {
    id: "task-22083",
    title: "#22083: Banner State: Loan status doesn't match popup title",
    description: "Work Item Type: Bug. Mismatch of Loan status in the banner and the alert pop-up. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-19T09:35:00Z"
  },
  {
    id: "task-22123",
    title: "#22123: Rate Lock: Alert text mismatch on expired timeline",
    description: "Work Item Type: Bug. The alert message displayed for the rate lock has expired is another alert message. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-19T09:40:00Z"
  },
  {
    id: "task-22124",
    title: "#22124: Alerts: Blank notification when uploading redundant logs",
    description: "Work Item Type: Bug. A blank alert message is being displayed when the user uploads all conditions of SR. UW of a loan along with other conditions that are not mentioned in the user story. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-19T09:45:00Z"
  },
  {
    id: "task-22125",
    title: "#22125: Redundant Alerts: Alerts missing when SR.UW has Received state",
    description: "Work Item Type: Bug. The required alert messages are not displayed when the SR.UW section has received status along with uploaded and all other conditions are met. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-19T09:50:00Z"
  },
  {
    id: "task-22134",
    title: "#22134: Dev: Live-calculate outstanding logs for Final Approvals",
    description: "Work Item Type: Dev Bug. 21229: When the conditions can be submitted for Final Approval, the alert content needs to be updated promptly. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-19T09:55:00Z"
  },
  {
    id: "task-22224",
    title: "#22224: Asset Verification: Incorrect text shown in error banner",
    description: "Work Item Type: Bug. The alert message related to Total Available Asset is incorrect. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-19T10:00:00Z"
  },
  {
    id: "task-22291",
    title: "#22291: Stage Alert: Fail to update state on Resubmitted flags",
    description: "Work Item Type: Bug. The alert message for final approval when the current loan stage = Resubmitted and final approval requested =yes is not reflecting. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-19T10:05:00Z"
  },
  {
    id: "task-22366",
    title: "#22366: Grammar review for outstanding agent info wizard",
    description: "Work Item Type: Bug. Sentence Correction in Real-estate Agent info task in Outstanding task list. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-19T10:10:00Z"
  },
  {
    id: "task-22369",
    title: "#22369: Form field validation: Phone & Email are not mandatory",
    description: "Work Item Type: Bug. Phone and Email fields are not a mandatory field in Real Estate Agent Info as per the requirement. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-19T10:15:00Z"
  },
  {
    id: "task-22372",
    title: "#22372: Layout alignment error in deletion confirmation card",
    description: "Work Item Type: Bug. Button Alignment issue in Buyer agent deletes confirmation modal. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-19T10:20:00Z"
  },
  {
    id: "task-22375",
    title: "#22375: State Loss: Agent info resets without deletion prompt",
    description: "Work Item Type: Bug. Without showing confirmation modal, data's get cleared in the fields of Real estate Agent Info in outstanding Tasks. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-19T10:25:00Z"
  },
  {
    id: "task-22378",
    title: "#22378: Prompt validation missing when FSBO checkbox toggled",
    description: "Work Item Type: Bug. Delete confirmation popup is not showing when we check the checkbox of for sale by owner. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    category: "Bug",
    createdAt: "2026-05-19T10:30:00Z"
  },
  {
    id: "task-22380",
    title: "#22380: Theme: Update edit button hover style to match layout design",
    description: "Work Item Type: Bug. Need to update the edit button styling as per the BRD. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-19T10:35:00Z"
  },
  {
    id: "task-22390",
    title: "#22390: Constraints: Hide asset shortage alert when files pending",
    description: "Work Item Type: Dev Bug. From Orion: All PTCTC conditions not uploaded, the  'Total Available Assets are less than Total Funds Required' alert shouldn't show. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-19T10:40:00Z"
  },
  {
    id: "task-22567",
    title: "#22567: Alerts missing when lock status is active",
    description: "Work Item Type: Dev Bug. 21224: The alert didn't show when uploaded pdfs for all SR. conditions and the loan is not locked. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-19T10:45:00Z"
  },
  {
    id: "task-22614",
    title: "#22614: Realtime alerts generation: Auto refresh notices list",
    description: "Work Item Type: Dev Bug. 21224: When the condition is met, the alert should pop up automatically without needing to refresh the page. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-19T10:50:00Z"
  },
  {
    id: "task-22615",
    title: "#22615: Post approval state updates fail inside main header banner",
    description: "Work Item Type: Dev Bug. 21224：After submit fianl approval, the alert didn't show up. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-19T10:55:00Z"
  },
  {
    id: "task-22619",
    title: "#22619: Submit to Orion buttons overlapping on viewport layout",
    description: "Work Item Type: Bug. Beta-Vesta | Submit to Orion -  UI  Issues. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Bug",
    createdAt: "2026-05-19T11:00:00Z"
  },
  {
    id: "task-22763",
    title: "#22763: Blank alerts array after final approval submission",
    description: "Work Item Type: Dev Bug. Prod: After submitted for final approval, the alert show blank. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-19T11:05:00Z"
  },
  {
    id: "task-22799",
    title: "#22799: Duplicated: Missing alerts regarding final approval request",
    description: "Work Item Type: Bug. The alert message for final approval when the current loan stage = Resubmitted and final approval requested =yes is not reflecting - Copy. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    category: "Bug",
    createdAt: "2026-05-19T11:10:00Z"
  },
  {
    id: "task-23239",
    title: "#23239: Outstanding Task validation on missing details",
    description: "Work Item Type: Dev Bug. UAT:  if none exist or required information is missing for either, then place this in the Outstanding Tasks. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-19T11:15:00Z"
  },
  {
    id: "task-23250",
    title: "#23250: Save Changes throws exception in console on click",
    description: "Work Item Type: Dev Bug. UAT: After clicking the Save Changes button, an error appears in the console. Assigned to: Subi Gupta <sgupta@oligloballtd.com>",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    category: "Dev Bug",
    createdAt: "2026-05-19T11:20:00Z"
  }
];
