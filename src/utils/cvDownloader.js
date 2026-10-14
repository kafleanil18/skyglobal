/**
 * SkyGlobal HR Consultancy - Candidate CV Generator & Downloader
 * Generates genuine, valid binary PDF (1.4) documents that open in any PDF reader,
 * and handles downloading of user-uploaded CV files.
 */

/**
 * Builds a 100% valid binary PDF (version 1.4) document for any candidate application.
 * Fully compatible with Adobe Acrobat, Chrome PDFium, Safari, macOS Preview, and mobile readers.
 */
export function generateCandidatePdfBlob(app) {
  const name = app.applicantName || 'Candidate';
  const job = app.jobTitle || 'General Skilled Talent';
  const email = app.email || 'N/A';
  const phone = app.phone || 'N/A';
  const country = app.currentCountry || 'Not Specified';
  const dest = app.preferredDestination || 'Malta / Europe';
  const exp = app.experienceYears || '3-5 years';
  const date = app.appliedDate || new Date().toISOString().split('T')[0];
  const status = app.status || 'Active Application';
  const notes = (app.notes || 'Experienced overseas worker registered for international recruitment opportunities with SkyGlobal HR Consultancy.')
    .replace(/[\r\n]+/g, ' ');

  // Wrap notes into ~65 char lines
  const noteLines = [];
  let cur = '';
  for (const word of notes.split(' ')) {
    if ((cur + ' ' + word).trim().length > 65) {
      noteLines.push(cur.trim());
      cur = word;
    } else {
      cur += (cur ? ' ' : '') + word;
    }
  }
  if (cur.trim()) noteLines.push(cur.trim());

  let stream = '';
  // SkyGlobal Brand Header
  stream += 'BT\n/F1 18 Tf\n50 740 Td\n(SKYGLOBAL HR CONSULTANCY) Tj\n';
  stream += '0 -16 Td\n/F2 9 Tf\n(INTERNATIONAL TALENT RECRUITMENT & OVERSEAS PLACEMENT - BUR DUBAI, UAE) Tj\n';
  stream += '0 -14 Td\n(Official Portal: https://skyglobalhr.com | Verified International Agency) Tj\nET\n';

  // Divider line
  stream += '50 695 m 562 695 l S\n';

  // Candidate Name & Role
  stream += 'BT\n/F1 20 Tf\n50 665 Td\n(' + name.replace(/[()\\\\]/g, '') + ') Tj\n';
  stream += '0 -18 Td\n/F1 12 Tf\n(Applied Position: ' + job.replace(/[()\\\\]/g, '') + ') Tj\n';
  stream += '0 -14 Td\n/F2 10 Tf\n(Pipeline Status: ' + status.replace(/[()\\\\]/g, '') + ' | Application Date: ' + date + ') Tj\nET\n';

  // Candidate Info Box
  stream += '0.95 0.96 0.98 rg 50 520 512 90 re f\n';
  stream += '0.8 0.85 0.9 RG 1 w 50 520 512 90 re S\n';

  stream += '0 0 0 rg\nBT\n/F2 10 Tf\n65 590 Td\n';
  stream += '(Email: ' + email.replace(/[()\\\\]/g, '') + '      Phone: ' + phone.replace(/[()\\\\]/g, '') + ') Tj\n';
  stream += '0 -16 Td\n';
  stream += '(Current Residence: ' + country.replace(/[()\\\\]/g, '') + '      Target Hub: ' + dest.replace(/[()\\\\]/g, '') + ') Tj\n';
  stream += '0 -16 Td\n';
  stream += '(Experience Level: ' + exp.replace(/[()\\\\]/g, '') + '      Document: ' + (app.resumeName || 'Applicant_CV.pdf').replace(/[()\\\\]/g, '') + ') Tj\nET\n';

  // Section: Summary
  stream += 'BT\n/F1 12 Tf\n50 480 Td\n(PROFESSIONAL QUALIFICATIONS & TRADE SUMMARY) Tj\nET\n';
  stream += '50 472 m 562 472 l S\n';

  stream += 'BT\n/F2 10 Tf\n50 450 Td\n';
  for (let i = 0; i < Math.min(noteLines.length, 6); i++) {
    stream += '(' + noteLines[i].replace(/[()\\\\]/g, '') + ') Tj\n0 -15 Td\n';
  }
  stream += 'ET\n';

  // Section: Compliance
  stream += '0.98 0.97 0.93 rg 50 250 512 70 re f\n';
  stream += '0.66 0.58 0.06 RG 1 w 50 250 512 70 re S\n';
  stream += '0 0 0 rg\nBT\n/F1 10 Tf\n65 295 Td\n';
  stream += '(VISA COMPLIANCE & OVERSEAS PLACEMENT CLEARANCE:) Tj\n';
  stream += '0 -14 Td\n/F2 9 Tf\n';
  stream += '(Candidate is registered under authorized single work permit protocol for verified EU & Gulf employers.) Tj\n';
  stream += '0 -12 Td\n';
  stream += '(Pre-screened by SkyGlobal HR Operations for interview scheduling and embassy document processing.) Tj\nET\n';

  // Footer
  stream += '0.4 0.4 0.4 rg\n50 100 m 562 100 l S\n';
  stream += 'BT\n/F2 8 Tf\n50 85 Td\n';
  stream += '(SkyGlobal HR Consultancy - Bur Dubai, Dubai, UAE | Official International Recruitment System) Tj\nET\n';

  const encoder = new TextEncoder();
  const streamBytes = encoder.encode(stream);

  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 = '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n';
  const obj4Header = '4 0 obj\n<< /Length ' + streamBytes.length + ' >>\nstream\n';
  const obj4Footer = '\nendstream\nendobj\n';
  const obj5 = '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n';
  const obj6 = '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n';

  const header = '%PDF-1.4\n';
  
  let offset = header.length;
  const off1 = offset; offset += obj1.length;
  const off2 = offset; offset += obj2.length;
  const off3 = offset; offset += obj3.length;
  const off4 = offset; offset += obj4Header.length + streamBytes.length + obj4Footer.length;
  const off5 = offset; offset += obj5.length;
  const off6 = offset; offset += obj6.length;

  const startxref = offset;

  const pad = (n) => ('0000000000' + n).slice(-10);

  const xref = 'xref\n' +
    '0 7\n' +
    '0000000000 65535 f \n' +
    pad(off1) + ' 00000 n \n' +
    pad(off2) + ' 00000 n \n' +
    pad(off3) + ' 00000 n \n' +
    pad(off4) + ' 00000 n \n' +
    pad(off5) + ' 00000 n \n' +
    pad(off6) + ' 00000 n \n' +
    'trailer\n' +
    '<< /Size 7 /Root 1 0 R >>\n' +
    'startxref\n' +
    startxref + '\n' +
    '%%EOF\n';

  return new Blob([
    encoder.encode(header),
    encoder.encode(obj1),
    encoder.encode(obj2),
    encoder.encode(obj3),
    encoder.encode(obj4Header),
    streamBytes,
    encoder.encode(obj4Footer),
    encoder.encode(obj5),
    encoder.encode(obj6),
    encoder.encode(xref)
  ], { type: 'application/pdf' });
}

