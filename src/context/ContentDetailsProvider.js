import React, { createContext, useState } from "react";

export const ContentDetailsContext = createContext({});

const ContentDetailsProvider = ({ children }) => {
  const [showContentModal, setShowContentModal] = useState(false);
  const [contentID, setContentID] = useState();
  const [contentType, setContentType] = useState();

  const contentDetails = {
    showContentModal,
    setShowContentModal,
    contentID,
    setContentID,
    contentType,
    setContentType,
  };

  return (
    <ContentDetailsContext.Provider value={contentDetails}>
      {children}
    </ContentDetailsContext.Provider>
  );
};

export default ContentDetailsProvider;
