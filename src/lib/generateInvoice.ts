import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  schoolName?: string;
  schoolAddress?: string;
  schoolPhone?: string;
}

export const generateInvoicePDF = (
  tuitionData: any,
  invoiceData: InvoiceData
): void => {
  const doc = new jsPDF();

  // Set font
  doc.setFont("helvetica");

  // Header - School Information
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text(invoiceData.schoolName || "Sekolah ABC", 20, 25);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(
    invoiceData.schoolAddress || "Jl. Pendidikan No. 123, Jakarta",
    20,
    35
  );
  doc.text(invoiceData.schoolPhone || "Telp: (021) 1234567", 20, 42);

  // Invoice Title
  doc.setFontSize(24);
  doc.setTextColor(40, 40, 40);
  doc.text("INVOICE", 150, 25);

  // Invoice Details
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`No. Invoice: ${invoiceData.invoiceNumber}`, 150, 35);
  doc.text(`Tanggal: ${invoiceData.issueDate}`, 150, 42);

  // Line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 55, 190, 55);

  // Student Information
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text("Tagihan Untuk:", 20, 70);

  doc.setFontSize(10);
  doc.text(`Nama: ${tuitionData.student?.fullName || "-"}`, 20, 80);
  doc.text(`NIK: ${tuitionData.student?.nik || "-"}`, 20, 87);
  doc.text(`Jenis Kelamin: ${tuitionData.student?.gender || "-"}`, 20, 94);

  // Format birth date
  let formattedBirthDate = "-";
  if (tuitionData.student?.dateBirth) {
    const birthDate = new Date(tuitionData.student.dateBirth);
    formattedBirthDate = birthDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  doc.text(`Tanggal Lahir: ${formattedBirthDate}`, 20, 101);

  // Format month period
  let monthPeriod = "-";
  if (tuitionData.month) {
    const [year, monthNum] = tuitionData.month.split("-");
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
    const monthName = monthNames[parseInt(monthNum) - 1];
    monthPeriod = `${monthName} ${year}`;
  }

  // Payment status
  const getStatusText = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "DIBAYAR";
      case "PENDING":
        return "BELUM DIBAYAR";
      default:
        return status.toUpperCase();
    }
  };

  // Format payment date
  let paymentDateText = "Belum dibayar";
  if (tuitionData.paymentDate) {
    const paymentDate = new Date(tuitionData.paymentDate);
    paymentDateText = paymentDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Create table data
  const tableData = [
    [
      "Pembayaran SPP",
      monthPeriod,
      "1",
      formatCurrency(tuitionData.amount || 0),
      formatCurrency(tuitionData.amount || 0),
    ],
  ];

  // Invoice Table
  autoTable(doc, {
    startY: 115,
    head: [["Keterangan", "Periode", "Qty", "Harga Satuan", "Total"]],
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [71, 85, 105], // Tailwind slate-600
      textColor: 255,
      fontStyle: "bold",
    },
    columnStyles: {
      2: { halign: "center" }, // Qty column center
      3: { halign: "right" }, // Price column right
      4: { halign: "right" }, // Total column right
    },
  });

  // Get final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY || 150;

  // Total Section
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text("TOTAL:", 130, finalY + 20);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(formatCurrency(tuitionData.amount || 0), 150, finalY + 20);

  // Payment Information
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Status Pembayaran: ${getStatusText(tuitionData.status)}`,
    20,
    finalY + 30
  );
  doc.text(`Tanggal Pembayaran: ${paymentDateText}`, 20, finalY + 37);

  // Footer
  doc.setDrawColor(200, 200, 200);
  doc.line(20, finalY + 50, 190, finalY + 50);

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Terima kasih atas pembayaran Anda.", 20, finalY + 60);
  doc.text(
    `Invoice ini digenerate secara otomatis pada ${new Date().toLocaleString(
      "id-ID"
    )}.`,
    20,
    finalY + 67
  );

  // Save the PDF
  const fileName = `Invoice_${
    tuitionData.student?.fullName?.replace(/\s+/g, "_") || "Student"
  }_${monthPeriod.replace(/\s+/g, "_")}.pdf`;
  doc.save(fileName);
};

// Helper function to generate invoice number
export const generateInvoiceNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const time = String(now.getTime()).slice(-6); // Last 6 digits of timestamp

  return `INV-${year}${month}${day}-${time}`;
};

// Helper function to format current date
export const getCurrentDate = (): string => {
  return new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
