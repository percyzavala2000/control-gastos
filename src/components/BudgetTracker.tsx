
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useBudget } from '../hooks/useBudget';

import { AmountDisplay } from './AmountDisplay';

export const BudgetTracker = () => {
  const { state,totalExpenses,remainingBudget,dispatch } = useBudget();
  const porcentage = +((totalExpenses / state.budget)*100).toFixed(2);
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    //reset app
    dispatch({type:'reset-app'});
   

  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
      <CircularProgressbar value={porcentage} text={`${porcentage}% Gastado`} styles={buildStyles({
        textSize: '8px',
        pathColor:porcentage ===100?'#dc2626':'#3B82F6',
        textColor: porcentage ===100?'#dc2626':'#3B82F6',
        trailColor: '#F5F5F5',

      })} />;
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button type="button" className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg" onClick={handleButtonClick} >Reset App</button>
        <AmountDisplay label="Presupuesto" amount={state.budget}  />
        <AmountDisplay label="Disponible" amount={remainingBudget}  />
        <AmountDisplay label="Gastado" amount={totalExpenses}  />
      </div>
    </div>
  );
};
