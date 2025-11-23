import React from "react";

export const renderDetalle = (texto: string): React.ReactNode => {
  if (!texto.includes(":")) return texto;

  const palabras = texto.split(" ");
  const elementos: React.ReactNode[] = [];

  palabras.forEach((palabra, index) => {
    if (palabra.includes(":")) {
      elementos.push(
        <React.Fragment key={index}>
          <strong style={{ fontWeight: 700 }}>{palabra}</strong>
          <br />
        </React.Fragment>
      );
    } else {
      elementos.push(palabra + " ");
    }
  });

  return elementos;
};
