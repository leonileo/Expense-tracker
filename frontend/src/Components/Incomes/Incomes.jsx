import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext.jsx';
import Form from '../Form/Form.jsx';
import IncomeItem from '../incomeItem/IncomeItem.jsx';

const Incomes = () => {
  const {addIncome, incomes, car, getIncomes, deleteIncomes, totalIncome} = useGlobalContext();

  useEffect(()=>{
    getIncomes();
  }, [])

  return (
    <IncomesStyled>
        <InnerLayout>
          <h1>Incomes</h1>
          <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
          <div className="income-content">
            <div className="form-container">
              <Form />
            </div>
            <div className="incomes">
              {incomes.map((income) => {
                const {_id, title, amount, date, category, description, type} = income;
                return <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount} date={date}
                  category={category}
                  indicatorColor={"var(--color-green)"}
                  deleteItem={deleteIncomes}
                  type={type}
                />
              })}
            </div>
          </div>
        </InnerLayout>
    </IncomesStyled>
  )
}

const IncomesStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0,0,0.06);
      border-radius: 20px;
      padding: 1rem;
      margin: 1rem 0;
      font-size: 2rem;
      gap: .5rem;
      span{
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--color-green);
      }
    }
    .income-content{
      display: flex;
      overflow-x: hidden;
      gap: 2rem;
      .incomes{
        flex: 1;
      }
    }
`;

export default Incomes 