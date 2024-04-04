export const jsonPrettyPrint = (data: any): JSX.Element => {
  const jsonData = JSON.stringify(data, null, 2);

  return <pre>{jsonData}</pre>;
};

export default jsonPrettyPrint;
