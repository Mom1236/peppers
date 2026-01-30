export type LabReport = {
  id: string;
  productName: string;
  batch: string;
  purity: number;
  pdfUrl: string;
};

export const labReports: LabReport[] = [
  { id: "1", productName: "Tirzepatide 15mg", batch: "TZP-2409-A1", purity: 99.1, pdfUrl: "/sample-coa.pdf" },
  { id: "2", productName: "Semaglutide 10mg", batch: "SMG-2409-B2", purity: 99.0, pdfUrl: "/sample-coa.pdf" },
  { id: "3", productName: "BPC-157 10mg", batch: "BPC-2410-C3", purity: 98.7, pdfUrl: "/sample-coa.pdf" },
  { id: "4", productName: "TB-500 10mg", batch: "TB5-2410-D4", purity: 98.5, pdfUrl: "/sample-coa.pdf" },
];
