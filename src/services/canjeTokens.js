export const datasourceTokens = async (ID_PERSONA) => {
  try {
    const response = await fetch(
      `https://localhost:7136/odata/getResumenTokensPersona?idPersona=${ID_PERSONA}`
    );
    const result = await response.json();
    setDataTokens(result);
    console.log("Datos desde API:", result);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  } finally {
    setLoading(false);
  }
};
