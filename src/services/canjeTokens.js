export const tokensDatasource = async (ID_PERSONA) => {
  try {
    const response = await fetch(
      `https://localhost:7136/odata/getResumenTokensPersona?idPersona=${ID_PERSONA}`
    );
    const result = await response.json();
    console.log("Datos desde API:", result);
    return result;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
};
