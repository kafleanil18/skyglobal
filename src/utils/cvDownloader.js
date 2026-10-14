/**
 * Utility to download candidate CV / Resume
 * Supports real uploaded base64 data URLs as well as formatted generated CV dossiers.
 */

export function downloadApplicantCV(app) {
  if (!app) return;

  // Case 1: Real file uploaded by employee / candidate (Data URL)
  if (app.resumeDataUrl && typeof app.resumeDataUrl === 'string' && app.resumeDataUrl.startsWith('data:')) {
    const link = document.createElement('a');
    link.href = app.resumeDataUrl;
    link.download = app.resumeName || `${(app.applicantName || 'Candidate').replace(/\s+/g, '_')}_CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Case 2: Generate official formatted CV dossier document
  const fileName = app.resumeName || `${(app.applicantName || 'Candidate').replace(/\s+/g, '_')}_CV.html`;
  const isHtml = fileName.endsWith('.html') || !fileName.includes('.');
  const downloadFileName = isHtml ? `${(app.applicantName || 'Candidate').replace(/\s+/g, '_')}_CV.html` : fileName;

  const htmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${app.applicantName} - Official Candidate CV</title>
  <style>
    @media print {
      body { padding: 0; background: #fff; }
      .no-print { display: none; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: #f8fafc;
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      padding: 48px;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #101a6d;
      padding-bottom: 24px;
      margin-bottom: 30px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #101a6d;
      letter-spacing: -0.5px;
    }
    .brand-title span {
      color: #a99410;
    }
    .brand-sub {
      font-size: 11px;
      color: #64748b;
      margin-top: 2px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .candidate-name {
      font-size: 28px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 4px 0;
    }
    .job-title {
      font-size: 15px;
      font-weight: 700;
      color: #101a6d;
      margin: 0 0 12px 0;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      background: #faf8ee;
      color: #020024;
      border: 1px solid #a99410;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      background: #e0f2fe;
      color: #0369a1;
      border: 1px solid #7dd3fc;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 28px;
      background: #f8fafc;
      padding: 20px;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
    }
    .field-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 2px;
    }
    .field-value {
      font-size: 14px;
      font-weight: 600;
      color: #0f172a;
    }
    .section-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #101a6d;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 14px;
    }
    .section {
      margin-bottom: 28px;
    }
    .notes-box {
      background: #fff;
      border: 1px solid #cbd5e1;
      padding: 16px;
      border-radius: 12px;
      font-size: 13px;
      line-height: 1.6;
      color: #334155;
    }
    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 20px;
      margin-top: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #94a3b8;
    }
    .print-btn {
      background: #101a6d;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="brand-title">SKYGLOBAL <span>HR CONSULTANCY</span></div>
        <div class="brand-sub">International Recruitment & Overseas Placement • Dubai & Global</div>
      </div>
      <div style="text-align: right;">
        <span class="status-badge">${app.status || 'Verified Submission'}</span>
        <div style="font-size: 11px; color: #64748b; margin-top: 6px;">Date: ${app.appliedDate || new Date().toISOString().split('T')[0]}</div>
      </div>
    </div>

    <div>
      <h1 class="candidate-name">${app.applicantName}</h1>
      <p class="job-title">Applied Role: ${app.jobTitle}</p>
      <div style="margin-bottom: 20px;">
        <span class="badge">Target Hub: ${app.preferredDestination || 'Malta / Europe'}</span>
        <span class="badge" style="margin-left: 6px;">Experience: ${app.experienceYears || '3-5 years'}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Candidate Contact & Identification</div>
      <div class="grid">
        <div>
          <div class="field-label">Email Address</div>
          <div class="field-value">${app.email}</div>
        </div>
        <div>
          <div class="field-label">Contact Phone</div>
          <div class="field-value">${app.phone || 'Provided via Portal'}</div>
        </div>
        <div>
          <div class="field-label">Current Residence</div>
          <div class="field-value">${app.currentCountry || 'Not Specified'}</div>
        </div>
        <div>
          <div class="field-label">Attached Document</div>
          <div class="field-value">${app.resumeName || 'Applicant_CV.pdf'}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Trade Profile & Candidate Summary</div>
      <div class="notes-box">
        ${app.notes || 'Experienced overseas worker registered for international job opportunities through SkyGlobal HR Consultancy portal.'}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Recruitment & Visa Compliance Verification</div>
      <div class="notes-box" style="background: #faf8ee; border-color: #a99410;">
        <strong>Verified by SkyGlobal HR Operations:</strong><br/>
        Candidate profile is pre-screened for employer interview readiness, single work permit compliance, and authorized embassy document processing.
      </div>
    </div>

    <div class="footer">
      <div>SkyGlobal HR Consultancy • Bur Dubai, Dubai, UAE • https://skyglobalhr.com</div>
      <div class="no-print">
        <button class="print-btn" onclick="window.print()">Print or Save as PDF</button>
      </div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = downloadFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
