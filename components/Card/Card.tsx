import React from 'react';
import ICardProps from "./Card.props";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import styles from "./Card.module.scss";

const MyCard = ({name, img, price, bsr_category, link}: ICardProps) => {
    return (
        <Card sx={{ width: 345 }}>
            <img className={styles.cardImage} src={img} alt={name} />
            <CardContent>
                <a title={name} className={styles.cardLink} href={link}>
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
};

export default MyCard;
