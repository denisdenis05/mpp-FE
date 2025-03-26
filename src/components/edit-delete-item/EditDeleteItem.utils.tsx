export const deleteItem = (data: any, index: number) => {
  console.log(data);
  const newData = [...data];
  newData.splice(index, 1);

  return newData;
};
