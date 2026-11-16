/**
 * Preguntas frecuentes de la portada.
 * // SUPUESTO → respuestas de ejemplo; confirmarlas con el negocio antes de publicar.
 */
export interface Faq {
  q: string;
  a: string;
}

export const faq: Faq[] = [
  {
    q: '¿Cómo pido en Cántaro?',
    a: 'Escanea el código QR de tu mesa para ver la carta y haz tu pedido en la barra o con nuestro personal. Así de sencillo.',
  },
  {
    q: '¿Necesito reservar para tomar algo?',
    a: 'No. Llega cuando quieras y quédate el tiempo que necesites. Para grupos grandes, escríbenos antes por WhatsApp.', // SUPUESTO
  },
  {
    q: '¿Cómo me inscribo a un taller?',
    a: 'Escríbenos por WhatsApp con el nombre del taller. Los cupos son limitados y se confirman con el pago del cupo.', // SUPUESTO
  },
  {
    q: '¿Puedo comprar artesanías para regalo?',
    a: 'Sí. Todas las piezas están a la venta en el local y te ayudamos a armar un detalle con empaque de regalo.', // SUPUESTO
  },
  {
    q: '¿Qué medios de pago reciben?',
    a: 'Efectivo, transferencias (Nequi y Daviplata) y tarjetas débito y crédito.', // SUPUESTO
  },
  {
    q: '¿Hacen pedidos especiales de tortas o artesanías?',
    a: 'Cuéntanos qué necesitas por WhatsApp y te decimos tiempos y precio.', // SUPUESTO
  },
];
