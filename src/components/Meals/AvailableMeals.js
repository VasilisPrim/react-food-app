import { useState, useEffect } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [mealData, setMealData] = useState([]);

  const [error, setError] = useState();
 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMeals = async () => {
      
      
        const response = await fetch(
          "https://react-http-29822-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );

        if(!response.ok){
          throw new Error('There was an error in fetching data.Check your connection!')
        }

        const data = await response.json();
      
      

      const mealArray = [];

      for (const key in data) {
        mealArray.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMealData(mealArray);
      setIsLoading(false);
    };

    
    getMeals().catch(error =>{
      setIsLoading(false);
      setError(error.message)
    });
  }, []);

  

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.error}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = mealData.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
