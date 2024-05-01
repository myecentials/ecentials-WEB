import React from 'react'

const StateButton = ({pressAction,isLoading,loadText,pressText}) => {
  return (
    <button
    onClick={pressAction}
    disabled={isLoading}
    type="button"
    className="ms-bg text-white rounded-pill px-4 my-5 save py-2">
    {isLoading ? (
        <div>
            <span
                className="spinner-border spinner-border-sm mx-2"
                role="status">
                <span className="sr-only">Loading...</span>
            </span>
            <span>{loadText}</span>
        </div>
    ) : (
        <span>{pressText}</span>
    )}
</button>
  )
}

export default StateButton