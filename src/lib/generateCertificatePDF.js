import html2pdf from 'html2pdf.js';

export const generateCertificatePDF = async (mentorData, formattedDate, certificateId) => {
  try {
    // Create certificate HTML
    const certificateHTML = `
      <div style="
        width: 100%;
        max-width: 1000px;
        padding: 60px;
        background: linear-gradient(135deg, #fef3c7 0%, #fef08a 100%);
        border: 5px solid #b45309;
        border-radius: 20px;
        font-family: 'Georgia', serif;
        text-align: center;
        page-break-after: always;
      ">
        <!-- Header Star -->
        <div style="margin-bottom: 30px;">
          <div style="font-size: 60px;">⭐</div>
        </div>

        <!-- Title -->
        <h1 style="
          font-size: 48px;
          color: #92400e;
          margin: 0 0 10px 0;
          font-weight: bold;
        ">
          Certificate of Completion
        </h1>

        <!-- Subtitle -->
        <p style="
          font-size: 24px;
          color: #b45309;
          margin: 0 0 30px 0;
        ">
          WES Mentorship Training Program
        </p>

        <!-- Decorative Line -->
        <div style="
          width: 200px;
          height: 4px;
          background-color: #b45309;
          margin: 30px auto;
        "></div>

        <!-- Certificate Body -->
        <div style="margin: 40px 0;">
          <p style="
            font-size: 18px;
            color: #5a5a5a;
            margin: 15px 0;
          ">
            This is to certify that
          </p>

          <h2 style="
            font-size: 48px;
            color: #92400e;
            margin: 20px 0;
            font-weight: bold;
            border-bottom: 3px solid #b45309;
            padding-bottom: 15px;
          ">
            ${mentorData?.fullName || 'Mentor'}
          </h2>

          <p style="
            font-size: 16px;
            color: #5a5a5a;
            margin: 10px 0;
          ">
            of ${mentorData?.country || 'N/A'}
          </p>

          <p style="
            font-size: 14px;
            color: #666666;
            margin: 8px 0;
          ">
            <strong>Profession:</strong> ${mentorData?.profession || 'N/A'}
          </p>

          <p style="
            font-size: 14px;
            color: #666666;
            margin: 8px 0;
          ">
            <strong>Email:</strong> ${mentorData?.email || 'N/A'}
          </p>

          <p style="
            font-size: 14px;
            color: #666666;
            margin: 12px 0;
          ">
            <strong>LinkedIn:</strong> ${mentorData?.linkedin || 'Not Provided'}
          </p>

          <p style="
            font-size: 16px;
            color: #5a5a5a;
            margin: 20px 0 10px 0;
          ">
            has successfully completed the
          </p>

          <p style="
            font-size: 28px;
            color: #92400e;
            margin: 15px 0;
            font-weight: bold;
          ">
            WES Mentorship Training Program
          </p>

          <p style="
            font-size: 14px;
            color: #5a5a5a;
            line-height: 1.8;
            margin: 20px 0;
            text-align: justify;
          ">
            This comprehensive training program equips mentors with essential skills, including mentorship fundamentals, building trust and rapport, career development strategies, and measuring impact. The holder of this certificate has demonstrated commitment to excellence in mentoring and is prepared to make a positive difference in the lives of mentees.
          </p>

          <!-- Mentor Profile Section -->
          <div style="
            background-color: #fcd34d;
            border: 2px solid #b45309;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
            text-align: left;
          ">
            <p style="
              font-size: 14px;
              color: #5a5a5a;
              margin: 10px 0;
            ">
              <strong>Background:</strong><br/>
              ${mentorData?.whyMentor || 'N/A'}
            </p>

            <p style="
              font-size: 14px;
              color: #5a5a5a;
              margin: 15px 0 10px 0;
            ">
              <strong>Expertise Areas:</strong><br/>
              ${mentorData?.expertise || 'N/A'}
            </p>

            <p style="
              font-size: 14px;
              color: #5a5a5a;
              margin: 15px 0 10px 0;
            ">
              <strong>Experience Level:</strong><br/>
              ${mentorData?.experience || 'N/A'}
            </p>
          </div>
        </div>

        <!-- Decorative Line -->
        <div style="
          width: 200px;
          height: 4px;
          background-color: #b45309;
          margin: 30px auto;
        "></div>

        <!-- Footer -->
        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-top: 40px;
        ">
          <div style="text-align: center;">
            <p style="font-size: 12px; color: #666666; margin: 0 0 8px 0;">Date</p>
            <p style="
              font-size: 14px;
              color: #92400e;
              font-weight: bold;
              border-top: 2px solid #b45309;
              padding-top: 8px;
              margin: 0;
            ">
              ${formattedDate}
            </p>
          </div>

          <div style="text-align: center; font-size: 40px;">
            ✓
          </div>

          <div style="text-align: center;">
            <p style="font-size: 12px; color: #666666; margin: 0 0 8px 0;">Verified</p>
            <p style="
              font-size: 14px;
              color: #92400e;
              font-weight: bold;
              border-top: 2px solid #b45309;
              padding-top: 8px;
              margin: 0;
            ">
              ✓ WES
            </p>
          </div>
        </div>

        <!-- Certificate ID -->
        <p style="
          font-size: 11px;
          color: #999999;
          margin: 20px 0 0 0;
        ">
          Certificate ID: ${certificateId}
        </p>
      </div>
    `;

    // PDF Options
    const options = {
      margin: 10,
      filename: `WES_Certificate_${mentorData?.fullName?.replace(/\s+/g, '_') || 'Mentor'}_${new Date().getFullYear()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' }
    };

    // Create element temporarily
    const element = document.createElement('div');
    element.innerHTML = certificateHTML;
    document.body.appendChild(element);

    // Generate PDF
    await html2pdf().set(options).from(element).save();

    // Remove element
    document.body.removeChild(element);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
