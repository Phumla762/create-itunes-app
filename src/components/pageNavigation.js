import React from 'react';


function pageNavigation (props) {
    const {
        loading,
        showPrevLink,
        showNextLink,
        handlePrevClick,
        handleNextClick
    } = props;
    return (
        <div className="nav-link-container">

        {/* this is an achor tag for the previous page*/}

            <a 
            href="/"
            className={`nav-link ${showPrevLink ? "show" : "hide"}
             ${loading ? "greyed-out" : "" }`}
            onClick={handlePrevClick}
            >
            Prev
            </a>

            {/* this is an anchor tag for the next page */}

            <a 
            href="/"
            className={`nav-link ${showNextLink ? "show" : "hide"}
            ${loading ? "greyed-out" : "" }`}
            onClick={handleNextClick}
            >
            Next
            </a>
        </div>
    );
}

export default pageNavigation;