/**
 * Downloads a candidate's CV as a real, valid file.
 * Handles both actual base64 uploaded files and authentic generated PDFs.
 */
export function downloadApplicantCV(app) {
  if (!app) return;

  // Case 1: Real file uploaded by employee/candidate as base64 data URL
  if (app.resumeDataUrl && typeof app.resumeDataUrl === 'string' && app.resumeDataUrl.startsWith('data:')) {
    try {
      const parts = app.resumeDataUrl.split(',');
      const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/pdf';
      const bstr = atob(parts[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = app.resumeName || `${(app.applicantName || 'Candidate').replace(/\s+/g, '_')}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      return;
    } catch (e) {
      console.warn('Error downloading from base64, generating official PDF fallback:', e);
    }
  }

  // Case 2: Generate genuine valid binary PDF document
  const pdfBlob = generateCandidatePdfBlob(app);
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  
  let targetName = app.resumeName;
  if (!targetName || !targetName.toLowerCase().endsWith('.pdf')) {
    targetName = `${(app.applicantName || 'Candidate').replace(/\s+/g, '_')}_Official_CV.pdf`;
  }
  
  link.download = targetName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/**
 * Safely opens the candidate's PDF in a new browser tab for viewing or printing.
 */
export function openApplicantCVSafe(app) {
  if (!app) return;

  let blob;
  if (app.resumeDataUrl && typeof app.resumeDataUrl === 'string' && app.resumeDataUrl.startsWith('data:')) {
    try {
      const parts = app.resumeDataUrl.split(',');
      const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/pdf';
      const bstr = atob(parts[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      blob = new Blob([u8arr], { type: mime });
    } catch (e) {
      blob = generateCandidatePdfBlob(app);
    }
  } else {
    blob = generateCandidatePdfBlob(app);
  }

  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
