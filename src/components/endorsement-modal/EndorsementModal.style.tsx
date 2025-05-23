import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #000;
  }
`;

export const EndorsementCard = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

export const EndorsementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const EndorserName = styled.h4`
  margin: 0;
  color: #333;
`;

export const EndorsementDate = styled.span`
  color: #666;
  font-size: 0.9em;
`;

export const EndorsementRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  exportspan {
    margin-left: 8px;
    font-weight: bold;
  }
`;

export const EndorsementComment = styled.p`
  margin: 0;
  color: #444;
`;

export const NoEndorsements = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export const MovieTitle = styled.h2`
  margin: 0;
  color: #222;
`;
