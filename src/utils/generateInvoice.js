import jsPDF from "jspdf";

const generateInvoice = ({ cart, subtotal, gst, total }) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("ComfortWear - Invoice", 14, 20);

  doc.setFontSize(11);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
  doc.text(`Invoice ID: INV-${Date.now()}`, 14, 38);

  let y = 50;

  cart.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.name} (${item.quantity} × Rs.${item.price})`,
      14,
      y
    );
    doc.text(
      `Rs.${(item.price * item.quantity).toFixed(2)}`,
      190,
      y,
      { align: "right" }
    );
    y += 8;
  });

  y += 10;
  doc.line(14, y, 196, y);
  y += 10;

  doc.text(`Subtotal: Rs.${subtotal.toFixed(2)}`, 14, y);
  y += 8;
  doc.text(`GST (18%): Rs.${gst.toFixed(2)}`, 14, y);
  y += 8;
  doc.setFontSize(13);
  doc.text(`Total: Rs.${total.toFixed(2)}`, 14, y);

  doc.save("ComfortWear_Invoice.pdf");
};

export default generateInvoice;
