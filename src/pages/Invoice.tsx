import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";

const Invoice = () => {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>Invoice Generator</h2>

      <PDFDownloadLink
        document={<InvoicePDF />}
        fileName="invoice.pdf"
        style={{
          padding: "12px 20px",
          background: "black",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download Invoice")}
      </PDFDownloadLink>
    </div>
  );
};

export default Invoice;
