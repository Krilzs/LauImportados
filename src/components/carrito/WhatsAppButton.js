export default function WhatsAppButton({ order }) {
  const phone = "5491170656865"; // tu número con código país
  const message = formatOrderMessage(order);
  const encodedMessage = encodeURIComponent(message);

  console.log(order);
  return (
    <a
      href={`https://wa.me/${phone}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        padding: "12px 20px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      📦 Mandar pedido por WhatsApp
    </a>
  );
}

// función auxiliar
function formatOrderMessage(order) {
  let message = "Hola, quiero confirmar mi pedido:\n\n";
  let total = 0;

  order.forEach((item, i) => {
    console.log(item);
    const subtotal = item.quantity * item.price;
    total += subtotal;
    message += `${i + 1}. ${item.quantity}x ${item.name} - $${subtotal}\n`;
  });
  console.log("este es el emssaje:", message);
  message += `\n Total: $${total}`;
  return message;
}
