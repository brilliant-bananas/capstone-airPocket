import React from 'react'

const TransForm = (props) => {
  const {state, handleChange, handleSubmit, date} = props

  return (
    <div>
      <form id="transactionForm" onSubmit={handleSubmit}>
        <label htmlFor="changeName">Store Name:</label>
        <input
          type="text"
          name="name"
          value={state.storeName}
          onChange={handleChange}
        />
        <label htmlFor="changePrice">Price:</label>
        <input
          type="number"
          name="price"
          value={state.amount}
          onChange={handleChange}
        />
        <label htmlFor="changeDate">Date:</label>
        <input type="text" name="date" value={date} onChange={handleChange} />
        <button>Confirm Changes</button>
      </form>
    </div>
  )
}

export default TransForm
