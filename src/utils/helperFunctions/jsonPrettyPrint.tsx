// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jsonPrettyPrint = (data: any): JSX.Element => {
  const jsonData = JSON.stringify(data, null, 2);

  const preStyle: React.CSSProperties = {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  };

  return <pre style={preStyle}>{jsonData}</pre>;
};

export default jsonPrettyPrint;
