import { useData } from "@/DataContext";
import {
  EditDeleteContainer,
  PenIcon,
  TrashIcon,
} from "./EditDeleteItem.style";
import { useRouter } from "next/navigation";
import { deleteItem } from "./EditDeleteItem.utils";
import { checkServerStatus, saveOfflineChange } from "@/DataCaching";
import { useState } from "react";

const EditDeleteItem = ({
  index,
  refresh,
}: {
  index: number;
  refresh: any;
}) => {
  const { updateData, updateIndex, updatePageNumber, getData } = useData();
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();
  const { getToken } = useData();

  const handleDelete = async () => {
    await checkServerStatus(setIsOnline, () => {}, getToken);
    if (isOnline) {
      await deleteItem(index, getToken);
      refresh();
    } else {
      saveOfflineChange({ type: "delete", payload: { id: index } });
    }
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
