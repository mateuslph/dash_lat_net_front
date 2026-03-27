export const buscarPing = async (host: string) => {
  try {
    const response = await fetch(`/api/ping?host=${host}`);

    if (!response.ok) {
      throw new Error("Erro na API");
    }

    const data = await response.json();

    return data.time ?? -1;

  } catch (error) {
    console.error(error);
    return -1;
  }
};