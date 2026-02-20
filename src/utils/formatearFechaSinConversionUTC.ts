import dayjs from "dayjs";

export function formatearFechaSinConversionUTC(
  fechaISO: string,
  formato = "DD/MM/YYYY hh:mm A",
) {
  return dayjs(String(fechaISO).replace(/Z$/, "")).format(formato);
}
