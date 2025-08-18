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
  className?: string; // Nama kelas TK
  parentName?: string; // Nama orang tua
}

interface TuitionData {
  student: StudentData;
  month: string; // Format: "YYYY-MM"
  amount: number;
  status: "SUCCESS" | "PENDING" | "FAILED";
  paymentDate?: string;
  paymentMethod?: string;
  lateFee?: number; // Denda keterlambatan jika ada
  discount?: number; // Diskon jika ada
}

export const generateSPPInvoicePDF = (
  tuitionData: TuitionData,
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
  const schoolName = invoiceData.schoolName || "TK HARAPAN BANGSA";
  doc.text(schoolName, 50, yPos + 8);

  // School Address (dengan text wrapping)
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
  doc.setFontSize(22);
  doc.setTextColor(41, 98, 155); // Blue color
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE SPP", 150, yPos + 8);

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  doc.text(`No. Invoice: ${invoiceData.invoiceNumber}`, 150, yPos + 18);
  doc.text(`Tanggal: ${invoiceData.issueDate}`, 150, yPos + 25);

  yPos = Math.max(addressY, yPos + 35) + 10;

  // Line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, 190, yPos);
  yPos += 15;

  // === STUDENT & BILLING INFORMATION ===
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.text("TAGIHAN UNTUK:", 20, yPos);

  yPos += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Student basic info
  doc.text(`Nama Siswa: ${tuitionData.student.fullName}`, 20, yPos);
  yPos += 6;

  if (tuitionData.student.className) {
    doc.text(`Kelas: ${tuitionData.student.className}`, 20, yPos);
    yPos += 6;
  }

  if (tuitionData.student.nik) {
    doc.text(`NIK: ${tuitionData.student.nik}`, 20, yPos);
    yPos += 6;
  }

  if (tuitionData.student.parentName) {
    doc.text(`Nama Orang Tua: ${tuitionData.student.parentName}`, 20, yPos);
    yPos += 6;
  }

  // Birth date formatting
  if (tuitionData.student.dateBirth) {
    const birthDate = new Date(tuitionData.student.dateBirth);
    const formattedBirthDate = birthDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Tanggal Lahir: ${formattedBirthDate}`, 20, yPos);
    yPos += 6;
  }

  yPos += 10;

  // === PAYMENT DETAILS TABLE ===
  // Format period
  const formatPeriod = (month: string): string => {
    const [year, monthNum] = month.split("-");
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${monthNames[parseInt(monthNum) - 1]} ${year}`;
  };

  // Currency formatter
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Prepare table data - Format yang lebih sesuai untuk SPP
  const tableData: any[] = [];
  const period = formatPeriod(tuitionData.month);

  // Main SPP fee
  tableData.push([
    "Iuran SPP (Sumbangan Pembinaan Pendidikan)",
    period,
    formatCurrency(tuitionData.amount),
  ]);

  // Late fee if applicable
  if (tuitionData.lateFee && tuitionData.lateFee > 0) {
    tableData.push([
      "Denda Keterlambatan",
      "-",
      formatCurrency(tuitionData.lateFee),
    ]);
  }

  // Discount if applicable
  if (tuitionData.discount && tuitionData.discount > 0) {
    tableData.push([
      "Diskon/Potongan",
      "-",
      `-${formatCurrency(tuitionData.discount)}`,
    ]);
  }

  // Generate table dengan format yang lebih sesuai
  autoTable(doc, {
    startY: yPos,
    head: [["Keterangan", "Periode", "Jumlah"]],
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 4,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [41, 98, 155], // Professional blue
      textColor: 255,
      fontStyle: "bold",
      fontSize: 10,
    },
    columnStyles: {
      0: { cellWidth: 80 }, // Keterangan - lebih lebar
      1: { cellWidth: 50, halign: "center" }, // Periode
      2: { cellWidth: 40, halign: "right" }, // Jumlah
    },
    alternateRowStyles: {
      fillColor: [248, 249, 250],
    },
  });

  // Get final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY || yPos + 50;

  // === TOTAL SECTION ===
  const totalAmount =
    tuitionData.amount +
    (tuitionData.lateFee || 0) -
    (tuitionData.discount || 0);

  // Total section with better positioning
  const totalBoxY = finalY + 10;
  const totalBoxWidth = 70;
  const totalBoxHeight = 20;

  // Total box background
  doc.setFillColor(240, 248, 255);
  doc.rect(190 - totalBoxWidth, totalBoxY, totalBoxWidth, totalBoxHeight, "F");
  doc.setDrawColor(41, 98, 155);
  doc.setLineWidth(0.5);
  doc.rect(190 - totalBoxWidth, totalBoxY, totalBoxWidth, totalBoxHeight);

  // Total label
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL TAGIHAN:", 190 - totalBoxWidth + 3, totalBoxY + 8);

  // Total amount
  doc.setFontSize(12);
  doc.setTextColor(41, 98, 155);
  const totalText = formatCurrency(totalAmount);
  const totalTextWidth = doc.getTextWidth(totalText);
  doc.text(totalText, 190 - 3, totalBoxY + 16, { align: "right" });

  // === PAYMENT STATUS ===
  yPos = finalY + 40; // Memberikan lebih banyak space setelah total box
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);

  const getStatusInfo = (
    status: string
  ): { text: string; color: [number, number, number] } => {
    switch (status) {
      case "SUCCESS":
        return { text: "LUNAS", color: [34, 197, 94] }; // Green
      case "PENDING":
        return { text: "BELUM DIBAYAR", color: [234, 179, 8] }; // Yellow
      case "FAILED":
        return { text: "GAGAL", color: [239, 68, 68] }; // Red
      default:
        return { text: status.toUpperCase(), color: [107, 114, 128] }; // Gray
    }
  };

  const statusInfo = getStatusInfo(tuitionData.status);
  doc.text("Status Pembayaran: ", 20, yPos);
  // Fixed: Properly destructure the color array
  const [r, g, b] = statusInfo.color;
  doc.setTextColor(r, g, b);
  doc.setFont("helvetica", "bold");
  doc.text(statusInfo.text, 70, yPos);

  // Payment date
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  yPos += 7;
  if (tuitionData.paymentDate && tuitionData.status === "SUCCESS") {
    const paymentDate = new Date(tuitionData.paymentDate);
    const formattedPaymentDate = paymentDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    doc.text(`Tanggal Pembayaran: ${formattedPaymentDate}`, 20, yPos);

    if (tuitionData.paymentMethod) {
      yPos += 7;
      doc.text(`Metode Pembayaran: ${tuitionData.paymentMethod}`, 20, yPos);
    }
  } else {
    doc.text("Tanggal Pembayaran: Belum dibayar", 20, yPos);
  }

  // === FOOTER ===
  yPos += 20;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, 190, yPos);

  yPos += 10;
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Catatan:", 20, yPos);
  yPos += 5;
  doc.text(
    "• Harap lakukan pembayaran tepat waktu untuk menghindari denda keterlambatan",
    20,
    yPos
  );
  yPos += 4;
  doc.text("• Simpan invoice ini sebagai bukti pembayaran yang sah", 20, yPos);
  yPos += 4;
  doc.text(
    "• Untuk informasi lebih lanjut, hubungi bagian keuangan sekolah",
    20,
    yPos
  );

  yPos += 10;
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Invoice ini digenerate otomatis pada ${new Date().toLocaleString(
      "id-ID"
    )}`,
    20,
    yPos
  );

  // Save the PDF with better naming
  const studentName = tuitionData.student.fullName.replace(
    /[^a-zA-Z0-9]/g,
    "_"
  );
  const periodForFilename = formatPeriod(tuitionData.month).replace(
    /\s+/g,
    "_"
  );
  const fileName = `Invoice_SPP_${studentName}_${periodForFilename}.pdf`;

  doc.save(fileName);
};

// Helper function to generate invoice number for SPP
export const generateSPPInvoiceNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const sequence = String(Math.floor(Math.random() * 9999)).padStart(4, "0");

  return `SPP-${year}${month}${day}-${sequence}`;
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
export const generateExampleSPPInvoice = (): void => {
  const exampleTuitionData: TuitionData = {
    student: {
      fullName: "Andi Permana",
      className: "TK A - Melati",
      parentName: "Budi Permana",
      nik: "1234567890123456",
      dateBirth: "2019-05-15",
    },
    month: "2024-03",
    amount: 350000,
    status: "PENDING",
    lateFee: 0,
    discount: 0,
  };

  const exampleInvoiceData: InvoiceData = {
    invoiceNumber: generateSPPInvoiceNumber(),
    issueDate: getCurrentDateID(),
    schoolName: "TK HARAPAN BANGSA",
    schoolAddress:
      "Jl. Pendidikan No. 123, Kelurahan Harapan, Kecamatan Bangsa, Jakarta Selatan 12345",
    schoolPhone: "(021) 7654321",
    schoolEmail: "info@tkharapanbangsa.sch.id",
  };

  generateSPPInvoicePDF(exampleTuitionData, exampleInvoiceData);
};
