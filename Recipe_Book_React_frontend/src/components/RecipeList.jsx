// import React from 'react';
// import './TargetCursor.css';

// export default function RecipeList({recipes, onSelect, selected}){
//   return (
//     <div className="recipe-list">
//       {recipes.map(r => (
//         <div key={r.id} className="card" onClick={() => onSelect(r)} style={{border: selected && selected.id===r.id ? '1px solid rgba(245,158,11,0.6)':'none'}}>
//           <img src={r.image} alt={r.name} />
//           <div className="meta">
//             <h3>{r.name}</h3>
//             <p>{r.time} • Serves {r.serves}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
import React from 'react';
import './TargetCursor.css';
import { useNavigate } from 'react-router-dom';

export default function RecipeList({ recipes, onSelect, selected, recipeId, onNavigate, isMobile}) {

  const navigate = useNavigate();
  return (
    <div className="recipe-list">
      {recipes.map((r) => (
        <div
          key={r.id}
          className={`card cursor-target`}  
          onClick={() => {
            if(isMobile){onNavigate(r.id);}
            else{onSelect(r);}
          }
          }
          style={{
            border:
              selected && selected.id === r.id
                ? '1px solid rgba(245,158,11,0.6)'
                : 'none',
          }}
        >
          <img src={r.photo} alt={r.name} onClick={()=>navigate('/')}/>
          <div className="meta">
            <h3>{r.name}</h3>
            <p>
              {r.time} • Serves {r.serves}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
