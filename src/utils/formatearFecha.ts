const formatearFecha = (
  fechaISO: string,
  withHours = true,
  newfecha = false
) => {
  const fecha = newfecha ? new Date() : new Date(fechaISO);
  const año = fecha.getUTCFullYear();
  const mes = ("0" + (fecha.getUTCMonth() + 1)).slice(-2);
  const dia = ("0" + fecha.getUTCDate()).slice(-2);
  const hora = ("0" + fecha.getUTCHours()).slice(-2);
  const minutos = ("0" + fecha.getUTCMinutes()).slice(-2);
  const segundos = ("0" + fecha.getUTCSeconds()).slice(-2);

  return withHours
    ? newfecha
      ? `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`
      : `${año}/${mes}/${dia} - ${hora}:${minutos}`
    : `${dia}/${mes}/${año}`;
};

export default formatearFecha;
