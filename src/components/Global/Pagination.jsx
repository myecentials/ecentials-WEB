import React, { useState, useEffect } from "react";

const Pagination = ({ LIST, newList, setNewList, perPage, setPerPage }) => {
    const [activeTab, setActiveTab] = useState(1);
    // regex   (?<=\w)(?<!\?)\.(?=\w)
    useEffect(() => {
        setActiveTab(1); // Reset active tab when perPage changes
    }, [setPerPage]);

    useEffect(() => {
        const start = (activeTab - 1) * perPage;
        const end = start + perPage;
        setNewList(LIST?.slice(start, end));
    }, [LIST, activeTab, perPage, setNewList]);

    const numOfTabs = Math?.ceil(LIST?.length / perPage);

    // Function to determine which buttons to show
    const shouldShowButton = (index) => {
        if (numOfTabs === 1) return index === 1;
        if (numOfTabs === 2) return index === 1 || index === 2;
        if (numOfTabs === 3) return index === 1 || index === 2 || index === 3;
        return index === activeTab || (index >= activeTab - 1 && index <= activeTab + 1);
    };

    const handlePrevious = () => {
        if (activeTab > 1) setActiveTab(activeTab - 1);
    };

    const handleNext = () => {
        if (activeTab < numOfTabs) setActiveTab(activeTab + 1);
    };

    return (
        <>
            <div className="d-flex">
                {newList?.map((item, index) => (
                    <p key={index}>{item?.name}</p>
                ))}
            </div>

            <div className="d-md-flex   mb-3">
                <p className="text-center text-md-start" style={{
                    color: "#4D44B5",
                    padding: '8px 16px',
                }}>Showing {(activeTab - 1) * perPage + 1} - {Math.min(activeTab * perPage, LIST?.length)} of {LIST?.length}</p>
                
                <div className="d-flex d-md-block justify-content-sm-center">
                    {activeTab > 1 && (
                        <button
                            onClick={handlePrevious}
                            style={{
                                padding: '8px 16px',
                                marginRight: '4px',
                                border: 'none',
                                backgroundColor: '#f0f0f0',
                                color: '#4D44B5',
                                cursor: 'pointer'
                            }}
                        >
                            &lt;
                        </button>
                    )}
                    {Array.from({ length: numOfTabs }, (_, i) => i + 1)
                        .filter(shouldShowButton)
                        .map(pageNumber => (
                            <button
                                key={pageNumber}
                                onClick={() => setActiveTab(pageNumber)}
                                style={{
                                    padding: '8px 16px',
                                    margin: '0 4px',
                                    border: 'none',
                                    backgroundColor: pageNumber === activeTab ? '#4D44B5' : '#f0f0f0',
                                    color: pageNumber === activeTab ? 'white' : 'black',
                                    cursor: 'pointer'
                                }}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    {activeTab < numOfTabs && (
                        <button
                            onClick={handleNext}
                            style={{
                                padding: '8px 16px',
                                marginLeft: '4px',
                                border: 'none',
                                backgroundColor: '#f0f0f0',
                                color: '#4D44B5',
                                cursor: 'pointer'
                            }}
                        >
                           &gt;
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Pagination;
