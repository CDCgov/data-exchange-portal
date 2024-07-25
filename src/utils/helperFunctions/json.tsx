/* eslint-disable @typescript-eslint/no-explicit-any */
export const jsonPrettyPrint = (data: any): JSX.Element => {
  const jsonData = JSON.stringify(data, null, 2);

  const preStyle: React.CSSProperties = {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  };

  return <pre style={preStyle}>{jsonData}</pre>;
};

export const downloadJson = (data: any, filename: string = "data.json") => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
