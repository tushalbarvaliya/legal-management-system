import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
  },
  header: {
    flex: 1,
    padding: 6,
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    padding: 6,
  },
  total: {
    marginTop: 20,
    textAlign: "right",
    fontSize: 14,
  },
});

const invoiceData = {
  invoiceId: "INV-101",
  clientName: "John Doe",
  date: "12 Mar 2026",
  items: [
    { name: "Website Design", qty: 1, price: 5000 },
    { name: "Hosting", qty: 1, price: 1000 },
  ],
  total: 6000,
};

const InvoicePDF = () => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Invoice</Text>

        <View style={styles.section}>
          <Text>Invoice ID: {invoiceData.invoiceId}</Text>
          <Text>Client: {invoiceData.clientName}</Text>
          <Text>Date: {invoiceData.date}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.header}>Item</Text>
            <Text style={styles.header}>Qty</Text>
            <Text style={styles.header}>Price</Text>
          </View>

          {invoiceData.items.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.qty}</Text>
              <Text style={styles.cell}>₹{item.price}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.total}>Total: ₹{invoiceData.total}</Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;