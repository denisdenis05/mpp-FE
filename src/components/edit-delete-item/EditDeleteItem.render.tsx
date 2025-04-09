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
  const { updateData, updateIndex, updatePageNumber, getData } = useData();
  const router = useRouter();

  const handleDelete = async () => {
    await deleteItem(index);
    refresh();
  };

  const editItem = () => {
    console.log(index);
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
