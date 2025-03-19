import { useData } from "@/DataContext";
import {
  EditDeleteContainer,
  PenIcon,
  TrashIcon,
} from "./EditDeleteItem.style";
import { useRouter } from "next/navigation";

const EditDeleteItem = ({ index }: { index: number }) => {
  const { data, updateData, updateIndex } = useData();
  const router = useRouter();

  const deleteItem = () => {
    console.log(index);
    const newData = data;
    newData.splice(index, 1);
    console.log(newData);
    updateData(newData);
    router.push("/admin");
  };

  const editItem = () => {
    updateIndex(index);
    router.push("/edit-movie");
  };

  return (
    <EditDeleteContainer>
      <PenIcon onClick={editItem} /> <TrashIcon onClick={deleteItem} />
    </EditDeleteContainer>
  );
};

export default EditDeleteItem;
