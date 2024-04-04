import React, { useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

const Transactions = () => {
    let count = 0;
    const {allTransactionHistory} = useGlobalContext();

    const [...allHistory] = allTransactionHistory()

  return (
    <TransactionsStyled>
        <div className="transactions">
            <h1>Transactions</h1>          
          <table className='table'>
            <thead>
                <tr>
                    <td>N<u>o</u></td>
                    <td>Transaction type</td>
                    <td>Transaction title</td>
                    <td>Transaction amount</td>
                    <td>Transaction date</td>
                    <td>Transaction category</td>
                </tr>
            </thead>
            <tbody>
                {allHistory.map((item, i) => {
                    {count = allHistory.length}
                    const { _id, title, amount, type, date, category, description} = item;
                    return <tr key={_id} style={{color: type === 'expense' ? "red" 
                    : "var(--color-green)"}}>
                        <td>{i + 1}</td>
                        <td>{type}</td>
                        <td>{title}</td>
                        <td>{amount}</td>
                        <td>{dateFormat(date)}</td>
                        <td>{category}</td>
                </tr>
                })}
            </tbody>
            </table>
            <div style={{display: "flex", gap: "20px", marginTop: "15px"}}>
                <p>All transactions</p>
                <p>{count}</p>
            </div>
        </div>
    </TransactionsStyled>
  )
}

const TransactionsStyled = styled.div`
    .transactions{
        width: 100%;
        min-height: 50vh;
        padding: 50px;
        .table{
            margin-top: 2em;
            border: 1px solid rgba(34, 34, 96, 0.6);
            border-radius: 5px;
        }
        .table thead{
            background: rgba(34, 34, 96, 0.6);
            color: white;
            position: relative;
        }
        .table thead tr td{
            padding-left: 10px;
            padding-right: 100px;
        }
        .table tbody tr td{
            padding-left: 10px;
            padding-right: 100px;
        }
    }
`;

export default Transactions