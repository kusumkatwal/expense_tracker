const querySvc = require('../service/query.service')

class Algorithm{
    
    mean = (X) => {
        console.log(X)
        var sum = 0;
        for (var i = 0; i < X.length; i++) {
            sum += X[i];
        }
        console.log(sum/X.length)
        return (sum / X.length);
    }

    variance = (X, m) => {
        var sumOfSquares = 0;
        for (var i = 0; i < X.length; i++) {
            sumOfSquares += (X[i] - m) ** 2;
        }
        var meanVariance = sumOfSquares / X.length;
        return (meanVariance);
    }

    covariance = (x, m1, y, m2) => {
        var result = 0;
        for (var i = 0; i < x.length; i++) {
            var a = (x[i] - m1);
            var b = (y[i] - m2);
            var mul = a * b;
            result += mul;

        }

        var mean_result = result / x.length;

        return (mean_result);
    }
    coefficient = (x, y) => {
        const x_mean = this.mean(x);
        const y_mean = this.mean(y);
        const x_variance = this.variance(x, x_mean);   //x-mean
        const co_variance = this.covariance(x, x_mean, y, y_mean);
    
        var slope = co_variance / x_variance;
        var intercept = y_mean - slope * x_mean;
    
    
        return [intercept, slope];
    
    }

    make_prediction = async(test)=>
    {
        console.log(test)
        const incomes = await querySvc.getMonthlyIncome();
        const expenses = await querySvc.getMonthlyExpenses();
         
        // const trainSize = Math.floor(0.7 * incomes.length);

        // const trainSet_income = incomes.slice(0, trainSize);
        // const testSet_income = incomes.slice(trainSize);
        // const trainSet_expense = expenses.slice(0, trainSize);
        // const testSet_expense = expenses.slice(trainSize)
       
        
        const x_train = incomes.map((income) => income.totalAmount);
        const y_train = expenses.map((expense) => expense.totalAmount);

        // const x_test = testSet_income.map((test) => test.totalAmount)
        // const y_test = testSet_expense.map((test) => test.totalAmount)
   
        const [intercept, slope] =this.coefficient(x_train, y_train);
      
        const y_pred =  intercept + test * slope;

        // const y_pred = this.mean(y_pred).toFixed(2)

        console.log('the predicted val is ' + y_pred);
        return (y_pred);    
    }
}
const algo = new Algorithm;
module.exports = algo;