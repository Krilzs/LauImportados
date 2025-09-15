import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Section,
  Row,
  Column,
} from "@react-email/components";

export default function EmailTemplate({ items = [], email }) {
  // calcular total (ya vienen normalizados en la API, pero aseguramos con Number)
  const total = items.reduce(
    (acc, item) => acc + Number(item.unit_price) * Number(item.quantity),
    0
  );

  return (
    <Html>
      <Head />
      <Preview>Gracias por tu compra en Lau Importados!</Preview>

      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>¡Hola! Tu compra ha sido procesada.</Heading>
          <Text style={text}>
            Gracias por tu compra. Tu pago fue procesado con éxito.
          </Text>

          {/* Listado de items */}
          <Section style={listContainer}>
            {items.map((item) => (
              <Row key={item.id} style={row}>
                <Column style={{ width: "60%" }}>
                  <Text style={productName}>
                    {item.title} (x{item.quantity})
                  </Text>
                </Column>
                <Column style={{ width: "40%", textAlign: "right" }}>
                  <Text style={productPrice}>
                    {item.currency_id} $
                    {(Number(item.unit_price) * Number(item.quantity)).toFixed(
                      2
                    )}
                  </Text>
                </Column>
              </Row>
            ))}

            {/* Total */}
            <Row style={totalRow}>
              <Column style={{ width: "60%" }}>
                <Text style={productName}>Total</Text>
              </Column>
              <Column style={{ width: "40%", textAlign: "right" }}>
                <Text style={productPrice}>
                  {items[0]?.currency_id || "ARS"} ${total.toFixed(2)}
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={{ margin: "20px 0" }}>
            <Button
              style={button}
              href={`https://lau-importados.vercel.app/tienda`}
            >
              Explorar la tienda
            </Button>
          </Section>

          <Text style={footer}>
            Email referencial al pedido: {email}
            <br />
            Si tenés dudas, podés encontrar más información en nuestra página de{" "}
            <a href="https://lau-importados.vercel.app/contacto">contacto</a>.
            <br />– El equipo de Lau Importados 🚀
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// 🎨 Estilos
const main = { backgroundColor: "#f6f9fc", padding: "20px" };
const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "40px",
  margin: "0 auto",
  maxWidth: "500px",
  fontFamily: "Arial, sans-serif",
};
const h1 = { color: "#1a1a1a", fontSize: "24px", marginBottom: "20px" };
const text = { color: "#333333", fontSize: "16px", lineHeight: "24px" };
const button = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "6px",
  textDecoration: "none",
  fontSize: "16px",
};
const footer = { color: "#8898aa", fontSize: "12px", marginTop: "30px" };
const listContainer = {
  marginTop: "20px",
  borderTop: "1px solid #e5e5e5",
  borderBottom: "1px solid #e5e5e5",
};
const row = { borderBottom: "1px solid #e5e5e5", padding: "8px 0" };
const totalRow = { padding: "12px 0" };
const productName = { fontSize: "14px", color: "#1a1a1a" };
const productPrice = { fontSize: "14px", color: "#111", fontWeight: "bold" };
