import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  schoolName?: string;
  schoolAddress?: string;
  schoolPhone?: string;
  schoolEmail?: string;
}

interface StudentData {
  fullName: string;
  nik?: string;
  gender?: string;
  dateBirth?: string;
  className?: string;
  parentName?: string;
}

interface SavingBalanceData {
  student: StudentData;
  currentBalance: number; // Saldo saat ini
  lastTransactionDate?: string; // Tanggal transaksi terakhir
  totalDeposits?: number; // Total setoran sepanjang masa
  totalWithdraws?: number; // Total penarikan sepanjang masa
  transactionCount?: number; // Jumlah transaksi
  accountOpenDate?: string; // Tanggal buka tabungan
  interestEarned?: number; // Bunga yang diperoleh (jika ada)
}

export const generateSavingBalanceInvoicePDF = (
  savingData: SavingBalanceData,
  invoiceData: InvoiceData
): void => {
  const doc = new jsPDF();
  let yPos = 20;

  // Set font default
  doc.setFont("helvetica");

  // === HEADER SECTION ===
  // Add logo
  try {
    doc.addImage("logo.jpg", "JPEG", 20, yPos, 25, 25);
  } catch (error) {
    // Fallback if logo not found
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos, 25, 25, "F");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("LOGO", 27, yPos + 15);
  }

  // School Name
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  const schoolName = invoiceData.schoolName || "TAUD SALSABILA";
  doc.text(schoolName, 50, yPos + 8);

  // School Address
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const address =
    invoiceData.schoolAddress ||
    "Jl. Pendidikan No. 123, Kelurahan Harapan, Kecamatan Bangsa, Jakarta Selatan 12345";
  const addressLines = doc.splitTextToSize(address, 100);
  let addressY = yPos + 15;
  addressLines.forEach((line: string) => {
    doc.text(line, 50, addressY);
    addressY += 4;
  });

  // Contact Info
  if (invoiceData.schoolPhone) {
    doc.text(`Telp: ${invoiceData.schoolPhone}`, 50, addressY);
    addressY += 4;
  }
  if (invoiceData.schoolEmail) {
    doc.text(`Email: ${invoiceData.schoolEmail}`, 50, addressY);
    addressY += 4;
  }

  // Invoice Title & Number (Right side)
  doc.setFontSize(12);
  doc.setTextColor(34, 139, 34); // Green color for savings
  doc.setFont("helvetica", "bold");
  doc.text("SALDO TABUNGAN", 150, yPos + 8);

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  doc.text(`No. Laporan: ${invoiceData.invoiceNumber}`, 150, yPos + 18);
  doc.text(`Tanggal Cetak: ${invoiceData.issueDate}`, 150, yPos + 25);

  yPos = Math.max(addressY, yPos + 35) + 10;

  // Line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, 190, yPos);
  yPos += 15;

  // === STUDENT INFORMATION ===
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.text("INFORMASI SISWA:", 20, yPos);

  yPos += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Student basic info
  doc.text(`Nama Siswa: ${savingData.student.fullName}`, 20, yPos);
  yPos += 6;

  if (savingData.student.className) {
    doc.text(`Kelas: ${savingData.student.className}`, 20, yPos);
    yPos += 6;
  }

  if (savingData.student.nik) {
    doc.text(`NIK: ${savingData.student.nik}`, 20, yPos);
    yPos += 6;
  }

  if (savingData.student.parentName) {
    doc.text(`Nama Orang Tua: ${savingData.student.parentName}`, 20, yPos);
    yPos += 6;
  }

  if (savingData.student.dateBirth) {
    const birthDate = new Date(savingData.student.dateBirth);
    const formattedBirthDate = birthDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Tanggal Lahir: ${formattedBirthDate}`, 20, yPos);
    yPos += 6;
  }

  yPos += 10;

  // === CURRENT BALANCE HIGHLIGHT ===
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Big balance box
  const balanceBoxY = yPos;
  const balanceBoxWidth = 150;
  const balanceBoxHeight = 35;
  const balanceBoxX = (210 - balanceBoxWidth) / 2; // Center the box

  // Balance box background with gradient effect
  doc.setFillColor(240, 253, 244); // Light green
  doc.rect(balanceBoxX, balanceBoxY, balanceBoxWidth, balanceBoxHeight, "F");
  doc.setDrawColor(34, 197, 94);
  doc.setLineWidth(2);
  doc.rect(balanceBoxX, balanceBoxY, balanceBoxWidth, balanceBoxHeight);

  // Balance label
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.text(
    "SALDO TABUNGAN SAAT INI",
    balanceBoxX + balanceBoxWidth / 2,
    balanceBoxY + 12,
    { align: "center" }
  );

  // Balance amount - large and prominent
  doc.setFontSize(18);
  doc.setTextColor(34, 139, 34);
  doc.setFont("helvetica", "bold");
  const balanceText = formatCurrency(savingData.currentBalance);
  doc.text(balanceText, balanceBoxX + balanceBoxWidth / 2, balanceBoxY + 28, {
    align: "center",
  });

  yPos += balanceBoxHeight + 20;

  // === SAVINGS SUMMARY TABLE ===
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Prepare summary table data
  const summaryData: any[] = [];

  if (savingData.accountOpenDate) {
    summaryData.push([
      "Tanggal Buka Tabungan",
      formatDate(savingData.accountOpenDate),
    ]);
  }

  if (savingData.lastTransactionDate) {
    summaryData.push([
      "Transaksi Terakhir",
      formatDate(savingData.lastTransactionDate),
    ]);
  }

  if (savingData.transactionCount !== undefined) {
    summaryData.push([
      "Jumlah Transaksi",
      savingData.transactionCount.toString() + " kali",
    ]);
  }

  if (savingData.totalDeposits !== undefined) {
    summaryData.push([
      "Total Setoran",
      formatCurrency(savingData.totalDeposits),
    ]);
  }

  if (savingData.totalWithdraws !== undefined) {
    summaryData.push([
      "Total Penarikan",
      formatCurrency(savingData.totalWithdraws),
    ]);
  }

  if (
    savingData.interestEarned !== undefined &&
    savingData.interestEarned > 0
  ) {
    summaryData.push([
      "Bunga Diperoleh",
      formatCurrency(savingData.interestEarned),
    ]);
  }

  // Only show table if we have data
  if (summaryData.length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.text("RINGKASAN TABUNGAN:", 20, yPos);
    yPos += 10;

    // Generate summary table
    autoTable(doc, {
      startY: yPos,
      body: summaryData,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 5,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      columnStyles: {
        0: {
          cellWidth: 70,
          fontStyle: "bold",
          fillColor: [248, 249, 250],
        },
        1: {
          cellWidth: 100,
          halign: "left",
        },
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
    });

    // Get final Y position after table
    yPos = (doc as any).lastAutoTable.finalY + 20;
  }

  // === FOOTER ===
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, 190, yPos);

  yPos += 10;
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Catatan:", 20, yPos);
  yPos += 5;
  doc.text(
    "• Laporan saldo ini menunjukkan posisi tabungan siswa saat ini",
    20,
    yPos
  );
  yPos += 4;
  doc.text(
    "• Untuk informasi detail transaksi, hubungi bagian keuangan sekolah",
    20,
    yPos
  );
  yPos += 4;
  doc.text(
    "• Ajak anak untuk rajin menabung demi masa depan yang lebih baik",
    20,
    yPos
  );

  yPos += 10;
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Laporan ini digenerate otomatis pada ${new Date().toLocaleString(
      "id-ID"
    )}`,
    20,
    yPos
  );

  // Save the PDF
  const studentName = savingData.student.fullName.replace(/[^a-zA-Z0-9]/g, "_");
  const currentDate = new Date().toISOString().split("T")[0];
  const fileName = `Saldo_Tabungan_${studentName}_${currentDate}.pdf`;

  doc.save(fileName);
};

