import React, { useEffect,useState } from 'react';
import copy from 'clipboard-copy'; // Import clipboard-copy library

const CopyToClipboardButton = ({textToCopy}) => {

  const handleCopyClick = async () => {
    try {
      await copy(textToCopy);
      alert('Text copied to clipboard: ' + textToCopy);
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">رابط الاحالة الخاص بى</h5>
              <p className="card-text">{textToCopy}</p>
              <button
                className="btn btn-primary"
                onClick={handleCopyClick}
              >
                Copy Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyToClipboardButton;
