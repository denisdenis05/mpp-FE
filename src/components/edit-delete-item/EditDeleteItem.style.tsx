import styled from "styled-components";
import Pen from "../../assets/mdi_pen.svg";
import Trash from "../../assets/mdi_trash.svg";

const EditDeleteContainer = styled.div`
  display: flex;
`;

const PenIcon = styled(Pen)`
  transform: scale(0.7);
`;

const TrashIcon = styled(Trash)`
  transform: scale(0.7);
`;

export { EditDeleteContainer, PenIcon, TrashIcon };
