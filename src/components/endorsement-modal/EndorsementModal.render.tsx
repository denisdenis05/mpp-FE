import React from "react";
import { Movie } from "@/constants";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  MovieTitle,
  CloseButton,
  LoadingMessage,
  EndorsementCard,
  EndorsementHeader,
  EndorserName,
  EndorsementDate,
  EndorsementRating,
  EndorsementComment,
  NoEndorsements,
} from "./EndorsementModal.style";

interface Endorsement {
  endorsementId: number;
  endorser: number;
  date: string;
}

interface EndorsementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
  endorsements: Endorsement[];
  isLoading: boolean;
}

const EndorsementsModal: React.FC<EndorsementsModalProps> = ({
  isOpen,
  onClose,
  movie,
  endorsements,
  isLoading,
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <MovieTitle>{movie.title} - Endorsements</MovieTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        {isLoading ? (
          <LoadingMessage>Loading endorsements...</LoadingMessage>
        ) : endorsements.length > 0 ? (
          endorsements.map((endorsement) => (
            <EndorsementCard key={endorsement.endorsementId}>
              <EndorsementHeader>
                <EndorserName>{endorsement.endorser}</EndorserName>
                <EndorsementDate>
                  {formatDate(endorsement.date)}
                </EndorsementDate>
              </EndorsementHeader>
            </EndorsementCard>
          ))
        ) : (
          <NoEndorsements>No endorsements found for this movie.</NoEndorsements>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default EndorsementsModal;
