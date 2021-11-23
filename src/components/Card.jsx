import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./Card.scss"

export default function RecipeReviewCard({name, img, price, bsr_category, link}) {
  return (
    <Card className="card" sx={{ width: 345 }}>
      <img className="card-image" src={img} alt={name} />
      <CardContent>
        <a title={name} className="card-link" href={link}>
          {
            name.length < 60 ? name : `${name.substr(0, 60)}...`
          }
        </a>
        <div className="card-category">
          {bsr_category}
        </div>
        <strong className="card-price">
            {price}$
        </strong>
      </CardContent>
    </Card>
  );
}