// Helper function to generate report number for savings balance
export const generateSavingReportNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const sequence = String(Math.floor(Math.random() * 9999)).padStart(4, "0");

  return `SAL-${year}${month}${day}-${sequence}`;
};

// Helper function to get current date in Indonesian format
export const getCurrentDateID = (): string => {
  return new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Example usage function
export const generateExampleSavingBalanceInvoice = (): void => {
  const exampleSavingData: SavingBalanceData = {
    student: {
      fullName: "Putri Maharani",
      className: "TK B - Melati",
      parentName: "Sari Maharani",
      nik: "1234567890123456",
      dateBirth: "2018-11-08",
    },
    currentBalance: 425000,
    lastTransactionDate: new Date().toISOString(),
    totalDeposits: 600000,
    totalWithdraws: 175000,
    transactionCount: 12,
    accountOpenDate: "2024-01-15",
    interestEarned: 0, // Most kindergarten savings don't have interest
  };

  const exampleInvoiceData: InvoiceData = {
    invoiceNumber: generateSavingReportNumber(),
    issueDate: getCurrentDateID(),
    schoolName: "TK HARAPAN BANGSA",
    schoolAddress:
      "Jl. Pendidikan No. 123, Kelurahan Harapan, Kecamatan Bangsa, Jakarta Selatan 12345",
    schoolPhone: "(021) 7654321",
    schoolEmail: "info@tkharapanbangsa.sch.id",
  };

  generateSavingBalanceInvoicePDF(exampleSavingData, exampleInvoiceData);
};
