import { useData } from "@/DataContext";
import {
  EditDeleteContainer,
  PenIcon,
  TrashIcon,
} from "./EditDeleteItem.style";
import { useRouter } from "next/navigation";
import { deleteItem } from "./EditDeleteItem.utils";

const EditDeleteItem = ({
  index,
  refresh,
}: {
  index: number;
  refresh: any;
}) => {
  const { updateData, updateIndex, getData } = useData();
  const router = useRouter();

  const handleDelete = () => {
    const newData = deleteItem(getData(), index);
    console.log(newData);
    updateData(newData);
    refresh(newData);
  };

  const editItem = () => {
    updateIndex(index);
    router.push("/edit-movie");
  };

  return (
    <EditDeleteContainer>
      <PenIcon onClick={editItem} /> <TrashIcon onClick={handleDelete} />
    </EditDeleteContainer>
  );
};

export default EditDeleteItem;
