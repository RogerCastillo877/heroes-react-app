import { Navigate, useParams } from "react-router-dom"
import { getHeroById } from "../../selectors/getHeroById";

export const HeroScreen = () => {
  
  const { heroId } = useParams();

  const hero = getHeroById( heroId );

  if( !hero ) {
    return <Navigate to='/' />
  };

  return (
    <div>
      <h1>HeroScreen</h1>
      <p>
        { hero.superhero }
      </p>
    </div>
  )
}
