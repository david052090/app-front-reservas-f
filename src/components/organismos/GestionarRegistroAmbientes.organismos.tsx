import EncabezadoReservas from "../moleculas/EncabezadoReservas.moleculas";
import TablaGestionarRegistroAmbientes from "../moleculas/TablaGestionarRegistroAmbientes.moleculas";
import ModalRegistrarAmbiente from "../moleculas/ModalRegistrarAmbiente.moleculas";
import { useState, useEffect } from "react";
import { IListaAmbientes } from "../../interface/ambientes.interface";
import { getListaAmbientes } from "../../utils/obtenerAmbientes";
const GestionarRegistroAmbientes = () => {
  const [abrirModalAmbiente, setAbrirModalAmbiente] = useState<boolean>(false);
  const [listarDataAmbientes, setListarDataAmbientes] = useState<
    IListaAmbientes[]
  >([]);
  useEffect(() => {
    listarAmbientes();
  }, []);

  const listarAmbientes = async () => {
    try {
      const respuesta = await getListaAmbientes();
      setListarDataAmbientes(respuesta);
      console.log("respuesta", respuesta);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <EncabezadoReservas
        setAbrirModalReservas={setAbrirModalAmbiente}
        actualizarTabla={() => listarAmbientes()}
      />
      <TablaGestionarRegistroAmbientes
        dataListadoAmbientes={listarDataAmbientes}
        setSelected={[]}
        selected={[]}
      />
      <ModalRegistrarAmbiente
        setAbrirModalAmbiente={setAbrirModalAmbiente}
        abrirModalAmbiente={abrirModalAmbiente}
        actualizarData={() => listarAmbientes()}
      />
    </>
  );
};
export default GestionarRegistroAmbientes;
